# 🎓 E-Learning Platform

A full-stack **E-Learning Platform** built with **Django REST Framework, React, and Groq AI**. The platform provides role-based authentication, teacher and student management, JWT-secured APIs, dashboards, and an AI-powered agent capable of understanding natural-language requests and executing or dynamically generating supported actions.

---

## 📌 Overview

The E-Learning Platform is designed to simplify student and teacher management through a modern web application.

The backend is built using **Django 6.0.7 + Django REST Framework**, while the frontend uses **React 19 + Vite**.

A key feature of the project is the integrated **AI Agent**, powered by the **Groq API**. Teachers and administrators can send natural-language instructions to the AI agent. The agent determines the appropriate action, extracts the required information, executes the action, and can dynamically generate a new action when a matching action is not already available.

---

## ✨ Features

### 🔐 Authentication & Authorization

* User registration
* JWT-based authentication
* Login and token refresh
* Authenticated user profile endpoint
* Role-based users:

  * Admin
  * Teacher
  * Student
* Protected API endpoints
* Teacher/Admin-only access to the AI Agent

### 👨‍🏫 Teacher Management

* Teacher registration
* Teacher profile creation
* Subject management
* Department information
* Qualification information
* Teacher listing
* Teacher dashboard

### 👨‍🎓 Student Management

* Student profile management
* Student registration through AI actions
* Student username generation
* Student class information
* Roll number management
* Phone number management
* Student listing
* Student filtering by class
* Individual student creation
* Bulk student creation
* Student dashboard

### 🤖 AI-Powered Agent

The platform includes an intelligent action-based AI agent powered by Groq.

The AI agent can:

* Understand natural-language requests
* Classify user requests into available actions
* Extract structured parameters from natural language
* Execute predefined actions
* Search students using flexible filters
* Add individual students
* Add multiple students
* Reset student passwords
* Return student counts
* Dynamically generate a new Python action when a matching action is unavailable

The AI agent uses an `AIAction` database model to dynamically manage available actions.

### 🧠 Dynamic AI Code Generation

When an appropriate action is not already available:

1. The user's request is sent to the Groq model.
2. The AI generates a Python function.
3. The generated code is extracted and validated.
4. Syntax validation is performed using Python AST parsing.
5. Dangerous operations are checked against a restricted list.
6. The function is registered as an AI action.
7. The new action can then be executed by the agent.

This provides a foundation for an extensible, database-driven AI action system.

### ⚛️ React Frontend

The frontend includes:

* Home page
* Login
* Registration
* Teacher dashboard
* Student dashboard
* Student list
* Add student
* Bulk add students
* React Router navigation
* Axios API integration
* JWT token handling

---

## 🏗️ Project Architecture

```text
E_Learning-Platform/
│
├── accounts/
│   ├── migrations/
│   ├── models.py
│   ├── serializers.py
│   ├── urls.py
│   └── views.py
│
├── ai_agent/
│   ├── migrations/
│   ├── actions.py
│   ├── agent.py
│   ├── codegen.py
│   ├── groq_service.py
│   ├── models.py
│   ├── urls.py
│   ├── utils.py
│   ├── views.py
│   └── writer.py
│
├── student/
│   ├── migrations/
│   ├── models.py
│   ├── serializers.py
│   ├── urls.py
│   └── views.py
│
├── teacher/
│   ├── migrations/
│   ├── models.py
│   ├── serializers.py
│   ├── urls.py
│   └── views.py
│
├── pegasus_elearning/
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   └── pages/
│   ├── package.json
│   └── vite.config.js
│
├── manage.py
├── .gitignore
└── README.md
```

---

## 🛠️ Technology Stack

### Backend

* Python
* Django 6.0.7
* Django REST Framework 3.17.1
* Simple JWT
* django-cors-headers
* SQLite
* python-dotenv
* Requests

### AI

* Groq API
* Groq LLM
* JSON-based AI responses
* Dynamic Python function generation
* Database-driven AI actions

### Frontend

* React 19
* Vite
* React Router
* Axios
* Bootstrap

---

## 🔑 Environment Variables

Create a `.env` file in the project root.

```env
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=llama-3.1-8b-instant
```

> Never commit your `.env` file or expose your API keys publicly.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/manojpatra-dev1/E_Learning-Platform.git
cd E_Learning-Platform
```

### 2. Create a virtual environment

Windows:

```cmd
python -m venv venv
```

### 3. Activate the virtual environment

#### Windows CMD

```cmd
venv\Scripts\activate
```

#### Windows PowerShell

```powershell
.\venv\Scripts\Activate.ps1
```

### 4. Install backend dependencies

```bash
python -m pip install django djangorestframework djangorestframework-simplejwt django-cors-headers python-dotenv requests
```

If a `requirements.txt` file is added to the project in the future, use:

```bash
python -m pip install -r requirements.txt
```

### 5. Configure environment variables

Create:

```text
.env
```

and add:

```env
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=llama-3.1-8b-instant
```

### 6. Run migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 7. Start Django backend

```bash
python manage.py runserver
```

Backend:

```text
http://127.0.0.1:8000/
```

---

## 💻 Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173/
```

The frontend is configured to communicate with the Django API at:

```text
http://127.0.0.1:8000/api
```

---

## 🔗 API Endpoints

### Authentication

| Method | Endpoint                       | Description                          |
| ------ | ------------------------------ | ------------------------------------ |
| POST   | `/api/accounts/register/`      | Register a user                      |
| POST   | `/api/accounts/login/`         | Login and obtain JWT tokens          |
| POST   | `/api/accounts/token/refresh/` | Refresh access token                 |
| GET    | `/api/accounts/me/`            | Get authenticated user's information |

### Teacher

| Method | Endpoint                  | Description         |
| ------ | ------------------------- | ------------------- |
| POST   | `/api/teachers/register/` | Register a teacher  |
| GET    | `/api/teachers/profile/`  | Get teacher profile |
| GET    | `/api/teachers/list/`     | Get teacher list    |

### Student

| Method    | Endpoint              | Description              |
| --------- | --------------------- | ------------------------ |
| GET       | `/api/students/`      | List students            |
| POST      | `/api/students/`      | Create a student profile |
| GET       | `/api/students/{id}/` | Retrieve a student       |
| PUT/PATCH | `/api/students/{id}/` | Update a student         |
| DELETE    | `/api/students/{id}/` | Delete a student         |

Student listing also supports class filtering:

```text
/api/students/?class_name=10
```

### AI Agent

| Method | Endpoint         | Description                  |
| ------ | ---------------- | ---------------------------- |
| POST   | `/api/ai/agent/` | Execute an AI-powered action |

The AI Agent endpoint requires an authenticated **Teacher or Admin** user.

Example request:

```json
{
  "text": "Add a student named Rahul Kumar with roll number 101 in class 10"
}
```

The AI agent can determine the appropriate action and extract the required parameters automatically.

An optional action can also be supplied for a direct execution path:

```json
{
  "action": "add_student",
  "text": "Add Rahul Kumar, roll number 101, class 10"
}
```

---

## 🤖 AI Agent Workflow

```text
User Request
     │
     ▼
AI Agent Endpoint
     │
     ▼
Check Available AI Actions
     │
     ├── Action Exists
     │       │
     │       ▼
     │   Groq Classification
     │       │
     │       ▼
     │   Parameter Extraction
     │       │
     │       ▼
     │   Execute Action
     │
     └── Action Does Not Exist
             │
             ▼
       Generate Python Function
             │
             ▼
       Syntax Validation
             │
             ▼
       Safety Check
             │
             ▼
       Register AI Action
             │
             ▼
       Execute Generated Action
```

---

## 🧩 Available AI Actions

The current action system includes functionality such as:

### Add Student

Creates a student user and corresponding student profile.

### Bulk Add Students

Creates multiple students from structured input.

### Search Students

Supports flexible filtering using fields such as:

* Name
* Roll number
* Class
* Phone

It supports multiple lookup operations and `AND` / `OR` filtering logic.

### Reset Student Password

Resets a student's password and returns the generated credentials.

### Student Count

Returns the total number of student profiles.

---

## 🔐 Security

The project uses:

* JWT authentication
* DRF authentication classes
* Role-based permissions
* Environment variables for Groq credentials
* CORS configuration
* AST syntax validation for generated code
* Dangerous-operation checks for generated Python code

### Important Production Recommendations

Before deploying this application to production:

* Move Django `SECRET_KEY` to environment variables.
* Set `DEBUG = False`.
* Configure `ALLOWED_HOSTS`.
* Use a production database such as PostgreSQL.
* Store all API credentials securely.
* Review and harden the dynamic code-generation system.
* Use a dedicated sandbox for executing AI-generated code.
* Avoid returning generated passwords in production responses.
* Configure HTTPS.
* Configure production CORS/CSRF settings.
* Add comprehensive automated tests.

---

## 🧪 Testing

Run Django's test suite with:

```bash
python manage.py test
```

For frontend linting:

```bash
cd frontend
npm run lint
```

Build the frontend:

```bash
npm run build
```

---

## 📁 Important Development Commands

### Backend

```bash
python manage.py runserver
```

```bash
python manage.py makemigrations
```

```bash
python manage.py migrate
```

```bash
python manage.py test
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

```bash
npm run build
```

```bash
npm run lint
```

---

## 🔮 Future Improvements

Potential future improvements include:

* Course creation and management
* Course enrollment
* Lesson and course content management
* Quiz and assessment modules
* Student progress tracking
* Teacher course management
* Admin dashboard
* Notifications
* Search and pagination improvements
* Better API validation
* PostgreSQL production support
* Docker deployment
* Automated CI/CD
* Comprehensive unit and integration tests
* Secure sandboxed execution for AI-generated code
* More AI-powered educational features
* Personalized learning recommendations
* AI-generated learning materials

---

## 👨‍💻 Project Structure

The application follows a modular full-stack architecture:

```text
React + Vite Frontend
          │
          │ REST API / JWT
          ▼
Django REST Framework
          │
    ┌─────┼─────────────┐
    │     │             │
 Accounts Teacher     Student
    │     │             │
    └─────┼─────────────┘
          │
          ▼
      AI Agent
          │
          ▼
       Groq API
          │
          ▼
    Dynamic Actions
```

---

## 📄 License

This project is currently intended for educational and development purposes.

Add an appropriate open-source license such as MIT before distributing the project publicly.

---

## ⭐ Project

**E-Learning Platform**

Built with ❤️ using Django, React, and Groq AI.

GitHub Repository:

https://github.com/manojpatra-dev1/E_Learning-Platform
