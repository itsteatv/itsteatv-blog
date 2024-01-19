import Navbar from "./ui/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserAuthForm from "./ui/UserAuthForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="signup" element={<UserAuthForm type="sign-up" />} />
          <Route path="signin" element={<UserAuthForm type="sign-in" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
