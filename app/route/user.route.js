module.exports = function(app) {
 
    const user = require('../controller/user.controller.js');
 
    // Register New users
    app.post('/user/register', user.register);
 
    // Add Beats
    app.get('/user/addbeat', user.addBeats);
 
     //Retrieve all beats
    app.get('/user/', user.allBeats);
  /*
  // Retrieve Customers Age
    app.get('/api/customers/age/:age', customers.findByAge);
 
    // Update a Customer with Id
    app.put('/api/customer/:customerId', customers.update);
 
    // Delete a Customer with Id
    app.delete('/api/customer/:customerId', customers.delete);*/
}