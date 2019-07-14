module.exports = (sequelize, Sequelize) => {
    const Status = sequelize.define('beats', {
      beatid: {
      type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
       createdAt: Sequelize.DATE,
       uid:{
        type: Sequelize.INTEGER
       },
       lastlogin:{
        type:Sequelize.STRING
       }
    });
    return Status;    
  }