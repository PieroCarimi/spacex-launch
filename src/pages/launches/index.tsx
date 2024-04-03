import { AppContext } from "@/ContextProvider";
import CardSmall from "@/components/CardSmall";
import Form from "@/components/Form";
import { Launch } from "@/declarations";
import { useContext, useEffect } from "react";

export default function Launches() {
    const { launches, getLaunches } = useContext(AppContext);

    useEffect(() => {
        getLaunches();
    }, []);

    return (
        <>
            <Form />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center mt-10 ml-5 mr-5">
                    {Array.isArray(launches) && launches.map((launch: Launch) => (
                        <div key={launch.idLaunches} className="flex justify-center mb-10">
                            <CardSmall launch={launch} />
                        </div>
                    ))}
            </div>
        </>
    );
}