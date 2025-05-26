import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import { FiUploadCloud } from "react-icons/fi";
import { MembersInterface } from "../../interface/IMembers";
import { CreateMember } from "../../service/https/member";
import toast, { Toaster } from "react-hot-toast";

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<MembersInterface>({
    Firstname: "",
    Lastname: "",
    Email: "",
    Username: "",
    GenderID: 0, // set default as 0 to avoid 'undefined' errors
    Password: "",
    Age: 0,
    PhoneNumber: "",
  });

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [role, setRole] = useState("");
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isMedicalRole = role === "doctor" || role === "nurse";

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setLicenseFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setSubmitted(true);

    if (!username || !email || !password || !confirmPassword || !role) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Invalid email format.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!phonenumber || !/^\d{10}$/.test(phonenumber)) {
      toast.error("Invalid phone number");
      return;
    }

    if (!formData.GenderID) {
      toast.error("Please select a gender.");
      return;
    }

    if (isMedicalRole && !licenseFile) {
      toast.error("Please upload your license.");
      return;
    }

    const data: MembersInterface = {
      ...formData,
      Username: username,
      Email: email,
      Password: password,
      PhoneNumber: phonenumber,
    };

    const res = await CreateMember(data);
    if (res.status) {
      toast.success("Registration successful!");
      navigate("/SignIn");
    } else {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fbe2e0]">
      <div className="bg-white w-[400px] p-10 rounded-[30px] shadow-md">
        <Toaster />
        <h2 className="text-3xl font-bold text-pink1 text-center mb-10 font-poppins">
          Register
        </h2>

        {/* Username */}
        <div className="mb-6">
          <TextField
            fullWidth
            required
            label="Username"
            variant="standard"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={submitted && !username}
            helperText={submitted && !username ? "Username is required" : ""}
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <TextField
            fullWidth
            required
            label="Email"
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={submitted && (!email || !isValidEmail(email))}
            helperText={
              submitted && !email
                ? "Email is required"
                : submitted && !isValidEmail(email)
                ? "Invalid email format"
                : ""
            }
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <TextField
            fullWidth
            required
            label="Password"
            type="password"
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={submitted && !password}
            helperText={submitted && !password ? "Password is required" : ""}
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <TextField
            fullWidth
            required
            label="Confirm Password"
            type="password"
            variant="standard"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={submitted && (!confirmPassword || confirmPassword !== password)}
            helperText={
              submitted && !confirmPassword
                ? "Confirm your password"
                : submitted && confirmPassword !== password
                ? "Passwords do not match"
                : ""
            }
          />
        </div>

        {/* Phone Number */}
        <div className="mb-6">
          <TextField
            fullWidth
            required
            label="Phone Number"
            type="tel"
            variant="standard"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            error={submitted && (!phonenumber || !/^\d{10}$/.test(phonenumber))}
            helperText={
              submitted && !phonenumber
                ? "Phone number is required"
                : submitted && !/^\d{10}$/.test(phonenumber)
                ? "Invalid phone number format"
                : ""
            }
          />
        </div>

        {/* Gender Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Gender
          </label>
          <div className="flex gap-4">
            {[{ id: 1, label: "Female" }, { id: 2, label: "Male" }].map((g) => (
              <button
                key={g.id}
                onClick={() =>
                  setFormData({ ...formData, GenderID: g.id })
                }
                type="button"
                className={`px-4 py-2 rounded-full border transition-all duration-300 ${
                  formData.GenderID === g.id
                    ? "bg-pink-400 text-white border-pink1 shadow-md"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
          {submitted && !formData.GenderID && (
            <p className="text-red-500 text-sm mt-2">
              Please select a gender
            </p>
          )}
        </div>

        {/* Role Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Select Role:
          </label>
          <div className="flex gap-4 flex-wrap">
            {["doctor", "nurse", "user"].map((r) => (
              <label key={r} className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value={r}
                  checked={role === r}
                  onChange={(e) => setRole(e.target.value)}
                  className="mr-2"
                />
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </label>
            ))}
          </div>
          {submitted && !role && (
            <p className="text-red-500 text-sm mt-1">Please select a role</p>
          )}
        </div>

        {/* License Upload */}
        {isMedicalRole && (
          <div className="mb-10">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Upload Professional License:
            </label>
            <label className="flex items-center gap-2 justify-center w-full py-3 px-4 bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-full cursor-pointer shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
              <FiUploadCloud className="text-xl" />
              {licenseFile ? licenseFile.name : "Choose a file"}
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            {submitted && !licenseFile && (
              <p className="text-red-500 text-sm mt-2">Please upload your license</p>
            )}
          </div>
        )}

        {/* Submit Button */}
        <div
          onClick={handleSubmit}
          className="w-full py-3 text-center cursor-pointer rounded-full bg-gradient-to-r from-pink-400 to-red-400 text-white text-lg font-semibold font-poppins shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          Register
        </div>

        {/* Navigation */}
        <p className="text-center mt-6 text-[15px] font-poppins">
          <span className="text-black">Already have an account? </span>
          <Link to="/SignIn" className="text-[#9db6d9] underline cursor-pointer">
            SignIn
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
