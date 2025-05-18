import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import AxiosService from "../utils/AxiosService";
import { useNavigate } from "react-router-dom";

const Login = () => {
   const nav = useNavigate()

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 
  const signUpMutation = useMutation({
    mutationFn: async (data) => {
      console.log(data)
      return AxiosService.post("/auth/signup", data, {
          "Content-Type": "application/json",
      });
    },
    onSuccess: (res) => {
      toast.success("user Signedup Successful" || res.message);
      setIsLoginMode(curr => !curr)
    },
    onError: (error) => {
    toast.error(error.response?.data?.message || "Signup failed");
    console.error("Signup error:", error);
  },
  });

   const loginMutation = useMutation({
    mutationFn: async (data) => {
      return AxiosService.post("/auth/login", data, {
        headers: {
           "Content-Type": "application/json",
        },
      });
    },
    onSuccess: (res) => {
      toast.success(res.message || "Login Successful");
      setName("")
      setEmail("")
      sessionStorage.setItem("token", res.token)
      nav("/");
    },
     onError: (error) => {
    toast.error(error.response?.data?.message || "Signup failed");
    console.error("Signup error:", error);
  }
  });

  const handleSignUp = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    console.log(formData.get("name"));
    signUpMutation.mutate(formData);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    console.log(formData.get("email"));
    loginMutation.mutate(formData);
  };
  return (
    <>
      <div className="flex items-center justify-evenly h-[calc(100vh-80px)] w-250px">
        <div className="text-left text-gray-800 text-5xl font-extrabold w-1/3 text-base/27">
          <p>
            Shape the Future With Your Words—Start Your Blogging Journey Today!
          </p>
        </div>
        <div className="w-[430px] bg-white p-8 rounded-2xl shadow-lg">
          {/* Header Title */}
          <div className="flex justify-center mb-4">
            <h2 className="text-3xl font-semibold text-center">
              {isLoginMode ? "Login" : "Sign Up"}
            </h2>
          </div>

          {/* Tab Controls */}

          <div className="relative flex h-12 mb-6 border border-gray-300 rounded-full overflow-hidden">
            <button
              onClick={() => setIsLoginMode(true)}
              className={`w-1/2 text-lg font-medium transition-all z-10 ${
                isLoginMode ? "text-white" : "text-black"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLoginMode((curr) => !curr)}
              className={`w-1/2 text-lg font-medium transition-all z-10 ${
                !isLoginMode ? "text-white" : "text-black"
              }`}
            >
              Sign Up
            </button>
            <div
              className={`absolute top-0 h-full w-1/2 rounded-full bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-200 ${
                isLoginMode ? "left-0" : "left-1/2"
              }`}
            ></div>
          </div>

          {/* form Section */}
          {!isLoginMode ? (
            <form action="" className="space-y-4" onSubmit={handleSignUp}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400"
                placeholder="name"
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                placeholder="email address"
                required
                className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                placeholder="password"
                className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400"
              />
              <input
                type="password"
                name="confirm password"
                className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400"
                placeholder="Confirm Password"
              />

              {/* Shared Button */}

              <button className="w-full p-3 bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-200 text-white rounded-full text-lg font-medium hover:opacity-90 transition">
                 Sign Up
              </button>
            </form>
          ) : (
            <form action="" className="space-y-4" onSubmit={handleLogin}>
              <input
                type="email"
                value={email}
                 onChange={(e) => setEmail(e.target.value)}
                name="email"
                placeholder="email address"
                required
                className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400"
              />
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400"
              />
              {/* Forget Password for login */}

              <div className="text-right">
                <p className="text-cyan-600 hove:underline">Forget Password</p>
              </div>
              <button className="w-full p-3 bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-200 text-white rounded-full text-lg font-medium hover:opacity-90 transition">
                Login
              </button>
            </form>
          )}

          <p className="text-center mt-4 text-gray-600">
            {isLoginMode ? "Don't have a Account" : "Already have an Account"}
            <a
              href="#"
              className="text-cyan-600 hover: underline"
              onClick={(e) => setIsLoginMode((curr) => !curr)}
            >
              {isLoginMode ? "Signup Now" : "Login"}
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
