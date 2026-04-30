import { create } from "zustand";

export type StoreState = Record<string, never>;

export type StoreActions = Record<string, never>;

export type Store = StoreState & StoreActions;

export const useStore = create<Store>(() => ({}));
