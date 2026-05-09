const axios = require("axios");

const ACCESS_TOKEN =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJrZXRhbmF2YXJzaGl0aGFAZ21haWwuY29tIiwiZXhwIjoxNzc4MzExNDAwLCJpYXQiOjE3NzgzMTA1MDAsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI5ZjlhM2M5My05NjNhLTQzMTUtYTgwNi1mOTA5ODgwZWY3NzUiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJ2YXJzaGl0aGEiLCJzdWIiOiJiY2Q2ZTBiZS1hZWY0LTQ4ZmItYmExMC01YTE5ZDVjZTE1NjIifSwiZW1haWwiOiJrZXRhbmF2YXJzaGl0aGFAZ21haWwuY29tIiwibmFtZSI6InZhcnNoaXRoYSIsInJvbGxObyI6IjIzNDgxYTA1YTQiLCJhY2Nlc3NDb2RlIjoiZUpkQ3VDIiwiY2xpZW50SUQiOiJiY2Q2ZTBiZS1hZWY0LTQ4ZmItYmExMC01YTE5ZDVjZTE1NjIiLCJjbGllbnRTZWNyZXQiOiJ2Snhibk1jemRSTVV6RmtjIn0.k8USlTAsH0oQQsgMvTbWLbsPLH7Dvc1wcMcSNboEd04";

async function Log(stack, level, pkg, message) {
  try {
    await axios.post(
      "http://4.224.186.213/evaluation-service/logs",
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Log Created");
  } catch (error) {
    console.log("❌ Logging Failed");

    if (error.response) {
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}

module.exports = Log;