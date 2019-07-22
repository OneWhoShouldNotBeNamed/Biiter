module.exports = (sequelize, Sequelize) => {
    const Followers = sequelize.define('followers', {
      uid: {
      type: Sequelize.INTEGER
      },
      followsid: {
        type: Sequelize.INTEGER
      }       
    });
    return Followers;    
  }