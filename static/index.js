var $messages = $('.messages-content'),
  d, h, m,
  i = 0;
let User = "U"
$(window).on('load', function() {
    json(`https://api64.ipify.org?format=json`).then(data => {
        console.log((data.ip).split('.').join(''))
        var ipSinPuntos = (data.ip).split('.').join('');
        // Convertir la cadena en un número entero
        var numero = (parseInt(ipSinPuntos)*5);
        console.log( numero.toString())
        var ipPrimerosSeis = numero.toString().replace(/\./g, '').substring(0, 6);
        console.log(ipPrimerosSeis)
        User =  "User"+ ipPrimerosSeis
    });
  setTimeout(function() {
    fakeMessage();
  }, 100);
});


function setDate() {
  d = new Date();
  if (m !== d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}
function json(url) {
    return fetch(url).then(res => res.json());
}


function insertMessage() {
  var msg = $('.message-input').val();
  if ($.trim(msg) === '') {
    return false;
  }
  $('<div class="message new"><span class="message-username"> '+User+' </span> ' + msg + '</div>').appendTo($('.box-stream-message'));
  d = new Date();
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));

  $('.message-input').val(null);

}

$('.message-submit').on('click', function() {
  insertMessage();
  console.log("SEND MESSAGE")
});

$(window).on('keydown', function(e) {
  if (e.which === 13) {
    insertMessage();
    return false;
  }
});

var Fake = [
  'Hi there, I\'m Fabio and you?',
  'Nice to meet you',
  'How are you?',
  'Not too bad, thanks',
  'What do you do?',
  'That\'s awesome',
  'Codepen is a nice place to stay',
  'I think you\'re a nice person',
  'Why do you think that?',
  'Can you explain?',
  'Anyway I\'ve gotta go now',
  'It was a pleasure chat with you',
  'Time to make a new codepen',
  'Bye',
  ':)'
];

function fakeMessage() {
console.log("MAKE MESSAGE")

  setTimeout(function() {
 
    $('<div class="message new"><span class="message-username"> USER </span> ' + Fake[i] + '</div>').appendTo($('.box-stream-message'));
      d = new Date();
      m = d.getMinutes();
      $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
 

    i++;
  }, 1000 + (Math.random() * 20) * 100);
}
