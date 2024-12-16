// simple subnet calculator
$(document).ready(function () {
  $("#calculate").click(function () {
    const networkAddress = $("#networkAddress").val().trim();
    const maskBits = parseInt($("#maskBits").val(), 10);

    console.log("Update button clicked");
    console.log("Network Address:", networkAddress, "Mask Bits:", maskBits);

    // Validate inputs
    if (!validateIP(networkAddress) || maskBits < 1 || maskBits > 32) {
      alert("Please enter a valid IP address and mask bits (1-32).");
      return;
    }

    // Perform subnet calculations
    const results = calculateSubnet(networkAddress, maskBits);
    console.log("Calculation results:", results);

    // Display the results in the table
    displayResults(results);
  });

  // Validate the IP address format
  function validateIP(ip) {
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    return (
      ipRegex.test(ip) &&
      ip.split(".").every((segment) => segment >= 0 && segment <= 255)
    );
  }

  // Subnet calculation logic
  function calculateSubnet(ip, maskBits) {
    const totalHosts = Math.pow(2, 32 - maskBits);
    const usableHosts = totalHosts - 2; // Subtract network and broadcast addresses

    const rangeStart = incrementIP(ip, 1);
    const rangeEnd = incrementIP(ip, totalHosts - 2);

    return {
      subnetAddress: ip,
      rangeStart: rangeStart,
      rangeEnd: rangeEnd,
      totalHosts: totalHosts,
      usableHosts: usableHosts,
    };
  }

  // Increment an IP address
  function incrementIP(ip, increment) {
    const parts = ip.split(".").map(Number);
    let value =
      (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];
    value += increment;

    return `${
      (value >>> 24) & 255
    }.${(value >>> 16) & 255}.${(value >>> 8) & 255}.${value & 255}`;
  }

  // Display results in the table
  function displayResults(data) {
    $("#results tbody").html(`
            <tr>
              <td>${data.subnetAddress}</td>
              <td>${data.rangeStart} - ${data.rangeEnd}</td>
              <td>${data.usableHosts.toLocaleString()}</td>
              <td>${data.totalHosts.toLocaleString()}</td>
            </tr>
          `);
    $("#displayResults").show();
  }
});
