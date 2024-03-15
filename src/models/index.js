const Artist = require("./Artist");
const Genre = require("./Genre");
const Song = require("./Song");

Artist.belongsToMany(Genre, { through: 'genres_artists'});
Genre.belongsToMany(Artist, { through: 'genres_artists'});

Artist.belongsToMany(Song, { through: 'artists_songs' });
Song.belongsToMany(Artist, { through: 'artists_songs' });
