import React from "react";
import List from "./Components/List/List";
import Variable from "./Components/Variable/Variable";
import DecoderVIN from "./Components/DecoderVIN/DecoderVIN";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import ErrorPage from "./Components/ErrorPage/ErrorPage";


function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <div>
                <Routes>
                    <Route path='/' element={<DecoderVIN/>}/>
                    <Route path='/variables' element={<List/>}/>
                    <Route path='/variables/:id' element={<Variable/>}/>
                    <Route path='*' element={<ErrorPage/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
