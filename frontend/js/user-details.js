const params =
    new URLSearchParams(
        window.location.search
    );

const userId =
    params.get("id");

let currentUser;

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

    await loadUserDetails();

}

async function loadUserDetails() {

    const response =
        await fetch(
            `${API_BASE_URL}/users/${userId}`
        );

    currentUser =
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

    const user =
        currentUser;

    document.getElementById(
        "user-title"
    ).innerText =
        `${user[1]} ${user[2]}`;

    document.getElementById(
        "user-details"
    ).innerHTML = `

        <div class="detail-card">

            <h2>User Information</h2>

            <p>
                <strong>First Name:</strong>
                ${user[1]}
            </p>

            <p>
                <strong>Last Name:</strong>
                ${user[2]}
            </p>

            <p>
                <strong>Email:</strong>
                ${user[3]}
            </p>

            <p>
                <strong>Role:</strong>
                ${user[4]}
            </p>

            <p>
                <strong>Created:</strong>
                ${user[5]}
            </p>

        </div>

    `;

}

function renderEditMode() {

    const user =
        currentUser;

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
                    value="${user[1]}"
                >
            </p>

            <p>
                <strong>Last Name:</strong>

                <input
                    type="text"
                    id="last_name"
                    value="${user[2]}"
                >
            </p>

            <p>
                <strong>Email:</strong>

                <input
                    type="text"
                    id="email"
                    value="${user[3]}"
                >
            </p>

            <p>
                <strong>Role:</strong>

                <input
                    type="text"
                    id="role"
                    value="${user[4]}"
                >
            </p>

        </div>

    `;

}

async function toggleEditMode() {

    if (editMode) {

        await saveUser();

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

async function saveUser() {

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
            `${API_BASE_URL}/users/${userId}`,
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

    await loadUserDetails();

}