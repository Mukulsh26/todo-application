To-Do Application
A full-stack To-Do list application using Next.js (Frontend), Express.js (Backend), and MongoDB.

Features
Create, read, update, and delete tasks.
Pagination, sorting, and filtering options.

Technology Stack
Frontend: Next.js, React
Backend: Express.js, Node.js
Database: MongoDB
Deployment: Vercel

Setup
1. Clone the repository
bash
Copy
Edit
git clone https://github.com/your-username/todo-application.git
cd todo-application

2. Install dependencies
For frontend:
bash
Copy
Edit
cd frontend
npm install

For backend:
bash
Copy
Edit
cd backend
npm install

3. Set up environment variables
Frontend (.env.local):
plaintext
Copy
Edit
NEXT_PUBLIC_API_URL=http://localhost:5000/api

Backend (.env):
plaintext
Copy
Edit
MONGO_URI=mongodb://<your-mongo-db-url>

4. Run Locally
Start the backend server:
bash
Copy
Edit
cd backend
npm start

Start the frontend server:
bash
Copy
Edit
cd frontend
npm run dev
Deployment
Backend


Deploy on Vercel:
Push backend code to GitHub.
Link backend repo to Vercel.

API Endpoints:
GET /api/tasks: Fetch tasks.
POST /api/tasks: Create a task.
PUT /api/tasks/:id: Update a task.
DELETE /api/tasks/:id: Delete a task.

Frontend
Deploy on Vercel:
Push frontend code to GitHub.
Link frontend repo to Vercel.
Set NEXT_PUBLIC_API_URL in Vercel dashboard.
Contributing
Fork the repository and submit a pull request for changes.
