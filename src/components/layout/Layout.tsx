import { Outlet } from 'react-router-dom';
import {FaMoon, FaSun} from "react-icons/fa";
import {useEffect, useState} from "react";

const Layout = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme ? JSON.parse(savedTheme) : false;
    });

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkTheme);
        localStorage.setItem('theme', JSON.stringify(isDarkTheme));
    }, [isDarkTheme]);

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };
    return (
        <div>
            {/*<Navbar />*/}
            <main>
                <button
                    onClick={toggleTheme}
                    className="absolute top-0 right-0 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
                >
                    {isDarkTheme ? <FaSun/> : <FaMoon/>}
                </button>
                <Outlet/>
            </main>
        </div>
    );
};

export default Layout;