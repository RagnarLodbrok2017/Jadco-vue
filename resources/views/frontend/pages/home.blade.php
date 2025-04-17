@extends('frontend.layouts.app')

@section('content')
    <!-- About Section -->
    <section id="about" class="about-section py-5 section" style="transform: translateZ(0);"> 
               <div class="container">
            <div class="about-heading">
                <h2 class="section-title">ABOUT </h2>
                <img src="{{ asset('images/jadoo-logo 2.png') }}" alt="JADCO Logo" class="about-logo">
            </div>
            <div class="about-text-container">
                <p class="about-text">
                    After more than 20 years of experience in the Saudi Arabia's
                    Human Capital Development market, JAD Consulting (JADCO) was
                    established to continue supporting the industry with a new inspired vision
                    by the great Saudi Vision 2030.
                </p>
            </div>

            <div class="row">
                <div class="col-lg-6 col-sm-6 order-lg-1 order-2 about-main-description">
                    <p class="about-description">
                        JADCO and its highly ranked international partners of Companies,
                        Universities and SMEs are forming together an exclusive and
                        innovative consortium to serve and be part of the revolution and
                        development and support the transformation for the next levels.
                    </p>
                    <p class="about-description mt-4">
                        JADCO in collaboration with the best partners in the globe,
                        customize and Tailor projects to bridge the gap and providing the
                        latest technologies to ensure the max level of quality of deliverables,
                        support local content and transform knowledge to meet the
                        objectives of our clients.
                    </p>
                </div>
                <div class="col-lg-6 col-sm-6 order-lg-2 order-1 about-image-wrapper">
                    <div class="about-image-container">
                        <div class="about-image-main">
                            <img src="{{ asset('images/About_01.jpg') }}" alt="Graduate student" class="img-fluid">
                        </div>
                        <div class="about-image-secondary">
                            <img src="{{ asset('images/About_02.jpg') }}" alt="Library and books" class="img-fluid">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {{-- <h1>About</h1>
            <p>
                JADCO is a Saudi Arabian company that provides educational services and solutions to schools, universities, and other educational institutions.
            </p>
            <p> this is a test</p>
            <h2>this is a header </h2>
            <p> test way </p>
            <p> test way </p> --}}
    </section>

    <!-- Services Section -->
    <section id="services" class="services-section py-5 section">
        <div class="services-layer-container">
            <!-- First Service -->
            <div class="service-stack-item" data-service="1">
                <div class="service-overlay"></div>
                <div class="service-item-wrapper">
                    <div class="container">
                        <div class="row align-items-center full-screen md-h-auto">
                            <div class="col-lg-6">
                                <div class="service-image">
                                    <img src="{{ asset('images/Home_Serv_01.jpg') }}" alt="Classroom setting"
                                        class="img-fluid">
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="service-content">
                                    <div class="title">
                                        <h2 class="section-title">SERVICES</h2>
                                        <h3 class="service-number">01</h3>
                                    </div>

                                    <div class="main-content">
                                        <h3 class="service-title">Education and Training</h3>
                                        <p class="service-description">
                                            With more than 20 years in managing scholarship
                                            programs with several Saudi governmental
                                            sponsors, we are experts of providing full and
                                            comprehensive plans and services to meet the
                                            sponsor's vision and targets.
                                        </p>
                                        <div class="service-buttons">
                                            <a href="{{ url('/services/education-and-scholarship') }}"
                                                class="btn btn-service btn-education">Education</a>
                                            <a href="{{ url('/services/training-and-professional-development') }}"
                                                class="btn btn-service">Training</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Second Service -->
            <div class="service-stack-item" data-service="2">
                <div class="service-overlay"></div>
                <div class="service-item-wrapper">
                    <div class="container">
                        <div class="row align-items-center full-screen md-h-auto">
                            <div class="col-lg-6">
                                <div class="service-image">
                                    <img src="{{ asset('images/Home_Serv_02.jpg') }}" alt="AI Technology"
                                        class="img-fluid">
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="service-content">
                                    <div class="title">
                                        <h2 class="section-title">SERVICES</h2>
                                        <h3 class="service-number">02</h3>
                                    </div>

                                    <div class="main-content">
                                        <h3 class="service-title">AI and Advanced Technologies</h3>
                                        <p class="service-description">
                                            AI represents a transformative technology with
                                            the potential to revolutionize organizations
                                            services and operations.
                                            By leveraging AI, organizations can enhance
                                            efficiency, improve decision-making and deliver
                                            superior to public.
                                        </p>
                                        <div class="service-buttons">
                                            <a href="{{ url('/services/ai-and-advanced-technologies') }}"
                                                class="learn-more">LEARN MORE <i
                                                    class="fas fa-arrow-right-long"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Third Service -->
            <div class="service-stack-item" data-service="3">
                <div class="service-overlay"></div>
                <div class="service-item-wrapper">
                    <div class="container">
                        <div class="row align-items-center full-screen md-h-auto">
                            <div class="col-lg-6">
                                <div class="service-image">
                                    <img src="{{ asset('images/Home_Serv_03.jpg') }}" alt="Gaming and Esports"
                                        class="img-fluid">
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="service-content">
                                    <div class="title">
                                        <h2 class="section-title">SERVICES</h2>
                                        <h3 class="service-number">03</h3>
                                    </div>

                                    <div class="main-content">
                                        <h3 class="service-title">eGaming and eSport</h3>
                                        <p class="service-description">
                                            JADCO and international partners in gaming and
                                            eSport, USA highly ranked universities in gaming and
                                            simulation development and integrated e-Arts
                                            programs and a Consortium firm supported by
                                            the U.S department of ...
                                        </p>
                                        <div class="service-buttons">
                                            <a href="{{ url('/services/egaming-and-esport') }}" class="learn-more">Learn
                                                More <i class="fas fa-arrow-right-long"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Fourth Service -->
            <div class="service-stack-item" data-service="4">
                <div class="service-overlay"></div>
                <div class="service-item-wrapper">
                    <div class="container">
                        <div class="row align-items-center full-screen md-h-auto">
                            <div class="col-lg-6">
                                <div class="service-image">
                                    <img src="{{ asset('images/Home_Serv_04.jpg') }}" alt="Arts and Entertainment"
                                        class="img-fluid">
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="service-content">
                                    <div class="title">
                                        <h2 class="section-title">SERVICES</h2>
                                        <h3 class="service-number">04</h3>
                                    </div>

                                    <div class="main-content">
                                        <h3 class="service-title">Arts and Entertainment</h3>
                                        <p class="service-description">
                                            Bringing the fine Arts, culture and entertainment
                                            from the globe to enrich the local diversity and
                                            enhance the picture of the Arabian culture
                                            overseas by adding value to the industry.
                                        </p>
                                        <div class="service-buttons">
                                            <a href="{{ url('/services/arts-and-entertainment') }}"
                                                class="learn-more">LEARN MORE <i
                                                    class="fas fa-arrow-right-long"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Educational Services Section -->
    <section id="educational-section" class="educational-services py-5 section">
        <div class="container">
            <div class="row">
                <div class="educational-services mt-5">
                    <h3 class="edu-services-title section-title">Educational Services</h3>

                    <div class="service-item mt-4">
                        <div class="row">
                            <div class="col-md-3">
                                <h3 class="service-num">01</h3>
                            </div>
                            <div class="col-md-7">
                                <div class="service-content-wrapper">
                                    <h4 class="service-name">Scholarship Programs Management</h4>
                                    <p class="service-desc">
                                        With more than 20 years in managing scholarship programs
                                        with several Saudi governmental sponsors, we are experts of providing full and
                                        comprehensive plans and services to meet the sponsor's vision and targets.
                                    </p>
                                    <a href="{{ url('/services/education-and-scholarship') }}"
                                        class="learn-more">LEARN MORE <i class="fas fa-arrow-right-long"></i></a>
                                </div>
                            </div>
                            <div class="col-md-2 text-end">
                                <div class="service-toggle">
                                    <i class="fas fa-arrow-right-long"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="service-item mt-4">
                        <div class="row">
                            <div class="col-md-3">
                                <h3 class="service-num">02</h3>
                            </div>
                            <div class="col-md-7">
                                <div class="service-content-wrapper">
                                    <h4 class="service-name">STEM Education and Innovation Centers</h4>
                                    <p class="service-desc">
                                        Providing innovative STEM education approaches and establishing
                                        cutting-edge innovation centers to foster creativity and practical skills.
                                    </p>
                                    <a href="{{ url('/services/education-and-scholarship') }}" class="learn-more">LEARN MORE <i
                                            class="fas fa-arrow-right-long"></i></a>
                                </div>
                            </div>
                            <div class="col-md-2 text-end">
                                <div class="service-toggle">
                                    <i class="fas fa-arrow-right-long"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="service-item mt-4">
                        <div class="row">
                            <div class="col-md-3">
                                <h3 class="service-num">03</h3>
                            </div>
                            <div class="col-md-7">
                                <div class="service-content-wrapper">
                                    <h4 class="service-name">K-12 International Schools</h4>
                                    <p class="service-desc">
                                        Development and management of international standard K-12 schools
                                        with globally recognized curricula and excellent teaching staff.
                                    </p>
                                    <a href="{{ url('/services/education-and-scholarship') }}" class="learn-more">LEARN MORE <i
                                            class="fas fa-arrow-right-long"></i></a>
                                </div>
                            </div>
                            <div class="col-md-2 text-end">
                                <div class="service-toggle">
                                    <i class="fas fa-arrow-right-long"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Statistics Section -->
    <!-- {{-- <section id="statistics" class="statistics-section py-5 section">
        <div class="container">
            <div class="row">
                <div class="statistics mt-5">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="stat-item">
                                <h3 class="stat-number">15 Institutes</h3>
                                <p class="stat-text">Cross disciplinary boundaries</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="stat-item">
                                <h3 class="stat-number">20 Libraries</h3>
                                <p class="stat-text">Hold over 12 million items</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="stat-item">
                                <h3 class="stat-number">$2.2 Billion</h3>
                                <p class="stat-text">Sponsored research budget</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section> --}} -->
@endsection
