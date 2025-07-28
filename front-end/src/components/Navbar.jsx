import { NavLink, useNavigate, useParams } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

export default function Navbar({ user, setUser }) {
    const {id} =useParams()


    const handleLogout = (e) => {
        e.preventDefault()
        setUser(null);
        window.location.reload();
    };

    return (
        <nav className="navbar navbar-expand-lg px-4 py-1 fixed-top" style={{ backgroundColor: "#000000" }}>
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    <img className="logo" src="/logo.png" alt="Logo" />
                </NavLink>

                <div className="collapse navbar-collapse justify-content-center">
                    <ul className="navbar-nav mb-2 mb-lg-0">
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

                        {!user && (
                            <> <div className="d-flex">
                                <li className="nav-item mt-3">
                                    <NavLink to="/login" className="contact-btn">
                                        <strong>Log in</strong>
                                    </NavLink>
                                </li>
                                <li className="nav-item mt-3 mx-5">
                                    <NavLink to="/register" className="sign-btn">
                                        <strong>Sign up</strong>
                                    </NavLink>
                                </li>
                            </div>
                            </>


                        )

                        }
                        {user && <>
                            <div className="d-flex" style={{ marginLeft: "300px" }}>
                                <li className="nav-item text-light mx-5 mt-2">
                                    <NavLink
                                        to={`/myaccount/${id}`}
                                        style={{
                                            textDecoration: "none",
                                            color: "#f4c04c", // لون النص
                                            fontWeight: "600",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
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
                                        <strong>
                                            {user.name || (
                                                <FaUserAlt
                                                    style={{
                                                        color: "#f4c04c",
                                                        fontSize: "40px",
                                                        boxShadow: "0 0 10px rgba(244, 192, 76, 0.5)",
                                                        borderRadius: "50%",
                                                        padding: "6px",
                                                        backgroundColor: "#111",
                                                        transition: "all 0.3s ease-in-out",
                                                    }}
                                                />
                                            )}
                                        </strong>
                                    </NavLink>
                                </li>

                            <li className="nav-item mt-1 mx-3">
                                <button onClick={handleLogout} style={{
                                    backgroundColor: "#000",
                                    color: "#fff",
                                    padding: "10px 26px",
                                    borderRadius: "30px",
                                    border: "1px solid #d32f2f",
                                    fontWeight: "600",
                                    fontSize: "15px",
                                    cursor: "pointer",
                                    boxShadow: "0 0 12px rgba(211, 47, 47, 0.5)", // shadow hmer
                                    textShadow: "0 0 6px rgba(255, 0, 0, 0.4)", // glow f l text
                                    transition: "all 0.3s ease-in-out",
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
                                    }}>Log out</button>
                            </li>
                        </div>
                    </>}
                </ul>
            </div>
        </div>
        </nav >
    );
}
