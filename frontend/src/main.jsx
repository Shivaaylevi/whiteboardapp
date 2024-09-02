
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "react-toastify/dist/ReactToastify.min.css"
import {BrowserRouter as Router} from "react-router-dom"

createRoot(document.getElementById('root')).render(

    <Router>
      <App/>
    </Router>

)
