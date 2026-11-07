
import React, { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../../api/api";

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [status, setStatus] = useState("loading");
    const [message, setMessage] = useState("");

    const requestedToken = useRef(null);

    useEffect(() => {
        if (!token) {
            setStatus("error");
            setMessage("Verification token is missing.");
            return;
        }

        // Prevent duplicate requests for the same token
        if (requestedToken.current === token) return;

        requestedToken.current = token;

        const verifyEmail = async () => {
            try {
                const { data } = await api.post(
                    "/auth/verify-email",
                    { token }
                );

                setStatus("success");
                setMessage(
                    data?.message || "Email verified successfully!"
                );

            } catch (error) {
                setStatus("error");
                setMessage(
                    error?.response?.data?.message ||
                    "Email verification failed."
                );
            }
        };

        verifyEmail();

    }, [token]);

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">

                {status === "loading" && (
                    <>
                        <h2 className="text-xl font-semibold mb-3">
                            Verifikacija vašega emaila...
                        </h2>
                        <p className="text-gray-600">
                            Molimo pričekajte...
                        </p>
                    </>
                )}

                {status === "success" && (
                    <>
                        <h2 className="text-2xl font-semibold text-green-600 mb-3">
                            Email je uspješno verificiran
                        </h2>

                        <p className="text-gray-600 mb-6">
                            {message}
                        </p>

                        <Link
                            to="/login"
                            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                        >
                            Prijavite se
                        </Link>
                    </>
                )}

                {status === "error" && (
                    <>
                        <h2 className="text-xl font-semibold text-red-600 mb-3">
                            Provjera nije uspjela
                        </h2>

                        <p className="text-gray-600">
                            {message}
                        </p>
                    </>
                )}

            </div>
        </div>
    );
};

export default VerifyEmail;
