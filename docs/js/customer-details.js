const params =
    new URLSearchParams(
        window.location.search
    );

const customerId =
    params.get("id");

let currentCustomer;

let editMode = false;

initializePage();

document
    .getElementById(
        "edit-button"
    )
    .addEventListener(
        "click",
        toggleEditMode
    );

document
    .getElementById(
        "cancel-button"
    )
    .addEventListener(
        "click",
        cancelEditMode
    );

async function initializePage() {

    await loadCustomerDetails();

}

async function loadCustomerDetails() {

    const response =
        await fetch(
            `${API_BASE_URL}/customers/${customerId}`
        );

    currentCustomer =
        await response.json();

    renderCurrentMode();

}

function renderCurrentMode() {

    if (editMode) {

        renderEditMode();

    }

    else {

        renderViewMode();

    }

}

function renderViewMode() {

    const customer =
        currentCustomer;

    document.getElementById(
        "customer-title"
    ).innerText =
        customer[1];

    document.getElementById(
        "customer-details"
    ).innerHTML = `

        <div class="detail-card">

            <h2>Customer Information</h2>

            <p>
                <strong>Name:</strong>
                ${customer[1]}
            </p>

            <p>
                <strong>Email:</strong>
                ${customer[2] ?? ""}
            </p>

            <p>
                <strong>Phone:</strong>
                ${customer[3] ?? ""}
            </p>

            <p>
                <strong>Address:</strong>
                ${customer[4] ?? ""}
            </p>

            <p>
                <strong>City:</strong>
                ${customer[5] ?? ""}
            </p>

            <p>
                <strong>State:</strong>
                ${customer[6] ?? ""}
            </p>

            <p>
                <strong>Zip:</strong>
                ${customer[7] ?? ""}
            </p>

            <p>
                <strong>Created:</strong>
                ${customer[8]}
            </p>

        </div>

    `;

}

function renderEditMode() {

    const customer =
        currentCustomer;

    document.getElementById(
        "customer-details"
    ).innerHTML = `

        <div class="detail-card">

            <h2>Customer Information</h2>

            <p>
                <strong>Name:</strong>

                <input
                    type="text"
                    id="name"
                    value="${customer[1] ?? ""}"
                >
            </p>

            <p>
                <strong>Email:</strong>

                <input
                    type="text"
                    id="email"
                    value="${customer[2] ?? ""}"
                >
            </p>

            <p>
                <strong>Phone:</strong>

                <input
                    type="text"
                    id="phone"
                    value="${customer[3] ?? ""}"
                >
            </p>

            <p>
                <strong>Address:</strong>

                <input
                    type="text"
                    id="address"
                    value="${customer[4] ?? ""}"
                >
            </p>

            <p>
                <strong>City:</strong>

                <input
                    type="text"
                    id="city"
                    value="${customer[5] ?? ""}"
                >
            </p>

            <p>
                <strong>State:</strong>

                <input
                    type="text"
                    id="state"
                    value="${customer[6] ?? ""}"
                >
            </p>

            <p>
                <strong>Zip:</strong>

                <input
                    type="text"
                    id="zip_code"
                    value="${customer[7] ?? ""}"
                >
            </p>

        </div>

    `;

}

async function toggleEditMode() {

    if (editMode) {

        await saveCustomer();

        return;

    }

    editMode = true;

    document.getElementById(
        "edit-button"
    ).innerText =
        "Save";

    document.getElementById(
        "cancel-button"
    ).style.display =
        "inline-block";

    renderCurrentMode();

}

function cancelEditMode() {

    editMode = false;

    document.getElementById(
        "edit-button"
    ).innerText =
        "Edit";

    document.getElementById(
        "cancel-button"
    ).style.display =
        "none";

    renderCurrentMode();

}

async function saveCustomer() {

    const payload = {

        name:
            document.getElementById(
                "name"
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
            `${API_BASE_URL}/customers/${customerId}`,
            {
                method: "PATCH",

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

    editMode = false;

    document.getElementById(
        "edit-button"
    ).innerText =
        "Edit";

    document.getElementById(
        "cancel-button"
    ).style.display =
        "none";

    await loadCustomerDetails();

}