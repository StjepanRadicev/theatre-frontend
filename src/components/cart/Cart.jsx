import { MdArrowBack, MdShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ItemContent from "./ItemContent";
import CartEmpty from "./CartEmpty";
import { formatPrice } from "../../utils/formatPrice";

const Cart = () => {
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.carts);
    const navigate = useNavigate();
    const newCart = { ...cart };

    newCart.totalPrice = cart?.reduce(
        (acc, cur) => acc + Number(cur?.price || 0), 0
    );

    if (!cart || cart.length === 0) return <CartEmpty />

    const handleCheckout = () => {
        if (cart.length === 0) return;

        dispatch({ type: "LOCK_CART" });

        localStorage.setItem("checkoutActive", "true");

        navigate("/checkout");

    };

    return (
        <div className="lg:px-14 sm:px-8 px-4 py-10">
            <div className="flex flex-col items-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
                    <MdShoppingCart size={36} className="text-gray-700" />
                    Vaša košarica
                </h1>
                <p className="text-lg text-gray-600 mt-2">
                    Sva odabrana sjedala
                </p>
            </div>
            <div className="grid md:grid-cols-5 grid-cols-4 gap-4 pb-2 font-semibold items-center">

                <div className="md:col-span-2 justify-self-start text-lg text-slate-800 lg:ps-4">
                    Naziv predstave
                </div>

                <div className="justify-self-center text-lg tetx-slate-800">
                    Lokacija sjedala
                </div>

                <div className="justify-self-center text-lg tetx-slate-800">
                    Datum i vrijeme
                </div>

                <div className="justify-self-center text-lg tetx-slate-800">
                    Cijena
                </div>

            </div>

            <div>
                {cart && cart.length > 0 && 
                    cart.map((item, i) => <ItemContent key={i} {...item} />)}
            </div>

             <div className="border-t-[1.5px] border-slate-200 py-4 flex sm:flex-row sm:px-0 px-2 flex-col sm:justify-between gap-4">
                    <div></div>
                <div className="flex text-sm gap-1 flex-col">
                    <div className="flex justify-between w-full md:text-lg text-sm font-semibold">
                        <span>Ukupna cijena </span>
                        <span>{formatPrice(newCart?.totalPrice)}</span>

                       
                    </div>
                    {/* <Link className="w-full flex justify-end" to="/checkout"> */}
                        <button
                        onClick= {handleCheckout}
                        className="font-semibold w-[300px] py-2 px-4 rounded-sm bg-custom-blue text-white flex items-center justify-center gap-2 hover:text-gray-300 transition duration-500">
                            <MdShoppingCart size={20} />
                            Naplata
                        </button>
                   {/* </Link> */}

                    <Link className=" flex gap-2 items-center mt-2" to="/">
                        <MdArrowBack />
                        <span>Nastavite kupnju</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;