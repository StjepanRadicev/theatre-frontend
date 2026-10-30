
import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { Divider } from '@mui/material';

export default function ShowViewModal({ open, setOpen, show }) {

    if (!show) return null;

    const {
        showName,
        categoryName,
        duration,
        description
    } = show;

    return (
        <Dialog
            open={open}
            as="div"
            className="relative z-10"
            onClose={() => setOpen(false)}
        >
            <DialogBackdrop className="fixed inset-0 bg-gray-300 opacity-70 transition-opacity" />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full max-w-160 rounded-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                    >
                        <div className="px-6 pt-2 pb-2">
                            <DialogTitle
                                as="h3"
                                className="text-2xl/loose text-slate-800 font-montserrat flex justify-center text-center"
                            >
                                {showName}
                            </DialogTitle>
                        </div>

                        <Divider />

                        <div className="mt-4 flex flex-col gap-3 text-slate-700">
                            <div className="flex justify-between">
                                <span className="font-semibold">Kategorija:</span>
                                <span>{categoryName}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="font-semibold">Trajanje:</span>
                                <span>{duration} min</span>
                            </div>
                        </div>

                        <Divider sx={{ marginTop: 2 }} />

                        <div className="mt-4">
                            <h4 className="font-semibold text-slate-800 mb-2">
                                Opis predstave
                            </h4>

                            <p className="text-sm/6 text-slate-700">
                                {description}
                            </p>
                        </div>

                        <div className="mt-6">
                            <Button
                                className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-1.5 text-sm/6 font-semibold text-gray-700 shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-200 border"
                                onClick={() => setOpen(false)}
                            >
                                Zatvori
                            </Button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}
