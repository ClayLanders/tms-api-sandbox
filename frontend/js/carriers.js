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
    <td>${carrier[6]}</td>
    <td>${carrier[7]}</td>
    <td>${carrier[8]}</td>
    <td>
        <button
            onclick="deleteCarrier(${carrier[0]})"
        >
            Delete
        </button>
    </td>
`;

        tableBody.appendChild(row);

    });

}

loadCarriers();

async function deleteCarrier(
    carrierId
) {

    const confirmed =
        confirm(
            "Delete this carrier?"
        );

    if (!confirmed) {
        return;
    }

    const response =
        await fetch(
            `${API_BASE_URL}/carriers/${carrierId}`,
            {
                method: "DELETE"
            }
        );

    const result =
        await response.json();

    alert(result.message);

    location.reload();

}