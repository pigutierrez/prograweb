(function () {
  "use strict";

  // Función para manejar el estilo del header al hacer scroll
  function handleScrollState() {
    const headerElement = document.querySelector('.header');
    const logoImg = document.querySelector('.logo-img');
    const logoText = document.querySelector('.logo-text');

    if (!headerElement || !logoImg || !logoText) return;

    if (window.scrollY > 250) {
      headerElement.classList.add('scrolled');
      logoImg.style.display = 'none';
      logoText.style.display = 'block';
    } else {
      headerElement.classList.remove('scrolled');
      logoImg.style.display = 'block';
      logoText.style.display = 'none';
    }
  }

  // Ejecuta la función al hacer scroll y al cargar la página
  document.addEventListener('scroll', handleScrollState);
  window.addEventListener('load', handleScrollState);

  // Menú de navegación móvil
  const mobileNavButton = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.navmenu');

  // Función para alternar el menú y el icono de la hamburguesa
  if (mobileNavButton) {
    function toggleMobileNav() {
      document.body.classList.toggle('mobile-nav-active');
      mobileNavButton.classList.toggle('bi-list');
      mobileNavButton.classList.toggle('bi-x');
      navMenu.classList.toggle('active'); // Alternar la visibilidad del menú
    }

    mobileNavButton.addEventListener('click', toggleMobileNav);

    // Cambiar el selector para que coincida con el HTML
    document.querySelectorAll('.navmenu a').forEach(link => {
      link.addEventListener('click', () => {
        if (document.body.classList.contains('mobile-nav-active')) {
          toggleMobileNav();
        }
      });
    });
  }

  // Preloader
  const preloaderElement = document.querySelector('#preloader');
  if (preloaderElement) {
    window.addEventListener('load', () => preloaderElement.remove());
  }

  // Botón para volver al inicio
  const scrollTopButton = document.querySelector('.scroll-top');
  function handleScrollTopButton() {
    if (scrollTopButton) {
      scrollTopButton.classList.toggle('active', window.scrollY > 100);
    }
  }

  if (scrollTopButton) {
    scrollTopButton.addEventListener('click', (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.addEventListener('load', handleScrollTopButton);
  document.addEventListener('scroll', handleScrollTopButton);

  // AOS
  window.addEventListener('load', () => AOS.init({ duration: 600, easing: 'ease-in-out', once: true, mirror: false }));

  // GLightbox
  GLightbox({ selector: '.glightbox' });

// Swiper
const swiperConfig = {
  loop: true,
  speed: 600,
  autoplay: { delay: 5000 },
  slidesPerView: "auto",
  centeredSlides: true,
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true
  },
  breakpoints: {
    320: { slidesPerView: 1, spaceBetween: 0 },
    768: { slidesPerView: 2, spaceBetween: 20 },
    1200: { slidesPerView: 5, spaceBetween: 20 }
  }
};

new Swiper(".init-swiper", swiperConfig);

  // Ajustar posición de desplazamiento para enlaces hash
  window.addEventListener('load', function () {
    if (window.location.hash) {
      history.replaceState("", document.title, window.location.pathname + window.location.search);
    }

    // Si hay un hash en la URL, hacer scroll hasta esa sección, sino, scroll al inicio
    if (window.location.hash) {
      const targetSection = document.querySelector(window.location.hash);
      if (targetSection) {
        setTimeout(() => {
          const scrollMargin = getComputedStyle(targetSection).scrollMarginTop;
          window.scrollTo({
            top: targetSection.offsetTop - parseInt(scrollMargin),
            behavior: 'smooth'
          });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // Scrollspy para el menú de navegación
  const navMenuLinks = document.querySelectorAll('.navmenu a');
  function updateNavMenuScrollSpy() {
    navMenuLinks.forEach(link => {
      if (!link.hash) return;
      const section = document.querySelector(link.hash);
      if (!section) return;

      const currentPosition = window.scrollY + 200;
      link.classList.toggle('active', currentPosition >= section.offsetTop && currentPosition <= (section.offsetTop + section.offsetHeight));
    });
  }

  window.addEventListener('load', updateNavMenuScrollSpy);
  document.addEventListener('scroll', updateNavMenuScrollSpy);

  // EmailJS: Configuración y envío del formulario
  emailjs.init("IHwJhomQrbod07_QA");  // Sustituye USER_ID con tu User ID de EmailJS

  // Función para enviar el formulario
  document.getElementById('pedidoForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Evita que se recargue la página

    var formData = {
      nombre: document.getElementById('nombre').value,
      email: document.getElementById('email').value,
      mensaje: document.getElementById('mensaje').value
    };

    // Enviar el formulario usando EmailJS
    emailjs.send("service_o1zc1ti", "template_ztdvz9s", formData)  // Sustituye SERVICE_ID y TEMPLATE_ID con los correspondientes de tu configuración
      .then(function(response) {
        console.log('Success', response); 
        alert('¡Gracias! Hemos recibido tu pedido.');
        document.getElementById('pedidoForm').reset();  
      }, function(error) {
        console.log('Failed', error); 
        alert('Hubo un error al enviar el formulario. Por favor, intenta de nuevo más tarde.');
      });
  });

})();
