import { useState } from 'react'
import {Link, Outlet} from 'react-router-dom';

function App() {
 

  return (
    <div  className='container-fluid  text-center m-2'>
     <button 
  className="mt-4 mb-4 rounded-3 fs-3 px-4 shadow border-0 text-white"
  style={{ background: "linear-gradient(45deg, #007bff, #6610f2)" }}
>
      <i className="bi bi-people me-2 fs-1"></i>         
      User Management System</button>
     <br></br>
     <div className='d-flex mt-2 justify-content-end mb-4'>
   <Link  className='btn btn-success' to='/save'>
    <i className="bi bi-person-plus me-2 fs-5"></i>
   Add User</Link><br></br>
    <Link  className='btn btn-success ms-4 pt-2'  to='/showusers'>
    <i className="bi bi-eye me-2 "></i>Show All Users</Link>
     </div>
     <Outlet/>
    </div>
  )
}

export default App
