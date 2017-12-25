var getUser = (id, callback) => {
    console.log('Fetching user data...');
    
    //dummy object/data
    var user = {
        id : id,
        name : 'Nar Cuenca'
    };

    //return the object as a callback resp
    setTimeout(() => {
        callback(user);
    }, 3000);
};

getUser(31, (userObject) => {
    console.log(userObject);
});