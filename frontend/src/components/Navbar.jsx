import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const dashboardPath = role === "teacher" ? "/teacher-dashboard" : "/student-dashboard";

  return (
    <nav
      className="navbar px-4 py-3"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
      }}
    >
      <Link
        to={dashboardPath}
        className="navbar-brand fw-bold fs-4 text-decoration-none d-flex align-items-center gap-2"
        style={{ color: "#e0e7ff" }}
      >
        🎓 Pegasus E-Learning
      </Link>

     

      <button
        className="btn-modern"
        style={{ backgroundColor: "#ef4444", color: "white", padding: "8px 18px" }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;