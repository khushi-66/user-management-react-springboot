import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Users()
{
    const[ids,setIds]=useState([]);
    const[isselect,setIsSelect]=useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMsg, setToastMsg] = useState("");
    const [toastType, setToastType] = useState("success");
    const[users,setUsers]=useState([]);
    const navigate=useNavigate();
    const[loading,setLoading]=useState(true);
    const[isuserEmpty,setisuserEmpty]=useState(false);
    const[search,setSearch]=useState('');
  
const handleSearch=(e)=>{

}


  const fetchUsers=async()=>{axios.get('http://localhost:9090/show').then((res)=>{
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

const handleDeleteSelected=async()=>{
  console.log("ids length ",ids);
  const res=await axios.delete("http://localhost:9090/delete-multiple",{data:ids,
    headers: {
        "Content-Type": "application/json", 
      },
  });
 try{
setTimeout(() => setShowToast(false), 2000);
    if(res.data==='deleted'){
      fetchUsers();
    setShowToast(true);
    setToastMsg("Selected User Deleted successfully....");
    setToastType("success");
 }}catch(err)
 {
setShowToast(true);
    setToastMsg("Selected User is not be Deleted....");
    setToastType("danger");
 }
fetchUsers();}


const handlecheckbox=(id)=>{
  setIds((prevIds)=>(prevIds.includes(id)?
  prevIds.filter((previd)=>previd!==id)     //remove when untick checkbox
  :[...prevIds,id]))      //add when tick checkbox
}

return (

  <div className="container-fluid mt-0">
    
   {/* ##############################  Empty User  ############################## */}
    {isuserEmpty ? (
      <h1   className="text-secondary fs-1 text-center">
       No user records Here yet !!</h1>
       )
       :""}


{/* ##########################  Toast  ########################### */}
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


{/* #######################  Loading   ##################### */}
    {loading ? (
      <>
        <div
          className="spinner-border m-4 text-primary"
          style={{ width: "5rem", height: "5rem" }}
        ></div>
        <div className="text-primary fs-3 fw-semibold">Loading....</div>
      </>
    ) : 
    
    (<>
   
   {/* ##########################  pagination search filter buttons section ############## */}
  
  {/* ########################## Pagination, Search & Filter Section ############## */}
<div className="row mb-4 bg-primary-sublte p-3 rounded align-items-center">

  {/* Search Input + Button */}
  <div className="col-md-7 col-sm-12">
    <div className="d-flex gap-2">
      <input id="s"
        className="form-control"
        type="text"
        placeholder="Search Here"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button htmlFor="s"className="btn btn-primary d-flex align-items-center">
        Search <i className="ms-2 bi bi-search"></i>
      </button>
    </div>
  </div>

  {/* Filter Button */}
  <div className="col-md-4 col-sm-12 mt-2 mt-md-0 ms-auto">
    <button className="btn btn-primary w-100 d-flex justify-content-center align-items-center">
      Filter by <i className="ms-2 bi bi-funnel"></i>
    </button>
  </div>

</div>

{/* ################  pagination search filter buttons section end ######################## */}




   {/* ##############   show userRecords start  ################# */}

     {/* ###################   multiple Delete User feature  ################### */}
      <div className="d-flex justify-content-end mb-1 mt-4">
         {isselect ? (
          <div>
            {/*................ Cancel selection button.............. */}
          <button onClick={()=>setIsSelect(!isselect)} 
          className=" btn btn-primary mb-3">
             <i className="bi bi-x-circle me-2"></i> 
            Cancel Selection </button>

    {/*................ delete selected button.............. */}
          <button onClick={handleDeleteSelected} 
          className="ms-2 btn btn-danger mb-3">
              <i className="me-2 bi bi-trash mb-3"></i> 
            Delete Selected </button>
            </div>
    ):(

 
<button onClick={()=>setIsSelect(!isselect)} 
 className="ms-1 btn btn-primary mb-1">
   <i className="bi bi-check2-square me-2"></i> 
  Select Multiple</button>
)}
</div>


      
      <div className="row">
              {
              users.map((u) => (

          <div className="col-md-6 mb-4" key={u.userId}>

            <div className="card shadow w-100">

              <div className="row g-0">

                {/* ###########  Left side User Image  ############ */}
                <div className="col-md-5">
                  <img
                    src={`http://localhost:9090/uploads/${u.imagepath}`}
                    className="img-fluid h-100 w-100 rounded-start"
                    alt="user"
                    style={{ objectFit: "cover", minHeight: "200px" }}
                  />
                </div>

                {/* ###########  right side user details  ############ */}
                <div className="col-md-7">
                  <div className="card-body">
                    <div className="row"><div className="ms-4 col-8">
                      <h5 className="card-title">{u.name}</h5>
                      </div>
                      {isselect && <div className="form-check col-3"> 
                        <label className="form-check-label" htmlFor="checkDefault">Select</label>
                 <input onChange={()=>handlecheckbox(u.userId)} className="form-check-input" type="checkbox" value="" id="checkDefault"/>
</div>
                      }
                       </div>
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
{/* ###########  end of show records  ########## */}</>

)}  
{/* #####################  Loading false ending  ################### */}


{/* end of user component container */}
</div>

);
}




    