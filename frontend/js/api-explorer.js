document
    .getElementById(
        "method-select"
    )
    .addEventListener(
        "change",
        handleMethodChange
    );

document
    .getElementById(
        "endpoint-input"
    )
    .addEventListener(
        "input",
        updateRequestTemplate
    );

handleMethodChange();

async function runEndpoint() {

    const method =
        document.getElementById(
            "method-select"
        ).value;

    const endpoint =
        document.getElementById(
            "endpoint-input"
        ).value.trim();

    const requestBody =
        document.getElementById(
            "request-body"
        ).value;

    if (!endpoint) {

        alert(
            "Endpoint is required"
        );

        return;

    }

    document.getElementById(
        "request-url"
    ).textContent =

        `${method} ${API_BASE_URL}${endpoint}`;

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

            JSON.parse(
                requestBody
            );

            options.body =
                requestBody;

        }

        catch {

            alert(
                "Invalid JSON"
            );

            return;

        }

    }

    try {

        const startTime =
            performance.now();

        const response =
            await fetch(
                `${API_BASE_URL}${endpoint}`,
                options
            );

        const endTime =
            performance.now();

        const responseTime =
            Math.round(
                endTime - startTime
            );

        const data =
            await response.json();

        document.getElementById(
            "response-meta"
        ).innerHTML = `

Status:
${response.status}

<br>

Response Time:
${responseTime} ms

`;

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

function copyResponse() {

    navigator.clipboard.writeText(

        document.getElementById(
            "api-response"
        ).textContent

    );

    alert(
        "Response copied"
    );

}

function handleMethodChange() {

    updateMethodColor();

    updateRequestTemplate();

}

function updateMethodColor() {

    const methodSelect =
        document.getElementById(
            "method-select"
        );

    methodSelect.className = "";

    switch (methodSelect.value) {

        case "GET":

            methodSelect.classList.add(
                "method-get"
            );

            break;

        case "POST":

            methodSelect.classList.add(
                "method-post"
            );

            break;

        case "PATCH":

            methodSelect.classList.add(
                "method-patch"
            );

            break;

        case "DELETE":

            methodSelect.classList.add(
                "method-delete"
            );

            break;

    }

}

function updateRequestTemplate() {

    const method =
        document.getElementById(
            "method-select"
        ).value;

    const endpoint =
        document.getElementById(
            "endpoint-input"
        ).value
            .toLowerCase();

    const requestBody =
        document.getElementById(
            "request-body"
        );

    if (
        method !== "POST" &&
        method !== "PATCH"
    ) {

        requestBody.value = "";

        return;

    }

    if (
        endpoint.includes(
            "customers"
        )
    ) {

        requestBody.value =
            `{
  "name": "Customer Name",
  "email": "email@example.com",
  "phone": "555-123-4567",
  "address": "123 Main St",
  "city": "Charlotte",
  "state": "NC",
  "zip_code": "28202"
}`;

    }

    else if (
        endpoint.includes(
            "carriers"
        )
    ) {

        requestBody.value =
            `{
  "name": "Carrier Name",
  "mc_number": "MC123456",
  "dot_number": "DOT987654",
  "email": "dispatch@carrier.com",
  "phone": "555-123-4567",
  "address": "456 Carrier Way",
  "city": "Atlanta",
  "state": "GA",
  "zip_code": "30301"
}`;

    }

    else if (
        endpoint.includes(
            "users"
        )
    ) {

        requestBody.value =
            `{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "role": "Dispatcher"
}`;

    }

    else if (
        endpoint.includes(
            "loads"
        )
    ) {

        requestBody.value =
            `{
  "customer_id": 1,
  "created_by_user_id": 1,
  "pu_address": "123 Pickup St",
  "pu_city": "Charlotte",
  "pu_state": "NC",
  "pu_zip": "28202",
  "del_address": "456 Delivery Ave",
  "del_city": "Atlanta",
  "del_state": "GA",
  "del_zip": "30301",
  "pickup_date": "2026-07-01",
  "delivery_date": "2026-07-02",
  "customer_rate": 2500,
  "carrier_rate": 1800
}`;

    }

}