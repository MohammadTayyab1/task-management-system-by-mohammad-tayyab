import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", formData);
      localStorage.setItem("user", JSON.stringify(res.data));
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2 style={styles.title}>Task Manager</h2>
        <p style={styles.subtitle}>Login to manage your tasks</p>

        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Login
        </button>

        <p style={styles.text}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f1f5f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif"
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#ffffff",
    padding: "32px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.12)"
  },
  title: {
    fontSize: "30px",
    marginBottom: "8px",
    color: "#0f172a",
    textAlign: "center"
  },
  subtitle: {
    color: "#64748b",
    marginBottom: "24px",
    textAlign: "center"
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    marginBottom: "14px",
    border: "1px solid #cbd5e1",
    borderRadius: "10px",
    fontSize: "15px"
  },
  button: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    background: "#2563eb",
    color: "#ffffff",
    fontSize: "16px",
    cursor: "pointer"
  },
  text: {
    marginTop: "18px",
    textAlign: "center",
    color: "#475569"
  }
};

export default Login;