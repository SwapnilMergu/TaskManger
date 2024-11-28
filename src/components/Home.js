import React, { useEffect, useState } from "react";
// import awsconfig from "./aws-exports"; // Path to your aws-exports.js
import axios from "axios";
import TaskTable from "./TaskTable";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// Amplify.configure(awsconfig);

const API_URL = 'https://lkpu2nesj6.execute-api.us-east-1.amazonaws.com/prod/tasks/';



// Fetch data from API


function Home({ signOut, userId }) {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchTasks();
  }, tasks);
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
        // const response = await axios.post(API_URL, taskData, {
        //   headers: {
        //     'Content-Type': 'application/json',
        //     // Optionally, add Authorization header if you're using Cognito JWT token
        //   }
        // });
        // console.log("Task created:", response.data);
        axios.get(API_URL+userId)
      .then(response => setTasks(response.data))
      .catch(error => console.error(error));
      }catch (error) {
    console.error('Error fetching tasks:', error);
  }
};

  const handleAddTask = async () => {
    if (!title || !deadline) {
      alert("Title and Deadline are required!");
      return;
    }

    // const taskData = {
    //   userId,
    //   title,
    //   description,
    //   deadline,
    // };

    try {
      // const response = await axios.post(API_URL, taskData, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     // Optionally, add Authorization header if you're using Cognito JWT token
      //   }
      // });
      // console.log("Task created:", response.data);

      axios.post(API_URL, {
        title: title,
        description: description,
        deadline: deadline,
        userId: userId
      })
        .then(response => {
          alert("Task created successfully!");
          console.log(response.data)})
        .catch(error => console.error(error));
      // setStatus("Task created successfully!");
      setTitle("");
      setDescription("");
      setDeadline("");
      fetchTasks();
    } catch (error) {
      console.error("Error creating task:", error);
      setStatus("Failed to create task.");
    }
  };

  const imageUrl = 'https://task-manager-images-cc-project.s3.us-east-1.amazonaws.com/img/task-manager-logo.png';

  return (
    
    <div className="App" >
{/* <div style={parent}>
  <div style={{ display: 'inline-block', border: '1px solid red', padding: '1rem 1rem', verticalAlign: 'middle' }}>child 1</div>
  <div style={{ display: 'inline-block', border: '1px solid red', padding: '1rem 1rem', verticalAlign: 'middle' }}>child 2</div>
</div> */}
      <div>
        <h1 style={{display: 'inline-block',fontStyle:'italic'}}> <img src={imageUrl} style={{width:'50px',height:'50px',marginTop:'10px'}} alt="Task Manager Logo" /> Task Management System</h1>
        <button onClick={signOut} style={{display: 'inline-block',padding: '10px 20px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', float: 'right',paddingLeft:'20px',paddingRight:'20px'}}>Sign Out</button>
      </div>
      <br/>
      <center>
      <div style={parent}>
      <div style={child}>
        <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '5px', minHeight:'60vh'}}>
        <h2 style={{paddingTop: '20px'}}>Add New Task</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          style={{width:'300px'}}
          onChange={(e) => setTitle(e.target.value)}
        /><br /><br />
        <textarea
          type="textArea"
          placeholder="Description"
          value={description}
          style={{width:'300px', height:'100px'}}
          onChange={(e) => setDescription(e.target.value)}
        /><br /><br />
        <input
          type="date"
          placeholder="Deadline"
          style={{width:'300px'}}
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        /><br /><br />
        <button onClick={handleAddTask}>Add Task</button>
        {status && <p>{status}</p>}<br /><br />

        </div>
      </div>
      <center style={{display: 'inline-block',paddingLeft: '1rem'}}>
          <TaskTable userId={userId} fetchTasks={fetchTasks} setTasks={setTasks} tasks={tasks} />

      </center>
      </div>
      </center>


    </div>
  );
}




const parent= {
  margin: '1rem',
  // paddingTop: '1rem',
  paddingLeft: '2rem',
  paddingRight: '2rem',
  // textAlign: 'center',
  left: '50%',
  right: '50%',
  alignItems: 'center',

}
const child= {
  display: 'inline-block',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  verticalAlign: 'top',
}


export default Home;
