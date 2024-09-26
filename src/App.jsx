import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Pages/Home";
import AllDoctors from "./components/Pages/AllDoctors";
import About from "./components/Pages/About";
import Contact from "./components/Pages/Contact";

function App() {
  return (
    <main className="flex-grow ">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/doctors" element={<AllDoctors />} />
          <Route path = "/about" element={<About/>}/>
          <Route path = "/contact" element={<Contact/>}/>
        </Route>
      </Routes>
    </main>
  );
}

export default App;
