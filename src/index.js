'use strict';

const express = require( 'express' );
const app = express();
const server = require( 'http' ).Server( app );
const io = require( 'socket.io' )( server );

server.listen( process.env.port || 80 );

app.use( express.static( __dirname + '/public' ) );
app.get( '/', ( req, res ) => {
    res.sendfile( 'index.html' );
} );


// Sockets.io communication
io.on( 'connection' , socket => {
	io.emit( 'connected' )

    socket.on( 'join-room', room => {
        socket.join( room, () => socket.emit( 'room-joined', room ) )
    } )

    socket.on( 'msg', msg => {
        io.to( msg.room ).emit( msg.event, msg.data )
	} )
} )
