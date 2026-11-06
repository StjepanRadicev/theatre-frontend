import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { removeFromCart } from "../../store/actions";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { formatPrice } from "../../utils/formatPrice";
 
 
 
 
 
 const ItemContent = ({
    id,
      performanceSeatId,
      performanceId,
      rowLabel,
      seatNumber,
      price,
      section,
      performanceName,
      status,
      image,
      cartId,
      time,
 }) => {
    // const [currentQuantity, setCurrentQuantity] = useState(quantity);

    const dispatch = useDispatch();

    const removeItemFromCart = (cartItems) => {
        dispatch(removeFromCart(cartItems, toast));
    };


    return(
        <div className="grid md:grid-cols-5 grid-cols-4 md:text-md text-sm gap-4 items-center border border-slate-200">
            <div className="md:col-span-2 justify-self-start flex flex-col gap-2">
                <div className="flex md:flex-row flex-col lg:gap-4 sm:gap-3 gap-0 items-start ml-3 mt-3">
                    <h3 className="lg:text-[20px] text-sm font-semibold text-slate-600">
                        {performanceName}
                    </h3>
                </div>

                <div className="">
                    <img
                        src={image}
                        alt={performanceName}
                        className="max-w-full max-h-[144px] w-auto h-auto object-contain rounded-md ml-3 mt-2"
                    />
               

                <div className="flex items-start gap-5 mt-3">
                    <button
                        onClick={() => removeItemFromCart({
                            id,
                            performanceSeatId,
                            performanceId,
                            rowLabel,
                            seatNumber,
                            price,
                            section,
                            performanceName,
                            status,
                            image,
                            cartId,
                            time,
                        })}
                        className="flex items-center font-semibold space-x-2 px-4 py-3 mb-3 ml-3 text-xs border border-rose-600 text-rose-600 rounded-md hover:bg-red-50 transition-colors duration-200">
                        <HiOutlineTrash size={16} className="text-rose-600" />    
                        Obriši
                    </button>
                </div>
                </div>
            </div>

            <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
                {section}
            </div>

            <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
                {new Date(time).toLocaleString("hr-HR", {
                                                            day: "2-digit",
                                                            month: "2-digit",
                                                            year: "numeric",
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}
            </div>

            <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
                {formatPrice(price)}
            </div>
        </div>
    )
 };

 export default ItemContent;



















































