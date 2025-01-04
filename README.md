
# Pharmaceutical Research AI Tool

## Project Overview

The Pharmaceutical Research AI Tool is a web-based application designed to accelerate pharmaceutical research by analyzing and interpreting data from diverse sources. Researchers can upload various file types (e.g., PDFs, text documents, docx.), and the AI-driven system provides answers to research queries, streamlining data processing and decision-making.

## Key Features

1. **File Upload & Categorization:**
   - Upload multiple file types such as PDFs and text documents.
   - Automatically categorize files based on their content (e.g., research papers, experimental data, clinical trial results).

2. **Question Processing:**
   - Users can ask questions related to the uploaded files.
   - The system uses Natural Language Processing (NLP) to provide relevant answers based on the uploaded content.

3. **Context Management:**
   - Maintain context from previous interactions to provide better responses.
   - The AI tailors answers to the ongoing research context, improving accuracy.

4. **AI Integration with Ollama Llama 3.2:**
   - The system integrates with Ollama’s Llama 3.2 AI model for content analysis and answering research queries.
   - Llama 3.2 is used to process file content and generate contextual responses based on user queries.

5. **Security & Privacy:**
   - User data and uploaded files are securely stored and transmitted with robust encryption and access control.
   - JWT-based authentication is used for secure user access.

6. **User Experience:**
   - A responsive, intuitive interface for easy file upload, question asking, and result display.
   - Features like document highlighting and key findings summarization to assist users in quick data comprehension.

---

## Libraries & Technologies Used

### Frontend
- **React:** For building the user interface.
- **Axios:** For making HTTP requests to the backend.
- **JWT (JSON Web Token):** For user authentication and session management.

### Backend
- **Node.js:** Server-side JavaScript runtime environment.
- **Express.js:** Framework for building the RESTful API.
- **Ollama Modal:** Used to interact with Llama 3.2 model to process and analyze uploaded file data.
- **MySQL/PostgreSQL:** SQL databases for storing user data and interactions.
- **dotenv:** To manage environment variables.

---

## Setup & Installation

## Follow these steps to set up the project on your local machine.

### 1. Clone the Repository
```bash
git clone https://github.com/aditya2125csit1033/Enhancing-Pharmaceutical-Research-Through-AI-Driven-Data-Analysis/
cd Enhancing-Pharmaceutical-Research-Through-AI-Driven-Data-Analysis
```

### 2. Install Backend Dependencies
- **Navigate to the backend folder and install the required dependencies:**

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies
- **Navigate to the frontend folder and install the necessary packages:**

```bash
cd frontend
npm install
```

### 4. Database Setup
- **Set up your preferred SQL database (MySQL/PostgreSQL).**
  
### 5. Download and Install Ollama Llama 3.2
- **The AI model Llama 3.2 is integrated via the Ollama modal. To use it, follow these steps:**

- **Go to the Ollama Website.**
- **Download the Llama 3.2 model.**
- **Choose the appropriate version for your operating system.**
- **Follow the installation instructions on the Ollama site to get Llama 3.2 up and running on your local machine.**

### 6. Run the Application
#### Frontend
- **Navigate to the frontend folder and run the React application:**

```bash
cd front-end
npm start
```
#### This will start the frontend application at http://localhost:3000.

#### Backend
- **Navigate to the backend folder and start the server:**

```bash
cd server
npm run start
```
#### The backend will start on a different port, typically http://localhost:5000.

## How to Use
- **Login:** Users can log in using the provided credentials (sign up if needed).
- **Upload Files:** Go to the Dashboard upload files such as research papers, clinical trial data, etc. The system will automatically categorize the files.
- **Ask Questions:** Once the files are uploaded, users can ask questions regarding the content of the files. The system will process the query using the Ollama Llama 3.2 model and return the relevant information.
- **Contextual Understanding:** The AI keeps track of previous questions and interactions to provide more accurate and contextually relevant answers.

## Acknowledgments
- **Thanks to Ollama for providing the Llama 3.2 model, which powers the AI-based question-answering capabilities of this system.**


