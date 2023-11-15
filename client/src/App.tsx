import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import RequestRent from "./pages/RequestRent";
import Setting from "./pages/Setting";
import Supervisor from "./pages/Supervisor";
import BookingList from "./pages/BookingList";
import Login from "./pages/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/request-rent" element={<RequestRent />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/supervisor" element={<Supervisor />} />
          <Route path="/booking-list" element={<BookingList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
