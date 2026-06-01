# Astronomy Explorer

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=111)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=fff)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite&logoColor=fff)
![Three.js](https://img.shields.io/badge/Three.js-0.181-000000?logo=threedotjs&logoColor=fff)
[![Live Demo](https://img.shields.io/badge/live-demo-16a34a)](https://ewastro.vercel.app/)
![License](https://img.shields.io/badge/license-MIT-blue)

**Other Deployments:**

- [Bio Demo](https://ewbio.vercel.app/)
- [Chem Demo](https://ewchem.vercel.app/)

An interactive 3D astronomy explorer built with React, Vite, and Three.js. Browse five cosmic objects — Main-Sequence Star, Neutron Star, Black Hole, Exoplanet, and Spiral Galaxy — with selectable features, comparison mode, and an AI Tutor panel.

## Objects

| Object | Type |
| --- | --- |
| Main-Sequence Star | Astrophysics · G2V · ~1 M☉ |
| Neutron Star | Astrophysics · Pulsar · ~1.4 M☉ |
| Black Hole | Astrophysics · Stellar Mass · ~10 M☉ |
| Exoplanet | Astronomy · Hot Jupiter · ~1 MJ |
| Spiral Galaxy | Astronomy · Sb Type · ~10¹¹ M☉ |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5174](http://localhost:5174) or [5173](http://localhost:5173) in your browser.

## Deploy

```bash
git checkout astro
npm i -g vercel
vercel
```

## Build

```bash
npm run build
```

## Tech Stack

| Layer | Tools |
| --- | --- |
| App | React 19, TypeScript, Vite |
| 3D | Three.js, React Three Fiber, Drei |
| UI | `src/styles.css`, Lucide icons |
| Verification | Playwright Core, PNG pixel metrics |

## License

MIT
