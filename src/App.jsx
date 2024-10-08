import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Pages/Home";
import AllDoctors from "./components/Pages/AllDoctors";
import About from "./components/Pages/About";
import Contact from "./components/Pages/Contact";
import Login from "./components/Pages/Login";
import Register from "./components/Register";
import PatientDashboard from "./components/Pages/PatientDashboard";
import AddDoctor from "./components/Pages/AdminPages/AddDoctor";

function App() {
  return (
    <main className="flex-grow ">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/doctors" element={<AllDoctors />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/admin-create-doctor" element={<AddDoctor />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
