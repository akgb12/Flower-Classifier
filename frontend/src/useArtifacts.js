import { useEffect, useState } from "react";
import {
  getMetrics,
  getModelComparison,
  getConfusionMatrix,
  getClassificationReport,
  getFeatureImportance,
  getDatasetSummary,
  getPcaProjection,
  getSamplePredictions,
} from "./api.js";

export default function useArtifacts() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function loadAll() {
      try {
        const [
          metrics,
          modelComparison,
          confusionMatrix,
          classificationReport,
          featureImportance,
          datasetSummary,
          pcaProjection,
          samplePredictions,
        ] = await Promise.all([
          getMetrics(),
          getModelComparison(),
          getConfusionMatrix(),
          getClassificationReport(),
          getFeatureImportance(),
          getDatasetSummary(),
          getPcaProjection(),
          getSamplePredictions(),
        ]);
        if (cancelled) return;
        setData({
          metrics,
          modelComparison,
          confusionMatrix,
          classificationReport,
          featureImportance,
          datasetSummary,
          pcaProjection,
          samplePredictions,
        });
        setLoading(false);
      } catch (e) {
        if (cancelled) return;
        setError(e.message || "Could not load data from the backend");
        setLoading(false);
      }
    }
    loadAll();
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, error, loading };
}
