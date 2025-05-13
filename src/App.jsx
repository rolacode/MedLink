import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ResetPassword from "./pages/ResetPassword.jsx";


const App = () => {
  return (
    <div>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </div>
  );
};

export default App;