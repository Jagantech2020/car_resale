import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import React from "react";
import Service from "./pages/Service";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Layout from "./Layout";

const routerList= [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                index: true,
                element: <Home />
            },
            {
                path: "/home",
                element: <Home />
            },
            {
                path: "/service",
                element: <Service />
            },
            {
                path: "/gallery",
                element: <Gallery />
            },
            {
                path: "/contact",
                element: <Contact />
            }
        ]
    },
    
]
export const router = createBrowserRouter([...routerList], { basename: "/car_resale",})
