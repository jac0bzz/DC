document.addEventListener("DOMContentLoaded", () => {
    
    // 0. PRELOADER Y SINCRONIZACIÓN DE ANIMACIONES HERO
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            if(preloader){
                preloader.style.opacity = '0';
                setTimeout(() => { 
                    preloader.style.display = 'none'; 
                    iniciarObservadorCinematico(); 
                }, 800);
            } else {
                iniciarObservadorCinematico();
            }
        }, 500); 
    });

    // 1. HEADER DINÁMICO
    const header = document.getElementById('mainHeader');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. MENÚ HAMBURGUESA MÓVIL
    const menuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // 3. MOTOR DE ANIMACIÓN SCROLL
    const hWrapper = document.querySelector('.horizontal-scroll-wrapper');
    const hContent = document.querySelector('.horizontal-content');
    const parallaxElements = document.querySelectorAll('.parallax');
    const heroCoinScroll = document.getElementById('heroCoinScroll');
    const scrollImg = document.querySelector('.scroll-expand-img');
    const matrixGrid = document.getElementById('matrixGrid');

    function animationEngine() {
        const scrollY = window.scrollY;

        parallaxElements.forEach(el => {
            const speed = parseFloat(el.getAttribute('data-speed'));
            el.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
        });

        if (heroCoinScroll) {
            heroCoinScroll.style.transform = `translate3d(0, ${scrollY * 0.5}px, 0) rotateY(${scrollY * 0.8}deg)`;
        }

        if (scrollImg && window.innerWidth > 1024) {
            const rect = scrollImg.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                let scale = 1.4 - ((window.innerHeight - rect.top) * 0.0005);
                scale = Math.max(1, Math.min(scale, 1.4)); 
                scrollImg.style.transform = `scale(${scale})`;
            }
        }

        if (matrixGrid && window.innerWidth > 1024) {
            const gridRect = matrixGrid.getBoundingClientRect();
            if (gridRect.top < window.innerHeight && gridRect.bottom > 0) {
                const scrollProgress = window.innerHeight - gridRect.top;
                const col1 = matrixGrid.children[0];
                const col2 = matrixGrid.children[1];
                const col3 = matrixGrid.children[2];

                if(col1) col1.style.transform = `translate3d(0, -${scrollProgress * 0.08}px, 0)`;
                if(col2) col2.style.transform = `translate3d(0, -${scrollProgress * 0.02}px, 0)`;
                if(col3) col3.style.transform = `translate3d(0, -${scrollProgress * 0.05}px, 0)`;
            }
        }

        if (hWrapper && hContent) {
            const wrapperTop = hWrapper.offsetTop;
            const wrapperHeight = hWrapper.offsetHeight;
            const windowHeight = window.innerHeight;
            
            if (scrollY >= wrapperTop && scrollY <= wrapperTop + wrapperHeight - windowHeight) {
                const progress = (scrollY - wrapperTop) / (wrapperHeight - windowHeight);
                const paddingComp = window.innerWidth <= 768 ? (window.innerWidth * 0.5) : (window.innerWidth * 0.1);
                const maxTranslate = hContent.scrollWidth - window.innerWidth + paddingComp;
                
                hContent.style.transform = `translate3d(-${progress * maxTranslate}px, 0, 0)`;
            }
        }

        requestAnimationFrame(animationEngine);
    }
    requestAnimationFrame(animationEngine);

    // 4. REVELACIONES CINEMATOGRÁFICAS
    function iniciarObservadorCinematico() {
        const revealElements = document.querySelectorAll('.reveal-up, .reveal-blur, .reveal-scale, .reveal-3d');
        const cinematicObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); 
                }
            });
        }, { threshold: 0, rootMargin: "0px 0px -30px 0px" });

        revealElements.forEach(el => cinematicObserver.observe(el));
    }

    // 5. MODAL DE CERTIFICADOS (CORREGIDO: Sin vaciar el SRC)
    const imgModal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeCertBtn = document.getElementById('closeCertModal');
    const imgTriggers = document.querySelectorAll('.open-modal-btn');

    if(imgModal && modalImg && imgTriggers.length > 0) {
        imgTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const imgSrc = trigger.getAttribute('data-img');
                if (imgSrc) {
                    modalImg.src = imgSrc;
                    imgModal.classList.add('active');
                    document.body.style.overflow = 'hidden'; 
                }
            });
        });

        const closeImageModal = () => {
            imgModal.classList.remove('active');
            document.body.style.overflow = ''; 
        };

        closeCertBtn.addEventListener('click', closeImageModal);
        imgModal.addEventListener('click', (e) => {
            if(e.target === imgModal) closeImageModal(); 
        });
    }

    // 6. PANEL DINÁMICO DE PRODUCTOS
    const productPanel = document.getElementById('productPanel');
    const panelOverlay = document.getElementById('panelOverlay');
    const closePanelBtn = document.getElementById('closePanel');
    const productTriggers = document.querySelectorAll('.open-product-panel');

    const panelImg = document.getElementById('panelImg');
    const panelTitle = document.getElementById('panelTitle');
    const panelSpecs = document.getElementById('panelSpecs');
    const panelWpp = document.getElementById('panelWpp');

    if(productPanel && productTriggers.length > 0) {
        
        const closeProductPanel = () => {
            productPanel.classList.remove('active');
            panelOverlay.classList.remove('active');
            document.body.style.overflow = ''; 
        };

        productTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const img = trigger.querySelector('img').src;
                const title = trigger.querySelector('h3').innerText;
                const specs = trigger.getAttribute('data-specs'); 
                
                panelImg.src = img;
                panelTitle.innerText = title;
                
                panelSpecs.innerHTML = '';
                if(specs) {
                    const specsArray = specs.split('|');
                    specsArray.forEach(spec => {
                        const li = document.createElement('li');
                        li.innerHTML = `<i class="fa-solid fa-check"></i> <span>${spec.trim()}</span>`;
                        panelSpecs.appendChild(li);
                    });
                } else {
                    panelSpecs.innerHTML = `<li><i class="fa-solid fa-circle-info"></i> <span>Especificaciones detalladas bajo consulta técnica con nuestros ingenieros.</span></li>`;
                }

                const wppMsg = `Hola D&C Standards, deseo cotizar el siguiente equipo: ${title}`;
                panelWpp.href = `https://wa.me/573022598171?text=${encodeURIComponent(wppMsg)}`; 

                productPanel.classList.add('active');
                panelOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; 
            });
        });

        closePanelBtn.addEventListener('click', closeProductPanel);
        panelOverlay.addEventListener('click', closeProductPanel);
    }
});