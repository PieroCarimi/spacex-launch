import Link from "next/link";

export default function Footer() {
    return(
        <>
            <footer className="bg-gray-800 shadow bottom-0 left-0 right-0">
                <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <Link href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/SpaceX-Logo-Xonly.svg/1280px-SpaceX-Logo-Xonly.svg.png" 
                                className="h-8" 
                                alt="Flowbite Logo" 
                            />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-300">SpaceX</span>
                        </Link>
                        <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
                            <li>
                                <Link href="/" className="hover:underline me-4 md:me-6">Home</Link>
                            </li>
                            <li>
                                <Link href="/launches" className="hover:underline me-4 md:me-6">Launches</Link>
                            </li>
                            <li>
                                <Link href="/contacts" className="hover:underline me-4 md:me-6">Contacts</Link>
                            </li>
                        </ul>
                    </div>
                    
                    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <Link href="/" className="hover:underline">SpaceX Launch™</Link>. All Rights Reserved.</span>
                </div>
            </footer>
        </>
    )
}