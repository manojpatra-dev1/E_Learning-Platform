import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/accounts/login/", { username, password });
      const { access, refresh } = res.data;

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      const role = res.data.role || res.data.user?.role;
      localStorage.setItem("role", role);
      localStorage.setItem("name", res.data.name || res.data.user?.name || username);

      navigate(role === "teacher" ? "/teacher-dashboard" : "/student-dashboard");
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gradient-bg d-flex justify-content-center align-items-center vh-100">
      <div className="card-modern bg-white p-5" style={{ width: "400px" }}>
        <div className="text-center mb-4">
          <div style={{ fontSize: "2.5rem" }}>🎓</div>
          <h3 className="fw-bold mt-2" style={{ color: "#0f172a" }}>Pegasus E-Learning</h3>
          <p className="text-muted" style={{ fontSize: "0.9rem" }}>Login to continue</p>
        </div>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold" style={{ fontSize: "0.9rem" }}>Username</label>
            <input
              type="text"
              className="form-control form-control-modern"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold" style={{ fontSize: "0.9rem" }}>Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control form-control-modern"
                style={{ borderRight: "none" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn"
                style={{ border: "1.5px solid #e2e8f0", borderLeft: "none", borderRadius: "0 10px 10px 0" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-modern btn-primary-modern w-100" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 mb-0" style={{ fontSize: "0.9rem" }}>
          New teacher? <Link to="/register" style={{ color: "#6366f1", fontWeight: 600 }}>Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;