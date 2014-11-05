/**
 * Created by felixshu on 31/10/14.
 */
var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');

// cache object is used to store contents of cached files.
var cache = {};

//build a 404 Error
function send404(response){
    response.writeHead(404,{'Content-Type':'text/plan'});
    response.write('Error 404: resource not found.');
    response.end();
}

//Sending the contents of the file
function sendFile(response, filePath, fileContents){
    response.writeHead(200,
        {
            'Content-Type': mime.lookup(path.basename(filePath))
        });
    response.end(fileContents);
}

/**
* Serving static file:
* if the file does not cached, read from disk and served
 * */
function serveStatic (response, cache, absPath){
    if(cache[absPath]){
        sendFile(response,absPath,cache[absPath]);
    }
    else{
        /*fs.exists(path, callback(exists){ if (exists){...} else{...})*/
        fs.exists(absPath,function(exists){
            if(exists){
                fs.readFile(absPath,function(err, data){
                    if(err){
                        send404(response);
                    }
                    else{
                        cache[absPath] = data;
                        sendFile(response,absPath,data);
                    }
                })
            }
            else{
                send404(response);
            }
        })
    }
}

/*Create an HTTP server*/
var server = http.createServer(function(request, response){
    var filePath;

    //url is default then change it.
    if(request.url == '/'){
        filePath = 'public/index.html';
    }
    else{
        filePath = 'public' + request.url;
    }

    var absPath = './'+filePath; // transfer the url to absPath
    serveStatic(response,cache,absPath);
});

server.listen(3000,function(){
    console.log('Server listening on port 3000');
});

var chatServer = require('./lib/chat_server');