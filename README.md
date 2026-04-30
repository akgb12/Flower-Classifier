# Flower Classifier

A small end to end machine learning project that trains an Iris flower classification model and presents the results through a React dashboard.

The project has two pages. The home page is a short model study that explains the dataset, model comparison, evaluation results, and design decisions. The prediction page lets a user enter flower measurements and receive a predicted Iris species from the trained model.

## Deployed Links

Frontend  
https://flower-classifier-nu.vercel.app

Backend API  
https://flower-classifier-api-rzrd.onrender.com

FastAPI Docs  
https://flower-classifier-api-rzrd.onrender.com/docs

## Project Overview

This project uses the Iris dataset from scikit learn to classify flowers into one of three species:

- setosa
- versicolor
- virginica

The dataset contains 150 samples, with 50 samples per class and four numeric features: sepal length, sepal width, petal length, and petal width. The dataset was loaded through `sklearn.datasets.load_iris`. The official scikit learn documentation describes it as a classic multiclass classification dataset with 3 classes, 150 total samples, and 4 features.

Dataset documentation  
https://scikit-learn.org/stable/modules/generated/sklearn.datasets.load_iris.html

## Tech Stack

Machine learning

- Python
- pandas
- scikit learn
- matplotlib
- joblib

Backend

- FastAPI
- Pydantic
- Uvicorn

Frontend

- React
- Vite
- CSS

Deployment

- Render for the FastAPI backend
- Vercel for the React frontend

## Machine Learning Workflow

The machine learning portion was developed in a notebook first so I could explore the data, compare models, and export the artifacts needed by the dashboard.

The workflow was:

1. Load the Iris dataset
2. Convert the data into a pandas DataFrame with readable feature names
3. Check class balance
4. Explore feature relationships with plots
5. Split the data into training and testing sets
6. Compare multiple scikit learn models with cross validation
7. Select the best performing model
8. Evaluate the final model on the test set
9. Export the trained model and dashboard ready JSON files

The class distribution was already balanced, with 50 samples for each species, so no oversampling was used.

## Models Tested

The notebook compared four traditional machine learning models:

- Logistic Regression
- K Nearest Neighbors
- Support Vector Machine
- Random Forest

Since the Iris dataset is small and structured, deep learning was not necessary. The goal was to use a clean and explainable machine learning pipeline rather than adding unnecessary model complexity.

The Support Vector Machine model was selected as the final classifier because it performed the best during cross validation. A Random Forest model was also used to generate feature importance values, since Random Forest provides a simple way to understand which features were most useful.

## Results

The final model performed well on the test set.

Key outputs include:

- Accuracy
- Precision
- Recall
- F1 score
- Confusion matrix
- Model comparison table
- Feature importance values
- PCA projection data
- Sample predictions

The confusion matrix showed that setosa was separated very clearly, while the main challenge was distinguishing between versicolor and virginica. This matched the visual exploration, where the petal measurements showed strong separation overall but some overlap between the two non setosa classes.

The feature importance results showed that petal length and petal width were the most useful features for classification. Sepal width had the lowest importance.

## Dashboard

### Home Page

The home page is a research style summary of the model. It explains the dataset, model comparison, final results, confusion matrix, feature importance, and design decisions.

### Prediction Page

The prediction page allows a user to enter:

- sepal length
- sepal width
- petal length
- petal width

The frontend sends those values to the FastAPI backend. The backend loads the trained model, makes a prediction, and returns the predicted species, confidence score, and class probabilities.

## Backend API

The FastAPI backend exposes routes for both model inference and dashboard data.

Important routes include:

```text
GET /
GET /metrics
GET /model-comparison
GET /confusion-matrix
GET /classification-report
GET /feature-importance
GET /dataset-summary
GET /pca-projection
GET /sample-predictions
POST /predict
