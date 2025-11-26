import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/features/authState";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = () => {
  const { email, isAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/not-found");
    }
  }, [isAuth]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="text-center">
        <h1 className="font-bold text-3xl">Welcome {email} </h1>
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          {isAuth ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
