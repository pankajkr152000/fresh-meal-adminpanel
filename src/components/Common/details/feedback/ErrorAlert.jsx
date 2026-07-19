const ErrorAlert = ({ message, onRetry }) => {
  return (
    <div className="alert alert-danger">
      <h5>Unable to load foods</h5>

      <p>{message}</p>

      <button
        className="btn btn-danger"
        onClick={onRetry}>
        Retry
      </button>
    </div>
  );
};

export default ErrorAlert;
