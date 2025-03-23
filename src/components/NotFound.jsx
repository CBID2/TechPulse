import "./styles/notfound.css";  

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="text-center">
        <h1 className="error-title">404</h1>
        <div className="not-found-banner">Page Not Found</div>
        <p className="message">Oops! The page you're looking for doesn't exist.</p>
      </div>
    </div>
  );
}
