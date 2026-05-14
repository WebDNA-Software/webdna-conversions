(function () {
  const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const LOWER = "abcdefghijklmnopqrstuvwxyz";
  const NUMBERS = "0123456789";
  const SYMBOLS = "!@#$%^&*()-_=+[]{}|;:,.<>?";
  const SIMILAR = /[iIl1oO0]/g;

  // Uniform random int in [0, max) using rejection sampling — no modulo bias.
  function secureRandomInt(max) {
    if (max <= 0 || max > 0x100000000) throw new RangeError("bad max");
    const maxValid = Math.floor(0x100000000 / max) * max;
    const buf = new Uint32Array(1);
    let v;
    do {
      crypto.getRandomValues(buf);
      v = buf[0];
    } while (v >= maxValid);
    return v % max;
  }

  function pick(str) {
    return str.charAt(secureRandomInt(str.length));
  }

  // Fisher–Yates shuffle on an array, using the secure RNG.
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = secureRandomInt(i + 1);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function generate() {
    const len = parseInt(document.getElementById("pwLen").value, 10);
    const sets = [];
    if (document.getElementById("useU").checked) sets.push(UPPER);
    if (document.getElementById("useL").checked) sets.push(LOWER);
    if (document.getElementById("useN").checked) sets.push(NUMBERS);
    if (document.getElementById("useS").checked) sets.push(SYMBOLS);

    if (document.getElementById("noSim").checked) {
      for (let i = 0; i < sets.length; i++)
        sets[i] = sets[i].replace(SIMILAR, "");
      // Drop any set that's now empty (shouldn't happen with the default sets,
      // but keeps the one-of-each guarantee honest if SIMILAR is ever expanded).
      for (let i = sets.length - 1; i >= 0; i--)
        if (sets[i].length === 0) sets.splice(i, 1);
    }

    if (sets.length === 0) {
      alert("Please select at least one character type.");
      return;
    }
    if (!Number.isFinite(len) || len < sets.length || len > 1024) {
      alert(
        "Length must be a number at least equal to the number of selected character types.",
      );
      return;
    }

    // Guarantee at least one char from each selected set, then fill the rest from the
    // combined pool, then shuffle so the guaranteed chars aren't always at the start.
    const pool = sets.join("");
    const chars = sets.map(pick);
    for (let i = chars.length; i < len; i++) chars.push(pick(pool));
    shuffle(chars);

    document.getElementById("pwOut").value = chars.join("");
    document.getElementById("copyMsg").textContent = "";
  }

  async function copy() {
    const out = document.getElementById("pwOut");
    if (!out.value) return;
    try {
      await navigator.clipboard.writeText(out.value);
      document.getElementById("copyMsg").textContent = "Copied!";
    } catch {
      out.select();
      document.execCommand("copy");
      document.getElementById("copyMsg").textContent = "Copied!";
    }
    setTimeout(() => {
      document.getElementById("copyMsg").textContent = "";
    }, 1500);
  }

  document.getElementById("genBtn").addEventListener("click", generate);
  document.getElementById("copyBtn").addEventListener("click", copy);

  // Generate one on load so the page isn't empty.
  generate();
})();
