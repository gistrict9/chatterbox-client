var app = {
  server: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt'
};

app.init = function() {
  app.fetch = function() {
    $.ajax({
      url: app.server,
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        $('.messages').empty();
        $('.rooms').empty();
        _.each(data.results, function(val, i, collection){
          var time = moment(val.createdAt).format('h:mm:ss')
          var messageDiv = $('<div class="message"></div>')
          var text = '['+time+']'+' '+val.username+': '+val.text;
          messageDiv.text(text);
          $('.messages').append(messageDiv);
        });
      }
    });
  };

  // Rooms
  app.getRooms = function() {
    $.get(app.server, function(data){
      for (var i=0; i<data.results.length; i++) {
        if (app.rooms.indexOf(data.results[i].roomname) === -1) {
          app.rooms.push(data.results[i].roomname);
        }
      }
    });
  };

  // _.each(app.rooms, function(value) {
  //   $('ul.rooms').append('<li>'+value+'</li>');
  // });



  setInterval(function() {
    app.fetch();
  }, 1000);

  // Chat button
  app.send = function(chatMessage) {


    $.ajax({
      url: app.server,
      type: 'POST',
      data: JSON.stringify(chatMessage),
      success: function(data) {
        var time = moment(data.createdAt).format('h:mm:ss');
        var message = $('<div class="message">'
                          +'['+time+']'+' '
                          +chatMessage.username+': '+chatMessage.text+'</div>')
        $('.messages').prepend(chatMessage);
      }
    });
  };

  $('.chatSubmit').on('click', function(e){
    var chatMessage = {
      username: $('.username').val(),
      text: $('.chatBox').val(),
      roomname: $('.roomname').val()
    };
    app.send(chatMessage);
    return false;
  });
};


$(document).ready(function (){
  app.init();
});
