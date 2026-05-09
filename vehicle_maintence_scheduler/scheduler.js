const axios = require("axios");

const Log = require("../logging_middleware/logger");

const ACCESS_TOKEN =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJrZXRhbmF2YXJzaGl0aGFAZ21haWwuY29tIiwiZXhwIjoxNzc4MzExNDAwLCJpYXQiOjE3NzgzMTA1MDAsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI5ZjlhM2M5My05NjNhLTQzMTUtYTgwNi1mOTA5ODgwZWY3NzUiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJ2YXJzaGl0aGEiLCJzdWIiOiJiY2Q2ZTBiZS1hZWY0LTQ4ZmItYmExMC01YTE5ZDVjZTE1NjIifSwiZW1haWwiOiJrZXRhbmF2YXJzaGl0aGFAZ21haWwuY29tIiwibmFtZSI6InZhcnNoaXRoYSIsInJvbGxObyI6IjIzNDgxYTA1YTQiLCJhY2Nlc3NDb2RlIjoiZUpkQ3VDIiwiY2xpZW50SUQiOiJiY2Q2ZTBiZS1hZWY0LTQ4ZmItYmExMC01YTE5ZDVjZTE1NjIiLCJjbGllbnRTZWNyZXQiOiJ2Snhibk1jemRSTVV6RmtjIn0.k8USlTAsH0oQQsgMvTbWLbsPLH7Dvc1wcMcSNboEd04";

const API = "http://4.224.186.213/evaluation-service";

async function fetchDepots() {
  try {
    const response = await axios.get(`${API}/depots`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    await Log("backend","info","service","Fetched depots successfully");

    return response.data.depots;

  } catch (error) {

    await Log("backend","error","service","Failed to fetch depots");

    console.log(error.message);
  }
}

async function fetchVehicles() {
  try {
    const response = await axios.get(`${API}/vehicles`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    await Log("backend","info","service","Fetched vehicles successfully");

    return response.data.vehicles;

  } catch (error) {

    await Log("backend","error","service","Failed to fetch vehicles");

    console.log(error.message);
  }
}

function solveKnapsack(vehicles, maxHours) {

  let selected = [];
  let totalHours = 0;
  let totalImpact = 0;

  vehicles.sort((a, b) =>
    (b.Impact / b.Duration) - (a.Impact / a.Duration)
  );

  for (let vehicle of vehicles) {

    if (totalHours + vehicle.Duration <= maxHours) {
      selected.push(vehicle);
      totalHours += vehicle.Duration;
      totalImpact += vehicle.Impact;
    }
  }

  return { selected, totalHours, totalImpact };
}

async function startScheduler() {

  console.log("Scheduler Started");

  const depots = await fetchDepots();
  const vehicles = await fetchVehicles();

  for (let depot of depots) {

    const result = solveKnapsack(
      vehicles,
      depot.MechanicHours
    );

    console.log("\nDepot:", depot.ID);
    console.log("Hours:", result.totalHours);
    console.log("Impact:", result.totalImpact);
    console.log("Tasks Selected:", result.selected.length);

    await Log(
      "backend",
      "info",
      "cron_job",
      `Processed depot ${depot.ID}`
    );
  }
}

startScheduler();