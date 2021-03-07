require('./Models/db')
const express = require('express');
const app = express();
const cors = require('cors')
const userRoute = require('./Routes/userRoute')
const blogRoute = require('./Routes/blogRoute')
const { verifyAccessToken } = require('./Middlewares/jwt_helper')

const bodyparser = require('body-parser');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors());

app.use('/user',userRoute)
app.use('/blog',blogRoute)

const PORT=process.env.PORT || 5000 ;
app.listen(PORT,() => console.log(`Listening to PORT ${PORT}`));