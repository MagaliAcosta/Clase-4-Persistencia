const Sequelize = require('sequelize');

const sequelize = new Sequelize('clase4', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


class Movie extends Sequelize.Model { }
Movie.init({
    name: Sequelize.STRING,
    year: Sequelize.INTEGER,
    gender: Sequelize.STRING
}, { sequelize, modelName: 'movies' });


sequelize.sync()
    .then(() =>
        Movie.create({
            name: 'Buscando a Nemo',
            year: 2003,
            gender: 'Infantiles'
        }),
        Movie.create({
            name: 'Frozen',
            year: 2013,
            gender: 'Infantiles'
        }),
        Movie.create({
            name: 'Toy Story',
            year: 1995,
            gender: 'Infantiles'
        }
        ).then(peliculas => {
            console.log(peliculas.toJSON());
        })
    ).then(
        () => Movie.update({ gender: 'Infantil' }, {
            where: {
                gender: 'Infantiles'
            }
        }).then(() => {
            console.log("Done");
        })
    );



