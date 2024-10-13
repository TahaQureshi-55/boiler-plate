// filePath src/app/page.tsx
"use client";

import ButtonComp from "@/components/button-comp";
import { serviceSignInUser } from "@/firebase/2-firebase-auth";
import Link from "next/link";
import React from "react";
import { useState } from "react";

export default function LoginUserFunc() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <h1>Sign In Here</h1>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <br />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />
      <ButtonComp
        btnLabel={"Sign in"}
        btnHandler={() => {
          serviceSignInUser({ email, password });
        }}
      />
      <p>
        <Link href={"sign-up"}>Sign up</Link> If you don't have an account.
      </p>
    </>
  );
}