module.exports = function(app) {
 
    const user = require('../controller/user.controller.js');
 
    // Register New users
    app.post('/user/register', user.register);
 
    // Add Beats
    app.post('/user/addbeat', user.addBeats);
 
    //Retrieve all beats
    app.get('/user/', user.allBeats);

    //User Login
    app.post('/user/login', user.login);
    
    // Find the Users based on Name
     app.post('/user/find', user.findByName);
    
  /*  // followUser
    app.post('/user/follow', user.followUser);

    // followUser
    app.post('/user/unfollow', user.unfollowUser);*/
    
   
}