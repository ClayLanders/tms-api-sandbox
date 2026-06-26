async function loadDashboard() {

    const response = await fetch(
        `${API_BASE_URL}/loads`
    );

    const loads = await response.json();

    let openLoads = 0;
    let coveredLoads = 0;
    let inTransitLoads = 0;
    let deliveredLoads = 0;

    loads.forEach(load => {

        const status = load[17];

        if (status === "Open") {
            openLoads++;
        }

        else if (status === "Booked") {
            coveredLoads++;
        }

        else if (status === "In Transit") {
            inTransitLoads++;
        }

        else if (status === "Delivered") {
            deliveredLoads++;
        }

    });

    document.getElementById("open-loads").textContent =
        openLoads;

    document.getElementById("covered-loads").textContent =
        coveredLoads;

    document.getElementById("in-transit-loads").textContent =
        inTransitLoads;

    document.getElementById("delivered-loads").textContent =
        deliveredLoads;
}

loadDashboard();