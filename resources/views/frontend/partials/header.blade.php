<!-- Main Header Content -->
<div class="heading">
    @php
    use Illuminate\Support\Facades\Route;
    $currentRouteName = Route::currentRouteName();
    $isServicePage = str_starts_with($currentRouteName, 'services.') || request()->is('services/*');
    $isHomePage = $currentRouteName == 'home' || request()->is('/');
    
    // Determine which image to show based on current page
    $headerImage = 'images/Header/01_EDU_Home.jpg'; // Default image
    
    if ($currentRouteName == 'about') {
        $headerImage = 'images/About_Page.jpg';
    } elseif (request()->is('services/education-and-scholarship*')) {
        $headerImage = 'images/Header/01_EDU_Home.jpg';
    } elseif (request()->is('services/ai-and-advanced-technologies*')) {
        $headerImage = 'images/Header/02_AI_Home.jpg';
    } elseif (request()->is('services/egaming-and-esport*')) {
        $headerImage = 'images/Header/03_Games_Home.jpg';
    } elseif (request()->is('services/arts-and-entertainment*')) {
        $headerImage = 'images/Header/04_Arts_Header.jpg';
    } elseif (request()->is('services/training-and-professional-development*')) {
        $headerImage = 'images/01_Training_Header.jpg';
    }
    @endphp
    <div class="row">
        <!-- Left Column: Headings and Services -->
        <div class="left-col col-sm-6 col-lg-6 order-lg-1 order-2">
            <!-- Dynamic Heading Text -->
            <h1 class="main-heading">
                @if($isHomePage)
                <span class="heading-text active" data-slide="0">FROM EDUCATION AND TRAINING TO INNOVATION</span>
                <span class="heading-text" data-slide="1">THE LATEST AI AND TECHNOLOGIES</span>
                <span class="heading-text" data-slide="2">INNOVATIVE EFFORTS IN REVOLUTIONIZING THE ESPORT INDUSTRY</span>
                <span class="heading-text" data-slide="3">BRINGING THE GLOBAL ARTS AND ENTERTAINMENT EVENTS TO TOWN</span>
                @elseif(request()->is('about*'))
                <span class="heading-text active">We Listen, design your vision and bring it to life... Let's talk</span>
                @elseif(request()->is('services/education-and-scholarship*'))
                <span class="heading-text active">FROM EDUCATION AND TRAINING TO INNOVATION</span>
                @elseif(request()->is('services/ai-and-advanced-technologies*'))
                <span class="heading-text active">THE LATEST AI AND TECHNOLOGIES</span>
                @elseif(request()->is('services/egaming-and-esport*'))
                <span class="heading-text active">INNOVATIVE EFFORTS IN REVOLUTIONIZING THE ESPORT INDUSTRY</span>
                @elseif(request()->is('services/arts-and-entertainment*'))
                <span class="heading-text active">BRINGING THE GLOBAL ARTS AND ENTERTAINMENT EVENTS TO TOWN</span>
                @elseif(request()->is('services/training-and-professional-development*'))
                <span class="heading-text active">FROM EDUCATION AND TRAINING TO INNOVATION</span>
                @else
                <span class="heading-text active">JADCO CONSULTING</span>
                @endif
            </h1>
            
            <!-- Services Menu -->
            <div class="services-menu {{ $isServicePage ? 'active' : '' }}">
                <h3>SERVICES</h3>
                <ul class="service-list">
                    <li>
                        <div class="link-container">
                            <a href="{{ url('/services/education-and-scholarship') }}" class="{{ request()->is('services/education-and-scholarship') ? 'active' : '' }}">
                                Education and Scholarship
                                <i class="fas fa-arrow-right-long"></i>
                            </a>
                        </div>
                    </li>
                    <li>
                        <div class="link-container">
                            <a href="{{ url('/services/training-and-professional-development') }}" class="{{ request()->is('services/training-and-professional-development') ? 'active' : '' }}">
                                Training and Professional Development
                                <i class="fas fa-arrow-right-long"></i>
                            </a>
                        </div>
                    </li>
                    <li>
                        <div class="link-container">
                            <a href="{{ url('/services/ai-and-advanced-technologies') }}" class="{{ request()->is('services/ai-and-advanced-technologies') ? 'active' : '' }}">
                                AI and Advanced Technologies
                                <i class="fas fa-arrow-right-long"></i>
                            </a>
                        </div>
                    </li>
                    <li>
                        <div class="link-container">
                            <a href="{{ url('/services/egaming-and-esport') }}" class="{{ request()->is('services/egaming-and-esport') ? 'active' : '' }}">
                                E-Gaming and eSport
                                <i class="fas fa-arrow-right-long"></i>
                            </a>
                        </div>
                    </li>
                    <li>
                        <div class="link-container">
                            <a href="{{ url('/services/arts-and-entertainment') }}" class="{{ request()->is('services/arts-and-entertainment') ? 'active' : '' }}">
                                Arts and Entertainment
                                <i class="fas fa-arrow-right-long"></i>
                            </a>
                        </div>
                    </li>
                </ul>
                <!-- Copy of Let's Talk button for mobile view -->
                <a href="{{ url('/#contact') }}" class="btn btn-talk">Let's Talk</a>
            </div>
        </div>
        
        <!-- Right Column: Image Carousel or Static Image -->
        <div class="col-lg-6 col-sm-6 order-lg-2 order-1 mb-4 mb-lg-0 header-main-carousel">
            <div class="header-image">
                @if($isHomePage)
                <!-- Bootstrap Carousel for Home Page -->
                <div id="headerCarousel" class="carousel slide custom-transition" data-bs-ride="carousel">
                    <!-- Hidden Default Indicators -->
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#headerCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#headerCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#headerCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        <button type="button" data-bs-target="#headerCarousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
                    </div>
                    
                    <!-- Carousel Slides -->
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="{{ asset('images/Header/01_EDU_Home.jpg') }}" class="d-block w-100" alt="Education">
                        </div>
                        <div class="carousel-item">
                            <img src="{{ asset('images/Header/02_AI_Home.jpg') }}" class="d-block w-100" alt="AI">
                        </div>
                        <div class="carousel-item">
                            <img src="{{ asset('images/Header/03_Games_Home.jpg') }}" class="d-block w-100" alt="Gaming">
                        </div>
                        <div class="carousel-item">
                            <img src="{{ asset('images/Header/04_Arts_Header.jpg') }}" class="d-block w-100" alt="Arts">
                        </div>
                    </div>
                    
                    <!-- Custom Carousel Navigation -->
                    <div class="carousel-nav-numbers">
                        <div class="nav-number active" data-slide="0">01</div>
                        <div class="nav-line">
                            <div class="nav-line-fill"></div>
                        </div>
                        <div class="nav-number" data-slide="1">02</div>
                        <div class="nav-line">
                            <div class="nav-line-fill"></div>
                        </div>
                        <div class="nav-number" data-slide="2">03</div>
                        <div class="nav-line">
                            <div class="nav-line-fill"></div>
                        </div>
                        <div class="nav-number" data-slide="3">04</div>
                        <div class="nav-line">
                            <div class="nav-line-fill"></div>
                        </div>
                    </div>
                </div>
                @else
                <!-- Static Image for Other Pages -->
                <div class="static-header-image">
                    <img src="{{ asset($headerImage) }}" class="d-block w-100" alt="Page Header">
                </div>
                @endif
            </div>
        </div>
    </div>
</div> 