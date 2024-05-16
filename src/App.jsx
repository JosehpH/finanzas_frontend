import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import './App.css'
import {Provider} from "./auth/context/Provider.jsx";
import {AuthRouter} from "./routers/AuthRouter.jsx";

function App() {

  return (
    <>
        <Provider>
            <AuthRouter></AuthRouter>
        </Provider>
    </>
  )
}

export default App
