import { useEffect, useState } from 'react'
import employeeData from './Data/EmployeeData'
import './App.css'



function App() {
  const initialUsers = {
    id: "",
    firstName: "",
    lastName: "",
    age: "",
  }
  const [user, setUser] = useState(initialUsers)
  const[data, setData] = useState([])
  const [editId, setEditId] = useState(null)

  useEffect(()=>{
    setData(employeeData)
  }, [])


  const handleInput = (e) => {
    const {name, value} = e.target;  //Destructuring

    // setUser((prev) => ({...prev, [name]: value}))
    setUser ({...user, [name]: value})
    
    // console.log(user)
  }

  

  const handleDelete = (id) => {
    if (id > 0) {
      if(window.confirm("Are you sure to delete this user ?"))
      {
        const dt = data.filter((emp) => emp.id !== id)
        setData(dt)
      }
    }
  }

  const handleSave = () => {
    // data.push({...user, id: data.length+1})

    if (user.firstName && user.lastName && user.age) {
      setData([...data, {...user, id: data.length+1}])
      // setUser(initialUsers)
      handleClear()
      // console.log(data)
    }
    else {
      alert("All data fields are required !!")
    }
   
  }
  
  const handleEdit = (id) => {

    const userToEdit = data.find((usr) => usr.id === id)

    if (userToEdit !== undefined) {
      setEditId(id)
      setUser(userToEdit)
      // console.log(user)
    }
  }

  const handleUpdate = () => {

    // editId = userId to be updated

    const updatedData = data.map((usr) => usr.id === editId ? {...user, id: editId} : usr);

    setData(updatedData)
    setEditId(null)

    handleClear()
  }

  const handleClear = () => {
     setUser(initialUsers)
   
  }


  return (
    <>
    <div className='fw-bold'>
  
      <label htmlFor="fName">First Name</label>
      <input type="text" id='fName' name='firstName' className='mx-2' value={user.firstName} onChange={handleInput} />

      <label htmlFor="fName">Last Name</label>
      <input type="text" id='fName'  name='lastName' className='mx-2' value={user.lastName} onChange={handleInput} />

      <label htmlFor="fName">Age</label>
      <input type="text" id='fName'  name='age' className='mx-2' value={user.age} onChange={handleInput} />

      {
      editId ? (<button className='btn btn-primary' onClick={(()=> handleUpdate())}>Update</button>)
      : (<button className='btn btn-primary' onClick={() => handleSave()}>Save</button>)
      }
     
      <button className='btn btn-danger ms-2' onClick={(()=> handleClear())}>Clear</button>
    </div>
     
      <table className='table table-hover table-bordered border-info mt-3'>
        <thead className='table-primary'>
          <tr>
            <th>Sr. No.</th>
            <th>id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((emp, index) => {
              return(
                <tr key={emp.id}>
                  <td>{index+1}</td>
                  <td>{emp.id}</td>
                  <td>{emp.firstName}</td>
                  <td>{emp.lastName}</td>
                  <td>{emp.age}</td>
                  <td>
                    <button className='btn btn-primary' onClick={()=>handleEdit(emp.id)}>Edit</button>&nbsp;
                    <button className='btn btn-danger' onClick={()=>handleDelete(emp.id)}>Delete</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </>
  )
}

export default App
