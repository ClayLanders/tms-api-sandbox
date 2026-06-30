let allLoads = [];

async function loadLoads() {

    const response = await fetch(
        `${API_BASE_URL}/loads`
    );

    allLoads =
        await response.json();

    renderLoads(allLoads);

}

function renderLoads(loads) {

    const tableBody =
        document.getElementById(
            "loads-table-body"
        );

    tableBody.innerHTML = "";

    loads.forEach(load => {

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>
                <a
                    class="load-link"
                    href="load-details.html?load=${load[1]}"
                >
                     ${load[1]}
                </a>
            </td>
            <td>${load[2]}</td>
            <td>${load[3] ?? "-"}</td>
            <td>${load[6]}, ${load[7]}</td>
            <td>${load[10]}, ${load[11]}</td>
            <td class="status-cell">
                <span class="status-badge status-${load[17].toLowerCase().replace(/\s+/g, "-")}">
                    ${load[17]}
                </span>
            </td>

            <td>
                <button class="btn btn-danger"
                    onclick="deleteLoad('${load[1]}')"
                >
                    Void
                </button>
            </td>
        `;

        tableBody.appendChild(row);

    });

}

function searchLoads() {

    const searchValue =
        document
            .getElementById(
                "load-search"
            )
            .value
            .toLowerCase();

    const filteredLoads =
        allLoads.filter(load =>

            String(load[1])
                .toLowerCase()
                .includes(searchValue)

            ||

            String(load[2] ?? "")
                .toLowerCase()
                .includes(searchValue)

            ||

            String(load[3] ?? "")
                .toLowerCase()
                .includes(searchValue)

            ||

            String(load[7] ?? "")
                .toLowerCase()
                .includes(searchValue)

            ||

            String(load[11] ?? "")
                .toLowerCase()
                .includes(searchValue)

            ||

            String(load[17] ?? "")
                .toLowerCase()
                .includes(searchValue)

        );

    renderLoads(filteredLoads);

}

document
    .getElementById(
        "load-search"
    )
    .addEventListener(
        "input",
        searchLoads
    );

loadLoads();

async function deleteLoad(
    loadNumber
) {

    const confirmed =
        confirm(
            "Delete this load?"
        );

    if (!confirmed) {
        return;
    }

    const response =
        await fetch(
            `${API_BASE_URL}/loads/${loadNumber}`,
            {
                method: "DELETE"
            }
        );

    const result =
        await response.json();

    alert(result.message);

    location.reload();

}