# Mesh Circular Shift Visualizer

A full-stack interactive web application that simulates and visualizes a circular q-shift on a 2D mesh topology.

## Algorithm Description

In parallel computing, a circular q-shift on a mesh is implemented efficiently in two stages:
1. **Stage 1 &mdash; Row Shift:** Each node shifts its data within its row by `(q mod √p)` positions.
2. **Stage 2 &mdash; Column Shift:** Each node shifts its data within its column by `⌊q / √p⌋` positions.

This achieves the shift in `(q mod √p) + ⌊q / √p⌋` communication steps compared to the standard 1D Ring shift steps of `min(q, p-q)`.

## Features
- Interactive input for $p$ and $q$ with full validation.
- Real-time animated step-by-step mesh grid visualization.
- Dark mode, glassmorphism UI design.
- Runtime Complexity Panel demonstrating Step comparisons.

## Running Locally

Because this application utilizes modern Vanilla JavaScript (ES Module) imports, it must be accessed through a local HTTP Server. No `npm install` or build step is required!

1. Open your terminal in this repository.
2. Start a simple Python web server:
   ```bash
   python -m http.server 8000
   ```
3. Open `http://localhost:8000` in your browser.

## Deployment Guide (Netlify / Vercel)

This application is purely static (`html`, `css`, `js`). It is incredibly easy to deploy:

1. Push this repository to your GitHub account.
2. Sign in to [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
3. Choose "Import from GitHub".
4. Select your new `mesh-shift-visualizer` repository.
5. In "Build Settings", you can leave everything blank (no build command, the output directory is the root directory `/`).
6. Click **Deploy**. Your Vercel/Netlify project will be live in seconds.

## Live URL
https://superb-swan-8e6870.netlify.app/
