import mongoose from 'mongoose';

mongoose.connect('', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => console.log('Db OK'))
.catch(err => console.log(err))