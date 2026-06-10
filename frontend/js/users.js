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
        `;

        tableBody.appendChild(row);

    });

}

loadUsers();