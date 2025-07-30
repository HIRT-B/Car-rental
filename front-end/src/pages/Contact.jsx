export default function Contact() {
    return (
        <>
            <div className="home">
                <div className="container my-5" >
                    <div className="contact-section position-relative row">
                        <div className="col-md-6">
                            <div className="contact-box">
                                <h1>Contact us</h1>
                                <p>Ask for a quotation from us!</p>
                                <form>
                                    <input type="text" placeholder="Name" required />
                                    <input type="email" placeholder="Email" required />
                                    <input type="text" placeholder="Phone" />
                                    <textarea rows="4" placeholder="Your message"></textarea>
                                    <button type="submit">SEND</button>
                                </form>
                            </div>
                        </div>

                        <div className="col-md-6 d-flex flex-column justify-content-center align-items-start mt-4 mt-md-0">
                            <div className="contact-info ">
                                <h5 style={{ fontSize: "30px" }}>Contact Information</h5>
                                <p><strong>Email:</strong> Swiftride@gmail.com</p>
                                <p><strong>Phone:</strong> +212 605 751 866</p>
                                <p><strong>Location:</strong> Casablanca, Morocco</p>
                            </div>
                            <div className="social-icons">
                                <a href="https://facebook.com" target="_blank" className="social-link">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="https://instagram.com" target="_blank" className="social-link">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a href="https://wa.me/212600000000" target="_blank" className="social-link">
                                    <i className="fab fa-whatsapp"></i>
                                </a>
                                <a href="https://twitter.com" target="_blank" class="social-link">
                                    <i class="fab fa-x-twitter"></i>
                                </a>

                            </div>
                        </div>




                        <div class="yellow-icon"><i class="fas fa-location-dot"></i></div>


                    </div>
                    <div className="row">
                        <div className="col-md-12">
                           <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d2007.8492609800317!2d-6.58527747343886!3d31.951322388049256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1stichibit!5e1!3m2!1sfr!2sma!4v1753721731829!5m2!1sfr!2sma" width="100%" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>


                        </div>

                    </div>
                </div>
            </div>
        </>
    )

}