import { AppContext } from '@/ContextProvider';
import { Launch } from '@/declarations';
import { useContext } from 'react';

export default function CardSmall({ launch }: { launch: Launch }) {
	const { deleteLaunch, isLogged } = useContext(AppContext);

	function onClickRemove() {
		if(isLogged) {
			deleteLaunch(launch.idLaunches);
		} else {
			console.error('You must be logged in to remove a launch');
		}
	}

    return (
        <div className="max-w-sm relative rounded overflow-hidden shadow-lg">
            <img
                className="w-full"
                src={launch.image_small}
                alt="Image patch"
            />
            <div className="px-6 py-4 min-h-28 max-h-28 overflow-y-hidden">
                <div className="font-bold text-xl mb-2">{launch.name}</div>
                <p className="text-gray-700 text-base">{launch.details}</p>
            </div>
            <div className="px-4 pt-4">
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
            <div className="px-6 pt-3 pb-3">
                <button className="bg-transparent hover:bg-gray-800 text-gray-800 font-semibold hover:text-white py-2 px-4 border border-gray-800 hover:border-transparent rounded">
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
