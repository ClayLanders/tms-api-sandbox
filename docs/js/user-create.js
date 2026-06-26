renderCreateForm();

document
    .getElementById(
        "create-button"
    )
    .addEventListener(
        "click",
        createUser
    );

function renderCreateForm() {

    document.getElementById(
        "user-details"
    ).innerHTML = `

        <div class="detail-card">

            <h2>User Information</h2>

            <p>
                <strong>First Name:</strong>

                <input
                    type="text"
                    id="first_name"
                >
            </p>

            <p>
                <strong>Last Name:</strong>

                <input
                    type="text"
                    id="last_name"
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
                <strong>Role:</strong>

                <input
                    type="text"
                    id="role"
                >
            </p>

        </div>

    `;

}

async function createUser() {

    const payload = {

        first_name:
            document.getElementById(
                "first_name"
            ).value,

        last_name:
            document.getElementById(
                "last_name"
            ).value,

        email:
            document.getElementById(
                "email"
            ).value,

        role:
            document.getElementById(
                "role"
            ).value

    };

    const response =
        await fetch(
            `${API_BASE_URL}/users`,
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
        "User created successfully"
    ) {

        window.location.href =
            "users.html";

    }

}