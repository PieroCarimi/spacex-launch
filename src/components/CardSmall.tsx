import { AppContext } from '@/ContextProvider';
import { Launch } from '@/declarations';
import { useRouter } from 'next/router';
import { useContext } from 'react';

export default function CardSmall({ launch }: { launch: Launch }) {
	const { deleteLaunch, isLogged } = useContext(AppContext);
    const router = useRouter();

	function onClickRemove() {
		if(isLogged) {
			deleteLaunch(launch.idLaunches);
		} else {
			console.error('You must be logged in to remove a launch');
		}
	}

    function onClickDetails() {
        router.push(`/launches/${launch.idLaunches}`);
    }

    return (
        <div className="max-w-sm relative rounded-lg overflow-hidden shadow-lg w-full border border-gray-400">
            <img
                className="w-full"
                src={launch.image_small}
                alt="Image patch"
            />
            <div className="px-6 py-4 min-h-28 max-h-28 bg-white">
                <div className="font-bold text-xl mb-2">{launch.name}</div>
                <p className="text-gray-700 text-base line-clamp-3">{launch.details}</p>
            </div>
            <div className="px-4 pt-4 bg-white">
                <span className="inline-block bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    Launch {launch.flight_number}
                </span>
                <span
                    className={
                        launch.success
                            ? "inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-white-700 mr-2 mb-2"
                            : "inline-block bg-red-500 rounded-full px-3 py-1 text-sm font-semibold text-white-700 mr-2 mb-2"
                    }
                >
                    {launch.success ? "Success" : "Failed"}
                </span>
                <span
                    className={
                        launch.success
                            ? "inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-white-700 mr-2 mb-2"
                            : "inline-block bg-red-500 rounded-full px-3 py-1 text-sm font-semibold text-white-700 mr-2 mb-2"
                    }
                >
                    {new Date(launch.data_local).toLocaleDateString()}
                </span>
            </div>
            <div className="px-6 pt-3 pb-3 bg-white">
                <button className="bg-transparent hover:bg-gray-800 text-gray-800 font-semibold hover:text-white py-2 px-4 border border-gray-800 hover:border-transparent rounded" onClick={onClickDetails}>
                    Details
                </button>
				{isLogged ? (
					<button className="bg-transparent hover:bg-red-500 text-gray-800 font-semibold hover:text-black py-2 px-4 border border-gray-800 hover:border-transparent rounded ml-2" onClick={onClickRemove}>
						Remove
					</button>
				) : null}
            </div>
        </div>
    );
}