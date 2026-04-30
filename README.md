# Iris Insight Dashboard

A small end to end machine learning study on the classic Iris dataset, served behind a clean FastAPI backend and surfaced through a React frontend. Train a few classifiers, pick the best one, expose it as an API, and walk through the results in a research style dashboard.

## Project layout

```
Flower-Classifier/
  notebooks/            Jupyter pipeline that trains models and exports artifacts
  backend/              FastAPI service that loads the saved model and serves artifacts
  frontend/             React dashboard that consumes the backend
```

## Running everything locally

Open two terminals.

### Terminal 1 — backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The API runs at `http://127.0.0.1:8000`. Swagger docs at `http://127.0.0.1:8000/docs`.

### Terminal 2 — frontend

```bash
cd frontend
npm install
npm run dev
```

The dashboard runs at `http://localhost:5173`.

## What you get

- **Home page** A research style write up that shows the dataset summary, model comparison, final metrics on the held out test set, confusion matrix, feature importance, a PCA projection, sample predictions, and design notes.
- **Predict page** An interactive form that takes sepal and petal measurements, sends them to the backend, and renders the predicted species with confidence and class probabilities.

## ML notes

The notebook trains Logistic Regression, KNN, Random Forest, and SVM with stratified 5 fold cross validation. The SVM wins on mean accuracy and is exported as the production model. A separate Random Forest is fit purely to provide feature importance scores for interpretability, since SVM does not give those out of the box.

See `backend/README.md` and `frontend/README.md` for service specific details.
