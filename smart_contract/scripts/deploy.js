const main = async () => {

  const PackPlayers = await hre.ethers.getContractFactory("packPlayers");
  const packPlayers = await PackPlayers.deploy('0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9', '0xa36085f69e2889c224210f603d836748e7dc0088', '0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4', '100000000000000000');

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