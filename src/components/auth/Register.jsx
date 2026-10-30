import React from 'react'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { data, Link, useNavigate } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import InputField from "../shared/inputField";
import { useDispatch } from "react-redux";
import { authenticateSignInUser, registerNewUser } from "../../store/actions";
import toast from "react-hot-toast";
import { FaUserPlus } from "react-icons/fa6";
import Spinners from '../shared/Spinners';



const Register = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setError,
        getValues,
        formState: {errors},
    } = useForm({
        mode: "onTouched",
    });

    const registerHandler = async (data) => {
        const { confirmPassword, ...sendData } = data;

        dispatch(registerNewUser(sendData, toast, reset, navigate, setLoader, setError));
    };



    return (
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
            <form 
                onSubmit={handleSubmit(registerHandler)}
                className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md">
                    <div className="flex flex-col items-center justify-center space-y-4 ">
                        <FaUserPlus className="text-slate-800 text-5xl"/>
                        <h1 className="text-slate-800 text-center font-montserrat  lg:text-3xl text-2xl font-bold">
                            Registrirajte se ovdje
                        </h1>
                    </div>

                    <hr className="mt-2 mb-5 text-black"/>

                    <div className="flex flex-col gap-3">
                        <InputField
                            label="Korisničko ime"
                            required
                            id="username"
                            type="text"
                            min={3}
                            message={"*Korisničko ime je potrebno"}
                            placeholder={"Upišite svoje korisničko ime"}
                            register={register}
                            errors={errors}
                        />

                        <InputField
                            label="Email"
                            required
                            id="email"
                            type="email"
                            message={"*Email je potreeban"}
                            placeholder={"Upišite svoj Email"}
                            register={register}
                            errors={errors}
                        />
                        <InputField
                            label="Zaporka"
                            required
                            id="password"
                            min={6}
                            type="password"
                            message={"*Zaporka je potrebna"}
                            placeholder={"Upišite svoju zaporku"}
                            register={register}
                            errors={errors}
                        />
                        <InputField
                            label="Ponovljena zaporka"
                            required
                            id="confitmPassword"
                            min={6}
                            type="password"
                            message={"*Potvrdite zaporku"}
                            placeholder={"Ponovno upišite zaporku"}
                            register={register}
                            errors={errors}
                            validate={(value) =>
                                value === getValues("password") ||
                                "Zaporke se ne podudaraju"
                            }
                        />
                    </div>

                    <button
                        disabled={loader}
                        className="bg-button-gradient flex gap-2 items-center justify-center font-semibold tetx-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3 text-white"
                        type="submit">
                        {loader ? (
                                <>
                                    <Spinners /> Učitavanje...
                                </>
                            ) : (
                                <>Registracija</>
                            )}
                    </button>

                    <p className="text-center text-sm text-slate-700 mt-6">
                        Već imate kreiran račun?
                        <Link
                            className="font-semibold underline hover:text-black"
                            to="/login">
                        <span>  Prijava</span></Link>
                    </p>
            </form>
        </div>
    );
}

export default Register