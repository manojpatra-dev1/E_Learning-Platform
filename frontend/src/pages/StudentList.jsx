import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStudents = async (searchQuery = "") => {
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/ai/agent/", {
        text: searchQuery,
        action: "search_students",
      });
      setStudents(res.data.result);
    } catch (err) {
      const msg = err.response?.data?.error || "Failed to fetch students. Please try again later.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchStudents(query);
  };

  const handleClear = () => {
    setQuery("");
    fetchStudents();
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f1f5f9" }}>
      <Navbar />
      <div className="container py-5">
        <div className="d-flex align-items-center gap-2 mb-4">
          <span style={{ fontSize: "1.6rem" }}>👥</span>
          <h4 className="fw-bold mb-0" style={{ color: "#0f172a" }}>Student List</h4>
        </div>

        <form onSubmit={handleSearch} className="d-flex gap-2 mb-4" style={{ maxWidth: "520px" }}>
          <input
            type="text"
            className="form-control form-control-modern"
            placeholder="e.g. class 10 students, roll number 14"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="btn-modern btn-primary-modern" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
          {query && (
            <button type="button" className="btn-modern" style={{ backgroundColor: "#e2e8f0", color: "#334155" }} onClick={handleClear}>
              Clear
            </button>
          )}
        </form>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card-modern bg-white overflow-hidden">
          <table className="table table-modern mb-0">
            <thead>
  <tr>
    <th className="py-3 px-4" style={{ backgroundColor: "#1e293b", color: "#ffffff" }}>Name</th>
    <th className="py-3" style={{ backgroundColor: "#1e293b", color: "#ffffff" }}>Username</th>
    <th className="py-3" style={{ backgroundColor: "#1e293b", color: "#ffffff" }}>Roll No</th>
    <th className="py-3" style={{ backgroundColor: "#1e293b", color: "#ffffff" }}>Class</th>
    <th className="py-3" style={{ backgroundColor: "#1e293b", color: "#ffffff" }}>Phone</th>
  </tr>
</thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" className="text-center py-5 text-muted">Loading...</td></tr>
              ) : students.length === 0 ? (
                <tr><td colSpan="5" className="text-center py-5 text-muted">No students found.</td></tr>
              ) : (
                students.map((s) => (
                  <tr key={s.id}>
                    <td className="px-4 py-3 fw-semibold">{s.name}</td>
                    <td className="py-3">{s.username}</td>
                    <td className="py-3">{s.roll_no}</td>
                    <td className="py-3">{s.class_name}</td>
                    <td className="py-3">{s.phone}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StudentList;