import { AppContext } from "@/ContextProvider";
import CardLarge from "@/components/CardLarge";
import { Launch } from "@/declarations";
import { utilityIsIdValid } from "@/utilities/utilities";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function DetailLaunch() {
    const router = useRouter();
    const { idLaunches } = router.query;
    const { getLaunchById } = useContext(AppContext);
    const [launch, setLaunch] = useState<Launch | null>(null);
    const [isIdValid, setIsIdValid] = useState<boolean>(true);

    useEffect(() => {
        const fetchLaunch = async () => {
            try {
                if (!idLaunches) return;
                const parsedIdLaunches = !Array.isArray(idLaunches) ? parseInt(idLaunches) : 1;
                const isValid = await utilityIsIdValid(parsedIdLaunches);
                if (!isValid) {
                    setIsIdValid(false);
                    router.push("/launches");
                    return;
                }
                const response = await getLaunchById(parsedIdLaunches);
                setLaunch(response[0]);
            } catch (error) {
                console.error("Error fetching launch:", error);
            }
        };

        fetchLaunch();
    }, [idLaunches]);

    if (!launch) return null;

    return (
        <CardLarge launch={launch} />
    );
}