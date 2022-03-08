require("@nomiclabs/hardhat-waffle")

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: "REDACTED", //ETH-RINKEBY Alchemy API
      accounts: ["REDACTED"], // Wallet Private Key
    },
  },
}
