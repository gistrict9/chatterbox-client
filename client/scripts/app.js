var roomname = "hr25"

$(document).ready(function (){

  var getMessages = function() {
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        _.each(data.results, function(val, key, collection){
          // var rooms;
          // if (rooms.hasOwnProperty(val.roomname)) {
          //   rooms.val[roomname] += 1;
          // } else {
          //   var rooms.val[roomname] = 0;
          // }
          var time = moment(val.createdAt).format('h:mm:ss')
          var messageDiv = $('<div class="message"></div>')
          var something = '['+time+']'+' '+val.username+': '+val.text;
          messageDiv.text(something);
          $('.messages').append(messageDiv);
        });
      }
    });
  };

  getMessages();


  // setInterval(function() {
  //   getMessages();
  // }, 1000);

  // Chat button
  $('.chatSubmit').on('click', function(e){
    var mess = {text: undefined};
    mess.text = $('.chatBox').val();
    //var time = moment().format('h:mm:ss');
    mess.username = $('.username').val();
    mess.roomname = roomname;
    e.preventDefault();
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(mess),
      success: function(data) {
        var time = moment(data.createdAt).format('h:mm:ss');
        var message = $('<div class="message">'
                          +'['+time+']'+' '
                          +mess.username+': '+mess.text+'</div>')
        $('.messages').prepend(message);
      }
    });
  });

});
