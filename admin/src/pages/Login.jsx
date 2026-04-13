import { useState } from "react";

export default function Login({ onAuthed }) {
  const [email, setEmail] = useState("admin@site.com");
  const [password, setPassword] = useState("admin123");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      );
      if (!res.ok) throw new Error("Login failed");
      onAuthed?.();
      location.href = "/admin";
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <form onSubmit={submit} className="card w-full max-w-sm space-y-3 p-6">
        <h1 className="text-xl font-bold">Admin Login</h1>
        {err && <p className="text-sm text-red-600">{err}</p>}
        <input
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn w-full">Login</button>
      </form>
    </div>
  );
}
