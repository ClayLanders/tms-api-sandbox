renderCreateForm();

document
    .getElementById(
        "create-button"
    )
    .addEventListener(
        "click",
        createCarrier
    );

function renderCreateForm() {

    document.getElementById(
        "carrier-details"
    ).innerHTML = `

        <div class="detail-card">

            <h2>Carrier Information</h2>

            <p>
                <strong>Name:</strong>

                <input
                    type="text"
                    id="name"
                >
            </p>

            <p>
                <strong>MC Number:</strong>

                <input
                    type="text"
                    id="mc_number"
                >
            </p>

            <p>
                <strong>DOT Number:</strong>

                <input
                    type="text"
                    id="dot_number"
                >
            </p>

            <p>
                <strong>Email:</strong>

                <input
                    type="text"
                    id="email"
                >
            </p>

            <p>
                <strong>Phone:</strong>

                <input
                    type="text"
                    id="phone"
                >
            </p>

            <p>
                <strong>Address:</strong>

                <input
                    type="text"
                    id="address"
                >
            </p>

            <p>
                <strong>City:</strong>

                <input
                    type="text"
                    id="city"
                >
            </p>

            <p>
                <strong>State:</strong>

                <input
                    type="text"
                    id="state"
                >
            </p>

            <p>
                <strong>Zip:</strong>

                <input
                    type="text"
                    id="zip_code"
                >
            </p>

        </div>

    `;

}

async function createCarrier() {

    const payload = {

        name:
            document.getElementById(
                "name"
            ).value,

        mc_number:
            document.getElementById(
                "mc_number"
            ).value,

        dot_number:
            document.getElementById(
                "dot_number"
            ).value,

        email:
            document.getElementById(
                "email"
            ).value,

        phone:
            document.getElementById(
                "phone"
            ).value,

        address:
            document.getElementById(
                "address"
            ).value,

        city:
            document.getElementById(
                "city"
            ).value,

        state:
            document.getElementById(
                "state"
            ).value,

        zip_code:
            document.getElementById(
                "zip_code"
            ).value

    };

    const response =
        await fetch(
            `${API_BASE_URL}/carriers`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(
                        payload
                    )
            }
        );

    const result =
        await response.json();

    alert(
        result.message
    );

    if (
        result.message ===
        "Carrier created successfully"
    ) {

        window.location.href =
            "carriers.html";

    }

}