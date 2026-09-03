import axios from "axios";
import API_BASE_URL from "./config";

function loadRazorpayScript() {
    return new Promise((resolve) => {
        if (window.Razorpay) {
            resolve(true);
            return;
        }
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
}

export async function startRazorpayPayment({
    amount,
    customerName = "",
    customerEmail = "",
    customerPhone = "",
    shipmentId = null,
    notes = "PRAGYA SHIPPING AND LOGISTICS payment",
    weight = null,
    serviceType = null,
    distance = null
}) {
    const config = await axios.get(`${API_BASE_URL}/api/payment/config`);
    if (!config.data.enabled) {
        throw new Error("Payment is not enabled. Add Razorpay test keys on the backend.");
    }

    const loaded = await loadRazorpayScript();
    if (!loaded) {
        throw new Error("Could not load Razorpay. Check internet connection.");
    }

    const orderRes = await axios.post(`${API_BASE_URL}/api/payment/create-order`, {
        amount,
        customerName,
        customerEmail,
        customerPhone,
        shipmentId,
        notes,
        weight,
        serviceType,
        distance
    });

    const { orderId, amount: paise, currency, keyId } = orderRes.data;

    return new Promise((resolve, reject) => {
        const rzp = new window.Razorpay({
            key: keyId,
            amount: paise,
            currency,
            name: "PRAGYA SHIPPING AND LOGISTICS",
            description: notes,
            order_id: orderId,
            prefill: {
                name: customerName,
                email: customerEmail,
                contact: customerPhone
            },
            theme: { color: "#1b4f72" },
            handler: async (response) => {
                try {
                    await axios.post(`${API_BASE_URL}/api/payment/verify`, response);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            }
        });

        rzp.on("payment.failed", () => {
            reject(new Error("Payment failed or cancelled"));
        });

        rzp.open();
    });
}
