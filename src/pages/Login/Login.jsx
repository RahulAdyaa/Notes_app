import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/Navbar/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin=async(e)=>{
    e.preventDefault()
    if(!validateEmail(email)){
        setError("Enter a valid Email address")
        return;
    }
    if(!email){
        setError("Please enter the password")
        return;
    }
    setError(null)
  }
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className=" w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-xl font-semibold text-gray-700 mb-7">Login</h4>
            <input 
                type="text"
                placeholder="email" 
                className="input-box"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                
                />
            <PasswordInput 
            value={password}
            onChange={(e)=>setpassword( e.target.value)}
            />
            {error && <p className="text-red-600 text-xs pb-1">{error}</p>}
            <button type="submit"
              className="w-full bg-blue-600 text-white py-2 mt-4 rounded hover:bg-blue-700 transition cursor-pointer">
              Login
            </button>

            <p className="text-sm text-center mt-4 p-1">
              Not registered yet?{" "}
              <Link to="/signUp" className="text-[#065acf]">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
