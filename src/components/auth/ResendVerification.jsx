
import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";

const ResendVerification = () => {

    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLoading) return;

        setIsLoading(true);
        setMessage("");
        setError("");

        try {
            const { data } = await api.post(
                "/auth/resend-verification",
                { email: email.trim() }
            );

            setMessage(
                data?.message ||
                "Ako je vaša adresa e-pošte registrirana, a nije potvrđena, bit će poslana poveznica za potvrdu"
            );

        } catch (err) {
            setError(
                err?.response?.data?.message ||
                "Nešto je pošlo krivo. Molimo pokušajte ponovno kasnije."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">

                <h2 className="text-2xl font-semibold text-center mb-3">
                    Ponovno pošalji e-poštu za potvrdu
                </h2>

                <p className="text-gray-600 text-center mb-6">
                    Unesite svoju adresu e-pošte kako biste primili novu poveznicu za potvrdu.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address"
                        className="w-full border rounded-md px-4 py-3"
                    />

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isLoading ? "Sending..." : "Ponovno pošalji e-poštu za potvrdu"}
                    </button>
                </form>

                {message && (
                    <p className="mt-5 text-green-600 text-center">
                        {message}
                    </p>
                )}

                {error && (
                    <p className="mt-5 text-red-600 text-center">
                        {error}
                    </p>
                )}

                <div className="text-center text-sm text-slate-700 mt-6">
                    <Link to="/login" className="text-center text-sm text-slate-700 mt-6 underline hover:text-black hover:font-semibold">
                        Nazad na Prijavu
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default ResendVerification;
