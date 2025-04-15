import { useState } from 'react';
import { useLogin } from '../hooks/useUser';
import '../assets/styles/App.css';
import { Input, Button } from "@heroui/react";

export default function LoginPage() {
  const { handleLogin, loading, error } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mb-5">
          <Input
            label="Email"
            size='lg'
            variant='underlined'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mb-5">
          <Input
            label="Password"
            size='lg'
            variant='underlined'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <Button color="success" size='lg' variant="ghost" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Submit"}
          </Button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
