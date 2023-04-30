import { atom } from "recoil";

export const asideState = atom({
  key: "asideState",
  default: true, // Aside is initially closed
});

export const navState = atom({
  key: "navState",
  default: 0, // Dashboard is selected
});
