// import { Badge, IconButton } from "@mui/material";
// import { useState } from "react";
// import { FaShoppingCart, FaSignInAlt, FaStore } from "react-icons/fa";
// import { Link, useLocation } from "react-router-dom";
// import { RxCross2 } from "react-icons/rx";
// import { IoIosMenu } from "react-icons/io";
// import { useSelector } from "react-redux";
// import UserMenu from "../UserMenu";


// const Navbar = () => {
//     const path = useLocation().pathname;
//     const [navbarOpen, setNavbarOpen] = useState(false);
//     const { cart } = useSelector((state) => state.carts);
//     const { user } = useSelector((state) => state.auth);

//     return (
//         <div className="h-17 bg-black text-white z-50 flex items-center sticky top-0">
//             <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between">
//                 <Link to="/" className="flex items-center text-2xl font-bold">
//                     <FaStore className="mr-2 text-3xl"/>
//                     <span className="font-[Poppins]">Kazalište</span>
//                 </Link>

//                 <ul className={`flex sm:gap-10 gap-4 sm:items-center text-slate-800 sm:static absolute left-0 top-[70px] sm:shadow-none shadow-md ${
//                       navbarOpen ? "h-fit sm:pb-0 pb-5" : "h-0 overflow-hidden"  
//                     } transition-all duration-100 sm:h-fit sm:bg-none bg-custom-gradient text-white sm:w-fit w-full sm:flex-row flex-col px-4 sm:px-0`}>

//                     <li className="font-medium transition-all duration150"> 
//                         <Link className={`${
//                             path === "/" ? "text-while font-semibold" : "text-gray-200"
//                         }`}
//                         to="/">
//                             Home
//                         </Link>
//                     </li>

//                     <li className="FONT-[500] transition-all duration150"> 
//                         <Link className={`${
//                             path === "/performances" ? "text-while font-semibold" : "text-gray-200"
//                         }`}
//                         to="/performances">
//                             Predstave
//                         </Link>
//                     </li>

//                     <li className="FONT-[500] transition-all duration150"> 
//                         <Link className={`${
//                             path === "/about" ? "text-while font-semibold" : "text-gray-200"
//                         }`}
//                         to="/about">
//                             About
//                         </Link>
//                     </li>

//                     <li className="FONT-[500] transition-all duration150"> 
//                         <Link className={`${
//                             path === "/contact" ? "text-while font-semibold" : "text-gray-200"
//                         }`}
//                         to="/contact">
//                             Contact
//                         </Link>
//                     </li>

//                     <li className="FONT-[500] transition-all duration150"> 
//                         <Link className={`${
//                             path === "/cart" ? "text-while font-semibold" : "text-gray-200"
//                         }`}
//                         to="/cart">
//                             <Badge
//                                 showZero
//                                 badgeContent={cart?.length || 0}
//                                 color="primary"
//                                 overlap="circular"
//                                 anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
//                                 >
//                                     <FaShoppingCart size={25} />

//                             </Badge>
//                         </Link>
//                     </li>

//                     {user && user.id ? (
//                         <li className="FONT-[500] transition-all duration150">
//                             <Link className="flex items-center space-x-2 px-4 py-1.5">
//                                 <UserMenu />
//                             </Link>
//                         </li>
//                     ) : (
//                     <li className="FONT-[500] transition-all duration150"> 
//                         <Link className="flex items-center space-x-2 px-4 py-1.5
//                                 bg-linear-to-r from-purple-600 to-red-500
//                                 text-white font-semibold rounded-md shadow-lg
//                                 hover:from-purple-500 hover:to-red-400 transition
//                                 duration-300 ease-in-out transform ml-5"
//                         to="/login">
//                             <FaSignInAlt />
//                             <span>Login</span>
//                         </Link>
//                     </li>
//                     )}
//                 </ul>

//                 <button 
//                 onClick={() => setNavbarOpen(!navbarOpen)}
//                 className="sm:hidden flex items-center sm:mt-0 mt-2">
//                     {navbarOpen ? (
//                         <RxCross2 className="text-white text-3xl"/>
//                     ) : (
//                         <IoIosMenu className="text-white text-3xl"/>
//                     )}
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default Navbar;










import { Badge, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useState } from "react";
import { FaShoppingCart, FaSignInAlt, FaStore } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { IoIosMenu } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import UserMenu from "../UserMenu";
import { cancelCheckout } from "../../store/actions";

const Navbar = () => {
    const location = useLocation();
    const path = location.pathname;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [navbarOpen, setNavbarOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [pendingPath, setPendingPath] = useState(null);
    const [isCancelling, setIsCancelling] = useState(false);

    const { cart } = useSelector((state) => state.carts);
    const { user } = useSelector((state) => state.auth);

    const handleNavigation = (event, destination) => {
        setNavbarOpen(false);

        if (path === "/checkout" && destination !== "/checkout") {
            event.preventDefault();
            setPendingPath(destination);
            setOpenDialog(true);
        }
    };

    const handleConfirmExit = async () => {
        if (isCancelling) return;

        setIsCancelling(true);

        try {
            const success = await dispatch(cancelCheckout());

            if (!success) {
                toast.error("Failed to cancel reservation.");
                return;
            }

            setOpenDialog(false);

            toast.success("Reservation cancelled successfully.");

            navigate(pendingPath || "/", { replace: true });

            setPendingPath(null);

        } catch (error) {
            console.error(error);
            toast.error("Failed to cancel reservation.");
        } finally {
            setIsCancelling(false);
        }
    };

    const handleStay = () => {
        setOpenDialog(false);
        setPendingPath(null);
    };

    return (
        <>
            <div className="h-17 bg-black text-white z-50 flex items-center sticky top-0">
                <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between">

                    <Link
                        to="/"
                        onClick={(event) => handleNavigation(event, "/")}
                        className="flex items-center text-2xl font-bold"
                    >
                        <FaStore className="mr-2 text-3xl" />
                        <span className="font-[Poppins]">Kazalište</span>
                    </Link>

                    <ul className={`flex sm:gap-10 gap-4 sm:items-center text-slate-800 sm:static absolute left-0 top-[70px] sm:shadow-none shadow-md ${
                        navbarOpen
                            ? "h-fit sm:pb-0 pb-5"
                            : "h-0 overflow-hidden"
                    } transition-all duration-100 sm:h-fit sm:bg-none bg-custom-gradient text-white sm:w-fit w-full sm:flex-row flex-col px-4 sm:px-0`}>

                        <li className="font-medium transition-all duration150">
                            <Link
                                className={path === "/" ? "text-white font-semibold" : "text-gray-200"}
                                to="/"
                                onClick={(event) => handleNavigation(event, "/")}
                            >
                                Naslovnica
                            </Link>
                        </li>

                        <li className="font-medium transition-all duration150">
                            <Link
                                className={path === "/performances" ? "text-white font-semibold" : "text-gray-200"}
                                to="/performances"
                                onClick={(event) => handleNavigation(event, "/performances")}
                            >
                                Izvedbe
                            </Link>
                        </li>

                        {/* <li className="font-medium transition-all duration150">
                            <Link
                                className={path === "/about" ? "text-white font-semibold" : "text-gray-200"}
                                to="/about"
                                onClick={(event) => handleNavigation(event, "/about")}
                            >
                                About
                            </Link>
                        </li>

                        <li className="font-medium transition-all duration150">
                            <Link
                                className={path === "/contact" ? "text-white font-semibold" : "text-gray-200"}
                                to="/contact"
                                onClick={(event) => handleNavigation(event, "/contact")}
                            >
                                Contact
                            </Link>
                        </li> */}

                        <li className="font-medium transition-all duration150">
                            <Link
                                className={path === "/cart" ? "text-white font-semibold" : "text-gray-200"}
                                to="/cart"
                                onClick={(event) => handleNavigation(event, "/cart")}
                            >
                                <Badge
                                    showZero
                                    badgeContent={cart?.length || 0}
                                    color="primary"
                                    overlap="circular"
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                >
                                    <FaShoppingCart size={25} />
                                </Badge>
                            </Link>
                        </li>

                        {user && user.id ? (
                            <li className="font-medium transition-all duration150">
                                <UserMenu />
                            </li>
                        ) : (
                            <li className="font-medium transition-all duration150">
                                <Link
                                    className="flex items-center space-x-2 px-4 py-1.5 bg-linear-to-r from-purple-600 to-red-500 text-white font-semibold rounded-md shadow-lg hover:from-purple-500 hover:to-red-400 transition duration-300 ease-in-out transform ml-5"
                                    to="/login"
                                    onClick={(event) => handleNavigation(event, "/login")}
                                >
                                    <FaSignInAlt />
                                    <span>Prijava</span>
                                </Link>
                            </li>
                        )}
                    </ul>

                    <button
                        onClick={() => setNavbarOpen(!navbarOpen)}
                        className="sm:hidden flex items-center sm:mt-0 mt-2"
                    >
                        {navbarOpen ? (
                            <RxCross2 className="text-white text-3xl" />
                        ) : (
                            <IoIosMenu className="text-white text-3xl" />
                        )}
                    </button>
                </div>
            </div>

            <Dialog
                open={openDialog}
                onClose={isCancelling ? undefined : handleStay}
            >
                <DialogTitle>
                    Prekinuti naplatu?
                </DialogTitle>

                <DialogContent>
                    Jeste li sigurni da želite prekinuti naplatu?
                    Vaša odabrana sjedala će biti obrisana i
                    vaša rezervacija će biti poništena.
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={handleStay}
                        disabled={isCancelling}
                    >
                         Nastavi naplatu
                    </Button>

                    <Button
                        color="error"
                        variant="contained"
                        disabled={isCancelling}
                        onClick={handleConfirmExit}
                    >
                        {isCancelling ? "Otkazivanje..." : "Napusti naplatu"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Navbar;











































