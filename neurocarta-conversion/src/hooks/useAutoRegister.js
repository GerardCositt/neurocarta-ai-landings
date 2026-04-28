import { useEffect, useState } from 'react';
import { ensureAutoRegistered, getStoredAutoRegistration } from '../lib/autoRegister';

function shouldAutoRegisterFromUrl() {
  if (typeof window === 'undefined') {
    return false;
  }

  const params = new URLSearchParams(window.location.search);
  return params.get('autoregister') === '1';
}

export function useAutoRegister() {
  const [registration, setRegistration] = useState(() => getStoredAutoRegistration());
  const [status, setStatus] = useState(() => (registration ? 'success' : 'idle'));
  const [error, setError] = useState(null);

  async function triggerAutoRegister() {
    if (status === 'loading') {
      return registration;
    }

    setStatus('loading');
    setError(null);

    try {
      const result = await ensureAutoRegistered();
      setRegistration(result);
      setStatus('success');
      return result;
    } catch (currentError) {
      setError(currentError);
      setStatus('error');
      throw currentError;
    }
  }

  useEffect(() => {
    if (!shouldAutoRegisterFromUrl()) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      ensureAutoRegistered()
        .then((result) => {
          setRegistration(result);
          setStatus('success');
          setError(null);
        })
        .catch((currentError) => {
          setError(currentError);
          setStatus('error');
        });
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return {
    registration,
    status,
    error,
    triggerAutoRegister,
  };
}
