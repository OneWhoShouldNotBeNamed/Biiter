module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
      name: {
      type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      hash: {
      type: Sequelize.STRING
      },
      CreatedAt:Sequelize.DATE
     }
    );
    
    return User;    
  }