var app = {
  server: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
  rooms: [],
  users: []
};

app.init = function() {
  app.fetch = function(query) {
    $.ajax({
      url: query ? app.server+query : app.server,
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        app.clearMessages();
        _.each(data.results, function(val, i, collection){
          var time = moment(val.createdAt).format('h:mm:ss')
          var messageDiv = $('<div class="message"></div>')
          var text = '['+time+']'+' '+val.username+': '+val.text;
          messageDiv.text(text).addClass(val.username);
          $('.messages').append(messageDiv);
        });
      }
    });
  };

  app.clearMessages = function() {
    $('.messages').children().remove();
  };

  // Get rooms
  app.getRooms = function() {
    $.get(app.server, function(data){
      for (var i=0; i<data.results.length; i++) {
        if (app.rooms.indexOf(data.results[i].roomname) === -1) {
          app.rooms.push(data.results[i].roomname);
        }
      }
      app.displayRooms(app.rooms);
    });
  };

  // Get users
  app.getUsers = function() {
    $.get(app.server, function(data){
      for (var i=0; i<data.results.length; i++) {
        if (app.users.indexOf(data.results[i].username) === -1) {
          app.users.push(data.results[i].username);
        }
      }
      app.displayUsers(app.users);
    });
  };

  app.displayUsers = function(users) {
    for (var i=0; i<users.length; i++) {
      var userDiv = $('<div class="user"></div>');
      var text = users[i];
      userDiv.text(text);
      $('.users').append(userDiv);
    }

    $('.user').on('click', function() {
      var username = $(this).text();
      $(this).toggleClass('bold');
      $('.'+username).toggleClass('bold');
    });
  };

  app.getUsers();

  // Filter rooms
  app.filterRooms = function() {
    var filteredRooms = [];
    var room = $(this).text();
    $.get(app.server, function(data){
      for (var i=0; i<data.results.length; i++) {
        if (room === data.results[i].roomname) {
          filteredRooms.push(data.results[i]);
        }
      }
      var query = '&where={"roomname":"'+room+'"}';
      app.fetch(query);
      console.log(filteredRooms);
    });
  };

  // Display rooms
  app.displayRooms = function(rooms) {
    for (var i=0; i<rooms.length; i++) {
      var roomDiv = $('<div class="room"></div>');
      var text = rooms[i];
      roomDiv.text(text);
      $('.rooms').append(roomDiv);
    }

    $('.room').on('click', app.filterRooms);
  };

  app.getRooms();

  app.addRoom = function(room) {
    $('.rooms').append('<div>'+room+'</div>');
  };

  app.fetch();

  // setInterval(function() {
  //   app.fetch();
  // }, 6000);

  // Chat button
  app.send = function(chatMessage) {
    $.ajax({
      url: app.server,
      type: 'POST',
      data: JSON.stringify(chatMessage),
      success: function() {
        console.log("success!");
      }
    });
  };


  // Add message
  app.addMessage = function(message) {
    var time = moment().format('h:mm:ss');
    var message = $('<div class="message">'
                      +'['+time+']'+' '
                      +message.username+': '+message.text+'</div>')
    $('.messages').prepend(message);
  };

  $('.chatSubmit').on('click', function(e){
    var chatMessage = {
      username: $('.username').val(),
      text: $('.chatBox').val(),
      roomname: $('.roomname').val()
    };

    app.send(chatMessage);
    app.addMessage(chatMessage);
    app.addRoom(chatMessage.roomname);
    return false;
  });

};


$(document).ready(function (){
  app.init();
});
