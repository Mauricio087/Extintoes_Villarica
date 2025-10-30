// ===== ARCHIVO JAVASCRIPT PRINCIPAL =====
// Extintores Villarrica - Funcionalidades del sitio web

// ===== VARIABLES GLOBALES =====
let isMenuOpen = false;
let scrollUpButton;
let whatsappButton;
let lastScrollTop = 0;

// ===== INICIALIZACIÓN DEL SITIO =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔥 Extintores Villarrica - Sitio web cargado correctamente');

    // Inicializar todas las funcionalidades
    initNavbar();
    initNavbarHideOnScroll();
    initHeroSection();
    initScrollEffects();
    initFloatingButtons();
    initSmoothScrolling();
    initServicesCarousel();
    initProductButtons();
    initGallery(); // Inicializar galería

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

// ===== FUNCIONALIDAD PARA OCULTAR NAVBAR AL HACER SCROLL =====
function initNavbarHideOnScroll() {
    const header = document.querySelector('.header');

    if (!header) return;

    window.addEventListener('scroll', function() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Si estamos en la parte superior de la página, siempre mostrar el navbar
        if (currentScrollTop <= 0) {
            header.classList.remove('hidden');
            lastScrollTop = currentScrollTop;
            return;
        }

        // Si scrolleamos hacia abajo, ocultar el navbar
        if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
            header.classList.add('hidden');
        }
        // Si scrolleamos hacia arriba, mostrar el navbar
        else if (currentScrollTop < lastScrollTop) {
            header.classList.remove('hidden');
        }

        lastScrollTop = currentScrollTop;
    });

    console.log('📱 Funcionalidad de ocultar navbar al hacer scroll inicializada');
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
        const phoneNumber = '56993811272'; // Número principal
        const message = encodeURIComponent('Hola, me interesa conocer más sobre sus servicios.');
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

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
    let restartTimeout;

    // Función para mover el carrusel
    function moveToSlide(slideIndex) {
        if (slideIndex < 0) slideIndex = totalSlides - 1;
        if (slideIndex >= totalSlides) slideIndex = 0;

        currentSlide = slideIndex;
        const translateX = -slideIndex * 25; // Cada slide se mueve 25% (100% / 4 cards)

        // Aplicar transformación
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
        if (autoSlideInterval) {
            console.log('🔄 Auto-slide ya está activo, ignorando...');
            return;
        }
        autoSlideInterval = setInterval(() => {
            console.log('⏭️ Auto-slide: moviendo al siguiente slide');
            nextSlide();
        }, 7000); // Cambiar cada 7 segundos
        console.log('▶️ Auto-slide iniciado');
    }

    // Función para detener el auto-slide
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
            console.log('⏹️ Auto-slide detenido');
        }
        if (restartTimeout) {
            clearTimeout(restartTimeout);
            restartTimeout = null;
            console.log('⏹️ Timeout de reinicio cancelado');
        }
    }

    // Función para reiniciar el auto-slide después de interacción manual
    function restartAutoSlide() {
        console.log('🔄 Reiniciando auto-slide...');
        stopAutoSlide();
        restartTimeout = setTimeout(() => {
            console.log('⏰ Timeout completado, iniciando auto-slide');
            startAutoSlide();
        }, 10000); // Reiniciar después de 10 segundos
        console.log('⏰ Timeout de reinicio programado para 10 segundos');
    }

    // Event listeners para los botones
    nextBtn.addEventListener('click', () => {
        nextSlide();
        restartAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        restartAutoSlide();
    });

    // Event listeners para los indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            moveToSlide(index);
            restartAutoSlide();
        });
    });

    // Pausar auto-slide cuando el mouse está sobre el carrusel
    const carousel = document.querySelector('.services-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', () => {
            // Solo reiniciar si no hay un timeout pendiente
            if (!restartTimeout) {
                startAutoSlide();
            }
        });
    }

    // Soporte para navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            restartAutoSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            restartAutoSlide();
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
            restartAutoSlide();
        }
    }

    // Iniciar el auto-slide
    startAutoSlide();

    console.log('🎠 Carrusel de servicios inicializado correctamente');
}

// ===== FUNCIONALIDAD BOTONES DE PRODUCTOS =====
function initProductButtons() {
    const productButtons = document.querySelectorAll('.whatsapp-btn');

    productButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-product');
            const message = `Hola! Me interesa obtener más información sobre: ${productName}`;
            const phoneNumber = businessData.phones[0].replace(/\+/g, ''); // Usar el primer teléfono
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

            // Abrir WhatsApp en una nueva ventana
            window.open(whatsappUrl, '_blank');

            console.log(`📱 Redirigiendo a WhatsApp para: ${productName}`);
        });
    });

    console.log('📱 Botones de productos inicializados correctamente');
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
    phones: ['+56993811272', '+56991864681'],
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

// ===== GALERÍA FUNCTIONALITY =====

// Configuración de la galería
const galleryConfig = {
    totalImages: 14, // Total de imágenes disponibles
    imagesPerView: 4, // Imágenes visibles por defecto
    imagePath: 'assets/img/galeria/', // Ruta de las imágenes
    imageExtension: '.jpeg', // Extensión de las imágenes
    autoAdvanceInterval: 4000 // Intervalo para avance automático (4 segundos)
};

// Variables globales de la galería
let currentIndex = 0;
let modalCurrentIndex = 0;
let autoAdvanceTimer = null; // Timer para avance automático
let isUserInteracting = false; // Flag para pausar auto-avance durante interacción

// Función para inicializar la galería
function initGallery() {
    console.log('🖼️ Inicializando galería...');
    
    // Generar las imágenes dinámicamente
    generateGalleryImages();
    
    // Configurar controles del carrusel
    setupCarouselControls();
    
    // Configurar indicadores
    setupIndicators();
    
    // Configurar modal
    setupModal();
    
    // Configurar eventos de click en las imágenes
    setupImageClickEvents();
    
    // Configurar navegación con teclado
    setupKeyboardNavigation();
    
    // Actualizar vista inicial
    updateCarousel();
    
    // Inicializar avance automático
    startAutoAdvance();
    
    console.log('✅ Galería inicializada correctamente');
}

// Función para generar las imágenes de la galería dinámicamente
function generateGalleryImages() {
    const container = document.querySelector('.gallery-container');
    if (!container) return;
    
    // Limpiar contenedor
    container.innerHTML = '';
    
    // Generar cada imagen
    for (let i = 1; i <= galleryConfig.totalImages; i++) {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.index = i - 1; // Índice basado en 0
        
        galleryItem.innerHTML = `
            <img src="${galleryConfig.imagePath}${i}${galleryConfig.imageExtension}" 
                 alt="Imagen de galería ${i}" 
                 loading="lazy">
            <div class="gallery-overlay">
                <i class="fas fa-search-plus"></i>
            </div>
        `;
        
        container.appendChild(galleryItem);
    }
}

// Función para configurar los controles del carrusel
function setupCarouselControls() {
    const prevBtn = document.querySelector('.gallery-btn.prev');
    const nextBtn = document.querySelector('.gallery-btn.next');
    const galleryContainer = document.querySelector('.gallery-container');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            isUserInteracting = true;
            navigateCarousel('prev');
            resetAutoAdvance();
            setTimeout(() => { isUserInteracting = false; }, 100);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            isUserInteracting = true;
            navigateCarousel('next');
            resetAutoAdvance();
            setTimeout(() => { isUserInteracting = false; }, 100);
        });
    }
    
    // Pausar avance automático en hover
    if (galleryContainer) {
        galleryContainer.addEventListener('mouseenter', () => {
            isUserInteracting = true;
            stopAutoAdvance();
        });
        
        galleryContainer.addEventListener('mouseleave', () => {
            isUserInteracting = false;
            startAutoAdvance();
        });
    }
}

// Función para configurar los indicadores
function setupIndicators() {
    const indicatorsContainer = document.querySelector('.gallery-indicators');
    if (!indicatorsContainer) return;
    
    // Limpiar indicadores existentes
    indicatorsContainer.innerHTML = '';
    
    // Calcular número de páginas
    const totalPages = Math.ceil(galleryConfig.totalImages / galleryConfig.imagesPerView);
    
    // Crear indicadores
    for (let i = 0; i < totalPages; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'gallery-indicator';
        if (i === 0) indicator.classList.add('active');
        
        indicator.addEventListener('click', () => {
            isUserInteracting = true;
            currentIndex = i;
            updateCarousel();
            updateIndicators();
            resetAutoAdvance();
            setTimeout(() => { isUserInteracting = false; }, 100);
        });
        
        indicatorsContainer.appendChild(indicator);
    }
}

// Función para configurar el modal
function setupModal() {
    const modal = document.querySelector('.gallery-modal');
    const closeBtn = document.querySelector('.modal-close');
    const prevModalBtn = document.querySelector('.modal-btn.prev');
    const nextModalBtn = document.querySelector('.modal-btn.next');
    
    // Cerrar modal
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Cerrar modal al hacer click fuera de la imagen
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Navegación en el modal
    if (prevModalBtn) {
        prevModalBtn.addEventListener('click', () => {
            navigateModal('prev');
        });
    }
    
    if (nextModalBtn) {
        nextModalBtn.addEventListener('click', () => {
            navigateModal('next');
        });
    }
}

// Función para configurar eventos de click en las imágenes
function setupImageClickEvents() {
    document.addEventListener('click', (e) => {
        const galleryItem = e.target.closest('.gallery-item');
        if (galleryItem) {
            const imageIndex = parseInt(galleryItem.dataset.index);
            openModal(imageIndex);
        }
    });
}

// Función para configurar navegación con teclado
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        const modal = document.querySelector('.gallery-modal');
        if (modal && modal.classList.contains('active')) {
            switch (e.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowLeft':
                    navigateModal('prev');
                    break;
                case 'ArrowRight':
                    navigateModal('next');
                    break;
            }
        }
    });
}

// Función para navegar en el carrusel
function navigateCarousel(direction) {
    const totalPages = Math.ceil(galleryConfig.totalImages / galleryConfig.imagesPerView);
    
    if (direction === 'next') {
        currentIndex = (currentIndex + 1) % totalPages;
    } else {
        currentIndex = (currentIndex - 1 + totalPages) % totalPages;
    }
    
    updateCarousel();
    updateIndicators();
}

// Función para actualizar la vista del carrusel
function updateCarousel() {
    const container = document.querySelector('.gallery-container');
    if (!container) return;
    
    // Calcular desplazamiento
    const itemWidth = 100 / galleryConfig.imagesPerView;
    const offset = currentIndex * itemWidth * galleryConfig.imagesPerView;
    
    container.style.transform = `translateX(-${offset}%)`;
    
    // Actualizar estado de los botones
    updateCarouselButtons();
}

// Función para actualizar los botones del carrusel
function updateCarouselButtons() {
    const prevBtn = document.querySelector('.gallery-btn.prev');
    const nextBtn = document.querySelector('.gallery-btn.next');
    const totalPages = Math.ceil(galleryConfig.totalImages / galleryConfig.imagesPerView);
    
    if (prevBtn) {
        prevBtn.disabled = currentIndex === 0;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentIndex === totalPages - 1;
    }
}

// Función para actualizar los indicadores
function updateIndicators() {
    const indicators = document.querySelectorAll('.gallery-indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

// Función para abrir el modal
function openModal(imageIndex) {
    const modal = document.querySelector('.gallery-modal');
    const modalImage = document.querySelector('#modalImage');
    
    if (!modal || !modalImage) return;
    
    modalCurrentIndex = imageIndex;
    
    // Actualizar imagen del modal
    const imageNumber = imageIndex + 1;
    modalImage.src = `${galleryConfig.imagePath}${imageNumber}${galleryConfig.imageExtension}`;
    modalImage.alt = `Imagen de galería ${imageNumber}`;
    
    // Mostrar modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevenir scroll
}

// Función para cerrar el modal
function closeModal() {
    const modal = document.querySelector('.gallery-modal');
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restaurar scroll
}

// Función para navegar en el modal
function navigateModal(direction) {
    if (direction === 'next') {
        modalCurrentIndex = (modalCurrentIndex + 1) % galleryConfig.totalImages;
    } else {
        modalCurrentIndex = (modalCurrentIndex - 1 + galleryConfig.totalImages) % galleryConfig.totalImages;
    }
    
    // Actualizar imagen del modal
    const modalImage = document.querySelector('#modalImage');
    if (modalImage) {
        const imageNumber = modalCurrentIndex + 1;
        modalImage.src = `${galleryConfig.imagePath}${imageNumber}${galleryConfig.imageExtension}`;
        modalImage.alt = `Imagen de galería ${imageNumber}`;
    }
}

// Funciones de avance automático
function startAutoAdvance() {
    if (autoAdvanceTimer) {
        clearInterval(autoAdvanceTimer);
    }
    
    autoAdvanceTimer = setInterval(() => {
        if (!isUserInteracting) {
            navigateCarousel('next');
        }
    }, galleryConfig.autoAdvanceInterval);
}

function stopAutoAdvance() {
    if (autoAdvanceTimer) {
        clearInterval(autoAdvanceTimer);
        autoAdvanceTimer = null;
    }
}

function resetAutoAdvance() {
    stopAutoAdvance();
    setTimeout(() => {
        if (!isUserInteracting) {
            startAutoAdvance();
        }
    }, 1000); // Esperar 1 segundo antes de reiniciar
}

// Función debounce para optimizar el rendimiento
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Configurar responsive behavior
const handleResize = debounce(() => {
    const isMobile = window.innerWidth <= 768;
    galleryConfig.imagesPerView = isMobile ? 2 : 4;
    
    // Reconfigurar indicadores
    setupIndicators();
    
    // Resetear índice si es necesario
    const totalPages = Math.ceil(galleryConfig.totalImages / galleryConfig.imagesPerView);
    if (currentIndex >= totalPages) {
        currentIndex = totalPages - 1;
    }
    
    updateCarousel();
    updateIndicators();
}, 250);

// Escuchar cambios de tamaño de ventana
window.addEventListener('resize', handleResize);