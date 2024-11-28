import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaSpinner, FaCheck, FaTimesCircle } from 'react-icons/fa';  // Importing the icons from react-icons

function TaskTable({userId,fetchTasks, tasks, setTasks}) { // State to hold tasks data
  const API_URL = 'https://lkpu2nesj6.execute-api.us-east-1.amazonaws.com/prod/tasks/'; // Replace with your API endpoint


  

  const handleUpdateTask = async (taskId, status) => {
    try {
        console.log(status);
      axios.put(API_URL + taskId, { 'status':status })
        .then(response => {
            fetchTasks();
            alert("Task Updated");})
        .catch(error => console.error(error));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      axios.delete(API_URL + taskId)
        .then(response => { 
            fetchTasks();
            console.log('deleting');
            alert("Task Deleted");})
        .catch(error => console.error(error));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };


  // Fetch data from API
  useEffect(() => {
    fetchTasks();
  }, tasks);

  return (
    <center style={{ padding: '20px',backgroundColor: 'white' ,borderRadius: '10px', minHeight: '60vh' }}>
      <h2>Task List</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse'}}>
        <thead>
          <tr>
            <th style={headerStyle}>Sr. No</th>
            <th style={headerStyle}>Title</th>
            <th style={headerStyle}>Description</th>
            <th style={headerStyle}>Deadline</th>
            <th style={headerStyle}>Status</th>
            <th style={headerStyle}>Update</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task,index) => (
            <tr key={task.taskId}>
              <td style={cellStyle}>{index+1}</td>
              <td style={cellStyle}>{task.title}</td>
              <td style={cellStyle}>{task.description}</td>
              <td style={cellStyle}>{task.deadline}</td>
              <td style={cellStyle}>{task.status === 'Pending' ? (
                  <FaSpinner style={{ animation: 'spin 1s linear infinite', fontSize: '20px',alignItems:'center' }} /> // Displaying spinner for Pending status
                ) : (
                    <FaCheck style={{ color: 'green', cursor: 'pointer', fontSize: '20px' }} />
                )}</td>
              <td style={cellStyle}>
              
              {task.status === 'Pending' ? (
                <FaCheck style={{ color: 'green', cursor: 'pointer', fontSize: '20px',marginRight: '15px' }} onClick={() => handleUpdateTask(task.taskId, 'Completed')} />
                ) : <FaCheck style={{ color: 'white', cursor: 'pointer', fontSize: '20px',marginRight: '15px' }} />}
              <FaTimesCircle style={{ color: 'red', cursor: 'pointer', fontSize: '20px' }} onClick={() => handleDeleteTask(task.taskId)} />&nbsp;&nbsp;
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </center>
  );
}

// Styles for table headers and cells
const headerStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'center',
  backgroundColor: '#f4f4f4',
  fontWeight: 'bold',
};

const cellStyle = {
  border: '1px solid #ddd',
  padding: '15px',
  textAlign: 'left',
};

export default TaskTable;
