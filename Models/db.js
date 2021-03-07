const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://suraj:qwerty@123@cluster0.ds0ci.mongodb.net/WeBlog?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log('connected to MongoDb'),
        (err) => console.log(err)
    )


require('./userModel')
require('./blogModel')