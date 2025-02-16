import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, signup } from "../features/authslice";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import buttonLoader from "./../assets/button-loader.gif";

const ErrorPopup = ({ 
  isOpen, 
  onClose, 
  title = "Error Occurred", 
  message = "Something went wrong. Please try again.",
  duration = 5000
}) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsExiting(false);
      onClose();
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-4">
      <div 
        className={`
          fixed inset-0 bg-black/20 backdrop-blur-sm
          transition-opacity duration-500
          ${isExiting ? 'opacity-0' : 'opacity-100'}
        `}
        onClick={handleClose}
      />
      <div 
        className={`
          relative bg-white rounded-lg shadow-xl w-full max-w-md
          transform transition-all duration-500 
          ${isExiting 
            ? 'opacity-0 scale-95 translate-y-4' 
            : 'opacity-100 scale-100 translate-y-0'
          }
        `}
      >
        <div className="bg-red-500 h-1 rounded-t-lg" />
        <div className="p-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
            <svg className="h-6 w-6 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-500">{message}</p>
          </div>
          <div className="mt-6">
            <button
              onClick={handleClose}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 
                       rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 
                       focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignup = async (data) => {
    setIsLoading(true);
    try {
      const session = await dispatch(signup(data)).unwrap();
      if (session) {
        navigate("/verify-otp");
        const loginResult = await dispatch(login(data)).unwrap();
        if (loginResult) {
        }
      }
    } catch (error) {
      setErrorMessage(error.message || "An error occurred during registration");
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8 transform transition-all duration-500 hover:shadow-xl">
        <div className="text-center space-y-3 mb-8">
          <h1 className="text-4xl font-serif text-slate-800">Welcome</h1>
          <div className="h-1 w-16 bg-slate-800 mx-auto rounded-full transform transition-all duration-500 hover:w-24" />
          <p className="text-slate-600 font-light">Begin your journey with us</p>
        </div>

        <form onSubmit={handleSubmit(handleSignup)} className="space-y-6" autoComplete="off">
          <div className="space-y-5">
            <div className="group">
              <input
                type="text"
                {...register("username", { required: "Username is required" })}
                className="w-full px-4 py-3 border-b-2 border-slate-200 focus:border-slate-800 
                         outline-none transition-all duration-300 bg-transparent
                         group-hover:border-slate-400"
                placeholder="Username"
              />
              {errors.username && (
                <p className="mt-2 text-sm text-red-600 animate-fadeIn">{errors.username.message}</p>
              )}
            </div>

            {/* <div className="group">
              <input
                type="text"
                {...register("fullName", { required: "Full name is required" })}
                className="w-full px-4 py-3 border-b-2 border-slate-200 focus:border-slate-800 
                         outline-none transition-all duration-300 bg-transparent
                         group-hover:border-slate-400"
                placeholder="Full Name"
              />
              {errors.fullName && (
                <p className="mt-2 text-sm text-red-600 animate-fadeIn">{errors.fullName.message}</p>
              )}
            </div> */}

            <div className="group">
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full px-4 py-3 border-b-2 border-slate-200 focus:border-slate-800 
                         outline-none transition-all duration-300 bg-transparent
                         group-hover:border-slate-400"
                placeholder="Email"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 animate-fadeIn">{errors.email.message}</p>
              )}
            </div>

            <div className="group">
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="w-full px-4 py-3 border-b-2 border-slate-200 focus:border-slate-800 
                         outline-none transition-all duration-300 bg-transparent
                         group-hover:border-slate-400"
                placeholder="Password"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 animate-fadeIn">{errors.password.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-slate-800 text-white py-3 rounded-lg transition-all duration-300
                     transform hover:bg-slate-700 hover:scale-[1.02] active:scale-[0.98]
                     disabled:opacity-70 disabled:cursor-not-allowed
                     focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          >
            {isLoading ? (
              <img src={buttonLoader} alt="Loading.." className="w-7 h-5 mx-auto" />
            ) : (
              "Create Account"
            )}
          </button>

          <p className="text-center text-slate-600 mt-6">
            Already have an account?{" "}
            <Link 
              to="/login" 
              className="text-slate-800 font-medium hover:underline 
                       transition-all duration-300 hover:text-slate-600"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>

      <ErrorPopup
        isOpen={showError}
        onClose={() => setShowError(false)}
        title="Registration Error"
        message={errorMessage}
      />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default SignUp;