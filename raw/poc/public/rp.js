const rzpButton = document.querySelector("#rzp-button1");
rzpButton.addEventListener("click",async function(e){
    console.log("HELLO BEFORE");
            // backend pe request
            const response = await fetch("https://8ffe-152-58-74-108.ngrok-free.app/checkout"); 
            // options fill data
            const data = await response.json();
            console.log("data",data);
            const options={
                "key":"rzp_test_pAPJDSFIrpxdI4",
                "amount":data.amount,
                "currency":data.currency,
                "name":"Acme Corp",
                "description":data.product
            }
            //Payment Page create
            const paymentPage = new Razorpay(options);
            //Payment Page open
            paymentPage.open();
            // prevent reloaden();
            e.preventDefault();
        })