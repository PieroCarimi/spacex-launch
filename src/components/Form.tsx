import { AppContext } from "@/ContextProvider";
import { Launch } from "@/declarations";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const emptyObject = () =>{
    return ({
        name: '',
		flight_number: '',
		data_local: '',
		success: '',
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
    const [isValid, setIsValid] = useState(false);
    console.log({currentPath})
    const validation = () => {
        if(
            formData.name === '' ||
            parseInt(formData.flight_number) <= 0 ||
            formData.data_local === ''||
            !(formData.success === '0' || formData.success === '1') ||
            !/\.(jpg|jpeg|png|gif)$/i.test(formData.image_small) ||
            !/\.(jpg|jpeg|png|gif)$/i.test(formData.image_large) ||
            formData.webcast_code.length !== 11 ||
            formData.details.trim() === '' ||
            !/^(http|https):\/\/[^ "]+$/.test(formData.article)
        ){
            console.log('The form fields are invalid');
            setIsValid(false);
            return;
        }
        setIsValid(true);
    };

    const toggleModal = async () => {
        setModalOpen(!modalOpen);
        if (currentPath === `/launches/[idLaunches]`) {
            const launchData = await getLaunchById(idLaunches);
            const launch = launchData[0];
            launch.success = String(launch.success);
            launch.flight_number = String(launch.flight_number);
            launch.data_local = new Date(launch.data_local).toISOString().split('T')[0];
            setFormData(launch);
        } else {
            setFormData(emptyObject());
        }
    };

    console.log(formData)
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault(); 

        if(isValid){
        
            if (currentPath === '/launches') {
                createLaunch(formData);
            } else {
                updateLaunch(idLaunches, formData);
            }
            toggleModal();
            setIsValid(false);
        }
    };
    console.log(isLogged)
    console.log(isValid)
    useEffect(() => {
        validation();
    }, [formData]);
    
    const classNameContainer = isLogged && (currentPath === '/launches' || currentPath === `/launches/[idLaunches]`) ? '' : 'hidden';

    return(
        <>
        <div className={`${classNameContainer} mx-auto max-w-7xl px-2 sm:px-6 lg:px-8`}>
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
                    <div className="relative bg-white rounded-lg shadow ">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                            <h3 className="text-lg font-semibold text-gray-900 ">
                                {currentPath === '/launches' ? 'Create New Launch' : 'Update Launch'}
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-toggle="crud-modal" onClick={toggleModal}>
                                <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name:</label>
                                    <input type="text" name="name" id="name" value={formData.name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Rocket name" required onChange={handleChange}></input>
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="flight_number" className="block mb-2 text-sm font-medium text-gray-900">Flight number:</label>
                                    <input type="number" name="flight_number" value={formData.flight_number} id="flight_number" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="0" required></input>
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="success" className="block mb-2 text-sm font-medium text-gray-900">Success:</label>
                                    <select id="success" name="success" value={formData.success } onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "> 
                                        <option value=""></option>
                                        <option value={0}>False</option>
                                        <option value={1}>True</option>
                                    </select>
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="data_local" className="block mb-2 text-sm font-medium text-gray-900">Date:</label>
                                    <input type="date" id="data_local" name="data_local" value={formData.data_local} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "></input>
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="image_small" className="block mb-2 text-sm font-medium text-gray-900">Image small:</label>
                                    <input type="text" name="image_small" id="image_small" value={formData.image_small} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Insert image small (256 x 256 px)" required></input>
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="image_large" className="block mb-2 text-sm font-medium text-gray-900">Image large:</label>
                                    <input type="text" name="image_large" id="image_large" value={formData.image_large} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Insert image large (953 x 953 px)" required></input>
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="webcast_code" className="block mb-2 text-sm font-medium text-gray-900">Webcast code:</label>
                                    <input type="text" name="webcast_code" id="webcast_code" value={formData.webcast_code} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Insert webcast code" required></input>
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="article" className="block mb-2 text-sm font-medium text-gray-900">Article:</label>
                                    <input type="text" name="article" id="article" value={formData.article} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Insert article url" required></input>
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900">Details:</label>
                                    <textarea id="details" name="details" rows={4} value={formData.details} onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write launch details here"></textarea>                    
                                </div>
                            </div>
                            <button type="submit" disabled={!isValid} className={`text-gray-300 inline-flex items-center bg-gray-900 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${isValid ? '' : 'opacity-50 cursor-not-allowed '}`}>
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