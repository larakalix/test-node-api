import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/testdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => console.log('Db OK'))
.catch(err => console.log('Error', err))