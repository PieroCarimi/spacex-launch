import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    return (
        <div className="h-full flex flex-col justify-between bg-[url('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/145a4477029515.5c7bcf54cc7f2.png')] bg-cover bg-center bg-no-repeat" style={{height: "calc(100vh - 180px)", textAlign: "center"}}>
            <div className="flex-grow flex items-center justify-center">
                <p className="text-white text-6xl font-bold">
                    <span >SpaceX aerospace launch history</span>
                </p>
            </div>
        </div>
    );
}