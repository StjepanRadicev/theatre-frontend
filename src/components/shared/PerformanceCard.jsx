import { useState } from "react";
import DatePicker from "react-datepicker";
import { FaShoppingCart } from "react-icons/fa";
import { truncateText } from "../../utils/truncateText";
import CustomDateInput from "../../utils/DateDisplay";
import PerformanceViewModal from "./PerformanceViewModal";
import SeatSelection from "../seat/SeatSelection";
import { formatPrice } from "../../utils/formatPrice";

const PerformanceCard = ({
      performanceId,
      showName,
      categoryName,
      image,
      showDescription,
      availableSeats,
      price,
      discount,
      specialPrice,
      localDateTime,
      status,
}) => {

    
    const [openPerformanceViewModal, setOpenPerformanceViewModal] = useState(false);
    const btnLoader = false;
    const [selectedViewPerformance, setSelectedViewPerformance] = useState('');
    const isAvaiable = status == "PUBLISHED" && Number(availableSeats) > 0;

    const handlePerformanceView = (performance) => {
        setSelectedViewPerformance(performance);
        setOpenPerformanceViewModal(true);
    }

    const [showSeats, setShowSeats] = useState(false);

    
return (
    <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 bg-gray-500 border rounded-lg shadow-md overflow-hidden transition-shadow duration-300 p-4">

        {/* DATUM */}
        <div className="col-span-1 md:col-span-6 lg:col-span-2 flex items-center justify-center min-w-0 text-lg font-semibold">
            <DatePicker
                selected={localDateTime}
                onChange={(date) => setDate(date)}
                dateFormat="d MMMM yyyy HH:mm"
                customInput={<CustomDateInput />}
            />
        </div>

        {/* SLIKA */}
        <div
            onClick={() => handlePerformanceView({
                id: performanceId,
                showName,
                categoryName,
                image,
                showDescription,
                availableSeats,
                price,
                discount,
                specialPrice,
            })}
            className="col-span-1 md:col-span-3 lg:col-span-3 w-full aspect-[3/2] overflow-hidden cursor-pointer rounded-lg"
        >
            <img
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                src={image}
                alt={showName}
            />
        </div>

        {/* NASLOV I OPIS */}
        <div className="col-span-1 md:col-span-3 lg:col-span-5 min-w-0 flex flex-col justify-center p-2">

            <h2
                onClick={() => handlePerformanceView({
                    id: performanceId,
                    showName,
                    categoryName,
                    image,
                    showDescription,
                    availableSeats,
                    price,
                    discount,
                    specialPrice,
                })}
                className="text-xl sm:text-2xl lg:text-3xl font-semibold font-montserrat cursor-pointer text-white"
            >
                {truncateText(showName, 20)}
            </h2>

            <p className="text-gray-100 text-sm sm:text-base line-clamp-3 font-montserrat mt-4">
                {truncateText(showDescription, 120)}
            </p>

        </div>

        {/* CIJENA I GUMB */}
        <div className="col-span-1 md:col-span-6 lg:col-span-2 flex flex-col justify-center items-center gap-5 p-2">

            {discount != 0 ? (
                <div className="flex flex-col items-center">
                    <span className="text-gray-200 line-through">
                        {formatPrice(Number(price).toFixed(2))}
                    </span>

                    <span className="text-xl font-bold text-slate-100">
                        {formatPrice(Number(specialPrice).toFixed(2))}
                    </span>
                </div>
            ) : (
                <span className="text-xl font-bold text-slate-100">
                    {formatPrice(Number(price).toFixed(2))}
                </span>
            )}

            <button
                disabled={!isAvaiable || btnLoader}
                onClick={() => setShowSeats(true)}
                className={`bg-gray-700 ${
                    isAvaiable
                        ? "opacity-100 hover:bg-gray-900"
                        : "opacity-70"
                } text-white py-2 px-4 rounded-md transition-colors duration-300 w-full sm:w-44 flex items-center justify-center`}
            >
                <FaShoppingCart className="mr-2" />
                {isAvaiable ? "Kupi ulaznicu" : "Rasprodano"}
            </button>

            {showSeats && (
                <SeatSelection
                    performance={performance}
                    performanceId={performanceId}
                    onClose={() => setShowSeats(false)}
                />
            )}
        </div>

        <PerformanceViewModal
            open={openPerformanceViewModal}
            setOpen={setOpenPerformanceViewModal}
            performance={selectedViewPerformance}
            isAvaiable={isAvaiable}
        />
    </div>
);


    // return (
    //     <div className="grid grid-cols-3 lg:grid-cols-12 md:grid-cols-1 border bg-gray-500 sm:grid-cols-1  rounded-lg  shadow-md overflow-hidden transition-shadow duration-300 gap-4">

    //        <div className="flex items-center ml-13  text-lg font-semibold  h-full col-span-2 w-full">
    //             <DatePicker
                    
    //                 selected={localDateTime}
    //                 onChange={(localDateTime) => setDate(localDateTime)}
    //                 dateFormat="d MMMM yyyy HH:mm"
    //                 customInput={<CustomDateInput />}
    //             />
    //        </div>
           
    //         <div onClick={() => {
    //                 handlePerformanceView({
    //                     id: performanceId,
    //                     showName,
    //                     categoryName,
    //                     image,
    //                     showDescription,
    //                     availableSeats,
    //                     price,
    //                     discount,
    //                     specialPrice,
    //                 })
    //             }} 
    //                 className="w-full h-full overflow-hidden aspect-3/2 col-span-3 ">
    //             <img 
    //                 className="w-full h-full cursor-pointer transition-transform duration-300 transform hover:scale-105 p-3 rounded"
    //                 src={image}
    //                 alt={showName}>
    //             </img>
    //         </div>

    //         <div className="p-4 col-span-5 w-full">

    //             <h2 onClick={() => {
    //                 handlePerformanceView({
    //                     id: performanceId,
    //                     showName,
    //                     categoryName,
    //                     image,
    //                     showDescription,
    //                     availableSeats,
    //                     price,
    //                     discount,
    //                     specialPrice,
    //                 })
    //             }}
    //                 className="text-3xl font-semibold  font-montserrat cursor-pointer mt-5 text-white">
    //                 {truncateText(showName, 20)}
    //             </h2>

    //             <div className="min-h-20 max-h-20 p-2 mt-6">
    //                 <p className="text-gray-100 text-l line-clamp-2 font-montserrat">
    //                     {truncateText(showDescription, 120 )}
    //                 </p>
    //             </div>
                 
    //         </div>

    //         <div className=" col-span-1">
    //              <div className="flex flex-col justify-around h-full w-full items-center">
    //                 {specialPrice ? (
    //                     <div className="flex flex-col">
    //                         <span className="text-gray-200 line-through">
    //                             {formatPrice(Number(price).toFixed(2))}
    //                         </span>
    //                         <span className="text-xl font-bold text-slate-100">
    //                             {formatPrice(Number(specialPrice).toFixed(2))}
    //                         </span>
    //                     </div>
    //                 ) : (
    //                     <div className="">
    //                         <span className="text-xl font-bold text-slate-700">{" "}

    //                         </span>
    //                         <span className="text-xl font-bold text-slate-100">
    //                             ${Number(price).toFixed(2)}
    //                         </span>
    //                     </div>
    //                 )}
    //                     <div className=" ">
    //                         <button 
    //                             disabled={!isAvaiable || btnLoader}
    //                              onClick={() => setShowSeats(true)}
    //                             className={`bg-gray-700 ${isAvaiable ? "opacity-100 hover:bg-gray-900" : "opacity-70"}
    //                                 text-white py-2 px-3 rounded-sm  transition-colors duration-300 w-36 flex  justify-center`}>
    //                                     <FaShoppingCart className="mr-2 mt-1" />
    //                             {isAvaiable ? "Kupi ulaznicu" :  "Rasprodano"}
    //                         </button>
    //                         {showSeats && (
    //                             <SeatSelection
    //                                 performance={performance}
    //                                 performanceId={performanceId}
    //                                 onClose={() => setShowSeats(false)}
    //                             />
    //                         )}
    //                     </div>
    //             </div>
                    
    //         </div>

    //         <PerformanceViewModal 
    //             open={openPerformanceViewModal}
    //             setOpen={setOpenPerformanceViewModal}
    //             performance={selectedViewPerformance}
    //             isAvaiable={isAvaiable}
    //         />
    //     </div>
    // )
}

export default PerformanceCard;