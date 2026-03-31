import axios from "axios";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function EditForm()
{
    const [showToast, setShowToast] = useState(false);
const [toastMsg, setToastMsg] = useState("");
const [toastType, setToastType] = useState("success");
const location=useLocation();
const navigate=useNavigate();
const u=location.state;

    const[user,setUser]=useState({
      name: u.name, email: u.email,age: u.age,profession: u.profession  ,phone: u.phone,password: u.password
    });
    console.log(u.email);
    const[file,setFile]=useState(null);
 const fileref=useRef();
   const handlechange=(e)=>{
     setUser({...user,[e.target.name]:e.target.value});
}

const handleFile=(e)=>{
  setFile(e.target.files[0])
}

const handleSubmit=async(e)=>{
  e.preventDefault();
    const formdata=new FormData();

Object.keys(user).forEach((key)=>{
  formdata.append(key,user[key])
});
formdata.append("file",file);
formdata.append("id",u.userId);
// ############  To check in console   ###############
for (let pair of formdata.entries()) {
  console.log(pair[0], pair[1]);
}
try{


const res=await axios.put('http://localhost:9090/update',formdata);

setUser({
    name: "",
    email: "",
    age: "",
    profession: "",
    phone: "",
    password: ""
  });

  setFile(null);
fileref.current.value="";
if(res.data=== 'updated'){
  setShowToast(true);
    setToastMsg("User updated successfully....");
    setToastType("success");
    navigate("/showusers");
}

}catch(err)
{
  setShowToast(true);
    setToastMsg("Some internal issue user is not updated !!....");
    setToastType("danger");
}
  
}
    return(
        <>
        {showToast && (
  <div 
    className={`toast align-items-center text-bg-${toastType} border-0 show position-fixed top-0 start-0 m-4`} 
    role="alert"
  >
    <div className="d-flex">
      <div className="toast-body">
        {toastMsg}
      </div>
      <button 
        type="button" 
        className="btn-close btn-close-white me-2 m-auto"
        onClick={() => setShowToast(false)}
      ></button>
    </div>
  </div>
)}
        <div className="container mt-4 text-center">
      <form  onSubmit={handleSubmit} className="m-4 fs-5 text-center mt-4 bg-light-subtle shadow-md border border-secondary-subtle rounded-3">
  <button type="submit" className="btn btn-primary mb-4 mt-4 fs-4 px-4">
    <i className="bi bi-person-lines-fill me-2"></i>
    User Form</button>

  <div className="ms-4 row mb-3 mt-4 ">
    <label htmlFor="name" className="ms-4 col-sm-4 col-form-label">Name</label>
    <div className="col-sm-6">
      <input value={user.name} name="name"onChange={handlechange} type="text" className="form-control-md form-control" id="name"placeholder="Enter Your Name"  required/>
    </div>
  </div>

  <div className="ms-4 row mb-3 mt-4 ">
    <label htmlFor="email" className="align-center ms-4 col-sm-4 col-form-label">Email</label>
    <div className="col-sm-6">
      <input type="email"value={user.email} onChange={handlechange}name="email"className="form-control-md form-control" id="email" placeholder="Enter Your Email"  required/>
    </div>
  </div>
   <div className="ms-4 row mb-3 mt-4 ">
    <label htmlFor="password" className="ms-4 col-sm-4 col-form-label">Password</label>
    <div className="col-sm-6">
      <input type="password"name="password" value={user.password} onChange={handlechange}className="form-control-md form-control" id="password" placeholder="Enter Your Password"  required/>
    </div>
  </div>
<div className="ms-4 row mb-3 mt-4 ">
    <label htmlFor="phone" className="ms-4 col-sm-4 col-form-label">Phone Number</label>
    <div className="col-sm-6">
      <input type="number"name="phone" value={user.phone} onChange={handlechange}className="form-control-md form-control" id="phone"placeholder="Enter Your Phone"  required/>
    </div>
  </div>
  <div className="ms-4 row mb-3 mt-4 ">
    <label htmlFor="age" className="text-center ms-4 col-sm-4 col-form-label">Age</label>
    <div className="col-sm-6">
      <input type="text"value={user.age} onChange={handlechange} name="age"className="form-control-md form-control" id="age" placeholder="Enter Your Age"  required/>
    </div>
  </div>

  <div className="ms-4 row mb-3 mt-4 ">
    <label htmlFor="profession" className="text-center ms-4 col-sm-4 col-form-label">Profession</label>
    <div className="col-sm-6">
      <input type="text" value={user.profession} onChange={handlechange}name="profession"className="form-control-md form-control" id="profession" placeholder="Enter Your Profession"  required/>
    </div>
  </div>
   <div className="ms-4 row mb-3 mt-4 ">
    <label htmlFor="file" className="align-center ms-4 col-sm-4 col-form-label">Upload Pic</label>
    <div className="col-sm-6">
      <input type="file" ref={fileref}onChange={handleFile} name="file"className="form-control-md form-control" id="file"  required/>
    </div>
  </div>
  <button type="submit" className="btn btn-success mb-4">
     <i className="bi bi-check-circle me-2"></i>Update User</button>
</form>
</div>
        </>
    );
}