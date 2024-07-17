import React from "react";

import { Button } from "@/components/ui/button";
import { Boxes } from "@/components/ui/background-boxes";
import { NavLink } from "react-router-dom";
import Input from "@/components/Coustom/Input";

export default function Login() {
  return (
    <div className="w-full lg:grid h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <Input
              label="Email"
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
            <Input
              label="Password"
              id="password"
              type="password"
              required
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
          <div className="grid gap-4 text-center text-sm">
            <a href="/forgot-password">Forgot your password?</a>
            <div>
              Don&apos;t have an account?{" "}
              <NavLink  to="/signup" className="underline">
              Sign up
              </NavLink>
              
            </div>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:flex lg:flex-col lg:justify-center lg:items-center relative overflow-hidden">
        <img
          src="src/assets/login.png"
          alt="img"
          className="h-96 w-96 object-cover z-10"
        />
        <div className="absolute inset-0 z-0">
          <Boxes className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}