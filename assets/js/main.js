/* ===== MAIN.JS - FUNCIONALIDADES GLOBALES ===== */

// Variables globales
let isMenuOpen = false;
let scrollTopButton;
let navToggle;
let navMenu;
let heroLogo;
let navLogo;
let isLogoAnimating = false;

// ===== INICIALIZACIÓN AL CARGAR LA PÁGINA =====
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    loadDynamicContent();
    initializeLazyLoading();
    initializeAnimatedLogo();
});

// ===== INICIALIZAR ELEMENTOS DEL DOM =====
function initializeElements() {
    scrollTopButton = document.getElementById('scroll-top-btn');
    navToggle = document.getElementById('nav-toggle');
    navMenu = document.getElementById('nav-menu');
    heroLogo = document.getElementById('hero-logo');
    navLogo = document.querySelector('.nav-logo');
}

// ===== NAVEGACIÓN Y MENÚ MÓVIL =====
function initializeNavigation() {
    // Toggle del menú móvil
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Cerrar menú al hacer click en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Smooth scrolling para enlaces internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });
    
    // Cambiar estilo del header al hacer scroll
    window.addEventListener('scroll', handleHeaderScroll);
}

// Alternar menú móvil
function toggleMobileMenu() {
    isMenuOpen = !isMenuOpen;
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Prevenir scroll del body cuando el menú está abierto
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
}

// Cerrar menú móvil
function closeMobileMenu() {
    if (isMenuOpen) {
        isMenuOpen = false;
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Manejar smooth scrolling
function handleSmoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Manejar scroll del header
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    const scrolled = window.scrollY > 100;
    
    if (header) {
        header.classList.toggle('scrolled', scrolled);
    }
    
    // Mostrar/ocultar botón de scroll to top
    if (scrollTopButton) {
        scrollTopButton.classList.toggle('visible', scrolled);
    }
}

// ===== EFECTOS DE SCROLL =====
function initializeScrollEffects() {
    // Botón scroll to top
    if (scrollTopButton) {
        scrollTopButton.addEventListener('click', scrollToTop);
    }
    
    // Flecha de scroll down en hero
    const scrollArrow = document.querySelector('.scroll-arrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', scrollToNextSection);
    }
    
    // Intersection Observer para animaciones
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Observar elementos que necesitan animación
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
}

// Scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Scroll a la siguiente sección desde hero
function scrollToNextSection() {
    const nextSection = document.querySelector('#estudio');
    if (nextSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = nextSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Manejar intersección para animaciones
function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
        }
    });
}

// ===== ANIMACIONES =====
function initializeAnimations() {
    // Añadir clase de animación a elementos específicos
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('animate-fade-in-up');
        }, 500);
    }
    
    // Animación de typing para el título (opcional)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        animateTyping(heroTitle);
    }
}

// Efecto de typing para texto
function animateTyping(element) {
    const text = element.textContent;
    element.textContent = '';
    element.style.borderRight = '2px solid var(--color-secondary)';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        element.textContent += text.charAt(i);
        i++;
        
        if (i >= text.length) {
            clearInterval(typeInterval);
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 1000);
        }
    }, 100);
}

// ===== CONTENIDO DINÁMICO =====
function loadDynamicContent() {
    loadAreasContent();
    loadServiciosContent();
}

// Cargar áreas de práctica dinámicamente
function loadAreasContent() {
    const areasGrid = document.getElementById('areas-grid');
    if (!areasGrid) return;
    
    const areas = [
        {
            titulo: 'Derecho Corporativo',
            descripcion: 'Constitución de sociedades, contratos, fusiones y adquisiciones. Asesoría legal integral para empresas.',
            servicios: [
                'Constitución de sociedades',
                'Redacción y revisión de contratos',
                'Fusiones y adquisiciones',
                'Asesoría legal empresarial'
            ],
            icono: `<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
            </svg>`
        },
        {
            titulo: 'Derecho Inmobiliario',
            descripcion: 'Estudios de títulos, compraventas, arriendos y regularización de propiedades.',
            servicios: [
                'Estudios de títulos',
                'Compraventas y arriendos',
                'Regularización de propiedades',
                'Litigios inmobiliarios'
            ],
            icono: `<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>`
        },
        {
            titulo: 'Derecho de Familia',
            descripcion: 'Divorcios, cuidado personal, alimentos, régimen comunicacional y adopciones.',
            servicios: [
                'Divorcios',
                'Cuidado personal y alimentos',
                'Régimen comunicacional',
                'Adopciones y medidas de protección'
            ],
            icono: `<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm5.5 3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM1 9v2h6V9H1zm16 0v2h6V9h-6zM12.5 12c-.83 0-1.5.67-1.5 1.5v6c0 .83.67 1.5 1.5 1.5S14 20.33 14 19.5v-6c0-.83-.67-1.5-1.5-1.5zM5.5 12c-.83 0-1.5.67-1.5 1.5v6c0 .83.67 1.5 1.5 1.5S7 20.33 7 19.5v-6C7 12.67 6.33 12 5.5 12zM18.5 12c-.83 0-1.5.67-1.5 1.5v6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-6c0-.83-.67-1.5-1.5-1.5z"/>
            </svg>`
        },
        {
            titulo: 'Litigios Civiles y Policía Local',
            descripcion: 'Defensa y tramitación de demandas, recursos y reclamaciones por infracciones.',
            servicios: [
                'Defensa en demandas civiles',
                'Recursos y reclamaciones',
                'Infracciones de tránsito',
                'Controversias en copropiedad'
            ],
            icono: `<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>`
        }
    ];
    
    areas.forEach((area, index) => {
        const areaElement = createAreaElement(area, index);
        areasGrid.appendChild(areaElement);
    });
}

// Crear elemento de área
function createAreaElement(area, index) {
    const div = document.createElement('div');
    div.className = 'area-card animate-on-scroll';
    div.style.animationDelay = `${index * 0.2}s`;
    
    div.innerHTML = `
        <div class="area-icon">
            ${area.icono}
        </div>
        <h3 class="area-title">${area.titulo}</h3>
        <p class="area-description">${area.descripcion}</p>
        <ul class="area-services">
            ${area.servicios.map(servicio => `<li>${servicio}</li>`).join('')}
        </ul>
        <a href="https://wa.me/+56992448094?text=Hola,%20me%20interesa%20el%20área%20de%20${encodeURIComponent(area.titulo)}.%20Me%20gustaría%20recibir%20más%20información." 
           class="area-cta" target="_blank">Consultar sobre ${area.titulo}</a>
    `;
    
    return div;
}

// Cargar servicios dinámicamente
function loadServiciosContent() {
    const serviciosGrid = document.getElementById('servicios-grid');
    if (!serviciosGrid) return;
    
    const servicios = [
        {
            titulo: 'Prevención y Resolución de Conflictos',
            descripcion: 'Diseñamos estrategias jurídicas y contractuales para anticipar y minimizar riesgos legales.',
            detalles: [
                'Análisis de riesgos legales',
                'Estrategias preventivas',
                'Mediación y negociación',
                'Acuerdos extrajudiciales'
            ],
            icono: `<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>`
        },
        {
            titulo: 'Representación Judicial',
            descripcion: 'Defensa y tramitación integral en tribunales civiles, de familia y juzgados de policía local.',
            detalles: [
                'Causas civiles',
                'Asuntos de familia',
                'Causas voluntarias',
                'Juzgado de policía local'
            ],
            icono: `<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3l1.09 3.26L16 6l-2.91.74L12 10l-1.09-3.26L8 6l2.91.74L12 3zm-4 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm8 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-4 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>`
        },
        {
            titulo: 'Derecho Corporativo',
            descripcion: 'Asesoramos a empresas y emprendedores en todas las etapas de su desarrollo.',
            detalles: [
                'Constitución de sociedades',
                'Modificaciones societarias',
                'Contratos comerciales',
                'Gobierno corporativo'
            ],
            icono: `<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
            </svg>`
        },
        {
            titulo: 'Gestión Inmobiliaria Legal',
            descripcion: 'Servicios especializados en el ámbito inmobiliario y de bienes raíces.',
            detalles: [
                'Revisión de títulos',
                'Tramitaciones notariales',
                'Regularizaciones',
                'Litigios inmobiliarios'
            ],
            icono: `<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>`
        }
    ];
    
    servicios.forEach((servicio, index) => {
        const servicioElement = createServicioElement(servicio, index);
        serviciosGrid.appendChild(servicioElement);
    });
}

// Crear elemento de servicio
function createServicioElement(servicio, index) {
    const div = document.createElement('div');
    div.className = 'servicio-card animate-on-scroll';
    div.style.animationDelay = `${index * 0.2}s`;
    
    div.innerHTML = `
        <div class="servicio-icon">
            ${servicio.icono}
        </div>
        <h3 class="servicio-title">${servicio.titulo}</h3>
        <p class="servicio-description">${servicio.descripcion}</p>
        <ul class="servicio-detalles">
            ${servicio.detalles.map(detalle => `<li>${detalle}</li>`).join('')}
        </ul>
        <a href="https://wa.me/+56992448094?text=Hola,%20me%20interesa%20el%20servicio%20de%20${encodeURIComponent(servicio.titulo)}.%20Me%20gustaría%20recibir%20más%20información." 
           class="servicio-cta" target="_blank">Solicitar ${servicio.titulo}</a>
    `;
    
    return div;
}

// ===== UTILIDADES =====

// Debounce function para optimizar eventos de scroll
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

// Throttle function para eventos frecuentes
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== LAZY LOADING DE IMÁGENES =====
function initializeLazyLoading() {
    // Verificar si el navegador soporta Intersection Observer
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    loadImage(img);
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        // Observar todas las imágenes con data-src
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });

        // También observar imágenes que se agreguen dinámicamente
        const mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        const lazyImages = node.querySelectorAll ? node.querySelectorAll('img[data-src]') : [];
                        lazyImages.forEach(img => {
                            imageObserver.observe(img);
                        });
                        
                        // Si el nodo mismo es una imagen lazy
                        if (node.tagName === 'IMG' && node.hasAttribute('data-src')) {
                            imageObserver.observe(node);
                        }
                    }
                });
            });
        });

        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    } else {
        // Fallback para navegadores que no soportan Intersection Observer
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            loadImage(img);
        });
    }
}

// Cargar imagen individual
function loadImage(img) {
    // Crear una nueva imagen para precargar
    const imageLoader = new Image();
    
    imageLoader.onload = function() {
        // Una vez cargada, actualizar el src y añadir clase de cargado
        img.src = img.dataset.src;
        img.classList.add('lazy-loaded');
        img.removeAttribute('data-src');
        
        // Añadir efecto de fade-in
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            img.style.opacity = '1';
        }, 50);
    };
    
    imageLoader.onerror = function() {
        // En caso de error, mostrar imagen placeholder o remover
        img.classList.add('lazy-error');
        console.warn('Error cargando imagen:', img.dataset.src);
    };
    
    // Iniciar la carga
    imageLoader.src = img.dataset.src;
}

// Función para convertir imágenes existentes a lazy loading
function convertToLazyLoading() {
    const images = document.querySelectorAll('img:not([data-src])');
    images.forEach(img => {
        if (img.src && !img.classList.contains('no-lazy')) {
            img.dataset.src = img.src;
            img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
            img.classList.add('lazy-image');
        }
    });
}

// Optimizar eventos de scroll
window.addEventListener('scroll', throttle(handleHeaderScroll, 100));

// ===== LOGO ANIMADO CORREGIDO =====
function initializeAnimatedLogo() {
    if (!heroLogo || !navLogo) {
        console.warn('Elementos del logo animado no encontrados');
        return;
    }
    
    // Configurar el scroll listener para el logo
    window.addEventListener('scroll', throttle(handleLogoAnimation, 16)); // 60fps
    
    // Configurar posición inicial
    setupInitialLogoState();
}

function setupInitialLogoState() {
    // Asegurar que el logo del hero esté visible inicialmente
    heroLogo.classList.remove('transitioning', 'in-navbar');
    
    // Asegurar que el logo del navbar esté oculto inicialmente
    navLogo.classList.remove('visible');
    
    console.log('Logo animado inicializado');
}

function handleLogoAnimation() {
    if (isLogoAnimating) return;
    
    const scrollY = window.scrollY;
    const heroHeight = window.innerHeight;
    const triggerPoint = heroHeight * 0.3; // 30% del viewport
    const endPoint = heroHeight * 0.8; // 80% del viewport
    
    if (scrollY < triggerPoint) {
        // Posición inicial - logo en hero
        setLogoState('hero');
    } else if (scrollY >= triggerPoint && scrollY < endPoint) {
        // Transición - logo moviéndose
        setLogoState('transitioning', scrollY, triggerPoint, endPoint);
    } else {
        // Posición final - logo en navbar
        setLogoState('navbar');
    }
}

function setLogoState(state, scrollY = 0, triggerPoint = 0, endPoint = 0) {
    if (!heroLogo || !navLogo) return;
    
    switch (state) {
        case 'hero':
            heroLogo.classList.remove('transitioning', 'in-navbar');
            navLogo.classList.remove('visible');
            heroLogo.style.opacity = '1';
            heroLogo.style.visibility = 'visible';
            break;
            
        case 'transitioning':
            if (!heroLogo.classList.contains('transitioning')) {
                isLogoAnimating = true;
                heroLogo.classList.add('transitioning');
                heroLogo.classList.remove('in-navbar');
                
                // Calcular progreso de la animación (0 a 1)
                const progress = (scrollY - triggerPoint) / (endPoint - triggerPoint);
                const clampedProgress = Math.max(0, Math.min(1, progress));
                
                // Interpolar posición y tamaño
                animateLogoTransition(clampedProgress);
                
                setTimeout(() => {
                    isLogoAnimating = false;
                }, 50);
            }
            break;
            
        case 'navbar':
            heroLogo.classList.remove('transitioning');
            heroLogo.classList.add('in-navbar');
            navLogo.classList.add('visible');
            
            // Fade out del logo hero
            setTimeout(() => {
                heroLogo.style.opacity = '0';
                heroLogo.style.visibility = 'hidden';
            }, 300);
            break;
    }
}

function animateLogoTransition(progress) {
    if (!heroLogo) return;
    
    // Posiciones iniciales y finales
    const startTop = window.innerHeight * 0.15; // 15% del viewport
    const endTop = window.innerHeight * 0.5; // 50% del viewport (centro del navbar)
    
    const startLeft = window.innerWidth * 0.5; // Centro horizontal
    const endLeft = 80; // Posición en el navbar
    
    const startSize = 200; // Tamaño inicial
    const endSize = 100; // Tamaño final
    
    // Interpolar valores
    const currentTop = startTop + (endTop - startTop) * progress;
    const currentLeft = startLeft + (endLeft - startLeft) * progress;
    const currentSize = startSize + (endSize - startSize) * progress;
    
    // Aplicar transformaciones
    heroLogo.style.position = 'fixed';
    heroLogo.style.top = currentTop + 'px';
    heroLogo.style.left = currentLeft + 'px';
    heroLogo.style.transform = progress < 0.5 ? 'translate(-50%, -50%)' : 'translateY(-50%)';
    heroLogo.style.zIndex = '1001';
    
    // Cambiar tamaño de la imagen
    const logoImg = heroLogo.querySelector('.hero-logo-img');
    if (logoImg) {
        logoImg.style.width = currentSize + 'px';
        
        // Ajustar sombra según el progreso
        const shadowIntensity = 0.3 - (progress * 0.1);
        logoImg.style.boxShadow = `0 ${10 - progress * 5}px ${30 - progress * 15}px rgba(0, 0, 0, ${shadowIntensity})`;
    }
    
    // Fade in del logo del navbar cuando esté cerca del final
    if (progress > 0.8) {
        const navOpacity = (progress - 0.8) / 0.2;
        navLogo.style.opacity = navOpacity;
    } else {
        navLogo.style.opacity = '0';
    }
}

// Función para resetear el logo (útil para debugging)
function resetAnimatedLogo() {
    if (heroLogo) {
        heroLogo.classList.remove('transitioning', 'in-navbar');
        heroLogo.style.position = '';
        heroLogo.style.top = '';
        heroLogo.style.left = '';
        heroLogo.style.transform = '';
        heroLogo.style.opacity = '';
        heroLogo.style.visibility = '';
        heroLogo.style.zIndex = '';
        
        const logoImg = heroLogo.querySelector('.hero-logo-img');
        if (logoImg) {
            logoImg.style.width = '';
            logoImg.style.boxShadow = '';
        }
    }
    
    if (navLogo) {
        navLogo.classList.remove('visible');
        navLogo.style.opacity = '';
    }
    
    setupInitialLogoState();
}

// Función para debugging del logo
function debugLogoAnimation() {
    console.log('=== DEBUG LOGO ANIMADO ===');
    console.log('heroLogo:', heroLogo);
    console.log('navLogo:', navLogo);
    console.log('scrollY:', window.scrollY);
    console.log('heroHeight:', window.innerHeight);
    console.log('triggerPoint:', window.innerHeight * 0.3);
    console.log('endPoint:', window.innerHeight * 0.8);
    
    if (heroLogo) {
        console.log('heroLogo classes:', heroLogo.className);
        console.log('heroLogo style:', heroLogo.style.cssText);
    }
    
    if (navLogo) {
        console.log('navLogo classes:', navLogo.className);
        console.log('navLogo style:', navLogo.style.cssText);
    }
}

// Exponer funciones para debugging (solo en desarrollo)
if (typeof window !== 'undefined') {
    window.resetAnimatedLogo = resetAnimatedLogo;
    window.debugLogoAnimation = debugLogoAnimation;
}
// ===== LOGO ANIMADO CORREGIDO =====
function initializeAnimatedLogo() {
    if (!heroLogo || !navLogo) {
        console.warn('Elementos del logo animado no encontrados');
        return;
    }
    
    // Configurar el scroll listener para el logo
    window.addEventListener('scroll', handleLogoAnimation);
    
    // Configurar posición inicial
    setupInitialLogoState();
    
    console.log('Logo animado inicializado correctamente');
}

function setupInitialLogoState() {
    if (!heroLogo || !navLogo) return;
    
    // Resetear estilos del logo hero
    heroLogo.classList.remove('transitioning', 'in-navbar');
    heroLogo.style.position = '';
    heroLogo.style.top = '';
    heroLogo.style.left = '';
    heroLogo.style.transform = '';
    heroLogo.style.opacity = '';
    heroLogo.style.visibility = '';
    heroLogo.style.zIndex = '';
    
    // Resetear imagen del logo hero
    const heroLogoImg = heroLogo.querySelector('.hero-logo-img');
    if (heroLogoImg) {
        heroLogoImg.style.width = '';
        heroLogoImg.style.boxShadow = '';
    }
    
    // Ocultar logo del navbar
    navLogo.classList.remove('visible');
    navLogo.style.opacity = '';
}

function handleLogoAnimation() {
    if (!heroLogo || !navLogo) return;
    
    const scrollY = window.scrollY;
    const heroHeight = window.innerHeight;
    const headerHeight = document.querySelector('.header').offsetHeight || 80;
    
    // Puntos de activación más tempranos para mejor transición
    const triggerPoint = heroHeight * 0.2; // Inicia al 20% del scroll
    const endPoint = heroHeight * 0.6; // Termina al 60% del scroll
    
    if (scrollY < triggerPoint) {
        // Estado inicial - logo en hero
        setLogoToHeroState();
    } else if (scrollY >= triggerPoint && scrollY < endPoint) {
        // Estado de transición - logo moviéndose
        const progress = (scrollY - triggerPoint) / (endPoint - triggerPoint);
        animateLogoTransition(Math.max(0, Math.min(1, progress)));
    } else {
        // Estado final - logo en navbar
        setLogoToNavbarState();
    }
}

function setLogoToHeroState() {
    if (!heroLogo || !navLogo) return;
    
    // Mostrar logo hero en posición original
    heroLogo.classList.remove('transitioning', 'in-navbar');
    heroLogo.style.position = '';
    heroLogo.style.top = '';
    heroLogo.style.left = '';
    heroLogo.style.transform = '';
    heroLogo.style.opacity = '1';
    heroLogo.style.visibility = 'visible';
    heroLogo.style.zIndex = '';
    
    // Resetear tamaño de imagen
    const heroLogoImg = heroLogo.querySelector('.hero-logo-img');
    if (heroLogoImg) {
        heroLogoImg.style.width = '';
        heroLogoImg.style.boxShadow = '';
    }
    
    // Ocultar logo navbar
    navLogo.classList.remove('visible');
    navLogo.style.opacity = '0';
}

function animateLogoTransition(progress) {
    if (!heroLogo || !navLogo) return;
    
    // Marcar como en transición
    heroLogo.classList.add('transitioning');
    heroLogo.classList.remove('in-navbar');
    
    // Obtener posiciones y tamaños
    const navRect = navLogo.getBoundingClientRect();
    
    // Posiciones iniciales (relativas al viewport)
    const startTop = window.innerHeight * 0.1; // 10% desde arriba
    const startLeft = window.innerWidth * 0.5; // Centro horizontal
    
    // Posiciones finales (posición del navbar)
    const endTop = navRect.top + (navRect.height / 2);
    const endLeft = navRect.left + (navRect.width / 2);
    
    // Tamaños
    const startSize = window.innerWidth <= 768 ? 140 : 180; // Responsive
    const endSize = window.innerWidth <= 768 ? 50 : 60;
    
    // Interpolar valores
    const currentTop = startTop + (endTop - startTop) * progress;
    const currentLeft = startLeft + (endLeft - startLeft) * progress;
    const currentSize = startSize + (endSize - startSize) * progress;
    
    // Aplicar estilos de transición
    heroLogo.style.position = 'fixed';
    heroLogo.style.top = currentTop + 'px';
    heroLogo.style.left = currentLeft + 'px';
    heroLogo.style.transform = 'translate(-50%, -50%)';
    heroLogo.style.zIndex = '1001';
    heroLogo.style.opacity = '1';
    heroLogo.style.visibility = 'visible';
    
    // Cambiar tamaño de la imagen
    const heroLogoImg = heroLogo.querySelector('.hero-logo-img');
    if (heroLogoImg) {
        heroLogoImg.style.width = currentSize + 'px';
        
        // Ajustar sombra gradualmente
        const shadowBlur = 25 - (progress * 15);
        const shadowOpacity = 0.2 - (progress * 0.05);
        heroLogoImg.style.boxShadow = `0 8px ${shadowBlur}px rgba(0, 0, 0, ${shadowOpacity})`;
    }
    
    // Fade in gradual del logo del navbar
    if (progress > 0.7) {
        const navOpacity = (progress - 0.7) / 0.3;
        navLogo.style.opacity = navOpacity;
        if (progress > 0.9) {
            navLogo.classList.add('visible');
        }
    } else {
        navLogo.style.opacity = '0';
        navLogo.classList.remove('visible');
    }
}

function setLogoToNavbarState() {
    if (!heroLogo || !navLogo) return;
    
    // Ocultar completamente el logo hero
    heroLogo.classList.remove('transitioning');
    heroLogo.classList.add('in-navbar');
    heroLogo.style.opacity = '0';
    heroLogo.style.visibility = 'hidden';
    
    // Mostrar completamente el logo navbar
    navLogo.classList.add('visible');
    navLogo.style.opacity = '1';
}

// Función para resetear el logo (útil para debugging)
function resetAnimatedLogo() {
    if (heroLogo) {
        heroLogo.classList.remove('transitioning', 'in-navbar');
        heroLogo.style.position = '';
        heroLogo.style.top = '';
        heroLogo.style.left = '';
        heroLogo.style.transform = '';
        heroLogo.style.opacity = '';
        heroLogo.style.visibility = '';
        heroLogo.style.zIndex = '';
        
        const logoImg = heroLogo.querySelector('.hero-logo-img');
        if (logoImg) {
            logoImg.style.width = '';
            logoImg.style.boxShadow = '';
        }
    }
    
    if (navLogo) {
        navLogo.classList.remove('visible');
        navLogo.style.opacity = '';
    }
    
    setupInitialLogoState();
}

// Función para debugging del logo
function debugLogoAnimation() {
    console.log('=== DEBUG LOGO ANIMADO ===');
    console.log('heroLogo:', heroLogo);
    console.log('navLogo:', navLogo);
    console.log('scrollY:', window.scrollY);
    console.log('heroHeight:', window.innerHeight);
    console.log('triggerPoint:', window.innerHeight * 0.2);
    console.log('endPoint:', window.innerHeight * 0.6);
    
    if (heroLogo) {
        console.log('heroLogo classes:', heroLogo.className);
        console.log('heroLogo style:', heroLogo.style.cssText);
    }
    
    if (navLogo) {
        console.log('navLogo classes:', navLogo.className);
        console.log('navLogo style:', navLogo.style.cssText);
    }
}

// Exponer funciones para debugging
if (typeof window !== 'undefined') {
    window.resetAnimatedLogo = resetAnimatedLogo;
    window.debugLogoAnimation = debugLogoAnimation;
}
// ===== LOGO ANIMADO COMPLETAMENTE CORREGIDO =====
function initializeAnimatedLogo() {
    console.log('🎭 Inicializando logo animado...');
    
    if (!heroLogo || !navLogo) {
        console.error('❌ Elementos del logo no encontrados:', { heroLogo, navLogo });
        return;
    }
    
    // Configurar estado inicial
    setupInitialLogoState();
    
    // Configurar listener de scroll con throttling
    let ticking = false;
    function handleScrollThrottled() {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleLogoAnimation();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', handleScrollThrottled, { passive: true });
    
    console.log('✅ Logo animado inicializado correctamente');
}

function setupInitialLogoState() {
    if (!heroLogo || !navLogo) return;
    
    console.log('🔄 Configurando estado inicial del logo...');
    
    // Resetear completamente el logo hero
    heroLogo.classList.remove('transitioning', 'in-navbar');
    heroLogo.style.cssText = ''; // Limpiar todos los estilos inline
    
    // Resetear imagen del logo hero
    const heroLogoImg = heroLogo.querySelector('.hero-logo-img');
    if (heroLogoImg) {
        heroLogoImg.style.cssText = ''; // Limpiar todos los estilos inline
    }
    
    // Ocultar logo del navbar
    navLogo.classList.remove('visible');
    navLogo.style.opacity = '0';
    
    console.log('✅ Estado inicial configurado');
}

function handleLogoAnimation() {
    if (!heroLogo || !navLogo) return;
    
    const scrollY = window.scrollY;
    const heroHeight = window.innerHeight;
    
    // Puntos de activación optimizados
    const triggerPoint = heroHeight * 0.15; // Inicia al 15% del scroll
    const endPoint = heroHeight * 0.5; // Termina al 50% del scroll
    
    if (scrollY < triggerPoint) {
        // Estado inicial - logo en hero
        setLogoToHeroState();
    } else if (scrollY >= triggerPoint && scrollY < endPoint) {
        // Estado de transición - logo moviéndose
        const progress = (scrollY - triggerPoint) / (endPoint - triggerPoint);
        animateLogoTransition(Math.max(0, Math.min(1, progress)));
    } else {
        // Estado final - logo en navbar
        setLogoToNavbarState();
    }
}

function setLogoToHeroState() {
    if (!heroLogo || !navLogo) return;
    
    // Restaurar logo hero a su estado original
    heroLogo.classList.remove('transitioning', 'in-navbar');
    heroLogo.style.cssText = ''; // Limpiar estilos inline para usar CSS original
    
    // Restaurar imagen del logo hero
    const heroLogoImg = heroLogo.querySelector('.hero-logo-img');
    if (heroLogoImg) {
        heroLogoImg.style.cssText = ''; // Limpiar estilos inline
    }
    
    // Ocultar logo navbar
    navLogo.classList.remove('visible');
    navLogo.style.opacity = '0';
}

function animateLogoTransition(progress) {
    if (!heroLogo || !navLogo) return;
    
    // Marcar como en transición
    heroLogo.classList.add('transitioning');
    heroLogo.classList.remove('in-navbar');
    
    // Calcular posiciones
    const heroRect = heroLogo.getBoundingClientRect();
    const navRect = navLogo.getBoundingClientRect();
    
    // Posición inicial del logo (centro del hero)
    const startTop = window.innerHeight * 0.12; // 12% desde arriba
    const startLeft = window.innerWidth * 0.5; // Centro horizontal
    
    // Posición final (centro del logo del navbar)
    const endTop = navRect.top + (navRect.height / 2);
    const endLeft = navRect.left + (navRect.width / 2);
    
    // Tamaños responsive
    let startSize, endSize;
    if (window.innerWidth <= 480) {
        startSize = 120;
        endSize = 40;
    } else if (window.innerWidth <= 768) {
        startSize = 140;
        endSize = 45;
    } else {
        startSize = 180;
        endSize = 55;
    }
    
    // Interpolar valores con easing suave
    const easeProgress = easeInOutCubic(progress);
    const currentTop = startTop + (endTop - startTop) * easeProgress;
    const currentLeft = startLeft + (endLeft - startLeft) * easeProgress;
    const currentSize = startSize + (endSize - startSize) * easeProgress;
    
    // Aplicar transformaciones
    heroLogo.style.position = 'fixed';
    heroLogo.style.top = currentTop + 'px';
    heroLogo.style.left = currentLeft + 'px';
    heroLogo.style.transform = 'translate(-50%, -50%)';
    heroLogo.style.zIndex = '1001';
    heroLogo.style.opacity = '1';
    heroLogo.style.visibility = 'visible';
    
    // Cambiar tamaño de la imagen
    const heroLogoImg = heroLogo.querySelector('.hero-logo-img');
    if (heroLogoImg) {
        heroLogoImg.style.width = currentSize + 'px';
        
        // Ajustar sombra gradualmente
        const shadowBlur = 30 - (progress * 15);
        const shadowOpacity = 0.25 - (progress * 0.05);
        heroLogoImg.style.boxShadow = `0 10px ${shadowBlur}px rgba(0, 0, 0, ${shadowOpacity})`;
        
        // Mantener forma cuadrada
        heroLogoImg.style.borderRadius = '0';
    }
    
    // Fade in gradual del logo del navbar
    if (progress > 0.6) {
        const navOpacity = (progress - 0.6) / 0.4;
        navLogo.style.opacity = navOpacity;
        if (progress > 0.8) {
            navLogo.classList.add('visible');
        }
    } else {
        navLogo.style.opacity = '0';
        navLogo.classList.remove('visible');
    }
}

function setLogoToNavbarState() {
    if (!heroLogo || !navLogo) return;
    
    // Ocultar completamente el logo hero
    heroLogo.classList.remove('transitioning');
    heroLogo.classList.add('in-navbar');
    heroLogo.style.opacity = '0';
    heroLogo.style.visibility = 'hidden';
    
    // Mostrar completamente el logo navbar
    navLogo.classList.add('visible');
    navLogo.style.opacity = '1';
}

// Función de easing para transiciones suaves
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

// Función para resetear el logo (debugging)
function resetAnimatedLogo() {
    console.log('🔄 Reseteando logo animado...');
    
    if (heroLogo) {
        heroLogo.classList.remove('transitioning', 'in-navbar');
        heroLogo.style.cssText = '';
        
        const logoImg = heroLogo.querySelector('.hero-logo-img');
        if (logoImg) {
            logoImg.style.cssText = '';
        }
    }
    
    if (navLogo) {
        navLogo.classList.remove('visible');
        navLogo.style.opacity = '0';
    }
    
    setupInitialLogoState();
    console.log('✅ Logo reseteado');
}

// Función para debugging del logo
function debugLogoAnimation() {
    console.log('=== 🔍 DEBUG LOGO ANIMADO ===');
    console.log('Elementos:');
    console.log('  heroLogo:', heroLogo);
    console.log('  navLogo:', navLogo);
    console.log('Scroll:');
    console.log('  scrollY:', window.scrollY);
    console.log('  heroHeight:', window.innerHeight);
    console.log('  triggerPoint:', window.innerHeight * 0.15);
    console.log('  endPoint:', window.innerHeight * 0.5);
    
    if (heroLogo) {
        console.log('Hero Logo:');
        console.log('  classes:', heroLogo.className);
        console.log('  style:', heroLogo.style.cssText);
        
        const img = heroLogo.querySelector('.hero-logo-img');
        if (img) {
            console.log('  img style:', img.style.cssText);
        }
    }
    
    if (navLogo) {
        console.log('Nav Logo:');
        console.log('  classes:', navLogo.className);
        console.log('  style:', navLogo.style.cssText);
    }
}

// ===== CONTENIDO DINÁMICO RESTAURADO =====
function loadDynamicContent() {
    console.log('📦 Cargando contenido dinámico...');
    loadAreasContent();
    loadServiciosContent();
}

// Cargar áreas de práctica dinámicamente
function loadAreasContent() {
    const areasGrid = document.getElementById('areas-grid');
    if (!areasGrid) {
        console.error('❌ Contenedor areas-grid no encontrado');
        return;
    }
    
    console.log('🏛️ Cargando áreas de práctica...');
    
    const areas = [
        {
            titulo: 'Derecho Corporativo',
            descripcion: 'Constitución de sociedades, contratos, fusiones y adquisiciones. Asesoría legal integral para empresas.',
            servicios: [
                'Constitución de sociedades',
                'Redacción y revisión de contratos',
                'Fusiones y adquisiciones',
                'Asesoría legal empresarial'
            ],
            icono: `<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
            </svg>`
        },
        {
            titulo: 'Derecho Inmobiliario',
            descripcion: 'Estudios de títulos, compraventas, arriendos y regularización de propiedades.',
            servicios: [
                'Estudios de títulos',
                'Compraventas y arriendos',
                'Regularización de propiedades',
                'Litigios inmobiliarios'
            ],
            icono: `<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>`
        },
        {
            titulo: 'Derecho de Familia',
            descripcion: 'Divorcios, cuidado personal, alimentos, régimen comunicacional y adopciones.',
            servicios: [
                'Divorcios',
                'Cuidado personal y alimentos',
                'Régimen comunicacional',
                'Adopciones y medidas de protección'
            ],
            icono: `<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm5.5 3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM1 9v2h6V9H1zm16 0v2h6V9h-6zM12.5 12c-.83 0-1.5.67-1.5 1.5v6c0 .83.67 1.5 1.5 1.5S14 20.33 14 19.5v-6c0-.83-.67-1.5-1.5-1.5zM5.5 12c-.83 0-1.5.67-1.5 1.5v6c0 .83.67 1.5 1.5 1.5S7 20.33 7 19.5v-6C7 12.67 6.33 12 5.5 12zM18.5 12c-.83 0-1.5.67-1.5 1.5v6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-6c0-.83-.67-1.5-1.5-1.5z"/>
            </svg>`
        },
        {
            titulo: 'Litigios Civiles y Policía Local',
            descripcion: 'Defensa y tramitación de demandas, recursos y reclamaciones por infracciones.',
            servicios: [
                'Defensa en demandas civiles',
                'Recursos y reclamaciones',
                'Infracciones de tránsito',
                'Controversias en copropiedad'
            ],
            icono: `<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>`
        }
    ];
    
    // Limpiar contenido existente
    areasGrid.innerHTML = '';
    
    areas.forEach((area, index) => {
        const areaElement = createAreaElement(area, index);
        areasGrid.appendChild(areaElement);
    });
    
    console.log(`✅ ${areas.length} áreas de práctica cargadas`);
}

// Crear elemento de área
function createAreaElement(area, index) {
    const div = document.createElement('div');
    div.className = 'area-card animate-on-scroll';
    div.style.animationDelay = `${index * 0.2}s`;
    
    div.innerHTML = `
        <div class="area-icon">
            ${area.icono}
        </div>
        <h3 class="area-title">${area.titulo}</h3>
        <p class="area-description">${area.descripcion}</p>
        <ul class="area-services">
            ${area.servicios.map(servicio => `<li>${servicio}</li>`).join('')}
        </ul>
        <a href="https://wa.me/+56992448094?text=Hola,%20me%20interesa%20el%20área%20de%20${encodeURIComponent(area.titulo)}.%20Me%20gustaría%20recibir%20más%20información." 
           class="area-cta" target="_blank">Consultar sobre ${area.titulo}</a>
    `;
    
    return div;
}

// Cargar servicios dinámicamente
function loadServiciosContent() {
    const serviciosGrid = document.getElementById('servicios-grid');
    if (!serviciosGrid) {
        console.error('❌ Contenedor servicios-grid no encontrado');
        return;
    }
    
    console.log('⚖️ Cargando servicios...');
    
    const servicios = [
        {
            titulo: 'Prevención y Resolución de Conflictos',
            descripcion: 'Diseñamos estrategias jurídicas y contractuales para anticipar y minimizar riesgos legales.',
            detalles: [
                'Análisis de riesgos legales',
                'Estrategias preventivas',
                'Mediación y negociación',
                'Acuerdos extrajudiciales'
            ],
            icono: `<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>`
        },
        {
            titulo: 'Representación Judicial',
            descripcion: 'Defensa y tramitación integral en tribunales civiles, de familia y juzgados de policía local.',
            detalles: [
                'Causas civiles',
                'Asuntos de familia',
                'Causas voluntarias',
                'Juzgado de policía local'
            ],
            icono: `<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3l1.09 3.26L16 6l-2.91.74L12 10l-1.09-3.26L8 6l2.91.74L12 3zm-4 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm8 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-4 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>`
        },
        {
            titulo: 'Derecho Corporativo',
            descripcion: 'Asesoramos a empresas y emprendedores en todas las etapas de su desarrollo.',
            detalles: [
                'Constitución de sociedades',
                'Modificaciones societarias',
                'Contratos comerciales',
                'Gobierno corporativo'
            ],
            icono: `<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
            </svg>`
        },
        {
            titulo: 'Gestión Inmobiliaria Legal',
            descripcion: 'Servicios especializados en el ámbito inmobiliario y de bienes raíces.',
            detalles: [
                'Revisión de títulos',
                'Tramitaciones notariales',
                'Regularizaciones',
                'Litigios inmobiliarios'
            ],
            icono: `<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>`
        }
    ];
    
    // Limpiar contenido existente
    serviciosGrid.innerHTML = '';
    
    servicios.forEach((servicio, index) => {
        const servicioElement = createServicioElement(servicio, index);
        serviciosGrid.appendChild(servicioElement);
    });
    
    console.log(`✅ ${servicios.length} servicios cargados`);
}

// Crear elemento de servicio
function createServicioElement(servicio, index) {
    const div = document.createElement('div');
    div.className = 'servicio-card animate-on-scroll';
    div.style.animationDelay = `${index * 0.2}s`;
    
    div.innerHTML = `
        <div class="servicio-icon">
            ${servicio.icono}
        </div>
        <h3 class="servicio-title">${servicio.titulo}</h3>
        <p class="servicio-description">${servicio.descripcion}</p>
        <ul class="servicio-detalles">
            ${servicio.detalles.map(detalle => `<li>${detalle}</li>`).join('')}
        </ul>
        <a href="https://wa.me/+56992448094?text=Hola,%20me%20interesa%20el%20servicio%20de%20${encodeURIComponent(servicio.titulo)}.%20Me%20gustaría%20recibir%20más%20información." 
           class="servicio-cta" target="_blank">Solicitar ${servicio.titulo}</a>
    `;
    
    return div;
}

// Exponer funciones para debugging
if (typeof window !== 'undefined') {
    window.resetAnimatedLogo = resetAnimatedLogo;
    window.debugLogoAnimation = debugLogoAnimation;
    window.loadDynamicContent = loadDynamicContent;
    window.loadAreasContent = loadAreasContent;
    window.loadServiciosContent = loadServiciosContent;
} 
// ===== SISTEMA DE BOTONES CTA MEJORADO =====
let currentSelectedMessage = '';

// Función para manejar clicks en botones CTA
function handleCTAClick(event, message, sectionName) {
    event.preventDefault();
    
    // Guardar el mensaje seleccionado
    currentSelectedMessage = message;
    
    // Actualizar textarea del formulario
    updateContactForm(message);
    
    // Actualizar enlace de WhatsApp
    updateWhatsAppLink(message);
    
    // Navegar a la sección de contacto
    navigateToContact();
    
    console.log(`📧 Mensaje seleccionado de ${sectionName}:`, message);
}

// Actualizar el textarea del formulario de contacto
function updateContactForm(message) {
    const messageTextarea = document.getElementById('mensaje');
    if (messageTextarea) {
        messageTextarea.value = message;
        messageTextarea.focus();
        
        // Añadir efecto visual
        messageTextarea.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
        setTimeout(() => {
            messageTextarea.style.backgroundColor = '';
        }, 2000);
    }
}

// Actualizar el enlace de WhatsApp "Escríbanos ahora"
function updateWhatsAppLink(message) {
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    
    whatsappLinks.forEach(link => {
        // Actualizar href con el nuevo mensaje
        const baseUrl = 'https://wa.me/+56992448094?text=';
        const encodedMessage = encodeURIComponent(message);
        link.href = baseUrl + encodedMessage;
        
        // Si es el enlace "Escríbanos ahora", actualizar también el texto visible
        if (link.textContent.includes('Escríbanos') || link.textContent.includes('WhatsApp')) {
            const originalText = link.textContent;
            link.textContent = `${originalText} - ${message.substring(0, 50)}...`;
            
            // Restaurar texto original después de 5 segundos
            setTimeout(() => {
                link.textContent = originalText;
            }, 5000);
        }
    });
}

// Navegar suavemente a la sección de contacto
function navigateToContact() {
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
        const headerHeight = document.querySelector('.header').offsetHeight || 80;
        const targetPosition = contactSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Añadir efecto visual a la sección de contacto
        contactSection.style.backgroundColor = 'rgba(212, 175, 55, 0.05)';
        setTimeout(() => {
            contactSection.style.backgroundColor = '';
        }, 3000);
    }
}

// Función para generar mensajes personalizados
function generatePersonalizedMessage(type, title) {
    const messages = {
        area: `Hola, me interesa recibir asesoría en el área de ${title}. Me gustaría conocer más detalles sobre sus servicios y agendar una consulta.`,
        servicio: `Hola, necesito información sobre el servicio de ${title}. Me gustaría recibir asesoría personalizada y conocer los costos asociados.`,
        estudio: `Hola, me interesa conocer más sobre Fierro y Pérez Abogados. Me gustaría recibir información sobre sus servicios y agendar una consulta inicial.`
    };
    
    return messages[type] || messages.estudio;
}

// Actualizar función createAreaElement para usar el nuevo sistema
function createAreaElement(area, index) {
    const div = document.createElement('div');
    div.className = 'area-card animate-on-scroll';
    div.style.animationDelay = `${index * 0.2}s`;
    
    const personalizedMessage = generatePersonalizedMessage('area', area.titulo);
    
    div.innerHTML = `
        <div class="area-icon">
            ${area.icono}
        </div>
        <h3 class="area-title">${area.titulo}</h3>
        <p class="area-description">${area.descripcion}</p>
        <ul class="area-services">
            ${area.servicios.map(servicio => `<li>${servicio}</li>`).join('')}
        </ul>
        <button class="area-cta" onclick="handleCTAClick(event, '${personalizedMessage.replace(/'/g, "\\'")}', '${area.titulo}')">
            Consultar sobre ${area.titulo}
        </button>
    `;
    
    return div;
}

// Actualizar función createServicioElement para usar el nuevo sistema
function createServicioElement(servicio, index) {
    const div = document.createElement('div');
    div.className = 'servicio-card animate-on-scroll';
    div.style.animationDelay = `${index * 0.2}s`;
    
    const personalizedMessage = generatePersonalizedMessage('servicio', servicio.titulo);
    
    div.innerHTML = `
        <div class="servicio-icon">
            ${servicio.icono}
        </div>
        <h3 class="servicio-title">${servicio.titulo}</h3>
        <p class="servicio-description">${servicio.descripcion}</p>
        <ul class="servicio-detalles">
            ${servicio.detalles.map(detalle => `<li>${detalle}</li>`).join('')}
        </ul>
        <button class="servicio-cta" onclick="handleCTAClick(event, '${personalizedMessage.replace(/'/g, "\\'")}', '${servicio.titulo}')">
            Solicitar ${servicio.titulo}
        </button>
    `;
    
    return div;
}

// Función para agregar botón CTA al estudio
function addEstudioCTA() {
    const estudioSection = document.querySelector('.estudio');
    const ctaButton = estudioSection?.querySelector('.cta-button');
    
    if (ctaButton) {
        const personalizedMessage = generatePersonalizedMessage('estudio', 'Fierro y Pérez Abogados');
        
        ctaButton.onclick = function(event) {
            handleCTAClick(event, personalizedMessage, 'El Estudio');
        };
        
        // Remover href para evitar navegación directa a WhatsApp
        ctaButton.removeAttribute('href');
        ctaButton.style.cursor = 'pointer';
    }
}

// Inicializar el sistema de CTAs mejorado
function initializeCTASystem() {
    console.log('🔗 Inicializando sistema de CTAs mejorado...');
    
    // Agregar CTA al estudio
    setTimeout(() => {
        addEstudioCTA();
    }, 1000);
    
    console.log('✅ Sistema de CTAs inicializado');
}

// Agregar inicialización del sistema CTA
document.addEventListener('DOMContentLoaded', function() {
    // ... código existente ...
    setTimeout(() => {
        initializeCTASystem();
    }, 1500);
});