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

    <td>
        <button
            onclick="deleteCustomer(${customer[0]})"
        >
            Delete
        </button>
    </td>
`;

        tableBody.appendChild(row);

    });

}

loadCustomers();

async function deleteCustomer(
    customerId
) {

    const confirmed =
        confirm(
            "Delete this customer?"
        );

    if (!confirmed) {
        return;
    }

    const response =
        await fetch(
            `${API_BASE_URL}/customers/${customerId}`,
            {
                method: "DELETE"
            }
        );

    const result =
        await response.json();

    alert(result.message);

    location.reload();

}