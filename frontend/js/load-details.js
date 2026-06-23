const params =
    new URLSearchParams(
        window.location.search
    );

const loadNumber =
    params.get("load");

let currentLoad;
let customers = [];
let carriers = [];

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

    await loadCustomers();

    await loadCarriers();

    await loadLoadDetails();

}

async function loadCustomers() {

    const response =
        await fetch(
            `${API_BASE_URL}/customers`
        );

    customers =
        await response.json();

}

async function loadCarriers() {

    const response =
        await fetch(
            `${API_BASE_URL}/carriers`
        );

    carriers =
        await response.json();

}

async function loadLoadDetails() {

    const response =
        await fetch(
            `${API_BASE_URL}/loads/${loadNumber}`
        );

    currentLoad =
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

    const load =
        currentLoad;

    const grossMargin =
        load[18] - load[19];

    document.getElementById(
        "load-title"
    ).innerText =
        `Load ${load[1]}`;

    document.getElementById(
        "load-details"
    ).innerHTML = `

        <div class="detail-card">

            <h2>General Information</h2>

            <p><strong>Load Number:</strong> ${load[1]}</p>
            <p><strong>Status:</strong> ${load[20]}</p>
            <p><strong>Customer:</strong> ${load[5]}</p>
            <p><strong>Carrier:</strong> ${load[6] ?? "-"}</p>
            <p><strong>Created By:</strong> ${load[7]}</p>

        </div>

        <div class="detail-card">

            <h2>Financials</h2>

            <p><strong>Customer Rate:</strong> $${load[18]}</p>
            <p><strong>Carrier Rate:</strong> $${load[19]}</p>
            <p><strong>Gross Margin:</strong> $${grossMargin}</p>

        </div>

        <div class="detail-grid">

            <div class="detail-card">

                <h2>Pickup</h2>

                <p>${load[8]}</p>
                <p>${load[9]}, ${load[10]} ${load[11]}</p>
                <p>${load[16]}</p>

            </div>

            <div class="detail-card">

                <h2>Delivery</h2>

                <p>${load[12]}</p>
                <p>${load[13]}, ${load[14]} ${load[15]}</p>
                <p>${load[17]}</p>

            </div>

        </div>

        <div class="detail-card">

            <h2>History</h2>

            <p>History coming soon...</p>

        </div>

    `;

}

function renderEditMode() {

    const load =
        currentLoad;

    const customerOptions =
        customers.map(customer =>

            `<option
                value="${customer[0]}"
                ${customer[0] == load[2] ? "selected" : ""}
            >
                ${customer[1]}
            </option>`

        ).join("");

    const carrierOptions =

        `<option
            value=""
            ${load[3] === null ? "selected" : ""}
        >
            -- No Carrier Assigned --
        </option>`

        +

        carriers.map(carrier =>

            `<option
                value="${carrier[0]}"
                ${carrier[0] == load[3] ? "selected" : ""}
            >
                ${carrier[1]}
            </option>`

        ).join("");

    document.getElementById(
        "load-details"
    ).innerHTML = `

        <div class="detail-card">

            <h2>General Information</h2>

            <p>
                <strong>Load Number:</strong>
                ${load[1]}
            </p>

            <p>
                <strong>Status:</strong>

                <select id="status">

                    <option ${load[20] === "Open" ? "selected" : ""}>
                        Open
                    </option>

                    <option ${load[20] === "Booked" ? "selected" : ""}>
                        Booked
                    </option>

                    <option ${load[20] === "In Transit" ? "selected" : ""}>
                        In Transit
                    </option>

                    <option ${load[20] === "Delivered" ? "selected" : ""}>
                        Delivered
                    </option>

                </select>

            </p>

            <p>
                <strong>Customer:</strong>

                <select id="customer-id">

                    ${customerOptions}

                </select>

            </p>

            <p>
                <strong>Carrier:</strong>

                <select id="carrier-id">

                    ${carrierOptions}

                </select>

            </p>

            <p>
                <strong>Created By:</strong>
                ${load[7]}
            </p>

        </div>

        <div class="detail-card">

            <h2>Financials</h2>

            <p>
                <strong>Customer Rate:</strong>

                <input
                    type="number"
                    id="customer-rate"
                    value="${load[18] ?? ""}"
                >
            </p>

            <p>
                <strong>Carrier Rate:</strong>

                <input
                    type="number"
                    id="carrier-rate"
                    value="${load[19] ?? ""}"
                >
            </p>

        </div>

        <div class="detail-grid">

            <div class="detail-card">

                <h2>Pickup</h2>

                <p>
                    Address:
                    <input
                        type="text"
                        id="pu-address"
                        value="${load[8] ?? ""}"
                    >
                </p>

                <p>
                    City:
                    <input
                        type="text"
                        id="pu-city"
                        value="${load[9] ?? ""}"
                    >
                </p>

                <p>
                    State:
                    <input
                        type="text"
                        id="pu-state"
                        value="${load[10] ?? ""}"
                    >
                </p>

                <p>
                    Zip:
                    <input
                        type="text"
                        id="pu-zip"
                        value="${load[11] ?? ""}"
                    >
                </p>

                <p>
                    Pickup Date:
                    <input
                        type="date"
                        id="pickup-date"
                        value="${load[16] ?? ""}"
                    >
                </p>

            </div>

            <div class="detail-card">

                <h2>Delivery</h2>

                <p>
                    Address:
                    <input
                        type="text"
                        id="del-address"
                        value="${load[12] ?? ""}"
                    >
                </p>

                <p>
                    City:
                    <input
                        type="text"
                        id="del-city"
                        value="${load[13] ?? ""}"
                    >
                </p>

                <p>
                    State:
                    <input
                        type="text"
                        id="del-state"
                        value="${load[14] ?? ""}"
                    >
                </p>

                <p>
                    Zip:
                    <input
                        type="text"
                        id="del-zip"
                        value="${load[15] ?? ""}"
                    >
                </p>

                <p>
                    Delivery Date:
                    <input
                        type="date"
                        id="delivery-date"
                        value="${load[17] ?? ""}"
                    >
                </p>

            </div>

        </div>

    `;

}

async function toggleEditMode() {

    if (editMode) {

        await saveLoad();

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

async function saveLoad() {

    const status =
        document.getElementById(
            "status"
        ).value;

    const customerId =
        parseInt(
            document.getElementById(
                "customer-id"
            ).value
        );

    const carrierValue =
        document.getElementById(
            "carrier-id"
        ).value;

    const carrierId =
        carrierValue === ""
            ? null
            : parseInt(carrierValue);

    const customerRate =
        parseFloat(
            document.getElementById(
                "customer-rate"
            ).value
        );

    const carrierRate =
        parseFloat(
            document.getElementById(
                "carrier-rate"
            ).value
        );

    const payload = {

        status: status,

        customer_id:
            customerId,

        carrier_id:
            carrierId,

        customer_rate:
            customerRate,

        carrier_rate:
            carrierRate,

        pu_address:
            document.getElementById(
                "pu-address"
            ).value,

        pu_city:
            document.getElementById(
                "pu-city"
            ).value,

        pu_state:
            document.getElementById(
                "pu-state"
            ).value,

        pu_zip:
            document.getElementById(
                "pu-zip"
            ).value,

        pickup_date:
            document.getElementById(
                "pickup-date"
            ).value,

        del_address:
            document.getElementById(
                "del-address"
            ).value,

        del_city:
            document.getElementById(
                "del-city"
            ).value,

        del_state:
            document.getElementById(
                "del-state"
            ).value,

        del_zip:
            document.getElementById(
                "del-zip"
            ).value,

        delivery_date:
            document.getElementById(
                "delivery-date"
            ).value

    };

    const response =
        await fetch(
            `${API_BASE_URL}/loads/${loadNumber}`,
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

    await loadLoadDetails();

}