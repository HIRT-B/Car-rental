const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authoRoute = require('./routes/Authentication')
const carsRoute = require('./routes/carsRouter')
const userRouter = require('./routes/usersRouter')
const rentalRouter = require('./routes/rentalRouter')
const PORT = 3000

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.use('/auth', authoRoute)
app.use('/car', carsRoute)
app.use('/user', userRouter)
app.use('/rental', rentalRouter)












app.listen(PORT, ()=>{
    console.log('Server is running on port'+ PORT);
    
})

