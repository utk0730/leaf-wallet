import React from "react";
import logoImg from "../assets/images/leaf.png";
import ConnectWalletButton from "../components/ConnectWalletBtn";
function NavBar() {
  return (
    <div className="flex justify-between py-6 ">
      <div className="text-2xl flex items-center font-bold pl-10 ">
        <img className="h-10 w-10 inline" src={logoImg} />
        <span className="my-auto text-white">Leaf.eth</span>
      </div>
      <div className="pr-10">
        <ConnectWalletButton />
      </div>
    </div>
  );
}

export default NavBar;
