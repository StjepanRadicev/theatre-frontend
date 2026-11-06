import { Swiper, SwiperSlide } from 'swiper/react';
import { bannerLists } from '../../utils';
import {Autoplay, Pagination, EffectFade, Navigation} from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPerformances } from '../../store/actions';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import CustomDateInput from '../../utils/DateDisplay';
import { FaShoppingCart } from 'react-icons/fa';
import SeatSelection from '../seat/SeatSelection';

const colors = ["bg-banner-color1", "bg-banner-color2", "bg-banner-color3"]

const HeroBanner = ( ) => {

 const dispatch = useDispatch();

     const {performances} = useSelector(
        (state) => state.performances
    )

     useEffect(() => {
            dispatch(fetchPerformances());
        }, [dispatch]);

    const isAvailable = (availableSeats) => {
        return Number(availableSeats) > 0;
    };

    // const [showSeats, setShowSeats] = useState(false);

    const [selectedPerformanceId, setSelectedPerformanceId] = useState(null);

    const btnLoader = false;

    
return (
    <div className="w-full py-2 rounded-md">
        <Swiper
            grabCursor={true}
            autoplay={{
                delay: 4000,
                disableOnInteraction: false,
            }}
            navigation
            modules={[Pagination, EffectFade, Navigation, Autoplay]}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            slidesPerView={1}
            className="rounded-lg"
        >
            {performances?.slice(0, 3).map((item) => (
                <SwiperSlide key={item.performanceId}>
                    <div className="bg-gray-500 rounded-lg overflow-hidden">

                        <div className="flex flex-col md:flex-row-reverse lg:flex-row items-center justify-center min-h-[400px] md:min-h-[350px] lg:min-h-[400px]">

                            {/* INFORMACIJE */}
                            <div className="w-full md:w-1/2 lg:w-1/2 flex flex-col items-center justify-center text-center p-5 sm:p-8 order-2 md:order-1">

                                <h3 className="text-xl sm:text-2xl lg:text-3xl text-white font-bold">
                                    {item.showName}
                                </h3>

                                <div className="text-base sm:text-lg lg:text-xl text-white font-semibold mt-3">
                                    <DatePicker
                                        selected={item.localDateTime}
                                        onChange={(date) => setDate(date)}
                                        dateFormat="d MMMM yyyy HH:mm"
                                        customInput={<CustomDateInput />}
                                    />
                                </div>

                                <p className="text-gray-100 text-sm sm:text-base mt-4 line-clamp-3 max-w-lg">
                                    {item.description}
                                </p>

                                <button
                                    disabled={
                                        !isAvailable(item.availableSeats) ||
                                        btnLoader
                                    }
                                    onClick={() =>
                                        setSelectedPerformanceId(item.performanceId)
                                    }
                                    className={`mt-6 bg-gray-700 ${
                                        isAvailable(item.availableSeats)
                                            ? "opacity-100 hover:bg-gray-900"
                                            : "opacity-70"
                                    } text-white py-2 px-4 rounded-md transition-colors duration-300 w-full max-w-[180px] flex items-center justify-center gap-2`}
                                >
                                    <FaShoppingCart />
                                    {isAvailable(item.availableSeats)
                                        ? "Kupi ulaznicu"
                                        : "Rasprodano"}
                                </button>
                            </div>

                            {/* SLIKA */}
                            <div className="w-full md:w-1/2 lg:w-1/2 p-4 sm:p-6 order-1 md:order-2">
                                <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] flex items-center justify-center overflow-hidden rounded-lg">
                                    <img
                                        src={item.image}
                                        alt={item.showName}
                                        className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>

        {selectedPerformanceId && (
            <SeatSelection
                performanceId={selectedPerformanceId}
                onClose={() => setSelectedPerformanceId(null)}
            />
        )}
    </div>
);

}

export default HeroBanner;