import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Custom404() {
    const [countdown, setCountdown] = useState(5);
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);
        
        if (countdown === 0) {
            router.push('/');
          }

        // Pulisci il timer quando il componente viene smontato
        return () => clearTimeout(timer);
      }, [countdown]);

    return (
        <div className="h-full flex flex-col justify-between bg-[url('https://blog.cgify.com/wp-content/uploads/2020/02/404_page_design_space_by_pequeno_capitan-1260x479.png')] bg-cover bg-center bg-no-repeat" style={{height: "calc(100vh - 180px)", textAlign: "center"}}>
            <div className="flex-grow flex m-12">
                <p className="text-white text-6xl font-bold">
                    <span >{countdown}</span>
                </p>
            </div>
            <div className="flex-grow flex flex-col justify-center items-center absolute inset-0 " >
                <p className="text-white text-9xl font-bold mb-6">404</p>
                <p className="text-white text-6xl font-bold">Page not found.</p>
            </div>
        </div>
    );
}