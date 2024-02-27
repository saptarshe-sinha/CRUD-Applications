import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './add.css'
import toast from 'react-hot-toast';

const Add = () => {

  const users = {
    fname:"",
    lname:"",
    email:"",
    password:"",
  }

  const [user, setUser] = useState(users);
  const navigate = useNavigate();

  const inputHandler = (e) => {

    const {name, value} = e.target;
    // console.log(e.target.value)
    // console.log(e.target.name)
    setUser({...user, [name]:value })
    // console.log(user)
    
  }
  
  const submitHandler = async(e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/create",user)
    .then((res) => {
        // console.log(res)
        // alert(res.data.msg)
        toast.success(res.data.msg, {position:"top-right"})
        navigate("/")
        
    })
    .catch((err) => console.log(err))
  }

  return (
    <div className='addUser'>

      <Link to={"/"}>Back</Link>
      <h3>Add New User</h3>

      <form className='addUserForm' onSubmit={submitHandler}>
        <div className="inputGroup">
            <label htmlFor="fname">First Name</label>
            <input type="text" placeholder='Enter First Name' onChange={inputHandler} name="fname" id="fname" autoComplete='off'/>
        </div>
        <div className="inputGroup">
            <label htmlFor="lname">Last Name</label>
            <input type="text" placeholder='Enter Last Name' onChange={inputHandler} name="lname" id="lname" autoComplete='off'/>
        </div>
        <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <input type="text" placeholder='Enter Email' onChange={inputHandler} name="email" id="email" autoComplete='off'/>
        </div>
        <div className="inputGroup">
            <label htmlFor="password">First Password</label>
            <input type="password" placeholder='Enter Password' onChange={inputHandler} name="password" id="password" autoComplete='off'/>
        </div>
        <div className="inputGroup">
            <button type="submit">Add User</button>
        </div>
      </form>
    </div>
  )
}

export default Add;
