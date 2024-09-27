
import React, { useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import TaskTable from './TaskTable';
import { fetchTasks, createTask, updateTask, deleteTask } from './TaskServiceApi';
import './TaskManagement.css';

function TaskManagement() {
  const [tasks, setTasks] = useState([
    
      
        {"id": 2,
        "assignedTo": "Shree shinde",
        "status": "In Progress",
        "dueDate": "2024-09-27",
        "priority": "High",
        "comments": "Complete it on time."}
      ,
      
        {"id": 3,
        "assignedTo": "Aniket Chavan",
        "status": "Completed",
        "dueDate": "2024-10-27",
        "priority": "Low",
        "comments": "u can do it"}
      
    
  
  ]);
  const [newTask, setNewTask] = useState({
    assignedTo: '',
    status: '',
    dueDate: '',
    priority: '',
    comments: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [currentTaskName, setCurrentTaskName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 4;
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadTasks = async () => {
      const tasksFromApi = await fetchTasks();
      setTasks(tasksFromApi);
    };
    loadTasks();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (currentTaskId) {
      const updatedTask = { ...newTask, id: currentTaskId };
      await updateTask(updatedTask);
      setTasks(tasks.map(task => (task.id === currentTaskId ? updatedTask : task)));
      setCurrentTaskId(null);
    } else {
      const createdTask = await createTask(newTask);
      setTasks([...tasks, createdTask]);
    }

    setNewTask({ assignedTo: '', status: '', dueDate: '', priority: '', comments: '' });
    setIsModalOpen(false);
  };

  const handleDelete = async (taskId) => {
    await deleteTask(taskId);
    setTasks(tasks.filter(task => task.id !== taskId));
    setIsDeleteConfirmOpen(false);
  };

  const openEditModal = (taskId) => {
    const taskToEdit = tasks.find(task => task.id === taskId);
    setNewTask(taskToEdit);
    setCurrentTaskId(taskId);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prevState => ({ ...prevState, [name]: value }));
  };

  const handleDropdownChange = (taskId, action) => {
    if (action === 'edit') {
      openEditModal(taskId);
    } else if (action === 'delete') {
      const taskToDelete = tasks.find(task => task.id === taskId);
      setCurrentTaskName(taskToDelete.assignedTo);
      setCurrentTaskId(taskId);


      setIsDeleteConfirmOpen(true);
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.comments.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const handleRefresh = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  return (
    <div className="task-management">
      <nav style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', backgroundColor:'#e9ebe8' }}>
        <div style={{ display: 'flex', justifyContent: 'right', marginBottom: '10px' }}>
            <div style={{marginRight:'55em' }}>
                <span style={{fontSize:'20px'}}>TASKS</span>
            </div>
            <div style={{ alignItems: 'end'}}>
                <button onClick={() => setIsModalOpen(true)}>New Task</button>
            <button onClick={handleRefresh} style={{ marginLeft: '10px' }}>Refresh</button>
            </div>
          
        </div>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '202px', padding: '10px', textAlign: 'center', marginLeft: '59em'  }}
        />
      </nav>

      <TaskTable 
        tasks={currentTasks} 
        handleDropdownChange={handleDropdownChange} 
      />
      
      

      {isModalOpen && (
        <TaskForm 
          newTask={newTask} 
          setNewTask={setNewTask} 
          handleSubmit={handleSubmit} 
          isModalOpen={isModalOpen} 
          setIsModalOpen={setIsModalOpen} 
        />
      )}

      {isDeleteConfirmOpen && (
        // <div className="delete-confirm-modal" style={{backgroundColor:'white', width:'40em', height:'30em', marginLeft:'25em', marginTop:'10em', border:'2px'}}>
        //   <div><h1>Delete</h1></div>
        //   <br />
        //   <div><p>Do you want to delete task "{currentTaskName}"?</p></div>
        //   <div>
        //     <button onClick={() => setIsDeleteConfirmOpen(false)}>No</button>
        //     <button onClick={() => handleDelete(currentTaskId)}>Yes</button>
        //   </div>
          
        // </div>
        <div className="delete-confirm-modal" style={{
          backgroundColor: 'white',
          width: '40em',
          height: '20em',
          margin: 'auto', // Centering horizontally
          marginTop: '10em',
          border: '2px solid #ccc', // Adding a solid border
          borderRadius: '8px', // Rounded corners
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Adding shadow for depth
          // padding: '20px', // Inner padding
          display: 'flex',
          flexDirection: 'column', // Stack elements vertically
          alignItems: 'center', // Centering items
          justifyContent: 'center' // Centering content vertically
      }}>
          <div style={{width:'100%', marginTop:'0px'}}><h1>Delete</h1></div>
          <p>Do you want to delete task "{currentTaskName}"?</p>
          <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              width: '100%' // Ensuring buttons take full width
          }}>
              <button 
                  onClick={() => setIsDeleteConfirmOpen(false)} 
                  style={{ 
                      backgroundColor: 'yellow', 
                      border: 'none', 
                      // padding: '10px 15px', 
                      borderRadius: '4px', 
                      cursor: 'pointer' 
                  }}>
                  No
              </button>
              <button 
                  onClick={() => handleDelete(currentTaskId)} 
                  style={{ 
                      backgroundColor: 'yellow', 
                      border: 'none', 
                      // padding: '10px 15px', 
                      borderRadius: '4px', 
                      cursor: 'pointer' 
                  }}>
                  Yes
              </button>
          </div>
      </div>
      
      )}


      {/* Pagination Footer */}
      <div className="pagination" style={{marginLeft:'47em'}}>
        <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>First</button>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
        <button disabled><span> {currentPage} </span></button>
        
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
        <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>Last</button>
        
      </div>
    </div>
  );
}

export default TaskManagement;
