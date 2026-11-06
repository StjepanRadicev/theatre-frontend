import React from 'react'
import { RiMoneyEuroCircleLine } from 'react-icons/ri'

const OrderSummary = ({ totalPrice, cart, paymentMethod }) => {
  return (
    <div className='container mx-auto px-4 mb-12'>
        <div className='flex flex-wrap'>
            <div className='w-full lg:w-8/12 pr-4'>
                <div className='space-y-4'>
                    
                    <div className='p-4 border-0 rounded-lg shadow-sm'>
                        <h2 className='text-2xl font-semibold mb-2'>
                            Metoda plačanja
                        </h2>
                        <p>
                            <strong>Method: </strong>
                            {paymentMethod}
                        </p>
                    </div>
                    <div className='p-4 border-0 shadow-sm'>
                        <h2 className='text-2xl font-semibold mb-2'>Stavke narudžbe</h2>
                        <div className='space-y-2'>
                            {cart?.map((item) => (
                                <div key={item?.performanceSeatId} className='flex items-center'>
                                <div className="w-24 h-24 flex-shrink-0 flex items-center justify-center m-5">
                                    <img
                                        src={
                                            item?.image?.startsWith("http")
                                                ? item.image
                                                : `${import.meta.env.VITE_BACK_END_URL}/images/${item?.image}`
                                        }
                                        className="max-w-full max-h-full w-auto h-auto object-contain rounded-md"
                                        alt={item?.performanceName}
                                    />
                                </div>
                                <div className='text-gray-500'>
                                    <p>{item?.performanceName}</p>

                                    <p>{new Date(item?.localDateTime).toLocaleString("hr-HR", {
                                                            day: "2-digit",
                                                            month: "2-digit",
                                                            year: "numeric",
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}
                                    </p>

                                    <p>{item?.rowLabel }-{item?.seatNumber}</p>

                                    <p className="flex items-center gap-1">
                                        {Number(item?.price).toFixed(2)}
                                        <RiMoneyEuroCircleLine />
                                    </p>
                                </div>
                            </div>
                            ))}
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full lg:w-4/12 mt-4 lg:mt-0'>
                <div className='border-0 rounded-lg shadow-sm p-4 psace-y-4'>
                    <h2 className='text-2xl font-smibold mb-2'>Sažetak narudžbe</h2>

                    <div className='space-y-2'>
                        <div className='flex justify-between'>
                            <span>Sjedala</span>
                            <span className="inline-flex items-center gap-1 whitespace-nowrap">
                                {Number(totalPrice).toFixed(2)}
                                <RiMoneyEuroCircleLine />
                            </span>
                        </div>
                        <div className='flex justify-between'>
                            <span>Tax (0%)</span>
                            <span className="inline-flex items-center gap-1 whitespace-nowrap">
                                0.00
                                <RiMoneyEuroCircleLine />
                            </span>
                        </div>
                        <div className='flex justify-between font-semibold'>
                            <span>Ukupno</span>
                            <span className="inline-flex items-center gap-1 whitespace-nowrap">
                                {Number(totalPrice).toFixed(2)}
                                <RiMoneyEuroCircleLine />
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default OrderSummary