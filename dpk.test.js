const deterministicPartitionKey = require('./dpk');
// [Part 03] in Refactoring.md

describe('deterministicPartitionKey', () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it('returns the trivial partition key from the event when provided', () => {
    const event = { partitionKey: 'trivialPartitionKey' };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe('trivialPartitionKey');
  });

  it('truncates the trivial partition key when it exceeds the max length', () => {
    const event = { id: 1, name: 'Test' };
    const longKey = 't'.repeat(256);
    const trivialKey = deterministicPartitionKey({ ...event, partitionKey: longKey });
    expect(trivialKey.length).toBe(256);
  });
});
