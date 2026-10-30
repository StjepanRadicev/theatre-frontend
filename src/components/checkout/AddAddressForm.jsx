import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { AiOutlineLogin } from 'react-icons/ai';
import InputField from '../shared/inputField';
import { FaAddressCard } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addUpdateUserAddress } from '../../store/actions';
import toast from 'react-hot-toast';
import Spinners from "../shared/Spinners";

const AddAddressForm = ({address, setOpenAddressModal}) => {

    const dispatch  = useDispatch();

    const { btnLoader } = useSelector((state) => state.errors);

    const {
            register,
            handleSubmit,
            reset,
            setValue,
            formState: {errors},
        } = useForm({
            mode: "onTouched",
        });

    const onSaveAddressHandler = async (data) => {
        dispatch(addUpdateUserAddress(
            data,
            toast,
            address?.addressId,
            setOpenAddressModal
        ));
    };

    useEffect(() => {
        if (address?.addressId) {
            setValue("buildingName", address?.buildingName);
            setValue("city", address?.city);
            setValue("state", address?.state);
            setValue("street", address?.street);
            setValue("zipCode", address?.zipCode);
            setValue("country", address?.country);
        }
    }, [address]);


  return (
    <div className="">
                <form 
                    onSubmit={handleSubmit(onSaveAddressHandler)}
                    className="">
                        <div className="flex justify-center items-center mb-4 font-semibold text-2xl text-slate-800 py-2 px-4">
                            <FaAddressCard className="mr-2 text-2xl"/>
                            <h1 className="text-slate-800 text-center font-montserrat  lg:text-3xl text-2xl font-bold">
                                {!address?.addressId ?
                                "Add Address" :
                                "Update Address"
                                }
                            </h1>
                        </div>
    
    
                        <div className="flex flex-col gap-4 ">
                            <InputField
                                label="Naziv zgrade"
                                required
                                id="buildingName"
                                type="text"
                                message={"*Naziv zgrade je potreban"}
                                placeholder={"Upišite naziv zgrade"}
                                register={register}
                                errors={errors}
                            />
    
                            <InputField
                                label="Grad"
                                required
                                id="city"
                                type="text"
                                message={"*Grad je potreban"}
                                placeholder={"Upišite naziv grada"}
                                register={register}
                                errors={errors}
                            />

                            <InputField
                                label="Županija"
                                required
                                id="state"
                                type="text"
                                message={"*Županija je potrebna"}
                                placeholder={"Upišite naziv županije"}
                                register={register}
                                errors={errors}
                            />

                            <InputField
                                label="Ulica"
                                required
                                id="street"
                                type="text"
                                message={"*Ulica je potrebna"}
                                placeholder={"Upišite naziv ulice"}
                                register={register}
                                errors={errors}
                            />

                            <InputField
                                label="Poštanski broj"
                                required
                                id="zipCode"
                                type="number"
                                message={"*Poštanski broj je potreban"}
                                placeholder={"Upišite poštanski broj"}
                                register={register}
                                errors={errors}
                            />

                             <InputField
                                label="Država"
                                required
                                id="country"
                                type="text"
                                message={"*Država je potrebna"}
                                placeholder={"Upišite naziv države"}
                                register={register}
                                errors={errors}
                            />
                        </div>
    
                        <button
                            disabled={btnLoader}
                            className="text-white bg-custom-blue px-4 py-2 rounded-md mt-4"
                            type="submit">
                            {btnLoader ? (
                                    <>
                                        <Spinners /> Učitavanje...
                                    </>
                                ) : (
                                    <>Spremi</>
                                )}
                        </button>
    
                        
                </form>
            </div>
  )
}

export default AddAddressForm;