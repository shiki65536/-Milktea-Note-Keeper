const express = require('express');
const connectDB = require('./config/db')
// const path = require('path')

const app = express()

connectDB();

app.use(express.json({extended: false}));

app.get('/', (req, res) => res.send('API running'));

// define routes
app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));
app.use('/posts', require('./routes/posts'));

//serve static assets
// if(process.env.NODE_ENV === 'production') {
//     //set static folder
//     app.use(express.static('client/build'))

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//     })
// }

const PORT = process.env.PORT || 5001

app.listen(PORT, ()=> console.log(`sever started on  PORT ${PORT}`))