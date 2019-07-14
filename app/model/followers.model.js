module.exports = (sequelize, Sequelize) => {
    const Follwers = sequelize.define('followers', {
      uid: {
      type: Sequelize.INTEGER
      },
      followsid: {
        type: Sequelize.INTEGER
      }
       
    });
    return Status;    
  }