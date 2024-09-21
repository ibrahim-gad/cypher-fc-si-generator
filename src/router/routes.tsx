import { RouteObject } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Pipeline from "../pages/pipeline.tsx";
import Settings from "../pages/settings.tsx";
import Home from "../pages/home.tsx";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <Home /> },
            { path: 'pipeline', element: <Pipeline /> },
            { path: 'settings', element: <Settings /> },
        ],
    },
];