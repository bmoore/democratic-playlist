democratic-playlist
===================

A node-based democratic music player built for raspberry-pi

==Routes==
This application has a REST API built in, which is used to read the application database.

===Songs===
song/:id - Returns the record information about the song with the given database id.

===Album===
album/:id - Returns the record information about the album with the given database id.

album/:id/songs - Returns the songs associated with the given album, based on the database album id.

===Artist===
artist/:id - Returns the record information about the artist with the given database id.

artist/:id/albums - Returns the albums associated with the given artist, based on the database artist id.

artist/:id/songs - Returns the songs associated with the given artist, based on the database artist id.

===Playlist===
playlist - Returns the collection of songs, along with their vote count.
