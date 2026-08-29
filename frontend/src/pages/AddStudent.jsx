import { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";

function AddStudent() {
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [className, setClassName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    const text = `Add student ${name}, roll number ${rollNo}, class ${className}, phone ${phone}`;

    try {
      const res = await api.post("/ai/agent/", { text, action: "add_student" });
      setResult(res.data);
      setName("");
      setRollNo("");
      setClassName("");
      setPhone("");
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f1f5f9" }}>
      <Navbar />
      <div className="d-flex justify-content-center mt-5 px-3">
        <div className="card-modern bg-white p-5" style={{ width: "500px" }}>
          <div className="d-flex align-items-center gap-2 mb-4">
            <span style={{ fontSize: "1.6rem" }}>➕</span>
            <h4 className="fw-bold mb-0" style={{ color: "#0f172a" }}>Add Student</h4>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold" style={{ fontSize: "0.9rem" }}>Name</label>
              <input type="text" className="form-control form-control-modern" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold" style={{ fontSize: "0.9rem" }}>Roll Number</label>
              <input type="text" className="form-control form-control-modern" value={rollNo} onChange={(e) => setRollNo(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold" style={{ fontSize: "0.9rem" }}>Class</label>
              <input type="text" className="form-control form-control-modern" value={className} onChange={(e) => setClassName(e.target.value)} required />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold" style={{ fontSize: "0.9rem" }}>Phone</label>
              <input type="text" className="form-control form-control-modern" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>

            <button type="submit" className="btn-modern btn-primary-modern w-100" disabled={loading}>
              {loading ? "Processing..." : "Add Student"}
            </button>
          </form>

          {error && <div className="alert alert-danger mt-3">{error}</div>}

         {result && (
  <div className="mt-4 p-3" style={{ backgroundColor: "#f0fdf4", borderRadius: "12px", border: "1px solid #bbf7d0" }}>
    <strong style={{ color: "#15803d" }}>✅ Student added</strong>
    <div className="mt-2" style={{ fontSize: "0.9rem" }}>
      <div>Username: <b>{result.result.username}</b></div>
      <div>Password: <b>{result.result.password}</b></div>
      <div>Name: <b>{result.result.name}</b></div>
      <div>Roll No: <b>{result.result.roll_no}</b></div>
    </div>
  </div>
)}
        </div>
      </div>
    </div>
  );
}

export default AddStudent;