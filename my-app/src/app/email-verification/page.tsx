// filepath src/app/email-verification/page.tsx
"use client";

import ButtonComp from "@/components/button-comp";
import {
  serviceSendEmailVerification,
  serviceSignOut,
} from "@/firebase/2-firebase-auth";
import React from "react";

export default function EmailVarificationFunc() {
  return (
    <>
      <h1>Verify Email</h1>{" "}
      <ButtonComp
        btnLabel={"Sign Out"}
        btnHandler={() => {
          serviceSignOut();
        }}
      />
      <br />
      <br />
      <ButtonComp
        btnLabel={"Send Email"}
        btnHandler={() => {
          serviceSendEmailVerification();
        }}
      />
    </>
  );
}