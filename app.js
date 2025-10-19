const BACKEND_URL = "https://razorpay-supabase-backend-production.up.railway.app";

document.getElementById("pay-btn").onclick = async function () {
  try {
    const response = await fetch(`${BACKEND_URL}/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 50000 }), // ₹500
    });

    const order = await response.json();
    console.log("✅ Order created:", order);

    const options = {
      key: "rzp_test_XXXXXXXXXXXXXX", // your Razorpay key
      amount: order.amount,
      currency: "INR",
      name: "Demo Payment",
      order_id: order.id,
      handler: function (response) {
        alert("Payment successful!");
        console.log(response);
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error("❌ Error:", err);
  }
};

