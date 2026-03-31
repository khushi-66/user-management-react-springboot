import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Saveform from './saveform.jsx';
import App from './App.jsx';
import Users from './Users.jsx';
import { RouterProvider ,createBrowserRouter,Route,createRoutesFromElements} from 'react-router-dom'
import EditForm from './EditUser.jsx';
const r=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}  >
      <Route path='/save'  element={<Saveform/>}/>
    <Route path='/showusers'element={<Users/>}/>
    <Route path='/edit/:id'element={<EditForm/>}/>
    </Route>
    
  )

)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider  router={r}>
       
    </RouterProvider>

  </StrictMode>,
)
