import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";

export default function OrderDetailsModal({ open, setOpen, order }) {

    if (!order) return null;

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            className="relative z-50"
        >
            <DialogBackdrop className="fixed inset-0 bg-gray-500/50" />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">

                        <DialogTitle className="text-xl font-bold text-slate-800 mb-4">
                            Detalji narudžbe #{order.orderId}
                        </DialogTitle>

                        <div className="space-y-3 text-slate-700">
                            <p>
                                <strong>E-mail:</strong> {order.email}
                            </p>

                            <p>
                                <strong>Datum:</strong>{" "}
                                {new Date(order.orderDate).toLocaleString("hr-HR")}
                            </p>

                            <p>
                                <strong>Status:</strong>{" "}
                                {order.orderStatus === "PAID"
                                    ? "Plaćeno"
                                    : order.orderStatus}
                            </p>

                            <p>
                                <strong>Ukupni iznos:</strong>{" "}
                                {Number(order.totalAmount).toFixed(2)} €
                            </p>
                        </div>


                        <div className="mt-6 border-t pt-4">
                            <h3 className="text-lg font-semibold text-slate-800 mb-3">
                                Podaci o plaćanju
                            </h3>

                            <div className="space-y-2 text-slate-700">
                                <p>
                                    <strong>Način plaćanja:</strong>{" "}
                                    {order.payment?.paymentMethod || "Nije navedeno"}
                                </p>

                                <p>
                                    <strong>Status plaćanja:</strong>{" "}
                                    {order.payment?.pgStatus === "succeeded"
                                        ? "Uspješno"
                                        : order.payment?.pgStatus || "Nije navedeno"}
                                </p>
                            </div>
                        </div>



                        <div className="mt-6 border-t pt-4">
                            <h3 className="text-lg font-semibold text-slate-800 mb-3">
                                Kupljene ulaznice
                            </h3>

                            {order.orderItems?.length > 0 ? (
                                <div className="space-y-3">
                                    {order.orderItems.map((item, index) => (
                                        <div
                                            key={index}
                                            className="border border-gray-200 rounded-md p-4"
                                        >
                                            <p className="font-semibold text-slate-800 mb-2">
                                                Ulaznica {index + 1}
                                            </p>

                                            <div className="space-y-1 text-slate-700">
                                                <p>
                                                    <strong>Predstava:</strong>{" "}
                                                    {item.performanceName || "Nije dostupno"}
                                                </p>

                                                <p>
                                                    <strong>Red:</strong>{" "}
                                                    {item.rowLabel || "Nije dostupno"}
                                                </p>

                                                <p>
                                                    <strong>Broj sjedala:</strong>{" "}
                                                    {item.seatNumber ?? "Nije dostupno"}
                                                </p>

                                                <p>
                                                    <strong>Cijena:</strong>{" "}
                                                    {Number(item.orderedPerformancePrice).toFixed(2)} €
                                                </p>

                                                <p>
                                                    <strong>Popust:</strong>{" "}
                                                    {item.discount ?? 0} %
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">
                                    Nema dostupnih ulaznica.
                                </p>
                            )}
                        </div>

                        <div className="flex justify-end mt-6">
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="px-4 py-2 border rounded-md hover:bg-gray-100"
                            >
                                Zatvori
                            </button>
                        </div>

                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}