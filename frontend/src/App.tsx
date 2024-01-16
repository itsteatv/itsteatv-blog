import Navbar from "./ui/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route
            path="signin"
            element={
              <h1 className="text-center mt-4 font-bold">sign in page</h1>
            }
          />
          <Route
            path="signup"
            element={
              <h1 className="text-center mt-4 font-bold">sign up page</h1>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
