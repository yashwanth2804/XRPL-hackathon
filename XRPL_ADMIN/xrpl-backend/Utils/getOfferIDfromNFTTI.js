const resp = {
  Account: "rnXQ32cDEKTQkoZyEmsrtciSprw5Xpo7uR",
  Amount: "25000000",
  Fee: "12",
  Flags: 1,
  LastLedgerSequence: 33599634,
  NFTokenID: "00010000C11EA93002F19C865718882CF7203CFEF563A3B94F36E3E400000025",
  Sequence: 33589691,
  SigningPubKey:
    "EDF8EC0E0119EFC213FE3650FA353E746756146E0B8FFA62E174D38477F9CEB747",
  TransactionType: "NFTokenCreateOffer",
  TxnSignature:
    "0FF15AF756C159B1F96C8C8313B837A8810A0C68E3CAB67266DDD88AF38AA8F57F4C5D1DC19C8EA39884C6BDB5F892E25A83FF71445BB903C314936AECF22B0A",
  date: 724079173,
  hash: "8B799FBFC75C951076C8107C21DFE3860F71585997C0AF7BB8E25011327E9FFE",
  inLedger: 33599616,
  ledger_index: 33599616,
  meta: {
    AffectedNodes: [
      {
        ModifiedNode: {
          FinalFields: {
            Flags: 0,
            Owner: "rnXQ32cDEKTQkoZyEmsrtciSprw5Xpo7uR",
            RootIndex:
              "442EC0285880E9405DBB7EF7ED0F5FC1DD57BDA49C38566538A7F201B74D4DE8",
          },
          LedgerEntryType: "DirectoryNode",
          LedgerIndex:
            "442EC0285880E9405DBB7EF7ED0F5FC1DD57BDA49C38566538A7F201B74D4DE8",
        },
      },
      {
        ModifiedNode: {
          FinalFields: {
            Account: "rnXQ32cDEKTQkoZyEmsrtciSprw5Xpo7uR",
            Balance: "999999220",
            Flags: 0,
            OwnerCount: 4,
            Sequence: 33589692,
            TicketCount: 1,
          },
          LedgerEntryType: "AccountRoot",
          LedgerIndex:
            "7B47A447F7AA3ED45820FDF3E14C9F2937B4EC08E47BF6DD4D3F75138009CE94",
          PreviousFields: {
            Balance: "999999232",
            OwnerCount: 3,
            Sequence: 33589691,
          },
          PreviousTxnID:
            "DD2CB0B0F1B3EC9196AAB5B151936A26FE39F4F0573E97932C9649D759F0C6D8",
          PreviousTxnLgrSeq: 33599614,
        },
      },
      {
        CreatedNode: {
          LedgerEntryType: "NFTokenOffer",
          LedgerIndex:
            "9BDC695529EAAB6400E1570F11D5ED9DD47E3929947505DCE185D7DEF64C1AA3",
          NewFields: {
            Amount: "25000000",
            Flags: 1,
            NFTokenID:
              "00010000C11EA93002F19C865718882CF7203CFEF563A3B94F36E3E400000025",
            Owner: "rnXQ32cDEKTQkoZyEmsrtciSprw5Xpo7uR",
          },
        },
      },
      {
        CreatedNode: {
          LedgerEntryType: "DirectoryNode",
          LedgerIndex:
            "C846C14368888F79557D2B2D3C5A8569062776E67F5A350297EF4E23C52D7A55",
          NewFields: {
            Flags: 2,
            NFTokenID:
              "00010000C11EA93002F19C865718882CF7203CFEF563A3B94F36E3E400000025",
            RootIndex:
              "C846C14368888F79557D2B2D3C5A8569062776E67F5A350297EF4E23C52D7A55",
          },
        },
      },
    ],
    TransactionIndex: 0,
    TransactionResult: "tesSUCCESS",
  },
  validated: true,
};

const affNodes = resp.meta.AffectedNodes;
console.log("");

const NFTTokenOfferObject = affNodes.find((e) => {
  if (
    e.CreatedNode !== undefined &&
    e.CreatedNode.LedgerEntryType == "NFTokenOffer"
  ) {
    return e;
  }
});

console.log(NFTTokenOfferObject.CreatedNode.LedgerIndex);
