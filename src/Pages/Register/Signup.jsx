import React, { useState } from "react";
import Input from "@/components/Coustom/Input";
import { Button } from "@/components/ui/button";
import { Boxes } from "@/components/ui/background-boxes";
import { NavLink } from "react-router-dom";

export default function Signup({ onSubmit }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);

    // if (validateForm()) {
    //   onComplete(formData);
    // }
  };

  return (
    <div className="w-full lg:grid h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <form onSubmit={handleSubmit} className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Create an Account</h1>
            <p className="text-balance text-muted-foreground">
              Enter your details below to create your account
            </p>
          </div>
          <div className="grid gap-4">
            <Input
              label="Full Name"
              id="fullName"
              type="text"
              placeholder="John Doe"
              required
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
            />
            <Input
              label="Email"
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            <Input
              label="Password"
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />
            <Input
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </div>
          <div className="grid gap-4 text-center text-sm">
            <div>
              Already have an account?{" "}
              <NavLink to="/login" className="underline">
                Log in
              </NavLink>
            </div>
          </div>
        </form>
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
