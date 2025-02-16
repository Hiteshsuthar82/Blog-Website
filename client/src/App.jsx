import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components";
import { useDispatch } from "react-redux";
import loadingimg from "./assets/button-loader.gif";
import { getCurrentUser, login, logout } from "./features/authslice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // Call get current user API
    const fetchUser = async () => {
      try {
        const resultAction = await dispatch(getCurrentUser());
      } catch (error) {
        console.error("Failed to fetch user:", error);
        dispatch(logout());
      } finally {
        // setTimeout(() => setLoading(false), 6000);
        setLoading(false)
      }
    };

    fetchUser();
  }, [dispatch]);

  return !loading ? (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  ) : (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-blue-600 to-purple-700 text-center">
      <img className="" src={loadingimg} alt="" />
    </div>
  );
}

export default App;
