from pydantic import BaseModel, Field


class IrisInput(BaseModel):
    sepal_length: float = Field(..., gt=0, le=10.0)
    sepal_width: float = Field(..., gt=0, le=10.0)
    petal_length: float = Field(..., gt=0, le=10.0)
    petal_width: float = Field(..., gt=0, le=10.0)


class ClassProbabilities(BaseModel):
    setosa: float
    versicolor: float
    virginica: float


class PredictionResponse(BaseModel):
    prediction: str
    confidence: float
    probabilities: ClassProbabilities
    input: IrisInput
