import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
     const location = useLocation()
  const token = sessionStorage.getItem("userInfo");

  if (!token) {

    return <Navigate to="/loginNew" state={{ from: location }} replace />;
  }

  return <>{children} </> ;
};

export default ProtectedRoute;
