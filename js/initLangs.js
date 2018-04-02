$('.lngSelect').on('change', function() {
  if(this.value) {
    window.location.href = '?lng=' + this.value
  }
})
function setCookie(key, value) {
  var expires = new Date();
  expires.setTime(expires.getTime() + (24 * 60 * 60 * 1000));
  document.cookie = key + '=' + value + ';expires=' + expires.toUTCString()+';domain=.elementh.io';
}

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ))
  return matches ? decodeURIComponent(matches[1]) : undefined
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
var lng = getParameterByName("lng")

var cpa = getParameterByName("utm")
var click = getParameterByName("click")

if(cpa && click){
  setCookie("cpa", cpa)
  setCookie("click", click)
}

if(lng) {
  setCookie("i18next", lng)
  var newUrl = window.location.href.replace('?lng=' + lng , '')
  window.location.href = newUrl
}
i18next.use(i18nextXHRBackend).use(i18nextBrowserLanguageDetector).init({
  'debug': false,
  'fallbackLng': 'en',
  detection: {
    order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
  },
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
    crossDomain: true
  }
}, function (err, t) {
  jqueryI18next.init(i18next, $);
  $('body').localize()
});

i18next.on('languageChanged', function(lng) {
  $('.lngSelect').find('option[value="'+ lng +'"]').prop('selected', true)
})