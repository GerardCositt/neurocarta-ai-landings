const STORAGE_KEY = 'neurocarta:auto-register';
const DEFAULT_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';
const DEFAULT_EMAIL_DOMAIN =
  import.meta.env.VITE_AUTO_REGISTER_EMAIL_DOMAIN || 'autoreg.neurocarta.ai';

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function readStoredRegistration() {
  if (!canUseStorage()) {
    return null;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

function writeStoredRegistration(payload) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function generatePassword() {
  const randomSeed =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID().replace(/-/g, '')
      : `${Date.now()}${Math.random().toString(16).slice(2)}`;

  return `Nc!${randomSeed.slice(0, 16)}A9`;
}

function generateCredentials() {
  const id =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID().slice(0, 12)
      : `${Date.now()}${Math.random().toString(36).slice(2, 8)}`.slice(0, 12);

  return {
    name: `Lead ${id}`,
    email: `lead-${id}@${DEFAULT_EMAIL_DOMAIN}`,
    password: generatePassword(),
  };
}

async function createUser(credentials, apiBaseUrl = DEFAULT_API_BASE_URL) {
  const response = await fetch(`${apiBaseUrl}/api/v1/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(
      data?.error?.message || 'No se pudo registrar el usuario automaticamente'
    );

    error.status = response.status;
    error.payload = data;
    throw error;
  }

  return data;
}

export async function ensureAutoRegistered() {
  const storedRegistration = readStoredRegistration();

  if (storedRegistration?.token && storedRegistration?.user?.id) {
    return {
      status: 'existing',
      ...storedRegistration,
    };
  }

  const credentials = generateCredentials();

  try {
    const result = await createUser(credentials);
    const payload = {
      user: result?.data?.user || null,
      token: result?.data?.auth?.token || null,
      tokenType: result?.data?.auth?.tokenType || 'Bearer',
      expiresIn: result?.data?.auth?.expiresIn || null,
      credentials,
      registeredAt: new Date().toISOString(),
    };

    writeStoredRegistration(payload);

    return {
      status: 'created',
      ...payload,
    };
  } catch (error) {
    if (error.status === 409) {
      const retryCredentials = generateCredentials();
      const result = await createUser(retryCredentials);
      const payload = {
        user: result?.data?.user || null,
        token: result?.data?.auth?.token || null,
        tokenType: result?.data?.auth?.tokenType || 'Bearer',
        expiresIn: result?.data?.auth?.expiresIn || null,
        credentials: retryCredentials,
        registeredAt: new Date().toISOString(),
      };

      writeStoredRegistration(payload);

      return {
        status: 'created',
        ...payload,
      };
    }

    throw error;
  }
}

export function getStoredAutoRegistration() {
  return readStoredRegistration();
}
