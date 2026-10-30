import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPerformanceSeats, toggleSeat, clearSelectedSeats } from "../../store/reducers/seatReducer";
import { addToCart } from "../../store/actions";
import toast from "react-hot-toast";



const SeatSelection = ({ performanceId,  onClose }) => {
  const dispatch = useDispatch();

  const { performances } = useSelector((state) => state.performances);

const performance = performances.find(
    (item) => item.performanceId === performanceId
);


const seatState = useSelector((state) => state.seats);

const performanceSeats = seatState?.performanceSeats || [];
const selectedSeats = seatState?.selectedSeats || [];
const loading = seatState?.loading || false;
const error = seatState?.error || null;
const cart = useSelector((state) => state.carts.cart || []);






  useEffect(() => {
    
    dispatch(fetchPerformanceSeats(performanceId));
  }, [dispatch, performanceId]);


    const isSelected = (performanceSeatId) => {
    return selectedSeats.some(
      (seat) => seat.performanceSeatId === performanceSeatId
    );

    };

    // const addToCartHandler = (cartItems) => {
    //   dispatch(addToCart(cartItems, 1));
    // };
   const addToCartHandler = () => {
  selectedSeats.forEach((seat) => { 
    dispatch(addToCart({
      id: seat.performanceSeatId,
      performanceSeatId: seat.performanceSeatId,
      performanceId: performance?.performanceId,
      rowLabel: seat.rowLabel,
      seatNumber: seat.seatNumber,
      price: seat.price,
      section: `${seat.rowLabel} ${seat.seatNumber}`,
      performanceName: performance?.showName,
      status: seat.status,
      type: "seat",
      image: performance?.image,
      time: performance?.localDateTime,
    }, 1, toast));

    
  });
  dispatch(clearSelectedSeats());
};

const isInCart = (performanceSeatId) => {
  return cart.some(
    (item) => item.performanceSeatId === performanceSeatId
  );
};


 
return (
  <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-3 sm:p-6">

    <div className="bg-white text-black w-full max-w-5xl max-h-[95dvh] overflow-y-auto rounded-xl p-4 sm:p-6 relative shadow-xl">

      {/* ZATVARANJE */}
      <button
        onClick={onClose}
        className="absolute top-3 right-4 text-3xl font-bold text-gray-700 hover:text-black"
        aria-label="Zatvori"
      >
        ×
      </button>

      {/* NASLOV */}
      <div className="text-center mb-6 pr-6 pl-6">
        <h2 className="text-xl sm:text-2xl font-bold">
          {performance?.showName}
        </h2>

        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          {performance?.localDateTime
            ? new Date(performance.localDateTime).toLocaleString("hr-HR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
            : ""}
        </p>

        <p className="text-sm text-gray-500 mt-2">
          Odaberi sjedala za predstavu
        </p>
      </div>

      {loading && (
        <p className="text-center">Učitavanje sjedala...</p>
      )}

      {error && (
        <p className="text-center text-red-600">
          Greška: {error}
        </p>
      )}

      {!loading && !error && performanceSeats.length === 0 && (
        <p className="text-center text-gray-600">
          Nema pronađenih sjedala.
        </p>
      )}

      {!loading && !error && performanceSeats.length > 0 && (
        <>
          {/* PLATNO */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="h-4 rounded-[50%] border-t-[5px] border-gray-500 shadow-sm" />
            <p className="text-center text-xs sm:text-sm tracking-widest text-gray-500 mt-2">
              PLATNO / POZORNICA
            </p>
          </div>

          {/* SJEDALA */}
          <div className="w-full overflow-x-auto pb-4">
            <div className="min-w-[540px] max-w-[750px] mx-auto space-y-2">

              {Array.from({ length: 8 }, (_, index) => {
                const rowLabel = String.fromCharCode(65 + index);

                return (
                  <div
                    key={rowLabel}
                    className="grid grid-cols-[24px_repeat(10,minmax(0,1fr))_24px] gap-1 sm:gap-2 items-center"
                  >
                    <span className="text-center font-bold text-sm">
                      {rowLabel}
                    </span>

                    {Array.from({ length: 10 }, (_, seatIndex) => {
                      const seatNumber = seatIndex + 1;

                      const performanceSeat = performanceSeats.find(
                        (seat) =>
                          String(seat.rowLabel).toUpperCase() === rowLabel &&
                          Number(seat.seatNumber) === seatNumber
                      );

                      if (!performanceSeat) {
                        return <div key={seatNumber} />;
                      }

                      const seatId = performanceSeat.performanceSeatId;
                      const reserved = performanceSeat.status !== "AVAILABLE";
                      const inCart = isInCart(seatId);
                      const selected = isSelected(seatId);

                      return (
                        <button
                          key={seatId}
                          disabled={reserved || inCart}
                          onClick={() =>
                            dispatch(toggleSeat(performanceSeat))
                          }
                          title={`${rowLabel}${seatNumber}`}
                          className={`
                            h-9 sm:h-11 rounded-md text-xs sm:text-sm
                            font-semibold transition-colors
                            ${
                              reserved
                                ? "bg-red-600 text-white cursor-not-allowed opacity-70"
                                : inCart
                                ? "bg-blue-600 text-white cursor-not-allowed"
                                : selected
                                ? "bg-green-600 text-white"
                                : "bg-gray-700 text-white hover:bg-gray-900"
                            }
                          `}
                        >
                          {seatNumber}
                        </button>
                      );
                    })}

                    <span className="text-center font-bold text-sm">
                      {rowLabel}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* LEGENDA */}
          <div className="flex flex-wrap justify-center gap-4 mt-5 text-xs sm:text-sm">
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-gray-700" />
              Slobodno
            </span>

            <span className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-green-600" />
              Odabrano
            </span>

            <span className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-red-600" />
              Zauzeto
            </span>

            <span className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-blue-600" />
              U košarici
            </span>
          </div>
        </>
      )}

      {/* KOŠARICA */}
      <div className="mt-8 text-center">
        <p className="font-semibold mb-4">
          Odabrana sjedala: {selectedSeats.length}
        </p>

        <button
          onClick={addToCartHandler}
          disabled={selectedSeats.length === 0}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Dodaj u košaricu
        </button>
      </div>
    </div>
  </div>
);

};



export default SeatSelection;