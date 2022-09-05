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
    .then(() => Movie.create({
        name: 'El padrino',
        year: 1972,
        gender: 'Crimen/Drama'
    }))
    .then(elPadrino => {
        console.log(elPadrino.toJSON());
    }).then(
        () => Movie.update({ name: "The godfather" }, {
            where: {
                name: 'El padrino'
            }
        }).then(() => {
            console.log("Done");
        })
    );





