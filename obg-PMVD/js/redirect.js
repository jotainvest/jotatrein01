$(document).ready(function(){
  var parameters = {
    xpromo: getQueryVariable('xpromo') || null,
    e: getQueryVariable('e') || null,
    origem: getQueryVariable("origem") || null,
    utm_medium: getQueryVariable("utm_medium") || null,
    utm_source: getQueryVariable("utm_source") || null,
    utm_content: getQueryVariable("utm_content") || null,
    utm_campaign: getQueryVariable("utm_campaign") || null,
  }

  $('.linkAccount').each(function(){
    $this = $(this);
    $this[0].href += '?xpromo=' + parameters.xpromo;
  });

  $.each(parameters, function(index, val){
    incrementRedirect(index, val);
  });

  setTimeout(function(){
    if(parameters.e !== null){
      dataLayer.push({
       event: 'LeadLP',
       versaoLP: parameters.origem,
      });
      console.log('LeadLP');
    }
  }, 3000);

  if(redirect == true){
    setTimeout(function(){
      $('.container').html(textToRedirect);
      
      setTimeout(function(){
        window.location.href = linkRedirect;
      }, 3000);
    }, 4000);
  }

  if(parameters.origem !== 'null') var codCampaign = parameters.origem.split('-');

  setCookie('codCampaign', codCampaign[0], 10);

  function incrementRedirect(pName, pValue){
    var eC = '?';
    var searchIP = linkRedirect.search(/\?/g);

    if(searchIP >= 0) eC = '&';

    linkRedirect = linkRedirect + eC + pName + '=' + pValue;
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
});
