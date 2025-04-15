import { usePasswordUpdate } from '../hooks/useUser';
import '../assets/styles/App.css';

function PasswordUpdate() {
  const { password, confirmPw, setPassword, setConfirmPw, handleSubmit } = usePasswordUpdate();

  return (
    <>
      <div>
        <div>
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <span>Retype Password</span>
          <input
            type="password"
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
          />
        </div>
      </div>

      <div>
        <button onClick={handleSubmit}>Update Password</button>
      </div>
    </>
  );
}

export default PasswordUpdate;
