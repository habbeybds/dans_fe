import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { login } from "../api/authApi";
import { setToken, clearToken } from "../slices/authSlice";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (username: string, password: string) => {
    try {
      const { token } = await login(username, password);
      dispatch(setToken(token));
      navigate("/jobs");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login gagal, periksa kredensial Anda");
    }
  };

  useEffect(() => {
    const checkToken = () => {
      if (!localStorage.getItem("token")) {
        dispatch(clearToken());
        navigate("/");
      }
    };

    // Tambahkan event listener untuk mendeteksi perubahan local storage
    window.addEventListener("storage", checkToken);

    // Bersihkan event listener saat komponen di-unmount
    return () => {
      window.removeEventListener("storage", checkToken);
    };
  }, [dispatch, navigate]);

  return (
    <div className="login login-page">
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
