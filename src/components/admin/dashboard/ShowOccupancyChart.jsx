
import React from "react";

const ShowOccupancyChart = ({ showOccupancy = [] }) => {

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mt-6">

            <div className="mb-8">
                <h2 className="text-lg font-semibold text-slate-800">
                    Top 5 predstava prema popunjenosti
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                    Postotak prodanih sjedala kroz sve izvedbe predstave
                </p>
            </div>

            {showOccupancy.length === 0 ? (
                <p className="text-center text-slate-500 py-10">
                    Nema podataka o popunjenosti predstava.
                </p>
            ) : (
                <div className="space-y-7">

                    {showOccupancy.map((show) => {

                        const occupancy = Number(show.occupancyPercentage);

                        return (
                            <div key={show.showId}>

                                <div className="flex items-start justify-between gap-4 mb-3">

                                    <div className="min-w-0">
                                        <h3 className="font-semibold text-slate-800">
                                            {show.showName}
                                        </h3>

                                        <p className="text-sm text-slate-500 mt-1">
                                            {show.performanceCount} izvedbi
                                            {" · "}
                                            {show.soldSeats} / {show.totalSeats} sjedala
                                        </p>
                                    </div>

                                    <span className="shrink-0 rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700">
                                        {occupancy.toFixed(2)} %
                                    </span>

                                </div>

                                <div
                                    className="w-full bg-slate-100 rounded-full h-3 overflow-hidden"
                                    role="progressbar"
                                    aria-label={`Popunjenost predstave ${show.showName}`}
                                    aria-valuenow={occupancy}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                >
                                    <div
                                        className="bg-blue-500 h-full rounded-full transition-all duration-500"
                                        style={{
                                            width: `${Math.min(
                                                100,
                                                Math.max(0, occupancy)
                                            )}%`
                                        }}
                                    />
                                </div>

                                <div className="flex justify-between mt-2 text-xs text-slate-400">
                                    <span>0 %</span>
                                    <span>100 %</span>
                                </div>

                            </div>
                        );
                    })}

                </div>
            )}
        </div>
    );
};

export default ShowOccupancyChart;
