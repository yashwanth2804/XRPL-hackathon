//import { minter } from "./account";
const { minter } = require("./account");
// const client = require("./client");

//import { client } from "./client";
// import xrpl from "xrpl";
const xrpl = require("xrpl");
const { XummSdk } = require("xumm-sdk");
const axios = require("axios");
const request = require("request");

client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");

async function reserveTickets(ticketCount) {
  const account_info = await client.request({
    command: "account_info",
    account: minter.address,
  });
  let current_sequence = account_info.result.account_data.Sequence;

  const ticketTransaction = await client.autofill({
    TransactionType: "TicketCreate",
    Account: minter.address,
    TicketCount: ticketCount,
    Sequence: current_sequence,
  });

  //---------------------------------------------------- Sign the transaction.
  const signedTransaction = minter.sign(ticketTransaction);
  const tx = await client.submitAndWait(signedTransaction.tx_blob);
  console.log(tx);
}
exports.bulkmint = async (hotelObj) => {
  console.log("@@ starting xrpl", minter);
  await client.connect();

  //reserve Tickets
  await reserveTickets(hotelObj.length);
  console.log("Reserving " + hotelObj.length + " ticket");

  //get reserve tickets
  let reserveTicketsResponse = await client.request({
    command: "account_objects",
    account: minter.address,
    type: "ticket",
  });

  const Tickets = reserveTicketsResponse.result.account_objects.map(
    (el) => el.TicketSequence
  );

  console.log(Tickets);
  // await selfMinting(Tickets);
  const mintedNFTsLedgerIndex = await mintOnbehalf(Tickets, hotelObj);
  console.log("********************mintedNFTsLedgerIndex********************");
  console.log(mintedNFTsLedgerIndex);

  return mintedNFTsLedgerIndex;
};

exports.authorizeNFTAcceptOffer = async (senderXrpAddr, _offerId) => {
  console.log(
    "@@ starting xrpl and Making Authorized nft accept offer",
    minter.address,
    " Sender addr",
    senderXrpAddr
  );
  await client.connect();

  try {
    const Sdk = new XummSdk(
      "161dc98a-9abb-4688-90e6-60a3330edba2",
      "27fd6076-ee1e-41cf-b25b-3cdce1a1ff47"
    );
    const transactionBlob = {
      TransactionType: "NFTokenAcceptOffer",
      Account: senderXrpAddr,
      NFTokenSellOffer: _offerId,
    };
    const payload = await Sdk.payload.create(transactionBlob, true);
    console.log("PAYLOAD", payload);
    return payload;
  } catch (error) {
    console.log(error);
  }
};

exports.sendXRP = async (amt, owner) => {
  await client.connect();
  console.log("SENDING XRP AMT ", amt, " == ", owner);
  const prepared = await client.autofill({
    TransactionType: "Payment",
    Account: minter.address,
    Amount: xrpl.xrpToDrops(amt),
    Destination: owner,
  });
  const tx_signed = minter.sign(prepared);
  const tx = await client.submitAndWait(tx_signed.tx_blob);
  console.log("==>tx", tx);
  return 1;
};

exports.authorizeMinter = async (senderXrpAddr) => {
  console.log(
    "@@ starting xrpl and Making Authorized minter",
    minter.address,
    " Sender addr",
    senderXrpAddr
  );
  await client.connect();

  try {
    const Sdk = new XummSdk(
      "161dc98a-9abb-4688-90e6-60a3330edba2",
      "27fd6076-ee1e-41cf-b25b-3cdce1a1ff47"
    );

    const setAuthoziedTX = {
      TransactionType: "AccountSet",
      Account: senderXrpAddr,
      NFTokenMinter: minter.address,
      SetFlag: xrpl.AccountSetAsfFlags.asfAuthorizedNFTokenMinter,
    };
    const payload = await Sdk.payload.create(setAuthoziedTX, true);
    console.log("PAYLOAD", payload);
    return payload;
  } catch (error) {
    console.log(error);
  }
};

async function mintOnbehalf(Tickets, hotelObj) {
  const ledgerHashandNftoken = [];
  for (let i = 0; i < hotelObj.length; i++) {
    const transactionBlob = {
      TransactionType: "NFTokenMint",
      Account: minter.address,
      Issuer: hotelObj[i].ownerxrpaddr,
      TicketSequence: Tickets[i],
      Sequence: 0,
      Flags: 1,
      NFTokenTaxon: parseInt(hotelObj[i].hoteltaxon),
    };

    const tx = await client.submit(transactionBlob, { wallet: minter });
    //wait for 5sec
    await new Promise((resolve) => setTimeout(resolve, 5000));

    //const current_LedgerIndex = tx.result.tx_json.ledger_index;
    const LedgerHash = tx.result.tx_json.hash;
    console.log("*********Ledger hash**********");
    console.log(LedgerHash);
    console.log("******************");

    const NFTID = await getNftIdfromHash(LedgerHash);
    if (NFTID.length == 0) return;
    console.log("*********NFTID**********");
    console.log(NFTID);
    console.log("******************");
    const { sellOfferId, sellOfferHash } = await createSellOffer(
      NFTID,
      hotelObj[i].price
    );
    const obj = { NFTID, LedgerHash, sellOfferId, sellOfferHash };
    ledgerHashandNftoken.push(obj);
    // console.log("() ===>", ledgerHashandNftoken);

    //ledgerHashandNftoken.push(tx.result.tx_json.ledger_index);
  }
  //console.log("********* ledgerHashandNftoken", ledgerHashandNftoken);
  return ledgerHashandNftoken;
}

async function createSellOffer(NFTokinId, price) {
  console.log("## price", price);
  let transactionBlob = {
    TransactionType: "NFTokenCreateOffer",
    Account: minter.address,
    NFTokenID: NFTokinId,
    Amount: xrpl.xrpToDrops(price),
    Flags: 1,
  };

  const tx = await client.submitAndWait(transactionBlob, { wallet: minter });
  //hash
  const sellOfferHash = tx.result.hash;

  const affNodes = tx.result.meta.AffectedNodes;
  console.log("@@ createSellOffer ==>", tx.result.meta.AffectedNodes);
  const NFTTokenOfferObject = affNodes.find((e) => {
    if (
      e.CreatedNode !== undefined &&
      e.CreatedNode.LedgerEntryType == "NFTokenOffer"
    ) {
      return e;
    }
  });
  console.log(
    "@@ NFTTokenOfferObject ===>",
    NFTTokenOfferObject.CreatedNode.LedgerIndex,
    "@@ offer has ==>",

    sellOfferHash
  );
  return {
    sellOfferId: NFTTokenOfferObject.CreatedNode.LedgerIndex,
    sellOfferHash: sellOfferHash,
  };
}

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
  console.log("Sleeping 5 sec");
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const resp = await axios(config);

  console.log("=====>", resp.data);
  try {
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
  } catch (e) {
    console.log(e);
  }
  return [];
};

/**
 * Create sell offer
 * {
  id: 27,
  result: {
    Account: 'rnXQ32cDEKTQkoZyEmsrtciSprw5Xpo7uR',
    Amount: '25000000',
    Fee: '12',
    Flags: 1,
    LastLedgerSequence: 33600054,
    NFTokenID: '00010000C11EA93002F19C865718882CF7203CFEF563A3B9661CD2E500000026',
    Sequence: 33589694,
    SigningPubKey: 'EDF8EC0E0119EFC213FE3650FA353E746756146E0B8FFA62E174D38477F9CEB747',
    TransactionType: 'NFTokenCreateOffer',
    TxnSignature: '9BB02ABDEA8340A7A43B6C828680CCCB3E2805D9E8E5FB8ED9E29834F851D00E3378C86480DEBC1212A942284684EDC36C4CCB3744F69E1CC02472A8548B2102',
    date: 724080450,
    hash: '714EB4CE7C58F59C0B0C14F12223869E3BE305FA277B3F2AD6DBDA25653279AC',
    inLedger: 33600036,
    ledger_index: 33600036,
    meta: {
      AffectedNodes: [Array],
      TransactionIndex: 0,
      TransactionResult: 'tesSUCCESS'
    },
    validated: true
  },
  type: 'response'
}
 */
