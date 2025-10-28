import { Router } from "express";
import { getKey, paymentverification, processPayment } from "../controller/productCotrpller.js";

const router = Router()


router.get('/getkey', getKey)
router.post('/payment/process',processPayment)
router.post('/paymentverification' , paymentverification)



export default router