import connectDB from '../../../../backend/config/db';
import Task from '../../../../backend/models/Task'

export default async function handler(req, res) {
  await connectDB(); // Establish connection with MongoDB

  if (req.method === 'GET') {
    try {
      const tasks = await Task.find(); // Fetch tasks from MongoDB
      res.status(200).json(tasks); // Send the tasks as JSON response
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching tasks' });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, description, status, dueDate } = req.body;

      // Validate required fields
      if (!title || !status || !dueDate) {
        return res.status(400).json({ message: 'Title, status, and due date are required' });
      }

      // Create new task and save it to the database
      const newTask = new Task({ title, description, status, dueDate });
      await newTask.save();

      // Return newly created task as a response
      res.status(201).json(newTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating task' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
