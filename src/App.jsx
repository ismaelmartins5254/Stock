import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import NavBar from "./components/layout/NavBar"
import Estoque from "./components/pages/Estoque"
import AddIten from "./components/pages/AddIten"
import Home from "./components/layout/Home"
import PageEdit from "./components/pages/PageEdit"
import AddSetor from "./components/pages/AddSetor.jsx"
import Footer from "./components/layout/Footer"


function App() {


  return (

    <Router basename="/Stock">
      <NavBar Title='Stock' />
      <Routes>
        <Route exact path='/' element={<Home />} />

        <Route path='/Estoque' element={<Estoque />} />

        <Route path='/AddIten' element={<AddIten />} />

        <Route path='/PageEdit' element={<PageEdit />} />

        <Route path='/AddSetor' element={<AddSetor />} />
        <Route  />
      </Routes>
      <Footer/>
    </Router>

  )
}

export default App