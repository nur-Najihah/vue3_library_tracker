# Personal Library Tracker

This **Library Tracker** is a simple web application for managing a personal library. Users can add, view, update, and delete books, keeping track of their reading status. Meanwhile, user can search books by title, author, or genre. 

---

<img width="1920" height="1414" alt="image" src="https://github.com/user-attachments/assets/c11ee3ad-ffec-4ee5-852e-683947df819b" />

## Features

- ✅ Add, edit, delete books
- ✅ Search by title, author, or genre
- ✅ Responsive interface with Vuetify
- ✅ RESTful backend using JSON Server
- ✅ Dockerized for easy deployment
- ✅ API requests proxied with Nginx

---

## Functional Features

1. **Create a book**
   - Fields: `title`, `author`, `genre`, `description`, `status` 
     <img width="1920" height="1267" alt="image" src="https://github.com/user-attachments/assets/6b447747-2a9c-4202-af44-11ef072f230b" />

2. **Read the book list**
   - View all books in a responsive card layout
     <img width="1920" height="1729" alt="image" src="https://github.com/user-attachments/assets/5b3d02b2-f688-4ecc-9f12-640ebd8124f2" />

3. **Update a book's details and Delete a book**
   - Modify existing book info including title, author, genre, description and status. Also remove a book entry from the collection
     <img width="1920" height="1369" alt="image" src="https://github.com/user-attachments/assets/c9127938-576d-4841-bd88-db5596074881" />

---

## Tech Stack
- **Frontend**: Vue 3, Vue Router, Vuetify
- **Backend**: JSON Server
- **Dev Tools**: Vite, Axios, Toastification
- **Containerization**: Docker & Docker Compose
- **Web Server**: Nginx

## Installation & Setup
Follow these steps to get the Library Tracker application up and running on your local machine.

### Prerequisites
Ensure you have the following installed on your system:

* **Node.js** 
* **npm**
* **Docker Desktop**: Includes Docker Engine and Docker Compose

### Setup Steps
1.  **Clone the Repository:**
    Start by cloning the project from Git repository:

      ```bash
      git clone <repository-url>
      ```
2.  **Build Docker**
     ```bash
     docker-compose up --build
     ```

### Stopping the Application
To stop all running Docker containers for this project:
```bash
docker-compose down
```
