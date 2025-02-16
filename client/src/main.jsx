import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import {
  SignUp,
  Login,
  AuthLayout,
  UserProfile,
  OtpVerification,
  PaymentGateway,
  AdminDashboard,
  CommentPage,
} from "./components/index.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/verify-otp",
        element: (
            <OtpVerification />
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        ),
      },
      {
        path: "/userProfile",
        element: (
          <AuthLayout authentication>
            <UserProfile />
          </AuthLayout>
        ),
      },
      {
        path: "/payment-gateway",
        element: (
          <AuthLayout authentication>
            <PaymentGateway />
          </AuthLayout>
        ),
      },
      {
        path: "/comment-page",
        element: (
            <CommentPage />
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
    
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
