import { Launch } from "@/declarations";
import Iframe from "./Iframe";

export default function CardLarge({ launch }: { launch: Launch }) {
    return (
        <div style={{ width: "75%", margin: "50px auto" }}>
            <div className="max-w-md w-full lg:max-w-full lg:flex border border-gray-400 rounded-lg overflow-hidden shadow-md">
                <div
                    className="h-80 lg:h-auto lg:w-80 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                    style={{
                        backgroundImage: `url('${launch.image_large}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        paddingBottom: "30%",
                    }}
                ></div>
                <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal w-full">
                    <div className="mb-8">
                        <p className="text-sm text-gray-600 flex items-center">
                            <img
                                className="w-3 h-3 mr-2"
                                src="https://i.ibb.co/hXxDhTL/rocket.png"
                                alt="Rocket icon"
                            />
                            {launch.flight_number}
                        </p>
                        <div className="text-gray-900 font-bold text-xl mb-2 truncate">
                            {launch.name}
                        </div>
                        <p className="text-gray-700 text-base">
                            {launch.details}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400">
                            <a
                                href={launch.article}
                                className="inline-flex items-center font-medium text-gray-800 dark:text-blue-500 hover:underline"
                                target="_blank"
                            >
                                Read article
                                <svg
                                    className="w-4 h-4 ms-2 rtl:rotate-180"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M1 5h12m0 0L9 1m4 4L9 9"
                                    />
                                </svg>
                            </a>
                        </p>
                    </div>
                    <div className="flex items-center">
                        <img
                            className="w-10 h-10 rounded-full mr-4"
                            src={
                                launch.success
                                    ? "https://i.ibb.co/tBBKNcv/success.png"
                                    : "https://i.ibb.co/7t8v3vZ/fail.png"
                            }
                        />
                        <div className="text-sm">
                            <p className="text-gray-900 leading-none">
                                {launch.success ? "Success" : "Failed"}
                            </p>
                            <p className="text-gray-600">
                                {new Date(
                                    launch.data_local,
                                ).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: 50 }}>
                <Iframe webcast_code={launch.webcast_code} />
            </div>
        </div>
    );
}
