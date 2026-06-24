let allCarriers = [];

async function loadCarriers() {

    const response = await fetch(
        `${API_BASE_URL}/carriers`
    );

    allCarriers =
        await response.json();

    renderCarriers(allCarriers);

}

function renderCarriers(carriers) {

    const tableBody =
        document.getElementById(
            "carriers-table-body"
        );

    tableBody.innerHTML = "";

    carriers.forEach(carrier => {

        const row =
            document.createElement("tr");

        row.style.cursor =
            "pointer";

        row.addEventListener(
            "click",
            () => {

                window.location.href =
                    `carrier-details.html?id=${carrier[0]}`;

            }
        );

        row.innerHTML = `
            <td>${carrier[1]}</td>
            <td>${carrier[2] ?? ""}</td>
            <td>${carrier[3] ?? ""}</td>
            <td>${carrier[5] ?? ""}</td>
            <td>${carrier[7] ?? ""}</td>
            <td>${carrier[8] ?? ""}</td>

            <td>
                <button
                    onclick="event.stopPropagation(); deleteCarrier(${carrier[0]})"
                >
                    Delete
                </button>
            </td>
        `;

        tableBody.appendChild(row);

    });

}

function searchCarriers() {

    const searchValue =
        document
            .getElementById(
                "carrier-search"
            )
            .value
            .toLowerCase();

    const filteredCarriers =
        allCarriers.filter(carrier =>

            String(carrier[1] ?? "")
                .toLowerCase()
                .includes(searchValue)

            ||

            String(carrier[2] ?? "")
                .toLowerCase()
                .includes(searchValue)

            ||

            String(carrier[3] ?? "")
                .toLowerCase()
                .includes(searchValue)

            ||

            String(carrier[5] ?? "")
                .toLowerCase()
                .includes(searchValue)

            ||

            String(carrier[7] ?? "")
                .toLowerCase()
                .includes(searchValue)

            ||

            String(carrier[8] ?? "")
                .toLowerCase()
                .includes(searchValue)

        );

    renderCarriers(filteredCarriers);

}

document
    .getElementById(
        "carrier-search"
    )
    .addEventListener(
        "input",
        searchCarriers
    );

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