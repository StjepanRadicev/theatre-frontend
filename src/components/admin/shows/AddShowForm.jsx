
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import InputField from "../../shared/inputField";
import Spinners from "../../shared/Spinners";
import {
    addShowFromDashboard,
    updateShowFromDashboard,
    fetchCategories,
} from "../../../store/actions";

const AddShowForm = ({ setOpen, show, update }) => {

    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const [loader, setLoader] = useState(false);

    const categories = useSelector(
        (state) => state.performances.categories
    );

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            showName: "",
            duration: "",
            description: "",
            categoryId: "",
        },
    });

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        if (update && show) {
            reset({
                showName: show.showName || "",
                duration: show.duration || "",
                description: show.description || "",
                categoryId: show.categoryId || "",
            });
        } else {
            reset({
                showName: "",
                duration: "",
                description: "",
                categoryId: "",
            });
        }
    }, [update, show, reset]);

    const saveShowHandler = (data) => {

        const queryString = new URLSearchParams({
            pageNumber: String(
                Math.max(0, Number(searchParams.get("page") || 1) - 1)
            ),
        }).toString();

        if (!update) {
            dispatch(
                addShowFromDashboard(
                    data, toast, reset, setLoader, setOpen, queryString
                )
            );
        } else {
            dispatch(
                updateShowFromDashboard(
                    { ...data, showId: show.id },
                    toast, reset, setLoader, setOpen, queryString
                )
            );
        }
    };

    return (
        <form
            onSubmit={handleSubmit(saveShowHandler)}
            className="flex flex-col gap-4"
        >
            <InputField
                label="Naziv predstave"
                id="showName"
                type="text"
                required
                message="Naziv predstave je obavezan"
                placeholder="Unesite naziv predstave"
                register={register}
                errors={errors}
            />

            <InputField
                label="Trajanje (minute)"
                id="duration"
                type="number"
                required
                message="Trajanje je obavezno"
                placeholder="Unesite trajanje"
                register={register}
                errors={errors}
            />

            <div>
                <label className="block font-semibold text-sm text-slate-800 mb-1">
                    Kategorija
                </label>

                <select
                    {...register("categoryId", {
                        required: "Odaberite kategoriju",
                    })}
                    className="w-full border border-slate-700 rounded-md px-2 py-2 bg-white"
                >
                    <option value="">Odaberite kategoriju</option>

                   {categories?.map((category) => (
                        <option
                            key={category.categoryId}
                            value={category.categoryId}
                        >
                            {category.categoryName}
                        </option>
                    ))}
                </select>

                {errors.categoryId && (
                    <p className="text-sm font-semibold text-red-600">
                        {errors.categoryId.message}
                    </p>
                )}
            </div>

            <div>
                <label className="block font-semibold text-sm text-slate-800 mb-1">
                    Opis predstave
                </label>

                <textarea
                    {...register("description", {
                        required: "Opis predstave je obavezan",
                    })}
                    rows={4}
                    className="w-full border border-slate-700 rounded-md px-2 py-2 outline-none"
                    placeholder="Unesite opis predstave"
                />

                {errors.description && (
                    <p className="text-sm font-semibold text-red-600">
                        {errors.description.message}
                    </p>
                )}
            </div>

            <button
                type="submit"
                disabled={loader}
                className="bg-custom-blue hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md disabled:opacity-50"
            >
                {loader
                    ? "Spremanje..."
                    : update
                        ? "Ažuriraj predstavu"
                        : "Dodaj predstavu"}
            </button>
        </form>
    );
};

export default AddShowForm;
