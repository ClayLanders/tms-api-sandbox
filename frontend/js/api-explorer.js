async function runEndpoint() {

    const method =
        document.getElementById(
            "method-select"
        ).value;

    const endpoint =
        document.getElementById(
            "endpoint-select"
        ).value;

    const requestBody =
        document.getElementById(
            "request-body"
        ).value;

    const options = {

        method: method

    };

    if (
        method === "POST" ||
        method === "PATCH"
    ) {

        options.headers = {

            "Content-Type":
                "application/json"

        };

        try {

            options.body =
                requestBody;

        }

        catch {

            document.getElementById(
                "api-response"
            ).textContent =
                "Invalid JSON";

            return;

        }

    }

    try {

        const response =
            await fetch(
                `${API_BASE_URL}${endpoint}`,
                options
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

    catch (error) {

        document.getElementById(
            "api-response"
        ).textContent =
            error.message;

    }

}