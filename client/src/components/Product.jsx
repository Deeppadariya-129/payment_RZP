import "../style/product.css";
import Image1 from "../assets/bag.jpg";
import Image2 from "../assets/headphone.jpg";
import Image3 from "../assets/jacket.jpg";
import Image4 from "../assets/jeans.png";
import axios from 'axios'
import { toast } from "react-toastify";

const Product = () => {
    const products = [
        { id: 1, image: Image1, title: "LV Bag", price: 100 },
        { id: 2, image: Image2, title: "JBL Headphone", price: 1000 },
        { id: 3, image: Image3, title: "GUCCI Jacket", price: 1500 },
        { id: 4, image: Image4, title: "LEVIES Jeans", price: 2000 },
    ];

    const BASE_URL = import.meta.env.VITE_BASE_API_URL;


    const handlePay = async (id, price) => {
        try {

            const keyId = await axios.get(`${BASE_URL}/getkey`)
            const rzrPayKey = keyId?.data?.key
            
            const response = await axios.post(`${BASE_URL}/payment/process`, { amount: price });
            const orderDetails = response?.data?.orders
            console.log("------------------ order" , orderDetails);
            
            toast.success("Payment initiated successfully")


            const options = {
                key: rzrPayKey, // Replace with your Razorpay key_id
                amount: orderDetails?.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: orderDetails?.currency,
                name: 'Acme Corp',
                description: 'Test Transaction',
                order_id:orderDetails?.id, // This is the order_id created in the backend
                callback_url: `${BASE_URL}/paymentverification`, // Your success URL
                prefill: {
                    name: 'Gaurav Kumar',
                    email: 'gaurav.kumar@example.com',
                    contact: '9999999999'
                },
                theme: {
                    color: '#F37254'
                },
            };

            // eslint-disable-next-line no-undef
            const rzp = new Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error("Payment failed:", error);
            toast.error("Something went wrong with payment!")
        }
    };

    return (
        <div className="main">
            <div className="products-container">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img
                            alt={product.title}
                            src={product.image}
                            className="product-image"
                        />
                        <h3 className="product-title">{product.title}</h3>
                        <p className="product-price">
                            Price: <strong>₹{product.price}</strong>
                        </p>
                        <button
                            onClick={() => handlePay(product.id, product.price)}
                            className="pay-button"
                        >
                            Pay ₹{product.price}/-
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Product;
