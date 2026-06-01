import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
      const res = await api.post("/auth/register", formData);
      localStorage.setItem("user", JSON.stringify(res.data));
      toast.success("Account created successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Start managing your tasks professionally</p>

        <input
          type="text"
          name="name"
          placeholder="Full name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />

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
          Register
        </button>

        <p style={styles.text}>
          Already have an account? <Link to="/">Login</Link>
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

export default Register;