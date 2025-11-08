export default function ErrorAlert({ message }) {
  if (!message) return null;
  return (
    <div className="error-alert" role="alert" aria-live="assertive">
      <strong>Error:</strong>
      <div className="error-message">{message}</div>
    </div>
  );
}