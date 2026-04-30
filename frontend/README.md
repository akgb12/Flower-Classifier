# Iris Insight Dashboard - Frontend

A React frontend for the Iris classification study. Two pages.

- `/` Home, a research style write up of the dataset, model comparison, final metrics, confusion matrix, feature importance, PCA projection, sample predictions, and design notes.
- `/predict` An interactive page where you punch in four flower measurements and get back a species, confidence score, and class probabilities from the FastAPI backend.

## Stack

- Vite
- React 18
- React Router 6
- Plain CSS (no UI framework, hand crafted to keep the look clean and editorial)

## Running locally

The backend must already be running at `http://127.0.0.1:8000`. See `../backend/README.md` for those steps.

```bash
cd frontend
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

To point the frontend at a different backend URL, set `VITE_API_URL` in a `.env` file at the frontend root.

```bash
echo "VITE_API_URL=http://127.0.0.1:8000" > .env
```

## Build

```bash
npm run build
npm run preview
```

## Folder layout

```
frontend/
  index.html
  package.json
  vite.config.js
  public/
    favicon.svg
    placeholders/        species image and gif drop zone
  src/
    main.jsx
    App.jsx
    api.js               wrapper around fetch for every backend route
    useArtifacts.js      hook that fetches all dashboard JSON in one go
    styles.css           single global stylesheet
    components/          TopBar, Hero, Footer, Section, plus one component per home page section
    pages/
      Home.jsx
      Predict.jsx
```

## Adding species images later

The prediction result card has a placeholder slot ready to swap in a flower image or gif. Drop your assets into `public/placeholders/` (for example `setosa.gif`, `versicolor.gif`, `virginica.gif`) and update the `result-image-slot` block in `src/pages/Predict.jsx` to render an `<img>` pointed at `/placeholders/${result.prediction}.gif`. There is a short note in `public/placeholders/README.md` with the exact snippet.
