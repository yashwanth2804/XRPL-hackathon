var axios = require("axios");
var data = JSON.stringify({
  method: "tx",
  params: [
    {
      transaction:
        "C7F9E1A4387DA46C3529234907FE75F668B4B6442BEFE10D13C0782EC4E9BFDF",
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

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
