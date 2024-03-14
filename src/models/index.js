const Artist = require("./Artist");
const Genre = require("./Genre");

Artist.belongsToMany(Genre, { through: 'genres_artists'});
Genre.belongsToMany(Artist, { through: 'genres_artists'});
