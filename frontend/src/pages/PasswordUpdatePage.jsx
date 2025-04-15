import { usePasswordUpdate } from '../hooks/useUser';
import '../assets/styles/App.css';
import { Input, Button } from "@heroui/react";

function PasswordUpdate() {
  const { password, confirmPw, setPassword, setConfirmPw, handleSubmit } = usePasswordUpdate();

  return (
    <>
      <div>
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

        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mb-5">
          <Input
            label="Retype Password"
            size='lg'
            variant='underlined'
            type="password"
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
          />
        </div>
      </div>

      <div>
        <Button color="success" size='lg' variant="ghost" onPress={handleSubmit}>Update Password</Button>
      </div>
    </>
  );
}

export default PasswordUpdate;
