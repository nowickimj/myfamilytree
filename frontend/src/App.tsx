import React, {useEffect} from 'react';
import MainNavbar from "./components/navbar/MainNavbar";
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import About from "./components/home/Home";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Tree from "./components/tree/Tree";
import {PersistQueryClientProvider} from "@tanstack/react-query-persist-client";
import {QueryClient} from "@tanstack/react-query";
import {createSyncStoragePersister} from "@tanstack/query-sync-storage-persister";
import 'bootstrap/dist/css/bootstrap.min.css';
import {LoginPage} from "./components/login/LoginPage";
import {getAuth} from "./components/auth";

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

    const token = getAuth()

    return <>
        <PersistQueryClientProvider client={queryClient} persistOptions={{persister}}>
            {
                !token ? (<LoginPage/>) : (
                    <div className="px-6 lg:px-20 xl:px-36 bg-dark-500">
                        <MainNavbar/>
                        <RouterProvider router={router}/>
                    </div>)
            }
        </PersistQueryClientProvider>
    </>
}

export default App;