import React from 'react';
import './TaskForm.css';

const TaskForm = ({ newTask, setNewTask, handleSubmit, isModalOpen, setIsModalOpen }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{newTask.id ? 'Edit Task' : 'New Task'}</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="form-row" style={{marginTop:'20px'}}>
            <label>
              Assigned To:
              <input
              style={{marginLeft:'20px', marginRight:'0px', width:'400px'}}
                type="text"
                name="assignedTo"
                value={newTask.assignedTo}
                onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                required
              />
            </label>
            <label>
              Status:
              <select
              style={{marginLeft:'20px', marginRight:'0px', width:'500px'}}
                name="status"
                value={newTask.status}
                onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                required
              >
                <option value="">Select Status</option>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </label>
          </div>
          <div className="form-row">
            <label>
              Due Date:
              <input 
              style={{marginLeft:'20px', marginRight:'0px', width:'400px'}}
                type="date"
                name="dueDate"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                required
              />
            </label>
            <label>
                Priority:
              <select
              style={{marginLeft:'20px', marginRight:'0px', width:'500px'}}
                name="priority"
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                required
              >
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Normal">Normal</option>
                <option value="High">High</option>
              </select>
            </label>
          </div>
          <label>
            Comments:
            <textarea
              name="comments"
              value={newTask.comments}
              onChange={(e) => setNewTask({ ...newTask, comments: e.target.value })}
            />
          </label>
          <div style={{marginTop:'2em', marginLeft:'45em'}}>
          <button type="submit" >{newTask.id ? 'Save' : 'Add'}</button>
          <button type="button" onClick={() => setIsModalOpen(false)} style={{backgroundColor:'#0d4501', color:'white'}}>Cancel</button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
