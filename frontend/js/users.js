let allUsers = [];

async function loadUsers() {

    const response = await fetch(
        `${API_BASE_URL}/users`
    );

    allUsers =
        await response.json();

    renderUsers(allUsers);

}

function renderUsers(users) {

    const tableBody =
        document.getElementById(
            "users-table-body"
        );

    tableBody.innerHTML = "";

    users.forEach(user => {

        const row =
            document.createElement("tr");

        row.style.cursor =
            "pointer";

        row.addEventListener(
            "click",
            () => {

                window.location.href =
                    `user-details.html?id=${user[0]}`;

            }
        );

        row.innerHTML = `
            <td>${user[1]}</td>
            <td>${user[2]}</td>
            <td>${user[3]}</td>
            <td>${user[4]}</td>

            <td>
                <button
                    onclick="event.stopPropagation(); deleteUser(${user[0]})"
                >
                    Delete
                </button>
            </td>
        `;

        tableBody.appendChild(row);

    });

}

function searchUsers() {

    const searchValue =
        document
            .getElementById(
                "user-search"
            )
            .value
            .toLowerCase();

    const filteredUsers =
        allUsers.filter(user =>

            String(user[1] ?? "")
                .toLowerCase()
                .includes(searchValue)

            ||

            String(user[2] ?? "")
                .toLowerCase()
                .includes(searchValue)

            ||

            String(user[3] ?? "")
                .toLowerCase()
                .includes(searchValue)

            ||

            String(user[4] ?? "")
                .toLowerCase()
                .includes(searchValue)

        );

    renderUsers(filteredUsers);

}

document
    .getElementById(
        "user-search"
    )
    .addEventListener(
        "input",
        searchUsers
    );

loadUsers();

async function deleteUser(
    userId
) {

    const confirmed =
        confirm(
            "Delete this user?"
        );

    if (!confirmed) {
        return;
    }

    const response =
        await fetch(
            `${API_BASE_URL}/users/${userId}`,
            {
                method: "DELETE"
            }
        );

    const result =
        await response.json();

    alert(result.message);

    location.reload();

}