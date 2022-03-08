require("@nomiclabs/hardhat-waffle")

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/ibkgexS95zJWkYiFxIlNutkGP4xmILdr", //ETH-RINKEBY Alchemy API
      accounts: [
        "312b430c913add621ad38613721e98a534dfe30edec02ce7083862c8126f3ff7",
      ], // Dummy Wallet Private Key for test deployment purposes - Pls don't try to hack it, it has zero balance anyway... :)
    },
  },
}
