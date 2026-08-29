import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Password aur Confirm Password match nahi kar rahe");
      return;
    }

    setLoading(true);
    try {
      await api.post("/accounts/register/", {
        username,
        email,
        password,
        first_name: name,
        role: "teacher",
      });
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      const msg = err.response?.data
        ? Object.values(err.response.data).flat().join(", ")
        : "Registration failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gradient-bg d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", padding: "40px 0" }}>
      <div className="card-modern bg-white p-5" style={{ width: "420px" }}>
        <div className="text-center mb-4">
          <div style={{ fontSize: "2.5rem" }}>🎓</div>
          <h3 className="fw-bold mt-2" style={{ color: "#0f172a" }}>Teacher Registration</h3>
        </div>

        {error && <div className="alert alert-danger py-2">{error}</div>}
        {success && <div className="alert alert-success py-2">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold" style={{ fontSize: "0.9rem" }}>Name</label>
            <input type="text" className="form-control form-control-modern" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold" style={{ fontSize: "0.9rem" }}>Username</label>
            <input type="text" className="form-control form-control-modern" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold" style={{ fontSize: "0.9rem" }}>Email</label>
            <input type="email" className="form-control form-control-modern" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="mb-3">
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
              <button type="button" className="btn" style={{ border: "1.5px solid #e2e8f0", borderLeft: "none", borderRadius: "0 10px 10px 0" }} onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold" style={{ fontSize: "0.9rem" }}>Confirm Password</label>
            <div className="input-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control form-control-modern"
                style={{ borderRight: "none" }}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button type="button" className="btn" style={{ border: "1.5px solid #e2e8f0", borderLeft: "none", borderRadius: "0 10px 10px 0" }} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-modern btn-primary-modern w-100" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-4 mb-0" style={{ fontSize: "0.9rem" }}>
          Already have an account? <Link to="/login" style={{ color: "#6366f1", fontWeight: 600 }}>Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;