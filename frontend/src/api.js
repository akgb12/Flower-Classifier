const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    let detail = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body && body.detail) {
        detail = typeof body.detail === "string" ? body.detail : JSON.stringify(body.detail);
      }
    } catch (_) {}
    throw new Error(detail);
  }
  return res.json();
}

export function getMetrics() {
  return request("/metrics");
}

export function getModelComparison() {
  return request("/model-comparison");
}

export function getConfusionMatrix() {
  return request("/confusion-matrix");
}

export function getClassificationReport() {
  return request("/classification-report");
}

export function getFeatureImportance() {
  return request("/feature-importance");
}

export function getDatasetSummary() {
  return request("/dataset-summary");
}

export function getPcaProjection() {
  return request("/pca-projection");
}

export function getSamplePredictions() {
  return request("/sample-predictions");
}

export function postPredict(payload) {
  return request("/predict", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
