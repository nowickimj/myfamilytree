import React, {useEffect} from 'react';
import Navbar from "./components/navbar/Navbar";
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import About from "./components/home/Home";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Tree from "./components/tree/Tree";
import {PersistQueryClientProvider} from "@tanstack/react-query-persist-client";
import {QueryClient} from "@tanstack/react-query";
import {createSyncStoragePersister} from "@tanstack/query-sync-storage-persister";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Tree/>
    },
    {
        path: "/about",
        element: <About/>
    }
])

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: 1000 * 60 * 60
        },
    },
});
const persister = createSyncStoragePersister({
    storage: window.localStorage,
});

function App() {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <PersistQueryClientProvider client={queryClient} persistOptions={{persister}}>
        <div className="px-6 lg:px-20 xl:px-36 bg-dark-500">
            <Navbar />
            <RouterProvider router={router}/>
        </div>
        </PersistQueryClientProvider>
    );
}

export default App;