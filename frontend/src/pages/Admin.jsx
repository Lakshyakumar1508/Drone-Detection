import { useState, useEffect } from "react";
import axios from "axios";
import { Users, UserPlus, AlertCircle, CheckCircle2, Eye, EyeOff, Loader } from "lucide-react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [users, setUsers] = useState([]);

  // Get token for API requests
  const getToken = () => localStorage.getItem("token");

  // Create new user
  const handleCreateUser = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    // Validation
    if (!form.name || !form.email || !form.password) {
      setMessage({ type: "error", text: "All fields are required" });
      return;
    }

    if (form.password.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters" });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setMessage({ type: "error", text: "Invalid email format" });
      return;
    }

    setLoading(true);

    try {
      // Send JSON format to backend
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: getToken(),
          },
        }
      );

      setMessage({ type: "success", text: `User ${form.name} created successfully!` });
      setForm({ name: "", email: "", password: "", role: "user" });

      // Add user to list
      setUsers([
        ...users,
        {
          id: Date.now(),
          name: form.name,
          email: form.email,
          role: form.role,
          createdAt: new Date().toLocaleString(),
        },
      ]);

      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.msg || "Failed to create user. Check console for details.",
      });
      console.error("Error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto">
          <div className="p-8 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold text-slate-100 mb-2 flex items-center gap-3">
                  <div className="p-3 bg-blue-500/20 rounded-lg">
                    <Users className="w-8 h-8 text-blue-400" />
                  </div>
                  User Management
                </h1>
                <p className="text-slate-400 text-sm">Create and manage system users</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Create User Form */}
              <div className="lg:col-span-2">
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-6 border border-slate-700/50">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-100">
                    <UserPlus className="w-5 h-5 text-cyan-400" />
                    Create New User
                  </h2>

                  {/* Status Messages */}
                  {message.text && (
                    <div
                      className={`mb-6 p-4 rounded-lg flex items-start gap-3 border ${
                        message.type === "success"
                          ? "bg-green-500/10 border-green-500/30"
                          : "bg-red-500/10 border-red-500/30"
                      }`}
                    >
                      {message.type === "success" ? (
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      )}
                      <p
                        className={`text-sm ${
                          message.type === "success" ? "text-green-300" : "text-red-300"
                        }`}
                      >
                        {message.text}
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleCreateUser} className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="text-slate-300 text-sm font-medium block mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        disabled={loading}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-slate-300 text-sm font-medium block mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="user@example.com"
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        disabled={loading}
                      />
                    </div>

                    {/* Password */}
                    <div>
                      <label className="text-slate-300 text-sm font-medium block mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Min. 6 characters"
                          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                          value={form.password}
                          onChange={(e) => setForm({ ...form, password: e.target.value })}
                          disabled={loading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-400"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Role Selection */}
                    <div>
                      <label className="text-slate-300 text-sm font-medium block mb-2">
                        User Role
                      </label>
                      <select
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-slate-100 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        disabled={loading}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full mt-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                    >
                      {loading ? (
                        <>
                          <Loader className="w-5 h-5 animate-spin" />
                          <span>Creating User...</span>
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-5 h-5" />
                          <span>Create User</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Created Users List */}
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-6 border border-slate-700/50 h-fit">
                <h3 className="text-lg font-bold mb-4 text-slate-100 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Recently Created
                </h3>

                {users.length === 0 ? (
                  <p className="text-slate-400 text-sm text-center py-6">
                    No users created yet
                  </p>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {users.map((user) => (
                      <div
                        key={user.id}
                        className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/30"
                      >
                        <p className="font-medium text-sm text-slate-100">{user.name}</p>
                        <p className="text-xs text-slate-400 mt-1">{user.email}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                            {user.role}
                          </span>
                          <span className="text-xs text-slate-500">{user.createdAt}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
