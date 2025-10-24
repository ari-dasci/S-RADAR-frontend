# RADAR-frontend

This web application enables users to design and run custom data pipelines for anomaly detection, preprocessing, and visualization through a **node-based interface**. Each node represents an algorithm, transformation, or data source (API or scraper), and the results can be visualized, saved, or exported. 

This is a visual interface designed to get to know [**RADAR library**](https://github.com/ari-dasci/RADAR), a Software Anomaly Detection Library that provides a modular collection of state-of-the-art algorithms for detecting anomalies in different types of data. RADAR includes tools for preprocessing, visualization, and state-of-the-art algorithms for detecting anomalies in different types of data.

The system is composed of a **frontend built with Angular** and a **backend REST API built with FastAPI**. The app supports dynamic pipeline execution and modular visualization.

---

## 🧱 Features & How to Use
- 🧠 **Modular Node Editor**: Drag-and-drop interface to design custom pipelines (based on [**Drawflow**](https://github.com/jerosoler/Drawflow)).
  
  ![Demo of node editor](./readme_assets/video1.gif)

- 📈 **Interactive Visualizations**: Automatically display plots using Plotly.js.

  ![Demo of plotly](./readme_assets/video2.gif)


- 🧪 **Pipeline Execution**: Run full pipelines with a single button.

  ![Demo of pipelines](./readme_assets/video3.gif)

- 🧾 **Export Results**: Save visualizations as `.txt` files after execution.

  ![Demo of exporting](./readme_assets/video4.gif)

- 📦 **Backend Algorithm Library**: Easily extend with new processing models.

---

## 🛠️ Technologies

- **Frontend**: Angular 17+, Bootstrap Modals, Plotly.js
- **Backend**: FastAPI, Python 3.9+
- **Communication**: REST API (JSON)
- **Library**: RADAR Robust Anomaly Detection And Recognition  

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ari-dasci/RADAR-frontend.git
cd RADAR-frontend
```

---

## 👥 Frontend Setup (Angular)

### Prerequisites

- Angular CLI: 17.3.17
- Node.js: 21.7.1

You can install Angular CLI via:
```bash
npm install -g @angular/cli@17
```

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

- **Python: 3.10** (tested with 3.10.18)
- **Pytorch: 2.7.1** (tested with with CUDA 11.8 support)
- `conda` (optional but recommended)


### Clone the API (backend) repository

```bash
git clone https://github.com/ari-dasci/RADAR-API.git
```

### Clone the RADAR library

```bash
git clone https://github.com/ari-dasci/RADAR.git
```

### Install RADAR library + API (conda environment)


```bash
conda create --prefix ./envs/radar-env python=3.10.18

conda activate ./envs/radar-env 

conda env update --prefix /path/to/env --file environment.yml --prune   # Replace /path/to/env with the location of your Conda environment.

#Make sure Pytorch is installed now, if you have CUDA 11.8
pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118

pip install pytorch-lightning
```

Now install the API with

```bash
pip install "fastapi[standard]"
pip install "uvicorn[standard]"
```

Export path to RADAR library

```bash
export PYTHONPATH=«route_to_RADAR»
```

### Run the FastAPI server

```bash
uvicorn main:app --reload --host 0.0.0.0 
```

API will be available at: [http://localhost:8000](http://localhost:8000)

Swagger documentation: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 📡 Connecting Frontend to Backend

The Angular app is preconfigured to send pipeline requests to `http://localhost:8000`. Make sure the FastAPI server is running **before** executing any pipeline.

---

## 🧪 Running a Pipeline

1. Add nodes to the canvas.

![Demo of canvas](./readme_assets/video1.gif)

2. Configure their parameters.

![Demo of parameters](./readme_assets/videocompleto.gif)

3. Click **"Run pipeline"**.

![Demo of pipelines](./readme_assets/video3.gif)

4. Visualizations will appear in modals.

![Demo of plotly](./readme_assets/video2.gif)

5. After execution, a message with a button will let you **export results as a **`.txt`** file**.

![Demo of exporting](./readme_assets/video4.gif)

---

## 🧩 Customization

- **To add new algorithms**: Register them in the backend’s pipeline manager.
- **To add new node types**: Define them in the Angular `nodes` configuration.
- **To support new visualizations**: Ensure the backend returns valid Plotly JSON in `visualizations`.

---
