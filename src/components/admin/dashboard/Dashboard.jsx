import React, { useEffect } from 'react'
import DashboarsOverview from './DashboarsOverview'
import { FaBoxOpen, FaShoppingCart,  FaTicketAlt } from 'react-icons/fa'
import { RiMoneyEuroCircleFill, RiMoneyEuroCircleLine } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { analyticsAction, monthlyRevenueAction, showOccupancyAction, monthlySoldTicketsAction } from '../../../store/actions';
import { LoaderIcon } from 'react-hot-toast';
import MonthlyRevenueChart from "./MonthlyRevenueChart";
import ShowOccupancyChart from "./ShowOccupancyChart";
import MonthlySoldTicketsChart from "./MonthlySoldTicketsChart";


const Dashboard = () => {
  const dispatch = useDispatch();
  const { isLoading, errorMessage } = useSelector((state) => state.errors); 

  const {
      analytics: {
          performanceCount,
          totalRevenue,
          totalOrders,
          totalSoldTickets
      },
      monthlyRevenue,
      monthlySoldTickets,
      showOccupancy
  } = useSelector((state) => state.admin);



  useEffect(() => {
      dispatch(analyticsAction());
      dispatch(monthlyRevenueAction());
      dispatch(showOccupancyAction());
      dispatch(monthlySoldTicketsAction());
  }, [dispatch]);


  if (isLoading) {
    return <LoaderIcon />
  }

  if (errorMessage) {
    return <errorMessage message={errorMessage} />;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
                <DashboarsOverview 
                  title="Ukupno Izvedbi"
                  amount={performanceCount}
                  Icon={FaBoxOpen}
                />

                <DashboarsOverview 
                  title="Ukupno Rezervacija"
                  amount={totalOrders}
                  Icon={FaShoppingCart}
                />

                <DashboarsOverview
                  title="Prodane ulaznice"
                  amount={totalSoldTickets}
                  Icon={FaTicketAlt}
              />

                <DashboarsOverview 
                  title="Ukupan Prihod"
                  amount={totalRevenue}
                  Icon={RiMoneyEuroCircleFill}
                  revenue
                />

               
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <MonthlyRevenueChart monthlyRevenue={monthlyRevenue} />

        <MonthlySoldTicketsChart
            monthlySoldTickets={monthlySoldTickets}
        />
    </div>

      <ShowOccupancyChart showOccupancy={showOccupancy} />
    </div>
  )
}

export default Dashboard