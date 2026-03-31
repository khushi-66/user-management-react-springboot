import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Users()
{
    const [showToast, setShowToast] = useState(false);
const [toastMsg, setToastMsg] = useState("");
const [toastType, setToastType] = useState("success");
    const[users,setUsers]=useState([]);
    const navigate=useNavigate();
    const[loading,setLoading]=useState(true);
const[isuserEmpty,setisuserEmpty]=useState(false);
    const fetchUsers=async()=>{
   axios.get('http://localhost:9090/show').then((res)=>{
setUsers( res.data);

console.log("users  length ",res.data.length);
if(res.data.length===0)
{
  setisuserEmpty(true);
}
setLoading(false);
     }).catch((err)=>{
        console.log(err);
        setLoading(false)
     })
}



const deleteUser=async(id)=>{
   const res=  await axios.delete(`http://localhost:9090/delete/${id}`);
   try{
setUsers(users.filter((u)=>u.id !== id));
    setTimeout(() => setShowToast(false), 2000);
    if(res.data==='deleted'){
      fetchUsers();
    setShowToast(true);
    setToastMsg("User Deleted successfully....");
    setToastType("success");
   }
   }catch(err){
setShowToast(true);
    setToastMsg("User is not be Deleted....");
    setToastType("danger");
   }
    }


useEffect(()=>{
  fetchUsers() ; 
},[])

return (

  <div className="container mt-4">

    {isuserEmpty ? (<h1   className="text-secondary fs-1 text-center"> No user records Here yet !!</h1>):""}
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


    {loading ? (
      <>
        <div
          className="spinner-border m-4 text-primary"
          style={{ width: "5rem", height: "5rem" }}
        ></div>
        <div className="text-primary fs-3 fw-semibold">Loading....</div>
      </>
    ) : (

      <div className="row">

        {users.map((u) => (
          <div className="col-md-6 mb-4" key={u.userId}>

            <div className="card shadow w-100">

              <div className="row g-0">

                {/*  LEFT IMAGE */}
                <div className="col-md-5">
                  <img
                    src={`http://localhost:9090/uploads/${u.imagepath}`}
                    className="img-fluid h-100 w-100 rounded-start"
                    alt="user"
                    style={{ objectFit: "cover", minHeight: "200px" }}
                  />
                </div>

                {/*  RIGHT CONTENT */}
                <div className="col-md-7">

                  <div className="card-body">
                    <h5 className="card-title">{u.name}</h5>
                    <p className="card-text">ID: {u.userId}</p>
                  </div>

                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Email: {u.email}</li>
                    <li className="list-group-item">Contact: {u.phone}</li>
                    <li className="list-group-item">Profession: {u.profession}</li>
                    <li className="list-group-item">Age: {u.age}</li>
                  </ul>

                  <div className="card-body d-flex justify-content-end">
                    <button onClick={()=>deleteUser(u.userId)} className="btn btn-danger me-2">
                      <i className="bi bi-trash-fill me-2"></i>Delete</button>
                    <button className="btn btn-primary" onClick={()=>navigate(`/edit/${u.userId}`,{state:u})}>
                      <i className="bi bi-pen-fill me-2"></i>
                      Edit</button>
                  </div>

                </div>

              </div>

            </div>

          </div>
        ))}

      </div>

    )}

  </div>
);
}




    