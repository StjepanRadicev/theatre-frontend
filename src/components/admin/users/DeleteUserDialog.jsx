
import React from "react";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import { FaExclamationTriangle } from "react-icons/fa";

const DeleteUserDialog = ({ open, setOpen, user, onConfirm, isDeleting }) => {
    return (
        <Dialog
            open={open}
            onClose={() => {
                if (!isDeleting) setOpen(false);
            }}
            className="relative z-50"
        >
            <DialogBackdrop className="fixed inset-0 bg-black/50" />

            <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">

                    <div className="flex items-center gap-3 mb-4">
                        <FaExclamationTriangle className="text-red-500 text-2xl" />

                        <DialogTitle className="text-xl font-semibold text-gray-800">
                            Potvrda brisanja
                        </DialogTitle>
                    </div>

                    <p className="text-gray-600 mb-6">
                        Jeste li sigurni da želite obrisati korisnika{" "}
                        <strong>{user?.userName}</strong>?
                        Ovu radnju nije moguće poništiti.
                    </p>

                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setOpen(false)}
                            disabled={isDeleting}
                            className="px-4 py-2 rounded-md border border-gray-300 disabled:opacity-50"
                        >
                            Odustani
                        </button>
                        
                        <button
                            onClick={onConfirm}
                            disabled={isDeleting}
                            className={`px-4 py-2 rounded-md bg-red-500 text-white
                                ${isDeleting
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-red-600"
                                }`}
                        >
                            {isDeleting ? "Brisanje..." : "Obriši korisnika"}
                        </button>

                    </div>

                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default DeleteUserDialog;
