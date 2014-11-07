(function() {
    var Chat = function(socket) {
        this.socket = socket;
    }

    // build the message structure, send chat message
    Chat.prototype.sendmessage = function(room, text) {
        var message = {
            room: room,
            text: text
        };
        this.socket.emit('message', message);
    };

    //function change rooms
    Chat.prototype.changeRoom = function(room) {
        this.socket.emit('join', {
            newRoom: room
        });
    };

    //process chat command
    Chat.prototype.processCommand = function(command) {
        var words = command.split(' ');
        command = words[0].substring(1, words[0].length).toLowerCase();
        var message = false;

        switch (command) {
            case 'join':
                words.shift();
                var room = words.join('');
                this.changeRoom(room);
                break;
            case 'nick':
                words.shift();
                var name = words.join(' ');
                this.socket.emit('nameAttempt', name);
            default:
                message = 'Unrecognized Command.'
                break;
        }

        return message;
    };
})();
