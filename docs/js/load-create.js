let customers = [];
let users = [];

initializePage();

document
    .getElementById(
        "create-button"
    )
    .addEventListener(
        "click",
        createLoad
    );

async function initializePage() {

    await loadCustomers();

    await loadUsers();

    renderForm();

}

async function loadCustomers() {

    const response =
        await fetch(
            `${API_BASE_URL}/customers`
        );

    customers =
        await response.json();

}

async function loadUsers() {

    const response =
        await fetch(
            `${API_BASE_URL}/users`
        );

    users =
        await response.json();

}

function renderForm() {

    const customerOptions =
        customers.map(customer =>

            `<option value="${customer[0]}">
                ${customer[1]}
            </option>`

        ).join("");

    const userOptions =
        users.map(user =>

            `<option value="${user[0]}">
                ${user[1]} ${user[2]}
            </option>`

        ).join("");

    document.getElementById(
        "load-create-form"
    ).innerHTML = `

        <div class="detail-card">

            <h2>General Information</h2>

            <p>

                <strong>Customer:</strong>

                <select id="customer_id">

                    ${customerOptions}

                </select>

            </p>

            <p>

                <strong>Created By:</strong>

                <select id="created_by_user_id">

                    ${userOptions}

                </select>

            </p>

        </div>

        <div class="detail-card">

            <h2>Pickup</h2>

            <p>
                <input
                    type="text"
                    id="pu_address"
                    placeholder="Address"
                >
            </p>

            <p>
                <input
                    type="text"
                    id="pu_city"
                    placeholder="City"
                >
            </p>

            <p>
                <input
                    type="text"
                    id="pu_state"
                    placeholder="State"
                >
            </p>

            <p>
                <input
                    type="text"
                    id="pu_zip"
                    placeholder="Zip"
                >
            </p>

            <p>
                <input
                    type="date"
                    id="pickup_date"
                >
            </p>

        </div>

        <div class="detail-card">

            <h2>Delivery</h2>

            <p>
                <input
                    type="text"
                    id="del_address"
                    placeholder="Address"
                >
            </p>

            <p>
                <input
                    type="text"
                    id="del_city"
                    placeholder="City"
                >
            </p>

            <p>
                <input
                    type="text"
                    id="del_state"
                    placeholder="State"
                >
            </p>

            <p>
                <input
                    type="text"
                    id="del_zip"
                    placeholder="Zip"
                >
            </p>

            <p>
                <input
                    type="date"
                    id="delivery_date"
                >
            </p>

        </div>

        <div class="detail-card">

            <h2>Financials</h2>

            <p>

                <strong>Customer Rate:</strong>

                <input
                    type="number"
                    id="customer_rate"
                >

            </p>

            <p>

                <strong>Carrier Rate:</strong>

                <input
                    type="number"
                    id="carrier_rate"
                >

            </p>

        </div>

    `;

}

async function createLoad() {

    const payload = {

        customer_id:
            parseInt(
                document.getElementById(
                    "customer_id"
                ).value
            ),

        carrier_id: null,

        created_by_user_id:
            parseInt(
                document.getElementById(
                    "created_by_user_id"
                ).value
            ),

        pu_address:
            document.getElementById(
                "pu_address"
            ).value,

        pu_city:
            document.getElementById(
                "pu_city"
            ).value,

        pu_state:
            document.getElementById(
                "pu_state"
            ).value,

        pu_zip:
            document.getElementById(
                "pu_zip"
            ).value,

        del_address:
            document.getElementById(
                "del_address"
            ).value,

        del_city:
            document.getElementById(
                "del_city"
            ).value,

        del_state:
            document.getElementById(
                "del_state"
            ).value,

        del_zip:
            document.getElementById(
                "del_zip"
            ).value,

        pickup_date:
            document.getElementById(
                "pickup_date"
            ).value,

        delivery_date:
            document.getElementById(
                "delivery_date"
            ).value,

        customer_rate:
            parseFloat(
                document.getElementById(
                    "customer_rate"
                ).value
            ),

        carrier_rate:
            parseFloat(
                document.getElementById(
                    "carrier_rate"
                ).value
            ),

        status: "Open"

    };

    const response =
        await fetch(
            `${API_BASE_URL}/loads`,
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
        "Load created successfully"
    ) {

        window.location.href =
            "loads.html";

    }

}