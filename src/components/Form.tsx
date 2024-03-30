import { AppContext } from "@/ContextProvider";
import { Launch } from "@/declarations";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const emptyObject = () =>{
    return ({
        name: '',
		flight_number: 0,
		data_local: new Date(),
		success: 0,
		image_small: '',
		image_large: '',
		webcast_code: '',
		details: '',
		article: '',
        idLaunches: 0
    })
}

export default function Form() {
    const {createLaunch, isLogged, getLaunchById, updateLaunch} = useContext(AppContext)
    const router = useRouter();
    const { idLaunches }: any = router.query;
    const currentPath = router.pathname;
    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState<Launch>(currentPath === `/launches/${idLaunches}` ? getLaunchById(parseInt(idLaunches)) : emptyObject);

    let date = new Date(formData.data_local);
    let dateString = date.toISOString().split('T')[0];

    const toggleModal = () => {
        setModalOpen(!modalOpen);
        if(currentPath === `/launches/${idLaunches}`){
            setFormData(getLaunchById(parseInt(idLaunches)));
        } else {
            setFormData(emptyObject);
        }
    };
    console.log(formData)
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault(); 

        const formDataWithBooleanSuccess = {
            ...formData,
            success: formData.success ? 1 : 0
        };
        if (currentPath === '/launches') {
            createLaunch(formDataWithBooleanSuccess);
        } else {
            updateLaunch(parseInt(idLaunches), formDataWithBooleanSuccess);
        }
        toggleModal();
    };
    
    return(
        <>
        <div className={`${(currentPath === ('/launches' || `/launches/${idLaunches}`) && isLogged) ? '' : 'hidden'} mx-auto max-w-7xl px-2 sm:px-6 lg:px-8`}>
            <div className="relative flex h-16 items-center justify-between">
                <div></div>
                <div>
                    <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" className={`${modalOpen ? "bg-gray-700" : "bg-gray-800"} block text-gray-300 bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 my-2.5 mx-2.5 text-center`} type="button" onClick={toggleModal}>
                        {currentPath === '/launches' ? 
                            <svg className=" w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>:
                            <img src="https://uxwing.com/wp-content/themes/uxwing/download/editing-user-action/pencil-outline-icon.png" className="w-5 h-auto filter brightness-0 invert"></img>
                        }
                    </button>
                </div>
            </div>
        </div>
            <div id="crud-modal" tabIndex={-1} className={`${modalOpen ? "" : "hidden"} overflow-y-auto overflow-x-hidden fixed flex inset-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm`}>
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Create New Launch
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal" onClick={toggleModal}>
                                <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name:</label>
                                    <input type="text" name="name" id="name" value={formData.name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Rocket name" required onChange={handleChange}></input>
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="flight_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Flight number:</label>
                                    <input type="number" name="flight_number" value={formData.flight_number} id="flight_number" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="0" required></input>
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="success" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Success:</label>
                                    <select id="success" name="success" value={formData.success ? 'true' : 'false'} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        <option value=""></option>
                                        <option value="0">False</option>
                                        <option value="1">True</option>
                                    </select>
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="data_local" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date:</label>
                                    <input type="date" id="data_local" name="data_local" value={dateString} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"></input>
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="image_small" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image small:</label>
                                    <input type="text" name="image_small" id="image_small" value={formData.image_small} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Insert image small (256 x 256 px)" required></input>
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="image_large" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image large:</label>
                                    <input type="text" name="image_large" id="image_large" value={formData.image_large} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Insert image large (953 x 953 px)" required></input>
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="webcast_code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Webcast code:</label>
                                    <input type="text" name="webcast_code" id="webcast_code" value={formData.webcast_code} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Insert webcast code" required></input>
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="article" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Article:</label>
                                    <input type="text" name="article" id="article" value={formData.article} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Insert article url" required></input>
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Details:</label>
                                    <textarea id="details" name="details" rows={4} value={formData.details} onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write launch details here"></textarea>                    
                                </div>
                            </div>
                            <button type="submit" className="text-gray-300 inline-flex items-center bg-gray-900 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                {`${currentPath === '/launches' ? 'Add new launch' : 'Update launch'}`}
                            </button>
                        </form>
                    </div>
                </div>
            </div> 
        </>
    )
}