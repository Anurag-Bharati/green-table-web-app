"use client";

import { atom } from "recoil";

const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = typeof window !== "undefined" ? localStorage.getItem(key) : null;
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? typeof window !== "undefined"
          ? localStorage.removeItem(key)
          : null
        : typeof window !== "undefined"
        ? localStorage.setItem(key, JSON.stringify(newValue))
        : null;
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

export const tableState = atom({
  key: "tableState",
  default: [
    { id: 1, status: "available", name: "1A" },
    { id: 2, status: "occupied", name: "1B" },
    { id: 3, status: "available", name: "1C" },
    { id: 4, status: "available", name: "1D" },
    { id: 5, status: "available", name: "1E" },
    { id: 6, status: "available", name: "2A" },
    { id: 7, status: "available", name: "2B" },
    { id: 8, status: "available", name: "2C" },
    { id: 9, status: "available", name: "2D" },
    { id: 10, status: "occupied", name: "2E" },
  ],
});

export const predictionServiceState = atom({
  key: "predictionServiceState",
  default: { state: "loading", health: null },
});

export const predictionDataState = atom({
  key: "predictionDataState",
  default: [],
});
