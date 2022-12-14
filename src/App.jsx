import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css' 
import Menu from './componentes/Menu'
import Home from './componentes/Home'
import Tarefas from './componentes/tarefas/Tarefas'
import {BrowserRouter as Router, Routes , Route } from 'react-router-dom'
import Login from './componentes/login/Login'

function App() {
  return (
    <Router>
        <Menu/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/tarefas" element={<Tarefas/>}/> 
          <Route exact path="/login" element={<Login/>}/> 
        </Routes>
    </Router>
  );
}

export default App;