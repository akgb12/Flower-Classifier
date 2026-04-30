import json
import joblib
import pandas as pd
from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.schemas import IrisInput, PredictionResponse, ClassProbabilities

BASE_DIR = Path(__file__).resolve().parent.parent
ARTIFACTS_DIR = BASE_DIR / "artifacts"

CLASS_NAMES = ["setosa", "versicolor", "virginica"]

app = FastAPI(title="Iris Insight Dashboard API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model once at startup
try:
    model = joblib.load(ARTIFACTS_DIR / "best_model.joblib")
except Exception as e:
    raise RuntimeError(f"Could not load model: {e}")


def load_artifact(filename: str):
    path = ARTIFACTS_DIR / filename
    if not path.exists():
        raise HTTPException(status_code=404, detail=f"{filename} not found")
    with open(path) as f:
        return json.load(f)


@app.get("/")
def root():
    return {"message": "Iris Insight Dashboard API is running"}


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/metrics")
def get_metrics():
    return load_artifact("metrics.json")


@app.get("/model-comparison")
def get_model_comparison():
    return load_artifact("model_comparison.json")


@app.get("/confusion-matrix")
def get_confusion_matrix():
    return load_artifact("confusion_matrix.json")


@app.get("/classification-report")
def get_classification_report():
    return load_artifact("classification_report.json")


@app.get("/feature-importance")
def get_feature_importance():
    return load_artifact("feature_importance.json")


@app.get("/dataset-summary")
def get_dataset_summary():
    return load_artifact("dataset_summary.json")


@app.get("/pca-projection")
def get_pca_projection():
    return load_artifact("pca_projection.json")


@app.get("/sample-predictions")
def get_sample_predictions():
    return load_artifact("sample_predictions.json")


@app.post("/predict", response_model=PredictionResponse)
def predict(data: IrisInput):
    # Preserve feature names so the pipeline's StandardScaler does not warn
    features = pd.DataFrame([{
        "sepal_length": data.sepal_length,
        "sepal_width": data.sepal_width,
        "petal_length": data.petal_length,
        "petal_width": data.petal_width,
    }])

    try:
        predicted_index = int(model.predict(features)[0])
        raw_probs = model.predict_proba(features)[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {e}")

    probs = {}
    for i in range(len(CLASS_NAMES)):
        probs[CLASS_NAMES[i]] = round(float(raw_probs[i]), 6)

    confidence = round(float(max(raw_probs)), 6)

    return PredictionResponse(
        prediction=CLASS_NAMES[predicted_index],
        confidence=confidence,
        probabilities=ClassProbabilities(**probs),
        input=data,
    )
