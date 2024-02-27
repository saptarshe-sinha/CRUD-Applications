import React, { useEffect, useState } from 'react'
import './edit.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const Edit = () => {

  const users = {
    fname:"",
    lname:"",
    email:"",
    password:"",
  }
  const id = useParams().id;
  const navigate = useNavigate();

  const [user, setUser] = useState(users)


  useEffect(()=>{
  
    axios.get(`http://localhost:5000/api/getOne/${id}`)
    .then((res)=>{
       
        // console.log(res)
        setUser(res.data)
    })
    .catch((err)=>console.log(err))
  },[id])

  const inputChangeHandler = (e) => {
    const {name, value} = e.target;
    setUser({...user, [name]:value})
    // console.log(user)

  }

  const submitFormHandler = async(e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/update/${id}`,user)
    .then((res)=>{
      console.log(res)
      toast.success(res.data.msg, {position:"top-right"});
      navigate("/");
    })
    .catch((err) => console.log(err)
    )
  }

  return (
    <div className='editUser'>
        
      <Link to={"/"}>Back</Link>
      <h3>Update User</h3>

      <form className='editUserForm' onSubmit={submitFormHandler}>
        <div className="inputGroup">
            <label htmlFor="fname">First Name</label>
            <input type="text" value={user.fname} onChange={inputChangeHandler} placeholder='Enter First Name' name="fname" id="fname" autoComplete='off'/>
        </div>
        <div className="inputGroup">
            <label htmlFor="lname">Last Name</label>
            <input type="text" value={user.lname} onChange={inputChangeHandler} placeholder='Enter Last Name' name="lname" id="lname" autoComplete='off'/>
        </div>
        <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <input type="text" value={user.email} onChange={inputChangeHandler} placeholder='Enter Email' name="email" id="email" autoComplete='off'/>
        </div>
        <div className="inputGroup">
            <button type="submit">Update User</button>
        </div>
      </form>
    </div>
  )
}

export default Edit
