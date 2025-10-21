// ===== ARCHIVO JAVASCRIPT PRINCIPAL =====
// Extintores Villarrica - Funcionalidades del sitio web

// ===== VARIABLES GLOBALES =====
let isMenuOpen = false;
let scrollUpButton;
let whatsappButton;

// ===== INICIALIZACIÓN DEL SITIO =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔥 Extintores Villarrica - Sitio web cargado correctamente');
    
    // Inicializar todas las funcionalidades
    initNavbar();
    initHeroSection();
    initScrollEffects();
    initFloatingButtons();
    initSmoothScrolling();
    initServicesCarousel();
    
    console.log('🚀 Sitio web inicializado correctamente');
});

// ===== FUNCIONALIDADES DEL NAVBAR =====
function initNavbar() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    
    // Toggle del menú móvil
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            isMenuOpen = !isMenuOpen;
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevenir scroll del body cuando el menú está abierto
            document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        });
    }
    
    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (isMenuOpen) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                isMenuOpen = false;
            }
        });
    });
    
    // Efecto de navbar al hacer scroll - ocultar/mostrar y mantener color
    let lastScrollTop = 0;
    let ticking = false;
    
    function updateNavbar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const heroSection = document.querySelector('.hero');
        const heroHeight = heroSection ? heroSection.offsetHeight : 0;
        
        // Ocultar navbar al bajar, mostrar al subir (solo después del hero)
        if (scrollTop > heroHeight) {
            if (scrollTop > lastScrollTop && scrollTop > heroHeight + 100) {
                // Bajando - ocultar navbar
                header.classList.add('hidden');
            } else if (scrollTop < lastScrollTop) {
                // Subiendo - mostrar navbar
                header.classList.remove('hidden');
            }
        } else {
            // En el hero - siempre mostrar navbar
            header.classList.remove('hidden');
        }
        
        // Mantener el color amarillo siempre
        header.classList.add('scrolled');
        
        lastScrollTop = scrollTop;
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
    
    console.log('📱 Navbar inicializado correctamente');
}

// ===== FUNCIONALIDADES DE LA HERO SECTION =====
function initHeroSection() {
    const scrollDownButton = document.querySelector('.scroll-down');
    const heroSection = document.querySelector('.hero');
    
    // Animación de la flecha de scroll down
    if (scrollDownButton) {
        scrollDownButton.addEventListener('click', function() {
            const aboutSection = document.querySelector('#quienes-somos');
            if (aboutSection) {
                aboutSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
        
        // Ocultar la flecha cuando se hace scroll
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            const heroHeight = heroSection ? heroSection.offsetHeight : 0;
            
            if (scrollPosition > heroHeight * 0.3) {
                scrollDownButton.style.opacity = '0';
                scrollDownButton.style.visibility = 'hidden';
            } else {
                scrollDownButton.style.opacity = '0.8';
                scrollDownButton.style.visibility = 'visible';
            }
        });
    }
    
    // Efecto parallax sutil en la hero section
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            heroSection.style.transform = `translateY(${parallax}px)`;
        });
    }
    
    console.log('🎯 Hero Section inicializada correctamente');
}

// ===== EFECTOS DE SCROLL =====
function initScrollEffects() {
    // Animaciones al hacer scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos que necesitan animación
    const animatedElements = document.querySelectorAll('.feature, .service-card, .product-card, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
    
    console.log('🎨 Efectos de scroll inicializados');
}

// ===== BOTONES FLOTANTES =====
function initFloatingButtons() {
    scrollUpButton = document.querySelector('.scroll-up-btn');
    whatsappButton = document.querySelector('.whatsapp-btn');
    
    // Botón de scroll up
    if (scrollUpButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollUpButton.classList.add('show');
            } else {
                scrollUpButton.classList.remove('show');
            }
        });
        
        scrollUpButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Configurar enlace de WhatsApp con mensaje personalizado
    if (whatsappButton) {
        const phoneNumber = '56991864681'; // Número principal
        const message = encodeURIComponent('¡Hola! Me interesa conocer más sobre sus servicios de extintores. ¿Podrían brindarme información?');
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        
        whatsappButton.href = whatsappUrl;
        whatsappButton.target = '_blank';
        whatsappButton.rel = 'noopener noreferrer';
    }
    
    console.log('🔄 Botones flotantes inicializados');
}

// ===== SCROLL SUAVE =====
function initSmoothScrolling() {
    // Scroll suave para todos los enlaces internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    console.log('🎯 Scroll suave inicializado');
}

// ===== CARRUSEL DE SERVICIOS =====
function initServicesCarousel() {
    const track = document.getElementById('services-track');
    const prevBtn = document.getElementById('services-prev');
    const nextBtn = document.getElementById('services-next');
    const indicators = document.querySelectorAll('#services-indicators .indicator');
    
    if (!track || !prevBtn || !nextBtn) {
        console.warn('⚠️ Elementos del carrusel de servicios no encontrados');
        return;
    }
    
    let currentSlide = 0;
    const totalSlides = 4;
    let autoSlideInterval;
    
    // Función para mover el carrusel
    function moveToSlide(slideIndex) {
        if (slideIndex < 0) slideIndex = totalSlides - 1;
        if (slideIndex >= totalSlides) slideIndex = 0;
        
        currentSlide = slideIndex;
        const translateX = -slideIndex * 25; // 25% por cada slide
        track.style.transform = `translateX(${translateX}%)`;
        
        // Actualizar indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Función para ir al siguiente slide
    function nextSlide() {
        moveToSlide(currentSlide + 1);
    }
    
    // Función para ir al slide anterior
    function prevSlide() {
        moveToSlide(currentSlide - 1);
    }
    
    // Función para iniciar el auto-slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Cambiar cada 5 segundos
    }
    
    // Función para detener el auto-slide
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }
    
    // Event listeners para los botones
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        setTimeout(startAutoSlide, 10000); // Reiniciar auto-slide después de 10 segundos
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        setTimeout(startAutoSlide, 10000); // Reiniciar auto-slide después de 10 segundos
    });
    
    // Event listeners para los indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            moveToSlide(index);
            stopAutoSlide();
            setTimeout(startAutoSlide, 10000); // Reiniciar auto-slide después de 10 segundos
        });
    });
    
    // Pausar auto-slide cuando el mouse está sobre el carrusel
    const carousel = document.querySelector('.services-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Soporte para navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoSlide();
            setTimeout(startAutoSlide, 10000);
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoSlide();
            setTimeout(startAutoSlide, 10000);
        }
    });
    
    // Soporte para gestos táctiles (swipe)
    let startX = 0;
    let endX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    carousel.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                prevSlide();
            }
            stopAutoSlide();
            setTimeout(startAutoSlide, 10000);
        }
    }
    
    // Iniciar el auto-slide
    startAutoSlide();
    
    console.log('🎠 Carrusel de servicios inicializado correctamente');
}

// ===== UTILIDADES GENERALES =====

// Función para formatear números de teléfono
function formatPhoneNumber(phone) {
    return phone.replace(/(\+56)(\d{1})(\d{4})(\d{4})/, '$1 $2 $3 $4');
}

// Función para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    console.log(`${type.toUpperCase()}: ${message}`);
    // Aquí se puede implementar un sistema de notificaciones más avanzado
}

// ===== MANEJO DE ERRORES =====
window.addEventListener('error', function(e) {
    console.error('❌ Error en el sitio web:', e.error);
});

// ===== DATOS DEL NEGOCIO =====
const businessData = {
    name: 'Extintores Villarrica',
    address: 'Colo Colo 1410, Villarrica',
    phones: ['+56991864681', '+56993811272'],
    schedule: {
        morning: '9:30 - 14:00 hrs',
        afternoon: '16:30 - 19:00 hrs',
        days: 'Lunes a Viernes'
    },
    services: [
        'Venta de extintores',
        'Mantención de equipos',
        'Recarga de extintores',
        'Asesoría en seguridad'
    ]
};

console.log('🏢 Datos del negocio cargados:', businessData);