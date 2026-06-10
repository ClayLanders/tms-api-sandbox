async function loadLoads() {

    const response = await fetch(
        `${API_BASE_URL}/loads`
    );

    const loads = await response.json();

    const tableBody =
        document.getElementById(
            "loads-table-body"
        );

    loads.forEach(load => {

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>${load[1]}</td>
            <td>${load[2]}</td>
            <td>${load[3] ?? "-"}</td>
            <td>${load[6]}, ${load[7]}</td>
            <td>${load[10]}, ${load[11]}</td>
            <td>${load[17]}</td>
        `;

        tableBody.appendChild(row);

    });

}

loadLoads();