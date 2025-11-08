import { useEffect, useState } from "react";
import { api } from "../services/api";
import PrescriptionForm from "./PrescriptionForm";

export default function PrescriptionList() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchData = async () => {
    try {
      const res = await api.get("/prescriptions");
      // axios returns data in res.data; if using fetch-style you might need to adjust
      setPrescriptions(res.data || []);
    } catch (e) {
      console.error("Failed to fetch prescriptions", e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      await api.delete(`/prescriptions/${id}`);
      fetchData();
    }
  };

  const handleApply = async () => {
    // Read the two date inputs (safer selector using the class)
    const inputs = Array.from(document.querySelectorAll('input[type="date"].filter-input'));
    const fromDate = inputs[0]?.value || "";
    const toDate = inputs[1]?.value || "";

    // Build query params only for values that exist
    const params = {};
    if (fromDate) params.from = fromDate;
    if (toDate) params.to = toDate;

    try {
      // Call backend with query params; the existing api helper uses axios which accepts { params }
      const res = await api.get("/prescriptions", { params });
      setPrescriptions(res.data || []);
    } catch (err) {
      console.error("Failed to fetch prescriptions for date range", err);
      // keep UX simple for now — inform the user and leave previous data intact
      alert("Failed to load prescriptions. Check console for details.");
    }
  };

  if (editing) {
    return (
      <div className="page-container">
        <div className="card">
          <PrescriptionForm
            selected={editing}
            onCancel={() => { setEditing(null); fetchData(); }}
            onSaved={() => {
              setEditing(null);
              fetchData();
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="top-row">
        <h2 className="page-title">Prescription List</h2>
        <button className="create-btn" onClick={() => setEditing({})}>+ Create New</button>
      </div>

      <div className="filter-box">
        <div>
          <label className="text-muted">From</label>
          <input className="filter-input" type="date" />
        </div>
        <div>
          <label className="text-muted">To</label>
          <input className="filter-input" type="date" />
        </div>
        <button className="apply-btn" onClick={handleApply}>Apply</button>
      </div>

      <div className="card">
        <h3 style={{marginTop:0}}>Prescriptions</h3>
        <div style={{overflowX:'auto'}}>
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Patient Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Diagnosis</th>
                <th>Next Visit</th>
                <th style={{textAlign:'right'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{textAlign:'center', padding:'24px'}} className="text-muted">No prescriptions found for the selected date range.</td>
                </tr>
              ) : (
                prescriptions.map((p) => (
                  <tr key={p.id}>
                    <td>{p.prescriptionDate}</td>
                    <td>{p.patientName}</td>
                    <td>{p.patientAge}</td>
                    <td>{p.patientGender}</td>
                    <td title={p.diagnosis}>{p.diagnosis || 'N/A'}</td>
                    <td>{p.nextVisitDate || '-'}</td>
                    <td className="actions">
                      <button className="pill" onClick={() => setEditing(p)}>Edit</button>
                      <button className="pill" style={{background:'#fee2e2', color:'#b91c1c'}} onClick={() => handleDelete(p.id)}>Delete</button>
                    </td>
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
