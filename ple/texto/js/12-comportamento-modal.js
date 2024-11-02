let urlParams = new URLSearchParams(window.location.search);

var linkDestino = document.querySelector('.alterar-url');
console.log(linkDestino)

if (urlParams.has('nc')) {

    $('.modalForm').show().addClass('activated');
    urlParams.delete('nc');

    linkDestino.setAttribute("value", window.location.origin + window.location.pathname + '?' + urlParams.toString());

} else {
    linkDestino.setAttribute("value", window.location.origin + window.location.pathname + window.location.search);
}