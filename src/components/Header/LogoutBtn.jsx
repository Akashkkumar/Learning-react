import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth_service";
import { authLogout } from "../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await authService
      .logout()
      .then(() => {
        dispatch(authLogout());
        navigate("/");
      })
      .catch((err) => console.log("LogoutBtn :: Error ::", err));
  };

  return (
    <div>
      {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
      <button
        onClick={handleLogout}
        className="bg-[#DC143C] text-white block rounded-md px-3 py-2 text-base font-medium"
        aria-current="page"
      >
        Logout
      </button>
    </div>
  );
}

export default LogoutBtn;
