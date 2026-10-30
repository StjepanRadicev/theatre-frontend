import React, { useEffect } from 'react'
import DashboarsOverview from './DashboarsOverview'
import { FaBoxOpen, FaShoppingCart } from 'react-icons/fa'
import { RiMoneyEuroCircleFill, RiMoneyEuroCircleLine } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { analyticsAction } from '../../../store/actions';
import { LoaderIcon } from 'react-hot-toast';


const Dashboard = () => {
  const dispatch = useDispatch();
  const { isLoading, errorMessage } = useSelector((state) => state.errors); 

  const { 
    analytics: { performanceCount, totalRevenue, totalOrders } 
  } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(analyticsAction());
  }, [dispatch])


  if (isLoading) {
    return <LoaderIcon />
  }

  if (errorMessage) {
    return <errorMessage message={errorMessage} />;
  }

  return (
    <div>
      <div className='flex md:flex-row mt-8 flex-col lg:justify-between
                border border-slate-400 rounded-lg bg-linear-to-r
                 from-blue-50 toblue-100 shadow'  >
                <DashboarsOverview 
                  title="Ukupno Izvedbi"
                  amount={performanceCount}
                  Icon={FaBoxOpen}
                />

                <DashboarsOverview 
                  title="Ukupno Narudžbi"
                  amount={totalOrders}
                  Icon={FaShoppingCart}
                />

                <DashboarsOverview 
                  title="Ukupan Prihod"
                  amount={totalRevenue}
                  Icon={RiMoneyEuroCircleFill}
                  revenue
                />
      </div>
    </div>
  )
}

export default Dashboard