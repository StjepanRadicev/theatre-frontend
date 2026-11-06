import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { Divider } from '@mui/material';
import { useState } from 'react'
import Status from './Status';
import { MdClose, MdDone } from 'react-icons/md';
import { formatPrice } from '../../utils/formatPrice';

export default function PerformanceViewModal({open, setOpen, performance, isAvaiable}) {
  

  const {id, showName, categoryName, image, showDescription, description, quantity, price, discount, specialPrice, date,} = performance;

    const handleClickOpen = () => {
        setOpen(true);
    }

  return (
    <>
    
      <Dialog open={open} as="div" className="relative z-10 " onClose={close}>
        <DialogBackdrop className="fixed inset-0 bg-gray-300 opacity-70 transition-opacity " />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                    transition
                    className="w-full max-w-160  rounded-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                    >
                   {image && (
                        <div className="flex justify-center items-center w-full">
                            <img
                                src={image}
                                alt={showName}
                                className="max-w-full max-h-[350px] w-auto h-auto object-contain rounded-md"
                            />
                        </div>
                    )}
                    <div className='px-6 pt-2 pb-2'>
                        <DialogTitle as="h3" className="text-2xl/loose  text-slate-800 font-montserrat flex justify-center">
                            {showName}
                        </DialogTitle>
                    </div>


                    <div className="flex flex-col-2 justify-between h-full ">
                        {discount ? (
                            <div className="flex">
                                <span className="text-gray-400 line-through">
                                    {formatPrice(Number(price).toFixed(2))}
                                </span>
                                <span className="text-xl font-bold text-slate-700 ml-2">
                                    {formatPrice(Number(specialPrice).toFixed(2))}
                                </span>
                            </div>
                        ) : (
                            <div className="">
                                <span className="text-xl font-bold text-slate-700">{" "}

                                </span>
                                <span className="text-xl font-bold text-slate-700">
                                    {formatPrice(Number(price).toFixed(2))}
                                </span>
                            </div>
                        )}

                        {/* <div className='flex flex-col justify-between mr-2'>
                            {isAvaiable ?  (
                                <Status
                                    text="Dostupno"
                                    icon={MdDone}
                                    bg="bg-teal-200"
                                    color="text-teal-900"
                                />
                            ) :
                            (<Status
                                    text="Rasprodano"
                                    icon={MdClose}
                                    bg="bg-rose-200"
                                    color="text-rose-700"
                            />)
                            }
                        </div> */}
                    </div>

                    <Divider />

                    <p className="mt-2 text-sm/6 text-slate-700">
                        {showDescription}
                    </p>
                    <div className="mt-4">
                        <Button
                        className="inline-flex items-center gap-2 rounded-md bg-hite px-3 py-1.5 text-sm/6 font-semibold text-gray-700 shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-200 data-open:bg-gray-700 border"
                        onClick={() => setOpen(false)}
                        >
                        Zatvori
                        </Button>
                    </div>

                    </DialogPanel>
                </div>
            </div>
      </Dialog>
    </>
  )
}
