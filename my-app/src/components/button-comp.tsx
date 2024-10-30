// src/components/button-comp.tsx
"use client";

import React from "react";

type ButtonCompType = { btnLabel: string; btnHandler: () => void };
export default function ButtonComp({ btnLabel, btnHandler }: ButtonCompType) {
  return (
    <>
      <button
        onClick={btnHandler}
        style={{
          backgroundColor: "#4267B2",
          color: "white",
          border: "none",
          borderRadius: "15px",
          padding: "5px 12px",
          fontSize: "16px",
          cursor: "pointer",
          transition: "background-color 0.9s ease",
        }}
      >
        {btnLabel}
      </button>
    </>
  );
}