$(document).ready(function(){
  $("input[name='celular']").mask('(99) 9 9999-999?9');
  $("input[name='cpf']").mask('999.999.999-99');
  $("input[name='nome']").keyup(function(){
    this.value = this.value.replace(/[^A-Za-z]+/g, ' ');
  });
});

//--xpromo--/
var xpromo = getQueryVariable("xpromo") || null;

if(xpromo !== null) $("input[name='xpromo']").val(xpromo);

incrementRedirect('xpromo', xpromo);
//--/xpromo--/

//--email--/
var email = getQueryVariable("email") || getQueryVariable("e") || getQueryVariable("kke");

if(email !== null) $("input[name='email']").val(atob(email));

incrementRedirect('e', email);
//--/email--/

var parameters = {
  origem: getQueryVariable("origem") || null,
  utm_medium: getQueryVariable("utm_medium") || null,
  utm_source: getQueryVariable("utm_source") || null,
  utm_content: getQueryVariable("utm_content") || null,
  utm_campaign: getQueryVariable("utm_campaign") || null,
}

$.each(parameters, function(index, val){
  if(val !== null && val !== 'null' && val !== ''){
    $('input[name="' + index + '"]').val(val);
    incrementRedirect(index, val);
  }
});

$('.input-submit').click(function(){
  dataLayer.push({event:'cliqueBotaoLP'});

  emailField = $('input[name="email"]');
  regex = /^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i;

  if(regex.test(emailField.val()) == false) tooltip(emailField, 'insert', 'corretamente ');
  else{
    tooltip(emailField, 'remove', '');
    validateFields();
  }
});

function validateFields(){
  var errors = 0;

  $('.form input[required]:not(input[name="email"])').map(function(){
    thisInput = $(this);

    if(!$(thisInput).val()){
      tooltip(thisInput, 'insert', '');
      errors++;
    }else if($(thisInput).val()) tooltip(thisInput, 'remove', '');

    if($(thisInput).attr('name') == 'cpf'){
      valCPF = $(thisInput).val().replace(/[.-]+/g, '');

      if(validateCPF(valCPF) == false){
        tooltip(thisInput, 'insert', 'um CPF válido n');
        errors++;
      }else tooltip(thisInput, 'remove', '');
    }
  });

  console.log(errors + ' erro(s) no form');
  if(errors == 0) sendForm();
}

function sendForm(){
  setCookie('bRN', $('input[name="nome"').val(), 30);
  setCookie('bRE', $('input[name="email"').val(), 30);
  setCookie('bRC', $('input[name="cpf"').val(), 30);
  setCookie('bRP', $('input[name="celular"').val(), 30);

  dataLayer.push({event: 'EnvioFormularioSucesso',});

  $('.form').submit();
  console.log('envio do form');
}

function tooltip(input, action, wordText){
  var findTooltip = $('.form').find('.tooltip');

  if(action == 'insert' && findTooltip.length == 0){
    $('<div class="tooltip"><span></span><span>Preencha ' + wordText + 'este campo</span></div>').insertBefore($(input).parent('div'));
  }

  if(action == 'remove' && findTooltip.length !== 0){
    $(input[0]).parent('div').prev('.tooltip').remove();
  }
}

function incrementRedirect(pName, pValue){
  var eC = '?';
  var searchIP = $('input[name="destino"]').attr('value').search(/\?/g);
  if(searchIP >= 0) eC = '&';

  $('input[name="destino"]').attr('value', $('input[name="destino"]').attr('value') + eC + pName + '=' + pValue);
}

function validateCPF(strCPF){
  var Soma;
  var Resto;
  Soma = 0;

  if(strCPF == "00000000000") return false;

  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11))  Resto = 0;
  if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

  Soma = 0;
  for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11))  Resto = 0;
  if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
  return true;
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";domain=.vitreo.com.br;path=/";
}

function getQueryVariable(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
