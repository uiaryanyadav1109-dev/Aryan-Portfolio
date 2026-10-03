import { ArrowLeft, Home } from "lucide-react";

function NotFound() {
  return (
    <main className="not-found">

      <div className="not-found-grid"></div>

      <div className="not-found-content">

        <div className="not-found-code">
          404
        </div>

        <div className="not-found-label">
          PAGE NOT FOUND
        </div>

        <h1>
          Looks like this page
          <span className="gradient-text">
            doesn't exist.
          </span>
        </h1>

        <p>
          The page you're looking for may have been
          moved, deleted, or never existed.
        </p>

        <div className="not-found-buttons">

          <a
            href="/"
            className="btn btn-primary"
          >
            <Home size={17} />
            Back Home
          </a>

          <button
            className="btn btn-secondary"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={17} />
            Go Back
          </button>

        </div>

      </div>
    </main>
  );
}

export default NotFound;