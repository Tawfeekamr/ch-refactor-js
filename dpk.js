const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;
  // [Part 01] in Refactoring.md
  function getTrivialPartitionKey(event) {
    if (event?.partitionKey) {
      return event.partitionKey;
    }
    const data = event ? JSON.stringify(event) : "";
    const hash = data ? crypto.createHash("sha3-512").update(data).digest("hex") : undefined
    return hash;
  }

// [Part 02] in Refactoring.md
function deterministicPartitionKey(event) {

    let trivialPartitionKey = getTrivialPartitionKey(event);

    if (typeof trivialPartitionKey !== "string") {
        trivialPartitionKey = JSON.stringify(trivialPartitionKey);
    }

    if (trivialPartitionKey?.length > MAX_PARTITION_KEY_LENGTH) {
        trivialPartitionKey = crypto.createHash("sha3-512").update(trivialPartitionKey).digest("hex");
    }

    return trivialPartitionKey || TRIVIAL_PARTITION_KEY;
  }

module.exports = deterministicPartitionKey;