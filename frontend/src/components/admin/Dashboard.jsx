import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/features/authState";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSignoutMutation } from "../../redux/features/authSlice";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { email, isAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signout] = useSignoutMutation();

  useEffect(() => {
    if (!isAuth) {
      navigate("/not-found");
    }
  }, [isAuth]);

  const handleLogout = async () => {
    dispatch(logout());
    try {
      const res = await signout().unwrap();
      toast.success(res.message || "Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.data?.message || "Logout failed");
    }
  };

  return (
    <div className="h-screen flex ">
      {/* First section */}
      <div className="bg-blue-950 pt-3 ">
        <Link
          to="/dashboard/teacher"
          className="text-white text-xl p-2 bg-amber-300
           m-2 rounded-md  "
        >
          Teacher
        </Link>
      </div>

      {/* Second Section */}
      <div className="flex mx-auto justify-center items-center ">
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
