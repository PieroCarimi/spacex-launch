import CardContact from "@/components/CardContact";
import { useEffect, useState } from "react";

export default function Contacts() {
    const [height, setHeight] = useState("");
    const developerData = [
        {
            backgroundImage: 'https://i0.wp.com/www.tmahlmann.com/wp-content/uploads/2023/11/Starship-Nov-18-2023-Sky-7063-Print-Signature.jpg?fit=1600%2C576&ssl=1',
            profileImage: 'https://media.licdn.com/dms/image/D4E03AQFRQfSbVuB3WA/profile-displayphoto-shrink_800_800/0/1709749378592?e=1717632000&v=beta&t=uaX4MmNOe0HG7XjOEhDRSGG3iTcOAXcrh8I2S-oBBqo',
            firstName: 'Piero',
            lastName: 'Carimi',
            description: 'Web & Mobile Developer',
            linkGitHub: 'https://github.com/PieroCarimi',
            linkLinkedIn:'https://www.linkedin.com/in/piero-carimi-b92335294/'
        },
        {
            backgroundImage: 'https://i0.wp.com/www.tmahlmann.com/wp-content/uploads/2023/11/Starship-Nov-18-2023-Sky-7063-Print-Signature.jpg?fit=1600%2C576&ssl=1',
            profileImage: 'https://lh3.googleusercontent.com/a/ACg8ocKfvtQcfhvUl1CdkurSA1f2c3JeMY7AcvL7Rm29gQ55VfR_Xkw=s360-c-no',
            firstName: 'Gianmarco',
            lastName: 'Culò',
            description: 'Web & Mobile Developer',
            linkGitHub: 'https://github.com/gianmarco2307',
            linkLinkedIn:'https://www.linkedin.com/in/gianmarco-cul%C3%B2-139331253/'
        }
    ];

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 640) {
                setHeight("calc(100vh + 180px)");
            } else {
                setHeight("calc(100vh - 180px)");
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="h-full flex flex-col justify-between bg-[url('https://www.pixelstalk.net/wp-content/uploads/images6/Dark-Universe-Wallpaper-HD.jpg')] bg-cover bg-center bg-no-repeat" style={{ height }}>
            <div className="flex-grow flex items-center justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-20">
                    {developerData.map((developer):any => (
                        <div key={developer.lastName}>
                            <CardContact contact={developer} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}