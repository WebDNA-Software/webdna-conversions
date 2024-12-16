// ipv4 subnet calculator
$(document).ready(function () {
  $("#v4CalculateBtn").on("click", function () {
    v4CalculateSubnet();
  });

  function v4CalculateSubnet() {
    const v4NetworkBlock = $("#v4NetworkBlock").val().trim();
    const v4SubnetMask = parseInt($("#v4SubnetMask").val());
    const v4NumSubnets = parseInt($("#v4NumSubnets").val());

    if (!v4IsValidCIDR(v4NetworkBlock) || isNaN(v4SubnetMask)) {
      v4ClearFields();
      return;
    }

    const [v4NetworkAddress] = v4NetworkBlock.split("/");
    const prefix = v4SubnetMask;
    const v4MaskBits = v4SubnetMask - prefix;
    const v4TotalHosts = Math.pow(2, 32 - v4SubnetMask);
    const v4BroadcastAddress = v4CalculateBroadcast(
      v4NetworkAddress,
      v4SubnetMask
    );
    const v4WildcardMask = v4CalculateWildcardMask(v4SubnetMask);

    // Display results
    $("#v4NumHosts").val(v4TotalHosts.toLocaleString());
    $("#v4HostRange").val(v4GetHostRange(v4NetworkAddress, v4SubnetMask));
    $("#v4BroadcastAddress").val(v4BroadcastAddress);
    $("#v4WildcardMask").val(v4WildcardMask);
    $("#v4CidrNotation").val(`${v4NetworkAddress}/${v4SubnetMask}`);
    v4DisplaySubnets(v4NetworkAddress, v4SubnetMask, v4NumSubnets);
  }

  function v4DisplaySubnets(baseAddress, mask, count) {
    const v4Tbody = $("#v4SubnetDetails");
    v4Tbody.empty();
    $("#v4displayResults").show();

    for (let i = 0; i < count; i++) {
      const subnet = v4GetSubnetAddress(baseAddress, mask, i);
      const broadcast = v4CalculateBroadcast(subnet, mask);
      const range = v4GetHostRange(subnet, mask);

      v4Tbody.append(`
        <tr>
          <td>${i + 1}</td>
          <td>${subnet}</td>
          <td>${range}</td>
          <td>${broadcast}</td>
        </tr>
      `);
    }
  }

  function v4IsValidCIDR(cidr) {
    const regex = /^\d{1,3}(\.\d{1,3}){3}\/\d{1,2}$/;
    return regex.test(cidr);
  }

  function v4CalculateBroadcast(address, mask) {
    const ipBinary = v4IpToBinary(address);
    const networkBits = ipBinary.substring(0, mask);
    const hostBits = "1".repeat(32 - mask);
    const broadcastBinary = networkBits + hostBits;
    return v4BinaryToIP(broadcastBinary);
  }

  function v4CalculateWildcardMask(mask) {
    const binary = "1".repeat(32 - mask) + "0".repeat(mask);
    return v4BinaryToIP(binary);
  }

  function v4GetHostRange(network, mask) {
    const firstIP = v4IncrementIP(network, 1);
    const broadcast = v4CalculateBroadcast(network, mask);
    const lastIP = v4IncrementIP(broadcast, -1);
    return `${firstIP} - ${lastIP}`;
  }

  function v4GetSubnetAddress(base, mask, index) {
    const baseBinary = v4IpToBinary(base);
    const increment = index * Math.pow(2, 32 - mask);
    const newBinary = (parseInt(baseBinary, 2) + increment)
      .toString(2)
      .padStart(32, "0");
    return v4BinaryToIP(newBinary);
  }

  function v4IpToBinary(ip) {
    return ip
      .split(".")
      .map((octet) => parseInt(octet).toString(2).padStart(8, "0"))
      .join("");
  }

  function v4BinaryToIP(binary) {
    return binary
      .match(/.{8}/g)
      .map((bin) => parseInt(bin, 2))
      .join(".");
  }

  function v4IncrementIP(ip, increment) {
    const parts = ip.split(".").map(Number);
    let total = parts.reduce((acc, octet) => (acc << 8) + octet, 0);
    total += increment;
    return [
      total >>> 24,
      (total >>> 16) & 255,
      (total >>> 8) & 255,
      total & 255,
    ].join(".");
  }

  // reset form & hide results
  function v4ClearFields() {
    $(
      "#v4NumHosts, #v4HostRange, #v4BroadcastAddress, #v4WildcardMask, #v4CidrNotation"
    ).val("");
    $("#v4SubnetDetails").empty();
    $("#v4displayResults").hide();
  }
});
