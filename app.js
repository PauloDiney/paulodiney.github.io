$(document).ready(function () {
    $('.nav-toggle').click(function () {
        $('.nav-menu').toggleClass('active');
        $('.nav-toggle').toggleClass('toggle');
        $('container-header').toggleClass('blur');
    });
});




function sendEmail(event) {
    event.preventDefault();
    const nome = document.getElementById('nome');
    const email = document.getElementById('mensagem');
    const telefone = '5518981104236';

    const texto = `Olá, meu nome é ${nome.value}, gostaria de saber mais sobre seus serviços ${email.value}.`;
    const link = `https://api.whatsapp.com/send?phone=${telefone}&text=${texto}`;

    window.open(link, '_blank');
}

const items = document.querySelectorAll(".timeline-item");

    const revealItems = () => {
        const triggerBottom = window.innerHeight * 0.85;
        
        items.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const itemBottom = item.getBoundingClientRect().bottom;

            // Mostrar o item quando ele entrar na tela
            if(itemTop < triggerBottom && itemBottom >= 0) {
                item.classList.add("show");
                item.classList.remove("hide");
            } else {
                // Ocultar o item quando ele sair da tela
                item.classList.remove("show");
                item.classList.add("hide");
            }
        });
    }

    window.addEventListener("scroll", revealItems);
    revealItems();


    // Adiciona a funcionalidade do botão hamburger
const hamburger = document.getElementById('hamburger');
const navList = document.getElementById('nav-list');

hamburger.addEventListener('click', () => {
  if (navList.classList.contains('active')) {
    // Adiciona a classe de fechamento e remove a classe de ativo após a animação
    navList.classList.add('closing');
    navList.classList.remove('active');

    // Remove a classe de fechamento após a animação terminar
    navList.addEventListener(
      'animationend',
      () => {
        navList.classList.remove('closing');
        navList.style.display = 'none'; // Garante que o menu fique escondido
      },
      { once: true }
    );
  } else {
    // Remove o estilo inline de display e adiciona a classe de ativo para abrir o menu
    navList.style.display = 'flex';
    navList.classList.add('active');
  }

  // Alterna o estado do botão hambúrguer
  hamburger.classList.toggle('active');
});
