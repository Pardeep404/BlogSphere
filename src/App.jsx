import { useDispatch } from "react-redux";
import "./App.css";
import { useEffect, useState } from "react";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
        }
      } catch (error) {
        console.log("Error while getting user data in App.jsx", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-col bg-zinc-900 text-gray-300">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow bg-zinc-700 shadow-inner px-4 py-6 sm:px-6 md:px-12 lg:px-20">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  ) : null;
}

export default App;
