import React, {useEffect} from 'react';
import Navbar from "./components/navbar/Navbar";
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Home from "./components/home/Home";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Tree from "./components/tree/Tree";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Tree/>
    },
    {
        path: "/about",
        element: <Home/>
    }
])

function App() {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <div className="px-6 lg:px-20 xl:px-36 bg-dark-500">
            <Navbar />
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;