const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const NodeMediaServer = require('node-media-server');

const Chat = []
const STREAMS = []

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));
app.use(express.static('static'));
app.use(express.static('img'));

app.get('index', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('Nuevo usuario conectado');

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

const httpConfig = {
  port: 8000, // HTTP port
  allow_origin: "*", // Allow requests from any origin (you may restrict this as needed)
  mediaroot: "./media", // Directory where the server will look for media files
};

const rtmpConfig = {
  port: 1935, // RTMP port, 1935 is the default port for RTMP
  chunk_size: 60000, // The size in bytes of the chunks into which the media file will be divided
  gop_cache: true, // If true, the server will use a GOP (Group of Pictures) cache. This will improve the efficiency of RTMP streaming but will also increase memory usage
  ping: 10, // Ping interval in seconds. This will send a ping message to the client to check if the connection is alive
  ping_timeout: 60, // Ping timeout in seconds
};

const transformationConfig = {
  ffmpeg: "./ffmpeg/ffmpeg.exe",
  tasks: [
    {
      app: "live",
      hls: true,
      hlsFlags: "[hls_time=2:hls_list_size=3:hls_flags=delete_segments]",
      hlsKeep: false,
    },
  ],
  MediaRoot: "./media",
};

const config = {
  http: httpConfig,
  rtmp: rtmpConfig,
  trans: transformationConfig,
};

const nms = new NodeMediaServer(config);

nms.run();

nms.on('postPublish', (id, StreamPath, args) => {

});
nms.on('donePublish', (id, StreamPath, args) => {

});
  
server.listen(3000, () => {
  console.log('Servidor de streaming iniciado en http://localhost:3000');
});
