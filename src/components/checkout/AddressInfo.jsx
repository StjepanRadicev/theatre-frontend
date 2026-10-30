import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import React, { useState } from 'react'
import { FaAddressBook } from "react-icons/fa6";
import AddressInfoModal from './AddressInfoModal';
import AddAddressForm from './AddAddressForm';
import { useDispatch, useSelector } from 'react-redux';
import AddressList from './AddressList';
import { DeleteModal } from './DeleteModal';
import { deleteUserAddress } from '../../store/actions';
import toast from 'react-hot-toast';



const AddressInfo = ({ address }) => {
    const [openAddressModal, setOpenAddressModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState("");
    const addNewAddressHandler = () => {
        setSelectedAddress("");
        setOpenAddressModal(true);
    };

    const dispatch = useDispatch();

    const deleteAddressHandler = () => {
        dispatch(deleteUserAddress(
            toast,
            selectedAddress?.addressId,
            setOpenDeleteModal
        ))
    };

    const noAddressExist = !address || address.length === 0;
    const { isLoading, btnLoader } = useSelector((state) => state.errors );

  return (
    <div className='pt-4 mb-10'>
        {noAddressExist ? (
            <div className='p-6 rounded-lg max-w-md mx-auto flex flex-col items-center justify-center'>
                <FaAddressBook size={50} className='text-gray-700 mb-4'/>
                <h1 className='mb-2 text-slate-800 text-center font-semibold text-2xl'>
                    Još nema dodanih adresa
                </h1>

                <p className='mb-6 text-slate-700 text-center '>
                    Molim dodajte adresu da biste završili kupnju
                </p>

                <button 
                    onClick = {addNewAddressHandler}
                    className='px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition transform'
                    >
                    <span> Dodaj adresu </span>
                </button>
            </div>
        ) : (
            <div className='relative p-6 rounded-lg max-w-md mx-auto'>
                <h1 className='text-slate-800 text-center font-bold text-2xl'>
                    Izaberi adresu
                </h1>

                {isLoading ? (
                    <div className='py-8'>
                        <Box sx={{ width: 400 }}>
                            <Skeleton />
                            <Skeleton animation="wave" />
                            <Skeleton animation={false} />
                        </Box>
                    </div>
                ) : (
                    <>
                    <div className='space-y-4 pt-6'>
                        <AddressList 
                            addresses={address}
                            setSelectedAddress={setSelectedAddress}
                            setOpenAddressModal={setOpenAddressModal}
                            setOpenDeleteModal={setOpenDeleteModal}
                        />
                    </div>

                    {address.length > 0 && (
                        <div className='mt-4'>
                            <button
                                onClick = {addNewAddressHandler}
                                className='px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition transform'
                               > 
                               Dodaj još
                            </button>
                        </div>
                    )}
                    </>
                )}
            </div>
        )}

        <AddressInfoModal
            open={openAddressModal}
            setOpen={setOpenAddressModal}
        >
            <AddAddressForm 
               address={selectedAddress}
               setOpenAddressModal={setOpenAddressModal} />
        </AddressInfoModal>

        <DeleteModal 
            open = {openDeleteModal}
            loader = {btnLoader}
            setOpen = {setOpenDeleteModal}
            title = "Delete Address"
            onDeleteHandler = {deleteAddressHandler}
        />
    </div>
  )
}

export default AddressInfo;