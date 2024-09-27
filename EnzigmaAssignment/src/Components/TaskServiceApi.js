// const API_URL = 'http://localhost:3000/tasks'; // Update with your actual API endpoint

// export const fetchTasks = async () => {
//   const response = await fetch(API_URL);
//   return response.json();
// };

// export const createTask = async (task) => {
//   const response = await fetch(API_URL, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(task),
//   });
//   return response.json();
// };

// export const updateTask = async (task) => {
//   const response = await fetch(`${API_URL}/${task.id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(task),
//   });
//   return response.json();
// };

// export const deleteTask = async (taskId) => {
//   await fetch(`${API_URL}/${taskId}`, {
//     method: 'DELETE',
//   });
// };

import axios from 'axios';

// const API_URL = 'http://localhost:3000/tasks'; // Update with your actual API endpoint
const API_URL = 'http://localhost:3000/tasks';


export const fetchTasks = async () => {
//   const response = await axios.get(API_URL);
//   return response.data;

  try {
    const response = await axios.get(API_URL);
    return response.data; // Directly return data
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error; // Rethrow the error
  }
};

export const createTask = async (task) => {
  const response = await axios.post(API_URL, task, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const updateTask = async (task) => {
  const response = await axios.put(`${API_URL}/${task.id}`, task, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const deleteTask = async (taskId) => {
  await axios.delete(`${API_URL}/${taskId}`);
};
