(function() {
  "use strict";

  // Función para manejar el estado de desplazamiento
  function handleScrollState() {
    const bodyElement = document.querySelector('body');
    const headerElement = document.querySelector('#header');

    // Verificamos si el encabezado tiene una de las clases relevantes
    if (!(headerElement.classList.contains('scroll-up-sticky') || 
          headerElement.classList.contains('sticky-top') || 
          headerElement.classList.contains('fixed-top'))) return;

    // Agregar o quitar clase 'scrolled' según la posición del scroll
    bodyElement.classList.toggle('scrolled', window.scrollY > 100);
  }

  // Eventos para el desplazamiento y carga de ventana
  document.addEventListener('scroll', handleScrollState);
  window.addEventListener('load', handleScrollState);

  // Manejo del menú de navegación móvil
  const mobileNavButton = document.querySelector('.mobile-nav-toggle');

  function toggleMobileNav() {
    document.body.classList.toggle('mobile-nav-active');
    mobileNavButton.classList.toggle('bi-list');
    mobileNavButton.classList.toggle('bi-x');
  }

  // Evento para el botón del menú móvil
  mobileNavButton.addEventListener('click', toggleMobileNav);

  // Cerrar el menú móvil al hacer clic en enlaces internos
  document.querySelectorAll('#navmenu a').forEach(link => {
    link.addEventListener('click', () => {
      if (document.body.classList.contains('mobile-nav-active')) {
        toggleMobileNav();
      }
    });
  });

  // Preloader
  const preloaderElement = document.querySelector('#preloader');
  if (preloaderElement) {
    window.addEventListener('load', () => {
      preloaderElement.remove();
    });
  }

  // Botón para volver al inicio
  const scrollTopButton = document.querySelector('.scroll-top');

  function handleScrollTopButton() {
    if (scrollTopButton) {
      scrollTopButton.classList.toggle('active', window.scrollY > 100);
    }
  }

  // Evento para el botón de volver al inicio
  scrollTopButton.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('load', handleScrollTopButton);
  document.addEventListener('scroll', handleScrollTopButton);

  // Inicialización de AOS (Animate On Scroll)
  function initializeAOS() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  window.addEventListener('load', initializeAOS);

  // Inicialización de GLightbox
  const lightbox = GLightbox({ selector: '.glightbox' });

  // Inicialización de PureCounter
  new PureCounter();

  // Función para inicializar Swiper
  function setupSwipers() {
    document.querySelectorAll(".init-swiper").forEach(swiperElement => {
      let config = JSON.parse(swiperElement.querySelector(".swiper-config").innerHTML.trim());

      if (swiperElement.classList.contains("swiper-tab")) {
        initializeSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", setupSwipers);

  // Ajustar la posición de desplazamiento en la carga de la página para enlaces hash
  window.addEventListener('load', function() {
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
      const isActive = currentPosition >= section.offsetTop && currentPosition <= (section.offsetTop + section.offsetHeight);

      link.classList.toggle('active', isActive);
    });
  }

  window.addEventListener('load', updateNavMenuScrollSpy);
  document.addEventListener('scroll', updateNavMenuScrollSpy);

})();

// Captura los elementos del formulario
const nombreInput = document.getElementById("nombre");
const emailInput = document.getElementById("email");
const mensajeInput = document.getElementById("mensaje");

// Recupera datos desde el Local Storage al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("nombre")) nombreInput.value = localStorage.getItem("nombre");
    if (localStorage.getItem("email")) emailInput.value = localStorage.getItem("email");
    if (localStorage.getItem("mensaje")) mensajeInput.value = localStorage.getItem("mensaje");
});

// Guarda los datos en Local Storage cuando el usuario escribe
nombreInput.addEventListener("input", () => localStorage.setItem("nombre", nombreInput.value));
emailInput.addEventListener("input", () => localStorage.setItem("email", emailInput.value));
mensajeInput.addEventListener("input", () => localStorage.setItem("mensaje", mensajeInput.value));

// Envío del formulario y limpieza del Local Storage
document.getElementById("pedidoForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío normal del formulario

    const formData = new FormData(this);
    
    fetch("enviar_pedido.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(responseText => {
        alert(responseText); // Muestra la respuesta del servidor
        localStorage.clear(); // Limpia el Local Storage
        this.reset(); // Reinicia el formulario
    })
    .catch(error => console.error("Error:", error));
});
