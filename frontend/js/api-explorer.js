async function runEndpoint() {

    const endpoint =
        document.getElementById(
            "endpoint-select"
        ).value;

    const response =
        await fetch(
            `${API_BASE_URL}${endpoint}`
        );

    const data =
        await response.json();

    document.getElementById(
        "api-response"
    ).textContent =
        JSON.stringify(
            data,
            null,
            2
        );

}