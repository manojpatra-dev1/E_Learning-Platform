import { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";

function BulkAddStudent() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const res = await api.post("/ai/agent/", { text, action: "bulk_add_student" });
      setResult(res.data);
      setText("");
    } catch (err) {
      setError("Kuch galat ho gaya, dobara try karo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f1f5f9" }}>
      <Navbar />
      <div className="d-flex justify-content-center mt-5 px-3">
        <div className="card-modern bg-white p-5" style={{ width: "620px" }}>
          <div className="d-flex align-items-center gap-2 mb-2">
            <span style={{ fontSize: "1.6rem" }}>📋</span>
            <h4 className="fw-bold mb-0" style={{ color: "#0f172a" }}>Bulk Add Student</h4>
          </div>
          <p className="text-muted mb-4" style={{ fontSize: "0.85rem" }}>
            Enter student details in the following format: <br />
            <strong>Name roll_number class phone_number</strong> <br />
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <textarea
                className="form-control form-control-modern"
                rows="5"
                placeholder="Priya roll 14 class 10 phone 9123456780, Aman roll 15 class 9 phone 9988776655."
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-modern btn-primary-modern w-100" disabled={loading}>
              {loading ? "Processing..." : "Add Students"}
            </button>
          </form>

          {error && <div className="alert alert-danger mt-3">{error}</div>}

          {result && (
  <div className="mt-4 p-3" style={{ backgroundColor: "#f0fdf4", borderRadius: "12px", border: "1px solid #bbf7d0" }}>
    <strong style={{ color: "#15803d" }}>✅ {result.result.length} students added</strong>
    <table className="table table-sm mt-3 mb-0">
      <thead>
        <tr><th>Name</th><th>Username</th><th>Password</th></tr>
      </thead>
      <tbody>
        {result.result.map((s, i) => (
          <tr key={i}>
            <td>{s.name}</td>
            <td>{s.username}</td>
            <td>{s.password}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
        </div>
      </div>
    </div>
  );
}

export default BulkAddStudent;