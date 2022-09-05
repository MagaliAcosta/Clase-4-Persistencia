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


class Movies extends Sequelize.Model {}
Movies.init({
  name: Sequelize.STRING,
  year: Sequelize.INTEGER,
  gender: Sequelize.STRING
}, { sequelize, modelName: 'movies' });

class Movie extends Sequelize.Model {}
Movie.init({
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  year: {
    type: Sequelize.INTEGER
  },
  gender: {
    type: Sequelize.STRING
  }
}, {
  sequelize,
  modelName: 'movie'
});

sequelize.sync()
  .then(() => Movies.create({
    name: 'Pulp Fiction',
    year: 1994,
    gender: 'Crimen/Drama'
  }))
  .then(pulpFiction => {
    console.log(pulpFiction.toJSON());
  }).then(
    () => Movie.destroy({
        where: {
          name: 'Pulp Fiction'
        }
      }).then(() => {
        console.log("Elimine Registro");
      })
  );


  
  

