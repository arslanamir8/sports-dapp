const main = async () => {

  const PackPlayers = await hre.ethers.getContractFactory("packPlayers");
  const packPlayers = await PackPlayers.deploy();

  await packPlayers.deployed();

  console.log("PackPlayers deployed to:", packPlayers.address);
}

const runMain = async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

runMain()