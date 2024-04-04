import { AppContext } from '@/ContextProvider';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

export default function Navbar() {
    const { isLogged, login } = useContext(AppContext)
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    const currentPath = router.pathname;

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

  return (
    <>
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

                        <button 
                            type="button" 
                            className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none " 
                            onClick={toggleMenu}
                        >
                            <svg 
                                className={`h-6 w-6 ${menuOpen ? 'hidden' : 'block'}`} 
                                fill="none" viewBox="0 0 24 24" 
                                strokeWidth="1.5" 
                                stroke="currentColor"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" 
                                />
                            </svg>

                            <svg 
                                className={`h-6 w-6 ${menuOpen ? 'block' : 'hidden'}`} 
                                fill="none" viewBox="0 0 24 24" 
                                strokeWidth="1.5" 
                                stroke="currentColor"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    d="M6 18L18 6M6 6l12 12" 
                                />
                            </svg>
                        </button>

                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <img 
                                className="h-8 w-auto" 
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/SpaceX-Logo-Xonly.svg/1280px-SpaceX-Logo-Xonly.svg.png" 
                                alt="Your Company"
                            ></img>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <Link 
                                    href="/" 
                                    className={`${currentPath === '/' ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"}`} 
                                >
                                    Home
                                </Link>
                                <Link 
                                    href="/launches" 
                                    className={`${currentPath === '/launches' ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"}`} 
                                >
                                    Launches
                                </Link>
                                <Link 
                                    href="/contacts" 
                                    className={`${currentPath === '/contcts' ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"}`} 
                                >
                                    Contacts
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="relative mr-2.5">
                            <div>
                                <button 
                                    type="button" 
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" 
                                    id="user-menu-button" 
                                    onClick={login}
                                >
                                    <span suppressHydrationWarning>{isLogged ? 'Logout' : 'Login'}</span>
                                    <span className="sr-only">Open user menu</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`sm:hidden ${menuOpen ? '' : 'hidden'}`} id="mobile-menu">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    <Link 
                        href="/" 
                        className={`${currentPath === '/' ? "bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"}`} 
                    >
                        Home
                    </Link>
                    <Link 
                        href="/launches" 
                        className={`${currentPath === '/launches' ? "bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"}`} 
                    >
                        Launches
                    </Link>
                    <Link 
                        href="/contacts" 
                        className={`${currentPath === '/contcts' ? "bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"}`} 
                    >
                        Contacts
                     </Link>
                </div>
            </div>
        </nav>
    </>
    )
}