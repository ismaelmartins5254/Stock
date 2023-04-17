import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import NavBar from "./components/layout/NavBar"
import Estoque from "./components/pages/Estoque"
import AddIten from "./components/pages/AddIten"
import Home from "./components/layout/Home"
import PageEdit from "./components/pages/PageEdit"
import AddSetor from "./components/pages/AddSetor.jsx"


function App() {


  return (
    <>
      <Router>
        <NavBar Title='Stock' />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/Estoque'>
            <Estoque />
          </Route>
          <Route path='/AddIten'>
            <AddIten />
          </Route>
          <Route path='/PageEdit'>
            <PageEdit />
          </Route>
          <Route path='/AddSetor'>
            <AddSetor />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App