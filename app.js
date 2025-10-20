const backendURL = "https://razorpay-supabase-backend-production.up.railway.app";

document.getElementById("pay-btn").onclick = async function () {
  try {
    console.log("📤 Creating order...");
    const response = await fetch(`${backendURL}/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);

    const order = await response.json();
    console.log("✅ Order created:", order);

    const options = {
      key: "rzp_test_RUiY79QHMVinT8",
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,
      name: "Your Company",
      description: "Test Payment",
      handler: function (response) {
        console.log("✅ Payment success:", response);
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999"
      },
      theme: { color: "#528FF0" },
      modal: { ondismiss: () => console.log("⚠️ Payment cancelled by user") },
    };

    const rzp = new Razorpay(options);
    rzp.on("payment.failed", (response) => {
      console.error("❌ Payment failed:", response.error);
      alert(`Payment failed: ${response.error.description}`);
    });
    rzp.open();
  } catch (err) {
    console.error("❌ Error:", err);
    alert("⚠️ Payment could not start. Please try again or refresh the page.");
  }
};