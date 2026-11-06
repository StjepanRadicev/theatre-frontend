
const InputField = ({
    label,
    id,
    type,
    errors,
    register,
    required,
    message,
    className,
    min,
    value,
    placeholder,
    suffix,
    validate,
}) => {
    return (
        <div className="flex flex-col gap-1 w-full">
            <label
                htmlFor={id}
                className={`${className || ""} font-semibold text-sm text-slate-800`}
            >
                {label}
            </label>

            <div className="relative w-full">
                <input
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    step={
                        id === "price" ? "0.01" :
                        id === "discount" ? "1" :
                        id === "duration" ? "1" :
                        undefined
                    }
                    min={id === "duration" ? 1 : undefined}
                    max={id === "duration" ? 360 : undefined}
                    className={`${className || ""} w-full px-2 py-2 ${
                        suffix ? "pr-12" : ""
                    } border outline-none bg-transparent text-slate-800 rounded-md ${
                        errors?.[id]?.message
                            ? "border-red-500"
                            : "border-slate-700"
                    }`}
                    {...register(id, {
                        required: {
                            value: required,
                            message
                        },
                        minLength: min
                            ? {
                                value: min,
                                message: `Minimum ${min} characters required`
                            }
                            : undefined,
                        pattern:
                            type === "email"
                                ? {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
                                    message: "Invalid email"
                                }
                                : type === "url"
                                ? {
                                    value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[\w .-]*)*\/?$/,
                                    message: "Please enter a valid url"
                                }
                                : undefined,

                                                        // NOVO - validacija cijene i popusta
                            validate: (value) => {
                                if (value === "" || value == null) return true;

                                if (id === "price") {
                                    if (!/^\d+(\.\d{1,2})?$/.test(value)) {
                                        return "Vrijednsot nije ispravna";
                                    }

                                    if (Number(value) <= 0) {
                                        return "Vrijednsot nije ispravna";
                                    }
                                }

                                if (id === "discount") {
                                    if (!/^\d+$/.test(value)) {
                                        return "Vrijednost nije ispravna";
                                    }

                                    if (Number(value) > 100) {
                                        return "Vijednost nije ispravna";
                                    }
                                }

                                if (id === "duration") {
                                    if (!/^\d+$/.test(value)) {
                                        return "Vrijednost nije ispravna";
                                    }

                                    if (Number(value) < 1 || Number(value) > 360) {
                                        return "Trajanje mora biti između 1 i 360 minuta";
                                    }
                                }

                                if (validate) {
                                    return validate(value);
                                }
                                return true;
                            }
                    })}
                />

                {suffix && (
                    <span
                        className="absolute right-3 top-1/2 -translate-y-1/2
                                   text-gray-500 pointer-events-none"
                    >
                        {suffix}
                    </span>
                )}
            </div>

            {errors?.[id]?.message && (
                <p className="text-sm font-semibold text-red-600 mt-0">
                    {errors[id].message}
                </p>
            )}
        </div>
    );
};

export default InputField;
