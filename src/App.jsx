import React from "react";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Translator from "./Translator.jsx";

function App() {
  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center">
      <Translator />
    </div>
  );
}

export default App;
