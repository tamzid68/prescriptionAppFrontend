import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Report() {
  const [report, setReport] = useState([]);

  useEffect(() => {
    api.get("/prescriptions/report").then((res) => setReport(res.data || []));
  }, []);

  return (
    <div className="page-container">
      <div className="top-row">
        <h2 className="text-2xl font-semibold">Daily Report</h2>
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
        <button className="apply-btn">Apply</button>
      </div>

      <div className="card">
        <h3 style={{marginTop:0}}>Prescription Report</h3>
        <div style={{overflowX:'auto'}}>
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Prescription Count</th>
              </tr>
            </thead>
            <tbody>
              {report.length === 0 ? (
                <tr>
                  <td colSpan="2" style={{textAlign:'center', padding:'24px'}} className="text-muted">No report data found for the selected date range.</td>
                </tr>
              ) : (
                report.map((item) => (
                  <tr key={item.date}>
                    <td>{item.date}</td>
                    <td>{item.count}</td>
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
