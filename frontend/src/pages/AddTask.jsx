import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";

function AddTask() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    dueDate: ""
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
      await api.post("/tasks", formData);
      toast.success("Task added successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add task");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Add New Task</h1>
          <p style={styles.subtitle}>Create a task and organize your work efficiently</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Task Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter task title"
              value={formData.title}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Description</label>
            <textarea
              name="description"
              placeholder="Write task description"
              value={formData.description}
              onChange={handleChange}
              required
              style={styles.textarea}
            />
          </div>

          <div style={styles.row}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.actions}>
            <button type="button" onClick={() => navigate("/dashboard")} style={styles.cancelButton}>
              Cancel
            </button>

            <button type="submit" style={styles.submitButton}>
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #eef2ff 0%, #f8fafc 45%, #e0f2fe 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    fontFamily: "Arial, sans-serif"
  },
  card: {
    width: "100%",
    maxWidth: "620px",
    background: "#ffffff",
    borderRadius: "22px",
    padding: "34px",
    boxShadow: "0 20px 50px rgba(15, 23, 42, 0.14)",
    border: "1px solid #e2e8f0"
  },
  header: {
    marginBottom: "26px",
    textAlign: "center"
  },
  title: {
    margin: 0,
    fontSize: "32px",
    color: "#0f172a"
  },
  subtitle: {
    marginTop: "8px",
    color: "#64748b",
    fontSize: "15px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px"
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flex: 1
  },
  label: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#334155"
  },
  input: {
    width: "100%",
    padding: "13px 14px",
    border: "1px solid #cbd5e1",
    borderRadius: "12px",
    fontSize: "15px",
    background: "#ffffff",
    color: "#0f172a",
    outline: "none",
    boxSizing: "border-box"
  },
  textarea: {
    width: "100%",
    minHeight: "120px",
    resize: "vertical",
    padding: "13px 14px",
    border: "1px solid #cbd5e1",
    borderRadius: "12px",
    fontSize: "15px",
    background: "#ffffff",
    color: "#0f172a",
    outline: "none",
    boxSizing: "border-box"
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px"
  },
  actions: {
    display: "flex",
    gap: "12px",
    marginTop: "8px"
  },
  cancelButton: {
    flex: 1,
    padding: "13px",
    border: "none",
    borderRadius: "12px",
    background: "#e2e8f0",
    color: "#334155",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer"
  },
  submitButton: {
    flex: 1,
    padding: "13px",
    border: "none",
    borderRadius: "12px",
    background: "#2563eb",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 10px 20px rgba(37, 99, 235, 0.25)"
  }
};

export default AddTask;