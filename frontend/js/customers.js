let allCustomers = [];

async function loadCustomers() {

    const response = await fetch(
        `${API_BASE_URL}/customers`
    );

    allCustomers =
        await response.json();

    renderCustomers(allCustomers);

}

function renderCustomers(customers) {

    const tableBody =
        document.getElementById(
            "customers-table-body"
        );

    tableBody.innerHTML = "";

    customers.forEach(customer => {

        const row =
            document.createElement("tr");

        row.style.cursor =
            "pointer";

        row.addEventListener(
            "click",
            () => {

                window.location.href =
                    `customer-details.html?id=${customer[0]}`;

            }
        );

        row.innerHTML = `
            <td>${customer[1]}</td>
            <td>${customer[2] ?? ""}</td>
            <td>${customer[3] ?? ""}</td>
            <td>${customer[5] ?? ""}</td>
            <td>${customer[6] ?? ""}</td>

            <td>
                <button
                    onclick="event.stopPropagation(); deleteCustomer(${customer[0]})"
                >
                    Delete
                </button>
            </td>
        `;

        tableBody.appendChild(row);

    });

}

function searchCustomers() {

    const searchValue =
        document
            .getElementById(
                "customer-search"
            )
            .value
            .toLowerCase();

    const filteredCustomers =
        allCustomers.filter(customer =>

            String(customer[1] ?? "")
                .toLowerCase()
                .includes(searchValue)

            ||

            String(customer[2] ?? "")
                .toLowerCase()
                .includes(searchValue)

            ||

            String(customer[3] ?? "")
                .toLowerCase()
                .includes(searchValue)

            ||

            String(customer[5] ?? "")
                .toLowerCase()
                .includes(searchValue)

            ||

            String(customer[6] ?? "")
                .toLowerCase()
                .includes(searchValue)

        );

    renderCustomers(filteredCustomers);

}

document
    .getElementById(
        "customer-search"
    )
    .addEventListener(
        "input",
        searchCustomers
    );

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