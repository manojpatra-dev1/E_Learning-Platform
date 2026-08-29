import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f1f5f9" }}>
      <nav
        className="navbar px-4 py-3"
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)" }}
      >
        <span className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2" style={{ color: "#e0e7ff" }}>
          🎓 Pegasus E-Learning
        </span>
        <button
          className="btn-modern ms-auto"
          style={{ backgroundColor: "#ef4444", color: "white", padding: "8px 18px" }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>

      <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "80vh" }}>
        <div className="card-modern bg-white text-center p-5" style={{ width: "420px" }}>
          <div style={{ fontSize: "3rem" }}>🎓</div>
          <h2 className="fw-bold mt-3" style={{ color: "#0f172a" }}>Welcome, {name}</h2>
          <p className="text-muted mb-4" style={{ fontSize: "1rem" }}>You are logged in as a student.</p>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;