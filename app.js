document.addEventListener('DOMContentLoaded', function () {
    // Adiciona efeito de parallax suave nos elementos flutuantes
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelectorAll('.floating_element');
        const speed = 0.5;

        for (let i = 0; i < parallax.length; i++) {
            const yPos = -(scrolled * speed);
            parallax[i].style.transform = `translateY(${yPos}px)`;
        }
    });

    // Header transparente/opaco baseado no scroll
    const header = document.querySelector('.header-container');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });

    // HAMBURGER MENU
    const hamburger = document.getElementById('hamburger');
    const navList = document.getElementById('nav-list');
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navList.classList.toggle('show');
    });
    // Fecha o menu ao clicar em um link
    document.querySelectorAll('.nav_list a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navList.classList.remove('show');
        });
    });

    // Botão voltar ao topo animado
    const btnBack = document.createElement('a');
    btnBack.className = 'btn_back';
    btnBack.href = '#home';
    btnBack.innerHTML = '^';
    document.body.appendChild(btnBack);

    let lastScrollY = 0;
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