const params =
    new URLSearchParams(
        window.location.search
    );

const carrierId =
    params.get("id");

let currentCarrier;

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

    await loadCarrierDetails();

}

async function loadCarrierDetails() {

    const response =
        await fetch(
            `${API_BASE_URL}/carriers/${carrierId}`
        );

    currentCarrier =
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

    const carrier =
        currentCarrier;

    document.getElementById(
        "carrier-title"
    ).innerText =
        carrier[1];

    document.getElementById(
        "carrier-details"
    ).innerHTML = `

        <div class="detail-card">

            <h2>Carrier Information</h2>

            <p>
                <strong>Name:</strong>
                ${carrier[1]}
            </p>

            <p>
                <strong>MC Number:</strong>
                ${carrier[2] ?? ""}
            </p>

            <p>
                <strong>DOT Number:</strong>
                ${carrier[3] ?? ""}
            </p>

            <p>
                <strong>Email:</strong>
                ${carrier[4] ?? ""}
            </p>

            <p>
                <strong>Phone:</strong>
                ${carrier[5] ?? ""}
            </p>

            <p>
                <strong>Address:</strong>
                ${carrier[6] ?? ""}
            </p>

            <p>
                <strong>City:</strong>
                ${carrier[7] ?? ""}
            </p>

            <p>
                <strong>State:</strong>
                ${carrier[8] ?? ""}
            </p>

            <p>
                <strong>Zip:</strong>
                ${carrier[9] ?? ""}
            </p>

            <p>
                <strong>Created:</strong>
                ${carrier[10]}
            </p>

        </div>

    `;

}

function renderEditMode() {

    const carrier =
        currentCarrier;

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
                    value="${carrier[1] ?? ""}"
                >
            </p>

            <p>
                <strong>MC Number:</strong>

                <input
                    type="text"
                    id="mc_number"
                    value="${carrier[2] ?? ""}"
                >
            </p>

            <p>
                <strong>DOT Number:</strong>

                <input
                    type="text"
                    id="dot_number"
                    value="${carrier[3] ?? ""}"
                >
            </p>

            <p>
                <strong>Email:</strong>

                <input
                    type="text"
                    id="email"
                    value="${carrier[4] ?? ""}"
                >
            </p>

            <p>
                <strong>Phone:</strong>

                <input
                    type="text"
                    id="phone"
                    value="${carrier[5] ?? ""}"
                >
            </p>

            <p>
                <strong>Address:</strong>

                <input
                    type="text"
                    id="address"
                    value="${carrier[6] ?? ""}"
                >
            </p>

            <p>
                <strong>City:</strong>

                <input
                    type="text"
                    id="city"
                    value="${carrier[7] ?? ""}"
                >
            </p>

            <p>
                <strong>State:</strong>

                <input
                    type="text"
                    id="state"
                    value="${carrier[8] ?? ""}"
                >
            </p>

            <p>
                <strong>Zip:</strong>

                <input
                    type="text"
                    id="zip_code"
                    value="${carrier[9] ?? ""}"
                >
            </p>

        </div>

    `;

}

async function toggleEditMode() {

    if (editMode) {

        await saveCarrier();

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

async function saveCarrier() {

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
            `${API_BASE_URL}/carriers/${carrierId}`,
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

    await loadCarrierDetails();

}