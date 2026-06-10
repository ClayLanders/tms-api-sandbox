async function loadCustomers() {

    const response = await fetch(
        `${API_BASE_URL}/customers`
    );

    const customers = await response.json();

    const tableBody =
        document.getElementById(
            "customers-table-body"
        );

    customers.forEach(customer => {

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>${customer[1]}</td>
            <td>${customer[2]}</td>
            <td>${customer[3]}</td>
            <td>${customer[5]}</td>
            <td>${customer[6]}</td>
        `;

        tableBody.appendChild(row);

    });

}

loadCustomers();