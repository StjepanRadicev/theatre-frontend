import { forwardRef } from "react";

const CustomDateInput = forwardRef(({ value, onClick }, ref) => {
    if (!value) {
        return (
            <div
                
                ref={ref}
                className=" flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
            >
                <span className="text-sm text-slate-400">Nema datuma</span>
            </div>
        );
    }
    const dateObj = value = new Date(value);

    const day = dateObj.getDate();
    const month = dateObj.toLocaleString("hr-HR", { month: "long" });
    const year = dateObj.getFullYear();
    const weekday = dateObj.toLocaleString("hr-HR", { weekday: "short" });
    // const hour = dateObj.getHours();
    // const minutes = dateObj.getMinutes().toLocaleString("hr-HR", {minutes: "2-dgit"});
    const time = dateObj.toLocaleTimeString("hr-HR", {
        hour: "2-digit",
        minute: "2-digit",
    });


    return (
        <div
            ref={ref}
            className=" gap-3  items-center justify-center"
        >
            {/* dan u tjednu */}
            <span className="text-xl uppercase tracking-widest text-slate-900">
                {weekday}
            </span>

            {/* veliki broj */}
            <span className="text-5xl font-cinema tracking-widest text-slate-800 leading-none pl-4">
                {day}
            </span>

            {/* mjesec + godina */}
            <span className="text-2xl uppercase tracking-wide text-slate-600 flex font-monserrat mt-5">
                {month} 
            </span>

            <span className="text-2xl uppercase tracking-wide text-slate-900 flex font-montserrat mt-5">
                {time}
            </span>
        </div>
    );
});
export default CustomDateInput;