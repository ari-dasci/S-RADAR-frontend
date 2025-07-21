# S-ADL-frontend

This web application enables users to design and run custom data pipelines for anomaly detection, preprocessing, and visualization through a **node-based interface**. Each node represents an algorithm, transformation, or data source (API or scraper), and the results can be visualized, saved, or exported.

The system is composed of a **frontend built with Angular** and a **backend REST API built with FastAPI**. The app supports dynamic pipeline execution, modular visualization, and parameter storage using localStorage.

---

## 🧱 Features

- 🧠 **Modular Node Editor**: Drag-and-drop interface to design custom pipelines.
- 📈 **Interactive Visualizations**: Automatically display plots using Plotly.js.
- 📂 **Parameter Persistence**: Save & reload node parameters locally.
- 🔗 **External Data Integration**: API and scraping sources supported.
- 📦 **Backend Algorithm Library**: Easily extend with new processing models.
- 🧪 **Pipeline Execution**: Run full pipelines with a single button.
- 🧾 **Export Results**: Save visualizations as `.txt` files after execution.

---

## 🛠️ Technologies

- **Frontend**: Angular 16+, Bootstrap Modals, Plotly.js
- **Backend**: FastAPI, Python 3.9+, Pydantic
- **Communication**: REST API (JSON)

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
- `virtualenv` (optional but recommended)

### Install dependencies

### Clone the repository

```bash
git clone https://github.com/marinahbau/S-ADL-frontend.git
cd S-ADL-frontend
```

### Install API + S-ADL library

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

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
5. After execution, a message with a button will let you **export results as a **``** file**.

---

## 🧩 Customization

- **To add new algorithms**: Register them in the backend’s pipeline manager.
- **To add new node types**: Define them in the Angular `nodes` configuration.
- **To support new visualizations**: Ensure the backend returns valid Plotly JSON in `visualizations`.

---
