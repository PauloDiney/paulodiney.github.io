$(document).ready(function () {
    $('.nav-toggle').click(function () {
        $('.nav-menu').toggleClass('active');
        $('.nav-toggle').toggleClass('toggle');
        $('container-header').toggleClass('blur');
    });
});