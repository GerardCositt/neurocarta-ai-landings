# NeuroCarta.ai® — landings

Repositorio de landings en React + Vite + Tailwind.

| Carpeta | Enfoque |
|---------|---------|
| `neurocarta-conversion/` | **ACTIVA (única en uso)** |
| `neurocarta-landing/` | Archivada / desechada (ver `neurocarta-landing/ARCHIVED.md`) |
| `neurocarta-premium/` | Archivada / desechada (ver `neurocarta-premium/ARCHIVED.md`) |

## Ejecutar (solo `neurocarta-conversion`)

```bash
cd neurocarta-conversion
npm install
npm run dev
```

## Despliegue Plesk

La app pública vive en `neurocarta-conversion/`. En Plesk, usa este comando en
las acciones de despliegue adicionales:

```bash
npm run deploy:plesk
```

Ese comando instala dependencias de `neurocarta-conversion`, genera `dist/` y
copia el build estático a la raíz del despliegue.

### Skills (opcional)

- GSAP skills (para animaciones): ver `docs/skills-gsap.md`.
