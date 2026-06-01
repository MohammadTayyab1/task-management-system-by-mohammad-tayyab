import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.code}>404</h1>
        <h2 style={styles.title}>Page Not Found</h2>
        <p style={styles.text}>The page you are looking for does not exist.</p>

        <Link to="/dashboard" style={styles.button}>
          Back to Dashboard
        </Link>
      </div>
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
    background: "#ffffff",
    padding: "36px",
    borderRadius: "16px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.12)"
  },
  code: {
    fontSize: "60px",
    margin: 0,
    color: "#2563eb"
  },
  title: {
    color: "#0f172a"
  },
  text: {
    color: "#64748b",
    marginBottom: "24px"
  },
  button: {
    background: "#2563eb",
    color: "#ffffff",
    padding: "11px 18px",
    borderRadius: "10px",
    textDecoration: "none"
  }
};

export default NotFound;