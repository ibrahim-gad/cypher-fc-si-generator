import './App.css'
import "react-markdown-editor-lite/lib/index.css";
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {routes} from "./router/routes.tsx";
const router = createBrowserRouter(routes, { basename: import.meta.env.BASE_URL });

function App() {

    return (
        <>
            <RouterProvider router={router} />
            <ToastContainer />
        </>
    )
}

export default App
