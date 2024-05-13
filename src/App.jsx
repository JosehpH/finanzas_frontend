import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import './App.css'
import {SignIn} from "./Auth/sign-in/SignIn.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <SignIn></SignIn>
    </>
  )
}

export default App
