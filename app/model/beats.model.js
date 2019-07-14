module.exports = (sequelize, Sequelize) => {
    const Beats = sequelize.define('beats', {
      beat: {
      type: Sequelize.STRING
      },
      uid: {
        type: Sequelize.INTEGER
      },
       createdAt: Sequelize.DATE
    });
    return Beats;    
  }