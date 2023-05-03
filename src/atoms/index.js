import { atom } from "recoil";

export const cartState = atom({
  key: "cartState",
  default: [],
});

export const cartOpenState = atom({
  key: "cartOpenState",
  default: false,
});

export const asideState = atom({
  key: "asideState",
  default: true, // Aside is initially closed
});

export const navState = atom({
  key: "navState",
  default: 0, // Dashboard is selected
});
