async function loadUsers() {

    const response = await fetch(
        `${API_BASE_URL}/users`
    );

    const users = await response.json();

    const tableBody =
        document.getElementById(
            "users-table-body"
        );

    users.forEach(user => {

        const row =
            document.createElement("tr");

        row.innerHTML = `
    <td>${user[1]}</td>
    <td>${user[2]}</td>
    <td>${user[3]}</td>
    <td>${user[4]}</td>

    <td>
        <button
            onclick="deleteUser(${user[0]})"
        >
            Delete
        </button>
    </td>
`;

        tableBody.appendChild(row);

    });

}

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