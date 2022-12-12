const IPFS = require("ipfs-http-client");

async function main() {
  // Create a new IPFS client
  const ipfs = IPFS("ipfs.infura.io", "5001", { protocol: "https" });

  // Create a JSON object to add to IPFS
  const json = {
    hello: "world",
  };

  // Add the JSON object to IPFS and get the resulting CID
  const cid = await ipfs.add(Buffer.from(JSON.stringify(json)));

  // Pin the JSON object by its CID
  await ipfs.pin.add(cid);
}

main();
