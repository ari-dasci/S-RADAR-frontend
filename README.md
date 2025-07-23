# S-ADL-frontend

This web application enables users to design and run custom data pipelines for anomaly detection, preprocessing, and visualization through a **node-based interface**. Each node represents an algorithm, transformation, or data source (API or scraper), and the results can be visualized, saved, or exported. 

This is a visual interface designed to get to know [**S-ADL library**](https://github.com/ari-dasci/S-ADL), a Software Anomaly Detection Library that provides a modular collection of state-of-the-art algorithms for detecting anomalies in different types of data. S-ADL includes tools for preprocessing, visualization, and state-of-the-art algorithms for detecting anomalies in different types of data.

The system is composed of a **frontend built with Angular** and a **backend REST API built with FastAPI**. The app supports dynamic pipeline execution and modular visualization.

---

## 🧱 Features & How to Use
- 🧠 **Modular Node Editor**: Drag-and-drop interface to design custom pipelines (based on [**Drawflow**](https://github.com/jerosoler/Drawflow)).
  
  ![Demo of node editor](./readme_assets/gif1_readme.gif)

- 📈 **Interactive Visualizations**: Automatically display plots using Plotly.js.

  ![Demo of plotly](./readme_assets/gif2_readme.gif)


- 🧪 **Pipeline Execution**: Run full pipelines with a single button.

  ![Demo of pipelines](./readme_assets/gif3_readme.gif)

- 🧾 **Export Results**: Save visualizations as `.txt` files after execution.

  ![Demo of exporting](./readme_assets/gif4_readme.gif)

- 📦 **Backend Algorithm Library**: Easily extend with new processing models.

---

## 🛠️ Technologies

- **Frontend**: Angular 16+, Bootstrap Modals, Plotly.js
- **Backend**: FastAPI, Python 3.9+
- **Communication**: REST API (JSON)
- **Library**: S-ADL Software Anomaly Detection Library 

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/marinahbau/S-ADL-frontend.git
cd S-ADL-frontend
```

---

## 👥 Frontend Setup (Angular)

### Prerequisites

- Node.js (v18+ recommended)
- Angular CLI

### Install dependencies

```bash
npm install
```

### Run the Angular development server

```bash
ng serve
```

Then open your browser at: [http://localhost:4200](http://localhost:4200)

---

## 🧪 Backend Setup (FastAPI)

### Prerequisites

- Python 3.9+
- `conda` (optional but recommended)

### Install dependencies

### Clone the frontend repository

```bash
git clone https://github.com/marinahbau/S-ADL-frontend.git
cd S-ADL-frontend
```

### Clone the API (backend) repository

```bash
git clone https://github.com/marinahbau/S-ADL-API.git
```

### Option A: Install API + S-ADL library (conda environment) COMPLETAR

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Option B: Manually install API + S-ADL library

- Install FastAPI
- Install S-ADL library

### Run the FastAPI server

```bash
uvicorn main:app --reload
```

API will be available at: [http://localhost:8000](http://localhost:8000)

Swagger documentation: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 📡 Connecting Frontend to Backend

The Angular app is preconfigured to send pipeline requests to `http://localhost:8000`. Make sure the FastAPI server is running **before** executing any pipeline.

---

## 🧪 Running a Pipeline

1. Add nodes to the canvas.
2. Configure their parameters.
3. Click **"Run pipeline"**.
4. Visualizations will appear in modals.
5. After execution, a message with a button will let you **export results as a **`.txt`** file**.

---

## 🧩 Customization

- **To add new algorithms**: Register them in the backend’s pipeline manager.
- **To add new node types**: Define them in the Angular `nodes` configuration.
- **To support new visualizations**: Ensure the backend returns valid Plotly JSON in `visualizations`.

---
