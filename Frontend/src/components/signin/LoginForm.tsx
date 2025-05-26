import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom"; // ✅ import useNavigate
import { SignIn } from "../../service/https";
import toast, { Toaster } from "react-hot-toast";
import { SignInInterface } from "../../interface/ISignIn";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState(""); // เปลี่ยนจาก email เป็น username
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (!username || !password) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const signInData: SignInInterface = {
      username,
      password,
    };

    try {
      const result = await SignIn(signInData);

      if (result && result.role && result.token) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("id", result.id);
        localStorage.setItem("role", result.role);
        toast.success("เข้าสู่ระบบสำเร็จ!");

        setTimeout(() => {
          if (result.role === "admin") {
            navigate("/dashboard");
          } else if (result.role === "member") {
            navigate("/Home");
          }
        }, 600);
      } else {
        toast.error("ไม่สามารถเข้าสู่ระบบได้ กรุณาลองใหม่อีกครั้ง");
      }
    } catch (error) {
      console.error("Failed to sign in:", error);
      toast.error("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fbe2e0]">
      <div className="bg-white w-[400px] p-10 rounded-[30px] shadow-md">
        <h2 className="text-3xl font-bold text-pink1 text-center mb-10 font-poppins">
          Login
        </h2>

        {/* Username Field */}
        <div className="mb-6">
          <TextField
            fullWidth
            required
            label="Username"
            variant="standard"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Password Field */}
        <div className="mb-10">
          <TextField
            fullWidth
            required
            label="Password"
            type="password"
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Login Button */}
        <div
          className="w-full py-3 text-center cursor-pointer rounded-full bg-gradient-to-r from-pink-400 to-red-400 text-white text-lg font-semibold font-poppins shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
          onClick={handleSignIn}
        >
          Login
        </div>

        {/* Register Link */}
        <p className="text-center mt-6 text-[15px] font-poppins">
          <span className="text-black">Don&#39;t have an account? </span>
          <Link to="/Register" className="text-[#9db6d9] underline cursor-pointer">
            Register
          </Link>
        </p>
      </div>
      <Toaster />
    </div>
  );
};

export default LoginForm;
