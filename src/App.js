import React from "react";
import List from "./Components/List/List";
import Variable from "./Components/Variable/Variable";
import DecoderVIN from "./Components/DecoderVIN/DecoderVIN";
import {HashRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import ErrorPage from "./Components/ErrorPage/ErrorPage";


function App() {
    return (
        <HashRouter>
            <Navbar/>
            <div>
                <Routes>
                    <Route path='/decoderVIN/' element={<DecoderVIN/>}/>
                    <Route path='/decoderVIN/variables' element={<List/>}/>
                    <Route path='/decoderVIN/variables/:id' element={<Variable/>}/>
                    <Route path='*' element={<ErrorPage/>}/>
                </Routes>
            </div>
        </HashRouter>
    );
}

export default App;
