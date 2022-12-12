async function selfMinting(Tickets, issuer, taxon) {
  for (let i = 0; i < Tickets.length; i++) {
    const transactionBlob = {
      TransactionType: "NFTokenMint",
      Account: minter.address,
      Issuer: issuer,

      URI: xrpl.convertStringToHex(
        "https://ipfs.io/ipfs/QmYgbF77GTTDV8ux6c4ghrdFxkARzh3QLMmhjaLfFbH2iW"
      ),

      TicketSequence: Tickets[i],
      Sequence: 0,
      Flags: 1,
      TransferFee: 50000,
      NFTokenTaxon: parseInt(taxon),
    };
    console.log("$$$ \n", transactionBlob);
    const tx = await client.submit(transactionBlob, { wallet: minter });
    console.log("&&& ==> \n", tx);
  }
}
