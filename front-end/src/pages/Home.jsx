import { NavLink } from "react-router-dom";

export default function Home() {
    return (
        <>
            <div className="row container-fluid">
                <div className="col-md-6">
                    <div className="d-flex justify-content-center align-items-center" style={{ marginTop: "80px" }}>
                        <div className="contant-text px-4">
                            <h5 className="fw-semibold">Rent cars</h5>
                            <h1 className="display-1 fw-bold">Easily</h1>
                            <p className="mt-3 mb-4">
                                Get access to rent our luxury cars for your premium events at affordable prices.
                            </p>
                            <a href="#" class="btn btn-yellow">
                                ➜ GET STARTED
                            </a>
                        </div>
                    </div>
                </div>
                <div className="Herosection col-md-6"></div>
            </div>
           

            {/*Research zoon*/}
            <div className=" form-container">
                <ul className="nav nav-tabs mb-4" id="carTab">
                    <li className="nav-item">
                        <button className="btn-search nav-link active ">New Car</button>
                    </li>
                    <li className="nav-item">
                        <button className="btn-search nav-link">Used Car</button>
                    </li>
                </ul>

                <form className="row g-3">
                    <div className="col-md-3">
                        <label className="form-label">Brand Name</label>
                        <select className="form-select bg-dark text-white border-secondary">
                            <option>Mercedes-benz</option>
                            <option>BMW</option>
                            <option>Audi</option>
                            <option>volkswagen</option>
                            <option>Ford</option>
                            <option>Toyota</option>
                            <option>Dacia</option>
                            <option>Jeep</option>
                            <option>Hyundai</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label className="text-white mb-2">Select Price</label>
                        <select className="form-select bg-dark text-white border-secondary rounded">
                            <option value="">Choose Price Range</option>
                            <option value="0-100">$0 - $100</option>
                            <option value="100-200">$100 - $200</option>
                            <option value="200-500">$200 - $500</option>
                            <option value="500-1000">$500 - $1000</option>
                            <option value="1000+">$1000+</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Select Model</label>
                        <select className="form-select bg-dark text-white border-secondary">
                            <option>Decembark</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <label className="form-label">Transmission</label>
                        <select className="form-select bg-dark text-white border-secondary">
                            <option>Semi-Automatic</option>
                        </select>
                    </div>
                    <div className="col-md-1 d-flex align-items-end">
                        <button className="btnAbout ">Search</button>
                    </div>
                </form>
            </div>



            <div className="row container">
                <div className="imgAbout col-md-6"></div>

                <div className="col-md-6" style={{ marginTop: "150px" }}>
                    <div className="about-section ">
                        <h1>About us</h1>
                        <p>At <strong style={{ color: '#F4C04C' }}>SWIFTRIDE</strong> , we make car rental simple, affordable, and reliable.We offer a wide range of well-maintained cars to suit your needs. Our mission is to provide top-quality service, flexible rental options, and transparent pricing—all to ensure a smooth and enjoyable experience on the road.</p>
                        <NavLink to={'/about'} className="btnAbout">See More</NavLink>
                    </div>
                </div>
            </div>

            <section className="why-choose">
                <h2>Why Choose SwiftRide</h2>
                <div className="cards">
                    <div className="card">
                        <div className="icon-circle mb-3 mx-auto bg-warning text-dark">
                            <i className="bi bi-award"></i>
                        </div>
                        <h3 className="text-light">Best Price</h3>
                        <p>Enjoy competitive pricing with no hidden fees. We offer affordable rates without compromising on quality or service.</p>
                    </div>
                    <div className="card highlighted">
                        <div className="icon-circle mb-3 mx-auto bg-dark text-warning">
                            <i className="bi bi-shield-lock"></i>
                        </div>
                        <h3>Fast and Safe</h3>
                        <p>Book in minutes and drive with confidence. Our vehicles are regularly inspected to ensure your safety and comfort.</p>
                    </div>
                    <div className="card">
                        <div className="icon-circle mb-3 mx-auto bg-warning text-dark">
                            <i className="bi bi-person-check"></i>
                        </div>
                        <h3 className="text-light">Experienced Drivers</h3>
                        <p>Our professional drivers are trained, courteous, and know the roads well—ensuring a smooth and reliable ride every time.</p>
                    </div>
                </div>
            </section>

            <section className="container py-5 text-center">
                <h2 className="fw-bold">Book from our collection</h2>
                <p style={{ color: '#ccc' }}>Whether you're heading out for business or leisure, we have the perfect car for you.</p>

                <div className="row justify-content-center mt-4 g-4">
                    <div className="col-md-4">
                        <div className="car-card">
                            <div className="text-start mb-2">12km</div>
                            <img src="/public/collection1.png" alt="mercedes" className="car-img" />
                            <div className="car-title ">Mercedes-Maybach 6 Coupe</div>
                            <div className="d-flex justify-content-between align-items-center mt-2">
                                <div class="car-price">$200/day</div>
                                <NavLink to={'#'} className="btn-details">Details</NavLink>
                            </div>
                        </div>
                    </div>


                    <div className="col-md-4">
                        <div className="car-card">
                            <div className="text-start mb-2">12km</div>
                            <img src="/public/collection2.png" alt="Ford " className="car-img" />
                            <div className="car-title ">Ford Bronco Raptor</div>
                            <div className="d-flex justify-content-between align-items-center mt-2">
                                <div class="car-price">$80/day</div>
                                <NavLink to={'#'} className="btn-details">Details</NavLink>
                            </div>
                        </div>
                    </div>


                    <div className="col-md-4">
                        <div className="car-card">
                            <div className="text-start mb-2">12km</div>
                            <img src="/public/collection3.png" alt="jesko" className="car-img" />
                            <div className="car-title ">Koenigsegg Jesko</div>
                            <div className="d-flex justify-content-between align-items-center mt-2">
                                <div className="car-price">$300/day</div>
                                <NavLink to={'#'} className="btn-details">Details</NavLink>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="see-all-btn">See All Cars</button>
            </section>

            <section className="container py-5 text-center">
                <h2 className="fw-bold">Our Gallery</h2>

                <div id="multiImageCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000" data-bs-pause="false">

                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#multiImageCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#multiImageCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#multiImageCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        <button type="button" data-bs-target="#multiImageCarousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
                        <button type="button" data-bs-target="#multiImageCarousel" data-bs-slide-to="4" aria-label="Slide 5"></button>
                    </div>
                    {/*Slides (each slide has 4 images) */}
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="row">
                                <div className="col-3"><img src="/public/logo.png" className="d-block w-100" alt="1" /></div>
                                <div className="col-3"><img src="/public/about1.png" className="d-block w-100" alt="2" /></div>
                                <div className="col-3"><img src="/public/about3.png" className="d-block w-100" alt="3" /></div>
                                <div className="col-3"><img src="/public/collection2.png" className="d-block w-100" alt="4" /></div>
                            </div>
                        </div>


                        <div className="carousel-item">
                            <div className="row">
                                <div className="col-3"><img src="/public/hero.jpg" className="d-block w-100" alt="5" /></div>
                                <div className="col-3"><img src="/public/logo.png" className="d-block w-100" alt="6" /></div>
                                <div className="col-3"><img src="/public/arma.jpg" className="d-block w-100" alt="7" /></div>
                                <div className="col-3"><img src="/public/about3.png" className="d-block w-100" alt="8" /></div>
                            </div>
                        </div>


                        <div className="carousel-item">
                            <div className="row">
                                <div className="col-3"><img src="/public/hero.jpg" className="d-block w-100" alt="9" /></div>
                                <div className="col-3"><img src="/public/logo.png" className="d-block w-100" alt="10" /></div>
                                <div className="col-3"><img src="/public/about1.png" className="d-block w-100" alt="11" /></div>
                                <div className="col-3"><img src="/public/about3.png" className="d-block w-100" alt="12" /></div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* feedback */}




            <div className="container py-5 text-center">
                <h2 className="fw-bold mb-3">What Our Clients Are Saying</h2>
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

            <div className="form-container">
                <form className="booking-form">
                    <div className="filter-box">
                        <div className="filter-header-container">
                            <div className="left-section">
                                <span>Filter:</span>
                                <div className="driver-toggle">
                                    <button className="active">With Driver</button>
                                    <button>Without Driver</button>
                                </div>
                            </div>

                            <div className="right-section">
                                <label className="round-trip-label">
                                    Round-Trip
                                    <input type="checkbox" className="toggle" />
                                </label>
                            </div>
                        </div>

                        <div className="filter-fields">
                            <input type="text" placeholder="City, Place" />
                            <input type="text" placeholder="City, Place" />
                            <div >
                            <input type="date" value="2025-01-09" />
                            <input type="date" value="2025-01-12" />
                            <button className="book-now">Book Now</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>



       <h1>lkjhgùmlkjhùmlkijuhygtf</h1>
       <p>kjhgfjhgf</p>





        </>
    )
}