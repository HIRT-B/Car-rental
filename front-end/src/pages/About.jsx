export default function About() {
  return (
    <>
     <div className="home">
      <section class="py-5">
        <div class="container">
          <h2 class="title">About Us</h2>
          <hr />
          <div class="container py-5">
            <div class="row align-items-center">


              <div class="col-md-6">
                <p class="featured-title">Featured</p>
                <h2 class="main-title">The Perfection</h2>
                <p>
                  We offer the perfect balance between comfort, reliability, and price.
                  Our carefully selected vehicles ensure a smooth and stylish journey
                  every time you hit the road.
                </p>
              </div>


              <div class="col-md-6">
                <div class="d-flex justify-content-between gap-3">


                  <div class="glow-card glow-left w-50">
                    <div class="custom-card text-center">
                      <div class="feature-icon">
                        <i class="bi  bi-cash-coin"></i>
                      </div>
                      <h5 class="fw-bold">Rental Deal</h5>
                      <p>Get 20% Off Every Weekend.
                        Rent your favorite car from Friday to Sanday only at SwiftRide.
                      </p>
                    </div>
                  </div>


                  <div class="glow-card glow-right w-50">
                    <div class="custom-card2 text-center">
                      <div class="feature-icon">
                        <i class="bi bi-headset"></i>
                      </div>
                      <h5 class="fw-bold">24/7 Support</h5>
                      <p>Our support team is available 24/7 to help you with anything you need, anytime, anywhere.</p>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

          <div class="row text-center mb-5">
            <div class="col stat-box">
              <div class="stat-number">10</div>
              <div>Years Experience</div>
            </div>
            <div class="col stat-box">
              <div class="stat-number">40+</div>
              <div>Products</div>
            </div>
            <div class="col stat-box">
              <div class="stat-number">100+</div>
              <div>Happy Customers</div>
            </div>
            <div class="col stat-box">
              <div class="stat-number">11</div>
              <div>States</div>
            </div>
          </div>
          <hr />
          <section class="vision-mission-section py-5">
            <div class="container">
              <div class="row align-items-center">
                <div class="col-md-6 mb-4 mb-md-0">
                  <div class="glow-box">
                    <h3 class="section-title">Our Vision</h3>
                    <p class="section-text">
                      To redefine car rentals by making every journey smart, smooth, and stylish — built on trust and modern comfort.
                    </p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="glow-box">
                    <h3 class="section-title">Our Mission</h3>
                    <p class="section-text">
                      To offer seamless, affordable mobility solutions that empower our clients to explore with confidence and class.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/*Core Value*/}
          <section class="core-values-section py-5">
            <div class="container">
              <h2 class="section-title mb-5 text-center">Our Core Values</h2>
              <div class="row g-4">
                <div class="col-md-4">
                  <div class="core-card text-center">
                    <i class="bi bi-shield-check icon-core"></i>
                    <h5 class="value-title">Trust</h5>
                    <p class="value-text">We build long-term relationships through transparency, reliability, and honest service.</p>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="core-card text-center">
                    <i class="bi bi-speedometer icon-core"></i>
                    <h5 class="value-title">Efficiency</h5>
                    <p class="value-text">We ensure fast, smooth rentals so you can focus on your journey, not the paperwork.</p>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="core-card text-center">
                    <i class="bi bi-star icon-core"></i>
                    <h5 class="value-title">Excellence</h5>
                    <p class="value-text">We strive for top-tier quality in every ride, every service, every experience.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/*section history */}

          <section class="history-section py-5">
            <div class="container">
              <h2 class="section-title mb-5">Our Journey</h2>
              <div class="timeline">

                <div class="timeline-item">
                  <div class="timeline-year">2014</div>
                  <div class="timeline-content">
                    <h5><i class="bi bi-rocket-takeoff-fill me-2 " style={{ color: '#F4C04C' }}></i>Founded in Casablanca</h5>
                    <p>SwiftRide started with just 5 cars and a dream to make mobility smarter in Morocco.</p>
                  </div>
                </div>

                <div class="timeline-item">
                  <div class="timeline-year">2021</div>
                  <div class="timeline-content">
                    <h5><i class="bi bi-emoji-smile-fill me-2 " style={{ color: '#F4C04C' }}></i>1000+ Happy Customers</h5>
                    <p>We hit our first major milestone serving over a thousand happy riders.</p>
                  </div>
                </div>

                <div class="timeline-item">
                  <div class="timeline-year">2025</div>
                  <div class="timeline-content">
                    <h5><i class="bi bi-globe2 me-2 " style={{ color: '#F4C04C' }}></i>Expanded Across 5 Cities</h5>
                    <p>We grew our network across major Moroccan cities including Marrakech and Agadir.</p>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/*section our team */}

          <section class="team-section py-5">
            <div class="container text-center">
              <h2 class="section-title mb-5">Meet Our Team</h2>
              <div class="row g-4">

                
                <div class="col-md-4">
                  <div class="team-card">
                    <div class="team-img-wrapper">
                      <img src="/public/pic1.jpg" alt="Team Member" class="team-img" />
                    </div>
                    <h5 class="team-name">Sarah El Amrani</h5>
                    <p class="team-role">Operations Manager</p>
                    <p class="team-desc">Ensures everything runs smoothly from pickup to drop-off.</p>
                  </div>
                </div>

                
                <div class="col-md-4">
                  <div class="team-card">
                    <div class="team-img-wrapper">
                      <img src="/public/pic2.jpg" alt="Team Member" class="team-img" />
                    </div>
                    <h5 class="team-name">Youssef Bennani</h5>
                    <p class="team-role">Customer Support</p>
                    <p class="team-desc">Available 24/7 to assist and guide our valued clients.</p>
                  </div>
                </div>

                
                <div class="col-md-4">
                  <div class="team-card">
                    <div class="team-img-wrapper">
                      <img src="/public/pic3.jpg" alt="Team Member" class="team-img" />
                    </div>
                    <h5 class="team-name">Kenza Idrissi</h5>
                    <p class="team-role">Marketing Lead</p>
                    <p class="team-desc">Crafting campaigns that drive SwiftRide forward.</p>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/*section feedback */}

           <div className="container py-5 text-center">
             <h2 class="section-title mb-5">What Our Clients Are Saying</h2>
                
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












           
        </div>
      </section>
      </div>

    </>
  )
}