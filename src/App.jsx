import {Routes, Route} from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./components/Pages/Home"
import AllDoctors from "./components/Pages/AllDoctors"

function App() {
  

  return (
<main className="flex-grow">
    
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="/doctors" element={<AllDoctors/>}/>
        </Route>
      </Routes>
    </main>
  )
}

export default App
