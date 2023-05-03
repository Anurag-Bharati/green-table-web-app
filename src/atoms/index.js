import { atom } from "recoil";

const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const cartState = atom({
  key: "cartState",
  default: [],
  effects: [localStorageEffect("cart")],
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
