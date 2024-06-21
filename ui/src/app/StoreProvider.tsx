"use client";

import { store } from "@/lib/store"; // Ensure this is the correct path to your store
import { Provider } from "react-redux";
import React, { useRef } from "react";

type StoreProviderProps = {
  children: React.ReactNode;
};

const StoreProvider = ({ children }: StoreProviderProps) => {
  const storeRef = useRef(store); // Use the store object directly

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
