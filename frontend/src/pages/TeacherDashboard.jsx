import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function TeacherDashboard() {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");

  const cards = [
    { title: "Add Student", icon: "➕", path: "/add-student", color: "#6366f1" },
    { title: "Bulk Add Student",  icon: "📋", path: "/bulk-add-student", color: "#10b981" },
    { title: "Student List", icon: "👥", path: "/student-list", color: "#f59e0b" },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f1f5f9" }}>
      <Navbar />
      <div className="container py-5">
        <h2 className="fw-bold mb-1" style={{ color: "#0f172a" }}>Welcome, {name} </h2>
        <p className="text-muted mb-4" style={{ fontSize: "1rem" }}>Select an action to manage students</p>
        

        <div className="row g-4">
          {cards.map((c) => (
            <div className="col-md-4" key={c.path}>
              <div
                className="card-modern bg-white p-4 h-100"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(c.path)}
              >
                <div
                  className="d-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "14px",
                    backgroundColor: `${c.color}18`,
                    fontSize: "1.6rem",
                  }}
                >
                  {c.icon}
                </div>
                <h5 className="fw-bold" style={{ color: "#0f172a" }}>{c.title}</h5>
                <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;