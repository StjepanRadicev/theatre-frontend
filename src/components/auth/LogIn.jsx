import { useState } from "react";
import { useForm } from "react-hook-form";
import { data, Link, useNavigate } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import InputField from "../shared/inputField";
import { useDispatch } from "react-redux";
import { authenticateSignInUser } from "../../store/actions";
import toast from "react-hot-toast";
import Spinners from "../shared/Spinners";

const LogIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        mode: "onTouched",
    });

    const loginHandler = async (data) => {
        dispatch(authenticateSignInUser(data, toast, reset, navigate, setLoader));
    };



    return (
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
            <form 
                onSubmit={handleSubmit(loginHandler)}
                className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md">
                    <div className="flex flex-col items-center justify-center space-y-4 ">
                        <AiOutlineLogin className="text-slate-800 text-5xl"/>
                        <h1 className="text-slate-800 text-center font-montserrat  lg:text-3xl text-2xl font-bold">
                            Prijavite se ovdje
                        </h1>
                    </div>

                    <hr className="mt-2 mb-5 text-black "/>

                    <div className="flex flex-col gap-3">
                        <InputField
                            label="Korisničko ime"
                            required
                            id="username"
                            type="text"
                            message={"*Korisničko ime je potrebno"}
                            placeholder={"Upišite svoje korisničko ime"}
                            register={register}
                            errors={errors}
                        />

                        <InputField
                            label="Zaporka"
                            required
                            id="password"
                            type="password"
                            message={"*Zaporka je potrebna"}
                            placeholder={"Upišite svoju zaporku"}
                            register={register}
                            errors={errors}
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
                                <>Prijava</>
                            )}
                    </button>

                    <p className="text-center text-sm text-slate-700 mt-6">
                        Joše nemate račun?
                        <Link
                            className="font-semibold underline hover:text-black"
                            to="/register">
                        <span>  Registracija</span></Link>
                    </p>
            </form>
        </div>
    );
}

export default LogIn;

















































