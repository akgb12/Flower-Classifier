# Flower Classifier

A small end to end machine learning project that trains an Iris flower classification model and presents the results through a React dashboard.

The project has two pages. The home page is a short model study that explains the dataset, model comparison, evaluation results, and design decisions. The prediction page lets a user enter flower measurements and receive a predicted Iris species from the trained model.

## Deployed Links

Frontend  
https://flower-classifier-nu.vercel.app

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

The exported JSON files can be found at:

```text
backend/artifacts/
