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
import ChangePassword from "./components/Pages/DoctorPages/ChangePassword";
import RedirectPage from "./components/Pages/DoctorPages/RedirectPage";
import DoctorDashboard from "./components/Pages/DoctorPages/DoctorDashboard";
import DoctorNotification from "./components/Pages/DoctorPages/DoctorNotification";
import Notification from "./components/Pages/Notification";
import BookAppointmentPage from "./components/Pages/BookAppointmentPage";
import Appointments from "./components/Pages/Appointments";
import Panel from "./components/Pages/AdminPages/Panel";

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
          <Route path="/admin-dashboard" element={<Panel />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/redirect" element={<RedirectPage />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-notification" element={<DoctorNotification />} />
          <Route path="/notification" element={<Notification />} />
          <Route
            path="/bookappointment/:_id"
            element={<BookAppointmentPage />}
          />
          <Route path="/patient-appointment" element={<Appointments />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
