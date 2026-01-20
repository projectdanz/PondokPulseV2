import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const dataRaw = localStorage.getItem("data");

    if (!dataRaw) return null;

    const data = JSON.parse(dataRaw);

    const token = data.token;
    const user= data.user;


  console.log(token)
  console.log(user)

  if (!token || !user || user === "undefined") {
    return <Navigate to="/auth" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
