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