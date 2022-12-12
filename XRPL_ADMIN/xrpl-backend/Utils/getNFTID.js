const axios = require("axios");

const getNftIdfromHash = async (hash) => {
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

  const affNodes = resp.data.result.meta.AffectedNodes;

  const NFTTokenObject = affNodes.find((e) => {
    if (
      e.ModifiedNode !== undefined &&
      e.ModifiedNode.LedgerEntryType == "NFTokenPage"
    ) {
      return e.ModifiedNode;
    }
  });

  const finalFeilds = NFTTokenObject.ModifiedNode.FinalFields.NFTokens;
  const previousFields = NFTTokenObject.ModifiedNode.PreviousFields.NFTokens;

  const previousFieldsArr = previousFields.map((e) => e.NFToken.NFTokenID);
  const NFTID = finalFeilds.filter(
    (e) => !previousFieldsArr.includes(e.NFToken.NFTokenID)
  );
  const nftID = Object.assign({}, ...NFTID).NFToken.NFTokenID;
  return nftID;
};
getNftIdfromHash();
