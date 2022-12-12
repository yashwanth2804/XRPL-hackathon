const getLedgerIndexfromHash = async (hash) => {
  var data = JSON.stringify({
    method: "tx",
    params: [
      {
        transaction: hash,
        binary: false,
      },
    ],
  });

  var config = {
    method: "get",
    url: "https://s.altnet.rippletest.net:51234/",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  const resp = await axios(config);
  return resp.data.result.ledger_index;
};

const getNftIdfromLedgerIndex = async (ledgerIndex) => {
  var data = JSON.stringify({
    method: "account_nfts",
    params: [
      {
        account: process.env.xrpaddr,
        ledger_index: ledgerIndex,
      },
    ],
  });

  var config = {
    method: "post",
    url: "https://s.altnet.rippletest.net:51234/",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  const resp = await axios(config);

  const re =
    resp.data.result.account_nfts[resp.data.result.account_nfts.length - 1];
  const NFTokenID = re.NFTokenID;
  return NFTokenID;
};
