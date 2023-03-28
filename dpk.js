const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;
  // [Part 01] in Refactoring.md
  function getTrivialPartitionKey(event = undefined) {
    if (event?.partitionKey) {
      return event.partitionKey;
    }
    const data = JSON.stringify(event || {});
    return crypto.createHash("sha3-512").update(data).digest("hex");
  }

  if (candidate) {
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
};