import React from 'react'

const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
    }
};

export const Navbar = () => {
    return (
        <header>
            <nav className="bg-white border-gray-200 px-4 py-7 lg:px-6  dark:bg-transparent">
                <div className="flex flex-wrap items-center justify-center mx-auto max-w-screen-xl">
                    <div className="hidden justify-center items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 lg:justify-center">
                            <li>
                                <button
                                    type="button"
                                    onClick={() => scrollToSection('projects')}
                                    className="block py-2 pr-4 pl-3 text-green-400 border-b border-gray-100 hover:bg-gray-100 lg:hover:bg-gray-100 lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-green-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    Projects
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={() => scrollToSection('timeline')}
                                    className="block py-2 pr-4 pl-3 text-yellow-400 border-b border-gray-100 hover:bg-gray-100 lg:hover:bg-gray-100 lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-yellow-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    Timeline
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={() => scrollToSection('about')}
                                    className="block py-2 pr-4 pl-3 text-rose-400 border-b border-gray-100 hover:bg-gray-100 lg:hover:bg-gray-100 lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-rose-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    About me
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={() => {
                                        scrollToSection('services');
                                        const event = new CustomEvent('triggerSocialAnimation');
                                        window.dispatchEvent(event);
                                    }}
                                    className="block py-2 pr-4 pl-3 text-cyan-400 border-b border-gray-100 hover:bg-gray-100 lg:hover:bg-gray-100 lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-cyan-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    Services
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}
