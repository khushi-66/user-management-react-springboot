import './footer.css';
export default function Footer() {
  return (
    <footer className=" text-white mt-auto pt-5 pb-3"  style={{background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)"}}>
      <div className="container text-center text-md-start">

        <div className="row">

          {/* Project Info */}
          <div className="col-md-6 mb-3">
            <h5 className="fw-bold">
              <i className="bi bi-people-fill me-2 text-primary"></i>
              User Management System
            </h5>
            <p style={{ fontSize: "14px", opacity: 0.8 }}>
              A full-stack application built with React & Spring Boot 
              featuring CRUD operations, authentication, and role-based access.
            </p>
          </div>

          
          <div className="col-md-3 mb-3">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <a href="/save" className="text-white text-decoration-none">
                  Add User
                </a>
              </li>
              <li>
                <a href="/showusers" className="text-white text-decoration-none">
                  Manage Users
                </a>
              </li>
            </ul>
          </div>

          
          <div className="col-md-3 mb-3">
            <h6 className="fw-bold">Connect</h6>

            <a 
              href="https://github.com/khushi-66" 
              target="_blank" 
              className="text-white me-3 fs-5"
            >
              <i className="bi bi-github"></i>
            </a>

            <a 
              href="https://linkedin.com/in/khushi-sahu989718b/" 
              target="_blank" 
              className="text-white fs-5"
            >
              <i className="bi bi-linkedin"></i>
            </a>

          </div>

        </div>

        <hr style={{ opacity: 0.2 }} />

        
        <div className="text-center" style={{ fontSize: "13px", opacity: 0.7 }}>
          © 2026 User Management System | Developed by <b>Khushi Sahu</b>
        </div>

      </div>
    </footer>
  );
}