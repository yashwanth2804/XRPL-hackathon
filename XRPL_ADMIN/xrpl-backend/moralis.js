const Moralis = require("moralis").default;
//const { EvmChain } = require('@moralisweb3/common-evm-util');

const runApp = async () => {
  await Moralis.start({
    apiKey: "zhlj2oNn7nGx7S67wtH0OLALD19To9LYmDBDs9Kj1fKDlB4zM50AbhDZcGAlXl5q",
    // ...and any other configuration
  });

  const response = await Moralis.EvmApi.ipfs.uploadFolder({ abi: "s" });
};

runApp();
