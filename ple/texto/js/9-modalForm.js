//open/close form
$('.showModal').click(function() {
    modalDisplay();
});
// $('.buttonCloseModal, .modalFormOverlay').click(function() {
//     exitModalDisplay();
// });

function modalDisplay() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    $('.modalForm').show().addClass('activated');
    setTimeout(function() {
        $('input[type="email"]').focus();
    }, 800);
}

function exitModalDisplay() {
    // $('.modalForm').hide().removeClass('activated');
}

$(document).on('keyup', pressed);

function pressed(e) {
    if ($('.modalForm').hasClass('activated') == true && e.keyCode === 13) {
        $('.btn-submit').trigger('click');
    } else if ($('.modalForm').hasClass('activated') == true && e.keyCode === 27) {
        exitModalDisplay();
    }
}