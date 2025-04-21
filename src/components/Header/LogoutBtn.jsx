import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.status);

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate("/login"); // Redirect to login page after logout
    });
  };

  return (
    isAuthenticated && (
      <button
        className="px-4 py-2 rounded-full font-medium hover:font-bold bg-zinc-800 text-gray-300 transition duration-300 hover:text-zinc-800 hover:bg-gray-300 font-bold"
        onClick={logoutHandler}
      >
        Logout
      </button>
    )
  );
}

export default LogoutBtn;
