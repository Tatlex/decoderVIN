import React from "react";
import Main from "./Components/Main/Main";
import List from "./Components/List/List";
import DecoderVIN from "./Components/DecoderVIN/DecoderVIN";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Navbar from "./Components/Navbar/Navbar";


function App() {
    return (
        <BrowserRouter>
            <Navbar />
                <div>
                    <Routes>
                        <Route path='/' element={<Main/>}/>
                        <Route path='/' element={<Main/>}/>
                        <Route path='/decoderVIN' element={<DecoderVIN/>}/>
                        <Route path='/list' element={<List/>}/>
                    </Routes>
                </div>
        </BrowserRouter>
    );
}

export default App;
