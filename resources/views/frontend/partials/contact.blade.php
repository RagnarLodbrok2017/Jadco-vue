<!-- Contact Section -->
<section id="contact" class="contact-section section">
    <div class="container">
        <div class="row">
            <div class="contact-top">
                <a href="{{ url('/') }}" class="footer-logo">
                    <img src="{{ asset('images/logo.png') }}" alt="JADCO Logo" class="logo">
                </a>
            </div>
            <div class="col-lg-3 col-sm-3">
                <div class="contact-info">
                    <div class="locations">
                        <div class="location-item">
                            <h4 class="location-title">Saudi Arabia</h4>
                            <p class="location-address">
                                Level 7, Building 4.07, Zone 4<br>
                                King Abdullah Financial District<br>
                                (KAFD)<br>
                                Riyadh 13519, Saudi Arabia.<br>
                                <span class="contact-label">Tel:</span>
                                <span class="contact-value">
                                    <a href="https://wa.me/966115256175" class="whatsapp-link" target="_blank">(+966) 115256175</a></span><br>
                                <span class="contact-label">Mobile:</span> <span class="contact-value"><a
                                        href="https://wa.me/966569292048" class="whatsapp-link" target="_blank">(+966) 569292048</a></span><br>
                                <span class="contact-label">Email: </span> 
                                <span class="contact-value" style="padding-left: 5px">
                                    <a href="mailto:jad@jadco.co">jad@jadco.co</a>
                                </span>
                            </p>
                        </div>

                        <div class="location-item mt-4">
                            <h4 class="location-title">USA</h4>
                            <p class="location-address">
                                3972 Barranca Parkway,<br>
                                Ste J139, Irvine, CA 92606
                            </p>
                        </div>

                        <div class="location-item mt-4">
                            <h4 class="location-title">UAE</h4>
                            <p class="location-address">
                                A1, Dubai Digital Park, Dubai<br>
                                Silicon Oasis, Dubai,<br>
                                United Arab Emirates.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-9 col-sm-9">
                <h3 class="contact-tagline">We Listen, design your vision and bring it to life...</h3>
                <h2 class="let-talk">LET'S TALK.</h2>

                <div class="contact-form">
                    <form action="{{ route('contact.submit') }}" method="POST">
                        @csrf
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <input type="text" class="form-control" id="firstName" name="first_name"
                                        placeholder=" " required>
                                    <label for="firstName" class="form-label">First Name</label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <input type="text" class="form-control" id="lastName" name="last_name"
                                        placeholder=" " required>
                                    <label for="lastName" class="form-label">Last Name</label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <input type="email" class="form-control" id="email" name="email"
                                        placeholder=" " required>
                                    <label for="email" class="form-label">Email</label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <input type="tel" class="form-control" id="phone" name="phone"
                                        placeholder=" ">
                                    <label for="phone" class="form-label">Phone Number</label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <textarea class="form-control" id="message" name="message" rows="4" placeholder=" " required></textarea>
                            <label for="message" class="form-label">Message</label>
                        </div>
                        <div class="text-start">
                            <button type="submit" class="btn btn-send">SEND A MESSAGE <i
                                    class="fas fa-arrow-right"></i></button>
                        </div>
                    </form>
                </div>
            </div>


        </div>
        <!-- Footer -->
        <div class="row mt-3 end-footer">
            <div class="col-lg-3 col-sm-3"></div>
            <div class="col-lg-9 col-sm-9">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="social-links">
                        <a href="#" class="social-link"><i class="fab fa-youtube"></i> YouTube</a>
                        <a href="#" class="social-link"><i class="fab fa-linkedin"></i> LinkedIn</a>
                    </div>
                    <div>
                        <p class="copyright"> {{ date('Y') }} <span class="jadco-shine">JADCO</span>. All Rights
                            Reserved.</p>
                    </div>
                </div>
            </div>
        </div>
</section>
