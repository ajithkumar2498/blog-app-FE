import { useSelector } from "react-redux";
import Navbar from "./components/Navbar"
import { useLocation } from "react-router-dom";

function layout() {
 const { user } = useSelector((state) => state.auth);

  const location = useLocation();

  return user ? (
   
    <div className='px-4 md:px-8 lg:px-16 lx:px-32 2xl:px-64 '>
      
     <Navbar/>
     <Outlet/>
 
    </div>
  
  ) : (
  
   <Navigate to="/loginNew" state={{ from: location }} replace />
   )

}
const App = () => {

  return (
    <div className='px-4 md:px-8 lg:px-16 lx:px-32 2xl:px-64 '>
      {/* {Navbar} */}
      <Navbar/>
      {/* {BreadCrumbs} */}
      {/* {Inroduction} */}
      {/* {Featured POst} */}
      {/* {POST List} */}
      {/* {Footer} */}
      {/* {Navbar} */}
    </div>
  )
}

export default App