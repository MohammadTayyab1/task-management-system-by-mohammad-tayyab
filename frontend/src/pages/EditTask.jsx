import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";

function EditTask() {
  const { id } = useParams();
  const [task, setTask] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await api.get(`/tasks/${id}`);
        setTask(res.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load task");
      }
    };
    fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/tasks/${id}`, task);
      toast.success("Task updated successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update task");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", padding: "20px", background: "#fff", borderRadius: "10px" }}>
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "12px" }}>
        <input placeholder="Title" value={task.title || ""} onChange={(e) => setTask({ ...task, title: e.target.value })} required />
        <textarea placeholder="Description" value={task.description || ""} onChange={(e) => setTask({ ...task, description: e.target.value })} />
        <select value={task.status || "pending"} onChange={(e) => setTask({ ...task, status: e.target.value })}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select value={task.priority || "low"} onChange={(e) => setTask({ ...task, priority: e.target.value })}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input type="date" value={task.dueDate?.slice(0, 10) || ""} onChange={(e) => setTask({ ...task, dueDate: e.target.value })} />
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
}

export default EditTask;