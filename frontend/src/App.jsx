import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import Footer from "./Footer"
import ums from './assets/ums2.jpg';
export default function App() {
  const location=useLocation();
  const navigate=useNavigate();
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container-fluid text-center m-2 flex-grow-1">
              <button 
          className="mt-1  rounded-3 fs-3 px-4 shadow border-0 text-white"
          style={{ background: "linear-gradient(45deg, #007bff, #6610f2)" }}
        >
          <i className="bi bi-people me-2 fs-1"></i>         
          User Management System
        </button>

        <div className='mt-0 d-flex justify-content-end mb-3'>
          
          <button onClick={()=>navigate('/')}className="btn btn-primary me-4">
             <i className="bi bi-house-fill me-2" ></i>Home</button>
          
          <Link className='btn btn-success px-3' to='/save'>
            <i className="bi bi-person-plus me-2 fs-5"></i>
            Add User
          </Link>

          <Link className='btn btn-primary ms-4 px-3' to='/showusers'>
            <i className="bi bi-people me-2 fs-5"></i>
            Manage Users
          </Link>
        </div>
   {location.pathname==='/' ?(
   <div className="text-center mt-5">

  <img 
    src={ums}
    alt="User Management"
    style={{ width: "280px", filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.2))" }}
  />

  <h3 className="mt-4 fw-bold text-dark">
    Smart User Management System
  </h3>

  <p style={{ opacity: 0.7, fontSize: "17px" }}>
    Manage users, roles and access with a modern and secure platform
  </p>

  <p className="fw-semibold" style={{ color: "#0d6efd" }}>
    Secure • Scalable • Role-Based Access
  </p>

</div>
   ):(
<Outlet />
   )}
        

      </div>

     
      <Footer />

    </div>
  )
}