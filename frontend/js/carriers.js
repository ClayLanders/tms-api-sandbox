async function loadCarriers() {

    const response = await fetch(
        `${API_BASE_URL}/carriers`
    );

    const carriers = await response.json();

    const tableBody =
        document.getElementById(
            "carriers-table-body"
        );

    carriers.forEach(carrier => {

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>${carrier[1]}</td>
            <td>${carrier[2]}</td>
            <td>${carrier[3]}</td>
            <td>${carrier[5]}</td>
            <td>${carrier[7]}</td>
            <td>${carrier[8]}</td>
        `;

        tableBody.appendChild(row);

    });

}

loadCarriers();