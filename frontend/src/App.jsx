/*

App.jsx
Author: ODIN Thomas

*/
import { BrowserRouter } from "react-router-dom";  
import AppRouter from "@/router/Routes";
import { UserProvider } from "@/hooks/UserHooks"

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <AppRouter />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;