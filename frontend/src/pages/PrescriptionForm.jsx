import { useEffect, useState } from "react";
import { api, parseError } from "../services/api";
import ErrorAlert from "../components/ErrorAlert";

export default function PrescriptionForm({ selected, onSaved, onCancel }) {
  const [form, setForm] = useState({
    prescriptionDate: "",
    patientName: "",
    patientAge: "",
    patientGender: "",
    diagnosis: "",
    medicines: "",
    nextVisitDate: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (selected) setForm(selected);
  }, [selected]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selected && selected.id) {
        await api.put(`/prescriptions/${selected.id}`, form);
      } else {
        await api.post("/prescriptions", form);
      }
      onSaved();
    } catch (err) {
      // Log full error to console for easier debugging (network, CORS, server errors)
      console.error("Save prescription failed:", err);
      setError(parseError(err));
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">{selected?.id ? "Edit Prescription" : "New Prescription"}</h2>
      {error && <ErrorAlert message={error} />}

      <form onSubmit={handleSubmit} className="form">
        <div className="field">
          <label className="form-label">Prescription Date *</label>
          <input
            type="date"
            name="prescriptionDate"
            value={form.prescriptionDate || ""}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div className="field">
          <label className="form-label">Patient Name *</label>
          <input
            type="text"
            name="patientName"
            value={form.patientName || ""}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div className="field two-up">
          <div>
            <label className="form-label">Patient Age *</label>
            <input
              type="number"
              name="patientAge"
              value={form.patientAge || ""}
              onChange={handleChange}
              className="input"
              min="0"
              max="120"
              required
            />
          </div>
          <div>
            <label className="form-label">Gender *</label>
            <select
              name="patientGender"
              value={form.patientGender || ""}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div className="field">
          <label className="form-label">Diagnosis</label>
          <textarea
            name="diagnosis"
            value={form.diagnosis || ""}
            onChange={handleChange}
            className="textarea"
          ></textarea>
        </div>

        <div className="field">
          <label className="form-label">Medicines</label>
          <textarea
            name="medicines"
            value={form.medicines || ""}
            onChange={handleChange}
            className="textarea"
          ></textarea>
        </div>

        <div className="field">
          <label className="form-label">Next Visit Date</label>
          <input
            type="date"
            name="nextVisitDate"
            value={form.nextVisitDate || ""}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="actions">
          <button className="btn primary" type="submit">
            {selected?.id ? "Update" : "Create"}
          </button>
          <button type="button" className="btn secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
