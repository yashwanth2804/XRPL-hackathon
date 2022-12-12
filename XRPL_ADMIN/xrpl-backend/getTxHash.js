var request = require("request");
var options = {
  method: "GET",
  url: "https://s.altnet.rippletest.net:51234/",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    method: "tx",
    params: [
      {
        transaction:
          "C7F9E1A4387DA46C3529234907FE75F668B4B6442BEFE10D13C0782EC4E9BFDF",
        binary: false,
      },
    ],
  }),
};
request(options, function (error, response) {
  if (error) throw new Error(error);
});
