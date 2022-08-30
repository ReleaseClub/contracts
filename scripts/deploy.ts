import hre, { ethers } from "hardhat";

async function main() {

  const WAITING_UNTIL_DEPLOYMENT = 70000;    // in miliseconds
  const Club = await ethers.getContractFactory("ReleaseClub");
  const club = await Club.deploy();
  await club.deployed();

  console.log("ReleaseClub contract deployed to:", club.address);

  // Verify the contract
  const waitFor = (delay: number) =>
    new Promise((resolve) =>
      setTimeout(() => {
        hre.run("verify:verify", {
          address: club.address,
        });
      }, delay)
    );
  await waitFor(WAITING_UNTIL_DEPLOYMENT);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
