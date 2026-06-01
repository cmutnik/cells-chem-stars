# Physics Explorer

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=111)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=fff)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite&logoColor=fff)
![Three.js](https://img.shields.io/badge/Three.js-0.181-000000?logo=threedotjs&logoColor=fff)
![License](https://img.shields.io/badge/license-MIT-blue)

**Other Deployments:**

- [Bio Demo](https://ewbio.vercel.app/)
- [Chem Demo](https://ewchem.vercel.app/)
- [Astro Demo](https://ewastro.vercel.app/)

An interactive 3D physics explorer built with React, Vite, and Three.js. Browse fundamental physics objects — Electromagnetic Wave and Proton — with selectable features, comparison mode, and an AI Tutor panel.

## Objects

| Object | Type |
| --- | --- |
| Electromagnetic Wave | Physics · Transverse Wave |
| Proton | Physics · Baryon · p⁺ |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Deploy

```bash
git checkout phys
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
