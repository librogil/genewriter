const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://genewriteradmin:shomowriter@genewriter-main-cluster.b2f6c.mongodb.net/main-database?retryWrites=true&w=majority', { useNewUrlParser: true }).then(() => {

    console.log('Connected to MongoDB successfully');
}).catch((e) => {
    console.log("Error while attempting to connect to MongoDB");
    console.log(e);
});

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = {
    mongoose
};