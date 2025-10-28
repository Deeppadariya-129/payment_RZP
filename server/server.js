import express from 'express'
import dotenv from 'dotenv'
import Razorpay from 'razorpay'
import payment from './routes/product.routes.js'
import cors from 'cors'
dotenv.config()


const app = express()
const PORT = process.env.PORT || 3000


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({origin: process.env.FRONTEND_URL,credentials: true,}));
app.use('/api/v1' , payment)


export const instance = new Razorpay({
  key_id: process.env.RZP_KEY,
  key_secret: process.env.RZP_SECRET,
});


app.get('/', (req, res) => {
    res.send("Hello There")
})


app.listen(PORT , console.log(`Server Started at PORT : http://localhost:${PORT}`))