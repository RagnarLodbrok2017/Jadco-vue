<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'JADCO - Education and Training to Innovation')</title>
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="{{ asset('images/favicon.png') }}">
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <!-- Optimized CSS Structure -->
    <link rel="stylesheet" href="{{ asset('css/optimized/main.css') }}">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Page-specific styles -->
    @stack('styles')
    <style>
        html {
            scroll-behavior: smooth;
        }
    </style>
</head>
<body>
    <!-- Preloader -->
    <div class="preloader">
        <img src="{{ asset('images/logo.png') }}" alt="JADCO Logo" class="preloader-logo">
    </div>

    <!-- Scroll Indicator -->
    <div class="scroll-indicator-container">
        <div class="scroll-indicator"></div>
    </div>

    <!-- Header & Navbar -->
    @include('frontend.partials.navbar')

    <!-- Content Area -->
    @yield('content')

    <!-- Contact Section -->
    @include('frontend.partials.contact')


    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Custom JS -->
    <script src="{{ asset('js/partial/static.js') }}"></script>
    <script src="{{ asset('js/partial/services-menu-manager.js') }}"></script>
    <script src="{{ asset('js/partial/services-section.js') }}"></script>
    <script src="{{ asset('js/partial/header.js') }}"></script>
    <script src="{{ asset('js/all.js') }}"></script>
    
    <!-- The Flash Effect for "Let's Talk" button is now in static.js -->
    
    @stack('scripts')
</body>
</html> 