"use client"
import React from "react";
import {Provider} from "react-redux";
import {userStore} from "@/lib/redux/store";

type Props = {
  children: React.ReactNode;
};

export default function ReduxProvider({ children }: Props) {
  return <Provider store={userStore}>{children}</Provider>
}