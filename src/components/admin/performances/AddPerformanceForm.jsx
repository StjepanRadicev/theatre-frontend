import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../../shared/inputField';
import { Controller } from "react-hook-form";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useDispatch, useSelector } from 'react-redux';
import { addPerformanceFromDashboard, fetchAllHall, fetchDropdownShows, updatePerformanceFromDashboard } from '../../../store/actions';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import { Button } from '@mui/material';
import Spinners from '../../shared/Spinners';
import toast from 'react-hot-toast';
import { useSearchParams } from "react-router-dom";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/hr";


const AddPerformanceForm = ({ setOpen, performance, update = false }) => {
    const [loader, setLoader ] = useState(false);

    const dispatch = useDispatch();

    const { dropdownShows } = useSelector((state) => state.shows);

    const halls = useSelector((state) => state.halls?.halls ?? []);

    const [searchParams] = useSearchParams();


    // 1. Prvo definiraj useForm
    const {
        register,
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm({
        mode: "onTouched",
        defaultValues: {
            showId: "",
            hallId: "",
            price: "",
            discount: "",
            localDateTime: "",
            status: "DRAFT"
        }
    });



    // 2. Dohvati sve predstave
    useEffect(() => {
        dispatch(fetchDropdownShows());
    }, [dispatch]);


    // 2a. Dohvati sve dvorane
    useEffect(() => {
        dispatch(fetchAllHall());
    }, [dispatch]);


    // 3. Tek sada koristi reset
    useEffect(() => {
        if (update && performance) {
            reset({
                showId: performance.showId ?? "",
                price: performance.price ?? "",
                discount: performance.discount ?? "",
                localDateTime: performance.localDateTime
                ? performance.localDateTime.slice(0, 16)
                : "",
            status: performance.status ?? "DRAFT"
            });
        }
    }, [update, performance, reset]);




    const isStatusLocked =
    performance?.status === "FINISHED" ||
    performance?.status === "SOLD_OUT";

    const savePerformancehandler = (data) => {

    const queryString = new URLSearchParams({
        pageNumber: String(
            Math.max(0, Number(searchParams.get("page") || 1) - 1)
        )
    }).toString();

    if (!update) {
        // Dodavanje nove izvedbe
        dispatch(
            addPerformanceFromDashboard(
                data,
                toast,
                reset,
                setLoader,
                setOpen,
                queryString
            )
        );

    } else {
        // Ažuriranje postojeće izvedbe
        const sendData = {
            ...data,
            id: performance.id
        };

        dispatch(
            updatePerformanceFromDashboard(
                sendData,
                toast,
                reset,
                setLoader,
                setOpen,
                queryString
            )
        );
    }
};
    


  return (
    <div className='py-5 relative h-full'>
        <form className='space-y-4'
            onSubmit={handleSubmit(savePerformancehandler)}>
            <div className='flex md:flex-row flex-col gap-4 w-full'>
                {update && (
                    <Controller
                        name="status"
                        control={control}
                        rules={{ required: "Odaberite status*" }}
                        render={({ field }) => (
                            <FormControl
                                fullWidth
                                size="small"
                                error={!!errors.status}
                            >
                                <InputLabel id="status-label">
                                    Status
                                </InputLabel>

                                <Select
                                    {...field}
                                    labelId="status-label"
                                    label="Status"
                                    disabled={isStatusLocked}
                                >
                                    <MenuItem value="DRAFT">Nacrt</MenuItem>
                                    <MenuItem value="PUBLISHED">Objavljeno</MenuItem>
                                    {/* <MenuItem value="CANCELLED">Cancelled</MenuItem> */}
                                </Select>

                                {errors.status && (
                                        <p className="text-red-600 text-sm font-semibold mt-1">
                                            {errors.status.message}
                                        </p>
                                    )}
                            </FormControl>
                        )}
                    />
                )}
                {!update && (
                    <Controller
                        name="hallId"
                        control={control}
                        rules={{ required: "Odaberite dvoranu*" }}
                        render={({ field }) => (
                            <FormControl fullWidth size="small" error={!!errors.hallId}>
                                <InputLabel>Dvorana</InputLabel>

                                <Select {...field} label="Dvorana">
                                    {halls.map((hall) => (
                                        <MenuItem key={hall.hallId} value={hall.hallId}>
                                            {hall.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.hallId && (
                                        <p className="text-red-600 text-sm font-semibold mt-1">
                                            {errors.hallId.message}
                                        </p>
                                    )}
                            </FormControl>
                    )}
                    />
                )}
               <Controller
                    name="showId"
                    control={control}
                    rules={{ required: "Odaberite predstavu*" }}
                    render={({ field }) => (
                        <FormControl fullWidth size="small" error={!!errors.showId}>
                            <InputLabel>Predstava</InputLabel>

                            <Select {...field} label="Predstava">
                                {dropdownShows.map((show) => (
                                    <MenuItem key={show.showId} value={show.showId}>
                                        {show.showName}
                                    </MenuItem>
                                ))}
                            </Select>

                            {errors.showId && (
                                        <p className="text-red-600 text-sm font-semibold mt-1">
                                            {errors.showId.message}
                                        </p>
                                    )}
                        </FormControl>
                    )}
            />
            </div>

            <div className='flex md:flex-row flex-col gap-4 w-full'>
                <InputField 
                        label="Cijena"
                        required
                        id="price"
                        type="number"
                        inputMode="decimal"
                        suffix="€"
                        message="Polje je obavezno*"
                        register={register}
                        placeholder="Cijena"
                        errors={errors}
                    />
            </div>
            <div className='flex md:flex-row flex-col gap-4 w-full'>
                <InputField 
                        label="Popust"
                        required
                        id="discount"
                        type="number"
                        suffix="%"
                        message="Polje je obavezno*"
                        register={register}
                        placeholder="Popust"
                        errors={errors}
                    />
            </div>
            
            <div className="flex md:flex-row flex-col gap-4 w-full">
    <div className="flex flex-col w-full">
        <label className="block font-semibold text-sm text-slate-800 mb-1">
            Početak Izvedbe
        </label>

        <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="hr"
        >
            <Controller
                name="localDateTime"
                control={control}
                rules={{ required: "Polje je obavezno*" }}
                render={({ field }) => (
                    <DateTimePicker
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(newValue) =>
                            field.onChange(
                                newValue && newValue.isValid()
                                    ? newValue.format("YYYY-MM-DDTHH:mm:ss")
                                    : ""
                            )
                        }
                        format="DD.MM.YYYY. HH:mm"
                        ampm={false}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                size: "small",
                                error: !!errors.localDateTime
                            }
                        }}
                    />
                )}
            />
        </LocalizationProvider>

        {errors.localDateTime && (
            <p className="text-red-600 text-sm font-semibold mt-1">
                {errors.localDateTime.message}
            </p>
        )}
    </div>
</div>


            <div className='flex w-full justify-between items-center absolute bottom-14'>
                <Button disabled={loader}
                        onClick={() => setOpen(false)}
                        variant='outlined'
                        className='text-white py-[10px] px-4 text-sm font-medium'>
                    Izlaz
                </Button>

                <Button
                    disabled={loader}
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="bg-custom-blue text-white py-[10px] px-4 text-sm font-medium"
                >
                    {loader ? (
                        <div className="flex gap-2 items-center">
                            <Spinners /> Učitavanje...
                        </div>
                    ) : (
                        update ? "Ažuriraj" : "Dodaj izvedbu"
                    )}
                </Button>
            </div>
        </form>
    </div>
  )
}

export default AddPerformanceForm