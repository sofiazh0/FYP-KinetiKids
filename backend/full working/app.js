document.getElementById("queryForm").addEventListener("submit", async function (event) {
    event.preventDefault();  // Prevent the form from reloading the page

    // Get user inputs
    const text = document.getElementById("text").value;
    const query_text = document.getElementById("query_text").value;

    // Prepare the data to send
    const data = {
        text: text,
        query_text: query_text
    };

    try {
        // Send data to FastAPI backend
        const response = await fetch('http://127.0.0.1:8000/process_query/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // Parse and display the result
        const result = await response.json();
        document.getElementById("response").innerText = result.response;

    } catch (error) {
        console.error("Error:", error);
    }
});
