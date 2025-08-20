document.addEventListener('DOMContentLoaded', function () {
    // Adiciona efeito de parallax suave nos elementos flutuantes
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelectorAll('.floating_element, .particle');
        const speed = 0.5;

        for (let i = 0; i < parallax.length; i++) {
            const yPos = -(scrolled * speed);
            parallax[i].style.transform = `translateY(${yPos}px)`;
        }
    });

    // Header transparente/opaco baseado no scroll
    const header = document.querySelector('.header-container');
    
    window.addEventListener('scroll', function () {
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // HAMBURGER MENU
    const hamburger = document.getElementById('hamburger');
    const navList = document.getElementById('nav-list');
    const navOverlay = document.getElementById('nav-overlay');
    
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navList.classList.toggle('show');
        navOverlay.classList.toggle('show');
    }
    
    function closeMenu() {
        hamburger.classList.remove('active');
        navList.classList.remove('show');
        navOverlay.classList.remove('show');
    }
    
    hamburger.addEventListener('click', toggleMenu);
    navOverlay.addEventListener('click', closeMenu);
    
    // Fecha o menu ao clicar em um link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Fecha menu com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navList.classList.contains('show')) {
            closeMenu();
        }
    });
    
    // Logo click para home
    document.querySelector('.logo-container').addEventListener('click', function() {
        closeMenu();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Active navigation links
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        let current = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = 80;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Timeline animation on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function animateTimelineOnScroll() {
        timelineItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight * 0.8) {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, index * 150);
            }
        });
    }

    // Initial state for timeline items
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'all 0.6s ease-out';
    });

    window.addEventListener('scroll', animateTimelineOnScroll);
    animateTimelineOnScroll(); // Run on load

    // Botão voltar ao topo animado
    const btnBack = document.createElement('a');
    btnBack.className = 'btn_back';
    btnBack.href = '#home';
    btnBack.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(btnBack);

    window.addEventListener('scroll', function () {
        if (window.scrollY > 200) {
            btnBack.classList.add('show');
            btnBack.classList.remove('hide');
        } else {
            if (btnBack.classList.contains('show')) {
                btnBack.classList.remove('show');
                btnBack.classList.add('hide');
            }
        }
        lastScrollY = window.scrollY;
    });
});

// Funções de contato
function sendEmail(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const assunto = document.getElementById('assunto').value;
    const mensagem = document.getElementById('mensagem').value;
    
    if (!nome || !email || !assunto || !mensagem) {
        showNotification('Por favor, preencha todos os campos obrigatórios!', 'error');
        return;
    }
    
    // Criar o corpo do email
    let emailBody = `Nome: ${nome}%0D%0A`;
    emailBody += `Email: ${email}%0D%0A`;
    if (telefone) {
        emailBody += `Telefone: ${telefone}%0D%0A`;
    }
    emailBody += `Assunto: ${assunto}%0D%0A%0D%0A`;
    emailBody += `Mensagem:%0D%0A${mensagem}`;
    
    // Abrir cliente de email
    const mailtoLink = `mailto:paulo19martin@gmail.com?subject=${encodeURIComponent(assunto)}&body=${emailBody}`;
    window.location.href = mailtoLink;
    
    showNotification('Cliente de email aberto! Se não funcionar, tente pelo WhatsApp.', 'success');
}

function sendWhatsApp(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const assunto = document.getElementById('assunto').value;
    const mensagem = document.getElementById('mensagem').value;
    
    if (!nome || !assunto || !mensagem) {
        showNotification('Por favor, preencha pelo menos Nome, Assunto e Mensagem!', 'error');
        return;
    }
    
    // Criar mensagem do WhatsApp
    let whatsappMessage = `*Contato do Site - ${assunto}*%0A%0A`;
    whatsappMessage += `*Nome:* ${nome}%0A`;
    if (email) {
        whatsappMessage += `*Email:* ${email}%0A`;
    }
    if (telefone) {
        whatsappMessage += `*Telefone:* ${telefone}%0A`;
    }
    whatsappMessage += `%0A*Mensagem:*%0A${mensagem}`;
    
    // Número do WhatsApp - ALTERE AQUI PARA SEU NÚMERO REAL
    // Formato: código do país + DDD + número (sem espaços, traços ou parênteses)
    // Exemplo: Brasil (55) + São Paulo (11) + 99999-9999 = 5511999999999
    const phoneNumber = '5518981104236'; // ⚠️ ALTERE ESTE NÚMERO!
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
    
    window.open(whatsappLink, '_blank');
    showNotification('WhatsApp aberto! Sua mensagem já está pronta para envio.', 'success');
}

function showNotification(message, type) {
    // Remove notificação anterior se existir
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Criar nova notificação
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remover após 5 segundos
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Timeline Touch Scroll para Mobile
document.addEventListener('DOMContentLoaded', function() {
    const timelineWrapper = document.querySelector('.timeline_wrapper');
    
    if (timelineWrapper && window.innerWidth <= 600) {
        let isScrolling = false;
        let scrollTimeout;
        
        // Suavizar scroll no mobile
        timelineWrapper.style.scrollBehavior = 'smooth';
        
        // Ocultar indicador após primeira interação
        timelineWrapper.addEventListener('scroll', function() {
            const indicator = timelineWrapper.querySelector('::after');
            timelineWrapper.style.setProperty('--show-indicator', '0');
            
            // Mostrar novamente após 3 segundos de inatividade
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                timelineWrapper.style.setProperty('--show-indicator', '1');
            }, 3000);
        }, { passive: true });
        
        // Touch support melhorado
        let startX = 0;
        let scrollLeft = 0;
        
        timelineWrapper.addEventListener('touchstart', function(e) {
            startX = e.touches[0].pageX - timelineWrapper.offsetLeft;
            scrollLeft = timelineWrapper.scrollLeft;
            timelineWrapper.style.cursor = 'grabbing';
        }, { passive: true });
        
        timelineWrapper.addEventListener('touchmove', function(e) {
            e.preventDefault();
            const x = e.touches[0].pageX - timelineWrapper.offsetLeft;
            const walk = (x - startX) * 2;
            timelineWrapper.scrollLeft = scrollLeft - walk;
        });
        
        timelineWrapper.addEventListener('touchend', function() {
            timelineWrapper.style.cursor = 'grab';
        }, { passive: true });
    }

    // BACK TO TOP BUTTON
    const backButton = document.querySelector('.btn_back');
    
    // Controla a visibilidade do botão
    window.addEventListener('scroll', function() {
        if (window.scrollY > 600) {
            backButton.classList.add('show');
            backButton.classList.remove('hide');
        } else {
            backButton.classList.add('hide');
            backButton.classList.remove('show');
        }
    });
});

// Função para scroll suave para o topo
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}