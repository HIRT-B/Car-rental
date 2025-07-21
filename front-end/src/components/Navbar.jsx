import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <>
            <nav className="navbar  navbar-expand-lg px-4 py-3 " style={{backgroundColor:"#000000"}}>
                <div className="container-fluid">
                    <NavLink className="" href="#">
                        <img className="logo" src="../public/logo.png" alt="" />
                    </NavLink>
                    <div className="collapse navbar-collapse justify-content-center">
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to={"/"} className="nav-link active text-light"  href="#"><strong>Home</strong></NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={"/cars"} className="nav-link text-light" href="#"><strong>Cars</strong></NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={"/about"} className="nav-link text-light" href="#"><strong>About us</strong></NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={"/booking"} className="nav-link text-light" href=""><strong>Booking</strong></NavLink>
                            </li>
                            <li className="nav-item mt-3">
                                <NavLink to={"/contact"} className="contact-btn" href=""><strong>Log in</strong></NavLink>
                            </li>
                            <li className="nav-item mt-3 mx-5">
                                <NavLink to={"/contact"} className="sign-btn" href=""><strong>Sing up</strong></NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>



        </>
    )
}