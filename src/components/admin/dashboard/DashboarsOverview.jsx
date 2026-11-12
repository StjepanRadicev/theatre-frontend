
import React from 'react';
import { formatRevenue } from '../../../utils/formatPrice';

const DashboarsOverview = ({ title, amount, Icon, revenue = false }) => {

    const convertAmount = revenue ? Number(amount).toFixed(2) : amount;

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm w-full space-y-4 text-center md:text-start px-5 py-8">

            <div className="flex md:justify-start justify-center items-center gap-2">
                <h3 className="uppercase text-2xl text-slate-700 font-semibold">
                    {title}
                </h3>

                <Icon className="text-slate-800 text-2xl" />
            </div>

            <h1 className="font-bold text-slate-800 text-3xl">
                {revenue ? "EUR  " : null}
                {revenue ? formatRevenue(convertAmount) : convertAmount}
            </h1>

        </div>
    );
};

export default DashboarsOverview;
