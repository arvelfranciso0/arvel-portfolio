import type { Metadata } from "next";
import LoginForm from "./login-form";

export const metadata: Metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <div className="max-w-sm mx-auto bg-card rounded-lg p-8">
      <div className="font-mono text-sm text-primary mb-3">{"// login"}</div>
      <h1 className="text-2xl font-bold tracking-tight mb-6">Welcome back</h1>
      <LoginForm />
    </div>
  );
}
