import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);

    if(loading){
        return <h4 className="text-center my-5 py-5">Please wait, loading...</h4>
    }
    if(user){
        return children;
    }

    return <Navigate to='/login'></Navigate>;

};

export default PrivateRoute;