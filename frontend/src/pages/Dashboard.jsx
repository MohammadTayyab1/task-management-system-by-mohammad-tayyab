import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const navigate = useNavigate();

  const getTasks = async () => {
    try {
      const params = new URLSearchParams();

      if (search) params.append("search", search);
      if (status) params.append("status", status);
      if (priority) params.append("priority", priority);

      const res = await api.get(`/tasks?${params.toString()}`);
      setTasks(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load tasks");
    }
  };

  useEffect(() => {
    getTasks();
  }, [search, status, priority]);

  const deleteTask = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/tasks/${id}`);
      toast.success("Task deleted successfully");
      getTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete task");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((task) => task.status === "pending").length;
  const completedTasks = tasks.filter((task) => task.status === "completed").length;
  const highPriorityTasks = tasks.filter((task) => task.priority === "high").length;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Task Dashboard</h1>
            <p style={styles.subtitle}>Manage, track, and complete your work professionally</p>
          </div>

          <div>
            <Link to="/add-task" style={styles.addButton}>
              + Add Task
            </Link>

            <button onClick={logout} style={styles.logoutButton}>
              Logout
            </button>
          </div>
        </div>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <p style={styles.statLabel}>Total Tasks</p>
            <h2 style={styles.statNumber}>{totalTasks}</h2>
          </div>

          <div style={styles.statCard}>
            <p style={styles.statLabel}>Pending</p>
            <h2 style={styles.statNumber}>{pendingTasks}</h2>
          </div>

          <div style={styles.statCard}>
            <p style={styles.statLabel}>Completed</p>
            <h2 style={styles.statNumber}>{completedTasks}</h2>
          </div>

          <div style={styles.statCard}>
            <p style={styles.statLabel}>High Priority</p>
            <h2 style={styles.statNumber}>{highPriorityTasks}</h2>
          </div>
        </div>

        <div style={styles.filterBox}>
          <input
            type="text"
            placeholder="Search task by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.input}
          />

          <select value={status} onChange={(e) => setStatus(e.target.value)} style={styles.input}>
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <select value={priority} onChange={(e) => setPriority(e.target.value)} style={styles.input}>
            <option value="">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div style={styles.taskGrid}>
          {tasks.length === 0 ? (
            <div style={styles.emptyBox}>
              <h3>No tasks found</h3>
              <p>Create your first task or change your filters.</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div key={task._id} style={styles.taskCard}>
                <div style={styles.cardTop}>
                  <h3 style={styles.taskTitle}>{task.title}</h3>
                  <span style={badgeStyle(task.priority)}>{task.priority}</span>
                </div>

                <p style={styles.description}>{task.description}</p>

                <div style={styles.meta}>
                  <span>Status: </span>
                  <strong>{task.status}</strong>
                </div>

                <div style={styles.meta}>
                  <span>Due Date: </span>
                  <strong>{task.dueDate ? task.dueDate.slice(0, 10) : "No due date"}</strong>
                </div>

                <div style={styles.actions}>
                  <Link to={`/edit-task/${task._id}`} style={styles.editButton}>
                    Edit
                  </Link>

                  <button onClick={() => deleteTask(task._id)} style={styles.deleteButton}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const badgeStyle = (priority) => {
  const base = {
    padding: "5px 10px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: "600",
    textTransform: "capitalize"
  };

  if (priority === "high") {
    return { ...base, background: "#fee2e2", color: "#b91c1c" };
  }

  if (priority === "medium") {
    return { ...base, background: "#fef3c7", color: "#92400e" };
  }

  return { ...base, background: "#dcfce7", color: "#166534" };
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    fontFamily: "Arial, sans-serif",
    color: "#0f172a"
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "32px"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "24px"
  },
  title: {
    fontSize: "34px",
    margin: 0
  },
  subtitle: {
    marginTop: "6px",
    color: "#64748b"
  },
  addButton: {
    background: "#2563eb",
    color: "#fff",
    padding: "11px 16px",
    borderRadius: "10px",
    textDecoration: "none",
    marginRight: "10px",
    display: "inline-block"
  },
  logoutButton: {
    background: "#ef4444",
    color: "#fff",
    padding: "11px 16px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer"
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
    marginBottom: "22px"
  },
  statCard: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)"
  },
  statLabel: {
    margin: 0,
    color: "#64748b"
  },
  statNumber: {
    margin: "8px 0 0",
    fontSize: "32px"
  },
  filterBox: {
    background: "#ffffff",
    padding: "18px",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr",
    gap: "12px",
    marginBottom: "22px"
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    border: "1px solid #cbd5e1",
    borderRadius: "10px",
    fontSize: "15px"
  },
  taskGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "18px"
  },
  taskCard: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)"
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    marginBottom: "12px"
  },
  taskTitle: {
    margin: 0,
    fontSize: "20px"
  },
  description: {
    color: "#475569",
    lineHeight: "1.5"
  },
  meta: {
    marginTop: "8px",
    color: "#475569"
  },
  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "16px"
  },
  editButton: {
    flex: 1,
    textAlign: "center",
    background: "#f59e0b",
    color: "#fff",
    padding: "9px 12px",
    borderRadius: "10px",
    textDecoration: "none"
  },
  deleteButton: {
    flex: 1,
    background: "#ef4444",
    color: "#fff",
    padding: "9px 12px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer"
  },
  emptyBox: {
    gridColumn: "1 / -1",
    background: "#ffffff",
    padding: "32px",
    borderRadius: "16px",
    textAlign: "center",
    color: "#64748b"
  }
};

export default Dashboard;