import { NavLink, useNavigate, useParams } from "react-router-dom";
import { FaUserAlt, FaSignInAlt, FaUserPlus } from "react-icons/fa";

export default function Navbar({ user, setUser }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const iconBtnStyle = {
    backgroundColor: "#000",
    color: "#f4c04c",
    border: "1.5px solid #f4c04c",
    borderRadius: "50%",
    width: "44px",
    height: "44px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    fontSize: "22px",
    marginLeft: "10px", // مسافة صغيرة بينهم
    transition: "all 0.3s ease",
  };

  const iconBtnHoverStyle = {
    backgroundColor: "#f4c04c",
    color: "#000",
  };

  return (
    <nav className="navbar navbar-expand-lg px-4 py-1 fixed-top" style={{ backgroundColor: "#000" }}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <NavLink className="navbar-brand" to="/">
          <img className="logo" src="/logo.png" alt="Logo" />
        </NavLink>

        {/* القايمة الوسطية */}
        <ul className="navbar-nav mb-2 mb-lg-0 d-flex flex-row gap-4">
          <li className="nav-item">
            <NavLink to="/" className="nav-link active text-light">
              <strong>Home</strong>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/all-cars" className="nav-link text-light">
              <strong>Cars</strong>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className="nav-link text-light">
              <strong>About Us</strong>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact" className="nav-link text-light">
              <strong>Contact Us</strong>
            </NavLink>
          </li>
        </ul>

        {/* الجهة اليمنى - أيقونات الدخول والتسجيل أو حساب المستخدم */}
        <div className="d-flex align-items-center">
          {!user && (
            <>
              <NavLink
                to="/login"
                style={iconBtnStyle}
                onMouseEnter={(e) => Object.assign(e.currentTarget.style, iconBtnHoverStyle)}
                onMouseLeave={(e) => Object.assign(e.currentTarget.style, iconBtnStyle)}
                title="Log in"
              >
                <FaSignInAlt />
              </NavLink>

              <NavLink
                to="/register"
                style={iconBtnStyle}
                onMouseEnter={(e) => Object.assign(e.currentTarget.style, iconBtnHoverStyle)}
                onMouseLeave={(e) => Object.assign(e.currentTarget.style, iconBtnStyle)}
                title="Sign up"
              >
                <FaUserPlus />
              </NavLink>
            </>
          )}

          {user && (
            <>
              <NavLink
                to={`/myaccount/${id}`}
                style={{
                  color: "#f4c04c",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  textDecoration: "none",
                  fontSize: "1.2rem",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.textShadow = "0 0 8px rgba(244, 192, 76, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.textShadow = "none";
                }}
              >
                {user.name || (
                  <FaUserAlt
                    style={{
                      color: "#f4c04c",
                      fontSize: "32px",
                      boxShadow: "0 0 10px rgba(244, 192, 76, 0.5)",
                      borderRadius: "50%",
                      padding: "6px",
                      backgroundColor: "#111",
                      transition: "all 0.3s ease-in-out",
                    }}
                  />
                )}
              </NavLink>

              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: "#000",
                  color: "#fff",
                  padding: "10px 26px",
                  borderRadius: "30px",
                  border: "1px solid #d32f2f",
                  fontWeight: "600",
                  fontSize: "15px",
                  cursor: "pointer",
                  boxShadow: "0 0 12px rgba(211, 47, 47, 0.5)",
                  textShadow: "0 0 6px rgba(255, 0, 0, 0.4)",
                  transition: "all 0.3s ease-in-out",
                  marginLeft: "10px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.08)";
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(255, 0, 0, 0.7)";
                  e.currentTarget.style.textShadow = "0 0 10px rgba(255, 0, 0, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 0 12px rgba(211, 47, 47, 0.5)";
                  e.currentTarget.style.textShadow = "0 0 6px rgba(255, 0, 0, 0.4)";
                }}
              >
                Log out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
