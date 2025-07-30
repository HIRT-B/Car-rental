import { useEffect, useState } from "react";
import axios from "axios";
import CardProducthome from "../components/CradProducthome";
import { NavLink } from "react-router-dom";

export default function Home() {
    const [cars, setCar] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/car/cars')
            .then(res => setCar(res.data))
            .catch(err => console.error('Error fetching cars:', err));
    }, [])
    return (
        <>
            <div className="home">
                <div className="row container-fluid " style={{ backgroundColor: "#030305" }}>
                    <div className="col-md-6">
                        <div className="d-flex justify-content-center align-items-center" style={{ marginTop: "80px" }}>
                            <div className="contant-text px-4">
                                <h5 className="fw-semibold">Rent cars</h5>
                                <h1 className="display-1 fw-bold">Easily</h1>
                                <p className="mt-3 mb-4">
                                    Get access to rent our luxury cars for your premium events at affordable prices.
                                </p>
                                <a
                                    href="/all-cars"
                                    className="btn-home"

                                >
                                    ➜ GET STARTED
                                </a>

                            </div>
                        </div>
                    </div>
                    <div className="Herosection col-md-6"></div>
                </div>


                <section className="text-white py-5" style={{
                    backgroundColor: "#121212", marginBottom: "5rem", background: "linear-gradient(to right, #111, #1a1a1a)",
                    color: "#fff",
                    boxShadow: "0px 20px 60px rgba(244, 192, 76, 0.1)",
                }}>
                    <div className="container text-center">
                        <h2 className="fw-bold mb-3 section-title">About SwiftRide</h2>
                        <p className=" mx-auto" style={{
                            maxWidth: "720px",
                            fontSize: "1.1rem",
                            lineHeight: "1.8",
                            color: "#ccc",
                        }}>
                            At <span style={{ color: "#f4c04c" }}>SwiftRide</span>, we believe renting a car should be simple, affordable, and accessible to everyone.
                            Whether you're traveling for work, vacation, or daily needs — we’re here to offer reliable, stylish, and safe vehicles tailored to your lifestyle.
                        </p>
                        <NavLink to={"/about"} className="btn-home">See more about us</NavLink>
                    </div>
                </section>




                <section className="why-choose">
                    <h2 className="section-title">Why Choose SwiftRide</h2>
                    <div className="cards">
                        <div className="card1">
                            <div className="icon-circle mb-3 mx-auto bg-warning text-dark">
                                <i className="bi bi-award"></i>
                            </div>
                            <h3 className="text-light">Best Price</h3>
                            <p>Enjoy competitive pricing with no hidden fees. We offer affordable rates without compromising on quality or service.</p>
                        </div>
                        <div className="card1 highlighted">
                            <div className="icon-circle mb-3 mx-auto bg-dark text-warning">
                                <i className="bi bi-shield-lock"></i>
                            </div>
                            <h3>Fast and Safe</h3>
                            <p>Book in minutes and drive with confidence. Our vehicles are regularly inspected to ensure your safety and comfort.</p>
                        </div>
                        <div className="card1">
                            <div className="icon-circle mb-3 mx-auto bg-warning text-dark">
                                <i className="bi bi-person-check"></i>
                            </div>
                            <h3 className="text-light">Experienced Drivers</h3>
                            <p>Our professional drivers are trained, courteous, and know the roads well—ensuring a smooth and reliable ride every time.</p>
                        </div>
                    </div>
                </section>
                {/*section collection */}
                <section className="container py-5 text-center">
                    <h2 className=" mb-4 section-title">Book from our collection</h2>
                    <p style={{ color: '#ccc' }}>Whether you're heading out for business or leisure, we have the perfect car for you.</p>

                    <div className="row justify-content-center mt-4 g-4" >
                        <div className="container mt-5">
                            <div className="row" style={{marginTop:"-2rem"}}>
                                {cars.slice(0, 3).map(car => (
                                    <div className="col-md-4 mb-3" key={car.id}>
                                        <CardProducthome car={car} />
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                    <NavLink to={"/all-cars"} className="btn-home" style={{marginTop:"2rem"}}>See All Cars</NavLink>
                </section>
                {/*section gallery */}

                <section className="container py-5 text-center">
                    <h2 className="section-title" style={{marginTop:"-1rem"}}>Our Gallery</h2>

                    <div id="multiImageCarousel" style={{marginTop:"-2rem",marginBottom:"2rem"}} className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000" data-bs-pause="false">

                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#multiImageCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#multiImageCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#multiImageCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            <button type="button" data-bs-target="#multiImageCarousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
                            <button type="button" data-bs-target="#multiImageCarousel" data-bs-slide-to="4" aria-label="Slide 5"></button>
                        </div>
                        {/*Slides (each slide has 4 images) */}
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="row">
                                    <div className="col-3"><img src="/public/merc1.jpg" className="d-block w-100" alt="1" /></div>
                                    <div className="col-3"><img src="/public/rang3.jpg" className="d-block w-100" alt="2" /></div>
                                    <div className="col-3"><img src="/public/audi1.jpg" className="d-block w-100" alt="3" /></div>
                                    <div className="col-3"><img src="/public/ford2.jpg" className="d-block w-100" alt="4" /></div>
                                </div>
                            </div>


                            <div className="carousel-item">
                                <div className="row">
                                    <div className="col-3"><img src="/public/ford1.jpg" className="d-block w-100" alt="5" /></div>
                                    <div className="col-3"><img src="/public/car1.jpg" className="d-block w-100" alt="6" /></div>
                                    <div className="col-3"><img src="/public/raang2.jpg" className="d-block w-100" alt="7" /></div>
                                    <div className="col-3"><img src="/public/audi2.jpg" className="d-block w-100" alt="8" /></div>
                                </div>
                            </div>


                            <div className="carousel-item">
                                <div className="row">
                                    <div className="col-3"><img src="/public/rang3.jpg" className="d-block w-100" alt="9" /></div>
                                    <div className="col-3"><img src="/public/car3.jpg" className="d-block w-100" alt="10" /></div>
                                    <div className="col-3"><img src="/public/audi3.jpg" className="d-block w-100" alt="11" /></div>
                                    <div className="col-3"><img src="/public/car2.jpg" className="d-block w-100" alt="12" /></div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/*benefits section */}

                <section class="perks-section py-5">
                    <div class="container text-center">
                        <p class="featured-title">Benefit</p>
                        <h2 class="perks-title mb-5">Perks & Benefit</h2>

                        <div class="row justify-content-center">
                            <div class="col-md-4 mb-4">
                                <div class="perk-box">
                                    <i class="bi bi-cash-coin perk-icon"></i>
                                    <h5 class="perk-title">Quick Payment</h5>
                                    <p class="perk-desc">Experience instant and secure payments no delays,
                                        no hassle, just smooth transactions.</p>
                                </div>
                            </div>
                            <div class="col-md-4 mb-4">
                                <div class="perk-box">
                                    <i class="bi bi-piggy-bank perk-icon"></i>
                                    <h5 class="perk-title">Affordable Prices</h5>
                                    <p class="perk-desc">LGet the best rides without breaking the bank premium service at the right price</p>
                                </div>
                            </div>
                            <div class="col-md-4 mb-4">
                                <div class="perk-box">
                                    <i class="bi bi-percent perk-icon"></i>
                                    <h5 class="perk-title">Big Deals</h5>
                                    <p class="perk-desc">Take advantage of our hottest offers and seasonal discounts, exclusively on SwiftRide</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* feedback */}

                <div className="container py-5 text-center">
                    <h2 className="fw-bold mb-4 section-title">What Our Clients Are Saying</h2>
                    <p style={{ color: '#ccc', marginBottom: '40px' }}>See why so many customers choose us for fast, reliable, and affordable car rentals.</p>

                    <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="4000">
                        <div className="carousel-inner">


                            <div className="carousel-item active">
                                <div className="row">
                                    <div className="col-md-4 mb-4">
                                        <div className="testimonial-card">
                                            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Client 1" />
                                            <div className="stars">★★★★★</div>
                                            <p>SwiftRide made renting a car incredibly easy. The booking was fast, the car was spotless, and the whole experience felt professional. Highly recommended!</p>
                                            <h6>Felix Brandon</h6>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mb-4">
                                        <div className="testimonial-card">
                                            <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Client 2" />
                                            <div className="stars">★★★★★</div>
                                            <p>I’ve used SwiftRide multiple times and they’ve been consistent every time. Booking is smooth, staff are polite, and the cars are always in top condition.</p>
                                            <h6>Abraham Landon</h6>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mb-4">
                                        <div className="testimonial-card">
                                            <img src="https://randomuser.me/api/portraits/women/56.jpg" alt="Client 3" />
                                            <div className="stars">★★★★★</div>
                                            <p>I was visiting for the weekend and needed a reliable car. The booking process was smooth and the car was ready on time,i found exactly what i'm lookin for!</p>
                                            <h6>Rebecca Sylvester</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="carousel-item">
                                <div className="row">
                                    <div className="col-md-4 mb-4">
                                        <div className="testimonial-card">
                                            <img src="https://randomuser.me/api/portraits/men/77.jpg" alt="Client 4" />
                                            <div className="stars">★★★★★</div>
                                            <p>Great value for money! SwiftRide gave me the best deal with no hidden fees. Everything was transparent and easy to manage.</p>
                                            <h6>John Smith</h6>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mb-4">
                                        <div className="testimonial-card">
                                            <img src="https://randomuser.me/api/portraits/women/70.jpg" alt="Client 5" />
                                            <div className="stars">★★★★★</div>
                                            <p>As someone who rents often, I’ve tried several companies. SwiftRide stands out for its clean cars, fair prices, and amazing support.</p>
                                            <h6>Emily Moore</h6>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mb-4">
                                        <div className="testimonial-card">
                                            <img src="https://randomuser.me/api/portraits/women/90.jpg" alt="Client 6" />
                                            <div className="stars">★★★★★</div>
                                            <p>I was in town for a short trip and SwiftRide gave me exactly what I needed — a reliable car and no hassle. I’ll definitely rent from them again.</p>
                                            <h6>Sarah Lee</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>


                        <div className="carousel-indicators mt-4">
                            <button type="button" data-bs-target="#testimonialCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#testimonialCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}