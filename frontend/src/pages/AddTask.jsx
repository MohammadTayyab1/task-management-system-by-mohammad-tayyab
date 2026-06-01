import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";

function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [priority, setPriority] = useState("low");
  const [dueDate, setDueDate] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/tasks", { title, description, status, priority, dueDate });
      toast.success("Task added successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add task");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

const styles = {
  container: { maxWidth: "500px", margin: "50px auto", padding: "20px", background: "#fff", borderRadius: "10px" },
  form: { display: "grid", gap: "12px" },
};

export default AddTask;