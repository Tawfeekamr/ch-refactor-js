const crypto = require("crypto");


  // [Part 01] in Refactoring.md
  function getTrivialPartitionKey(event = undefined) {
    if (event?.partitionKey) {
      return event.partitionKey;
    }
    const data = JSON.stringify(event || {});
    return crypto.createHash("sha3-512").update(data).digest("hex");
  }

// [Part 02] in Refactoring.md
function deterministicPartitionKey(event) {
    const TRIVIAL_PARTITION_KEY = "0";
    const MAX_PARTITION_KEY_LENGTH = 256;

    let trivialPartitionKey = getTrivialPartitionKey(event);

    if (typeof trivialPartitionKey !== "string") {
        trivialPartitionKey = JSON.stringify(trivialPartitionKey);
    }

    if (trivialPartitionKey.length > MAX_PARTITION_KEY_LENGTH) {
        trivialPartitionKey = crypto.createHash("sha3-512").update(trivialPartitionKey).digest("hex");
    }

    return trivialPartitionKey || TRIVIAL_PARTITION_KEY;
  }

module.exports = deterministicPartitionKey;