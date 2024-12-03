document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('darkModeToggle');
    const body = document.body;
    const darkModeIcon = document.querySelector('.light-mode-icon');
    const lightModeIcon = document.querySelector('.dark-mode-icon');
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navMenu = document.getElementById('navMenu');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const form = document.getElementById('contactForm');
    const formEndpoint = 'https://formspree.io/f/mldepvwy';

    // MODO OSCURO
    const darkMode = localStorage.getItem('dark-mode');
    if (darkMode === 'enabled') {
        body.classList.add('dark-mode');
        darkModeIcon.style.display = 'none';
        lightModeIcon.style.display = 'block';
    } else {
        darkModeIcon.style.display = 'block';
        lightModeIcon.style.display = 'none';
    }

    toggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('dark-mode', 'enabled');
            darkModeIcon.style.display = 'none';
            lightModeIcon.style.display = 'block';
        } else {
            localStorage.setItem('dark-mode', 'disabled');
            darkModeIcon.style.display = 'block';
            lightModeIcon.style.display = 'none';
        }
    });

    // MENÚ HAMBURGUESA
    if (hamburgerMenu && navMenu) {
        hamburgerMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // BOTÓN SCROLL TO TOP
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollTopBtn.style.display = 'block';
            } else {
                scrollTopBtn.style.display = 'none';
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ENVÍO DEL FORMULARIO DE CONTACTO
    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Evita la redirección predeterminada

            const formData = new FormData(form);
            const formObject = Object.fromEntries(formData.entries());

            try {
                const response = await fetch(formEndpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formObject),
                });

                if (response.ok) {
                    alert('¡Tu mensaje ha sido enviado exitosamente!');
                    form.reset();
                } else {
                    alert('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.');
                }
            } catch (error) {
                console.error('Error al enviar el formulario:', error);
                alert('Hubo un error inesperado. Por favor, verifica tu conexión e intenta nuevamente.');
            }
        });
    }
});
