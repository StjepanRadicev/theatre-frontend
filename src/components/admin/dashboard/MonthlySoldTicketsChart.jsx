
import React from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

const MonthlySoldTicketsChart = ({ monthlySoldTickets = [] }) => {

    const monthNames = [
        "Sij", "Velj", "Ožu", "Tra",
        "Svi", "Lip", "Srp", "Kol",
        "Ruj", "Lis", "Stu", "Pro"
    ];

    const chartData = monthlySoldTickets.map((item) => ({
        month: `${monthNames[item.month - 1]} ${item.year}`,
        tickets: Number(item.soldTickets)
    }));

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mt-6">

            <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-800">
                    Mjesečna prodaja ulaznica
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                    Broj prodanih ulaznica po mjesecima
                </p>
            </div>

            {chartData.length === 0 ? (
                <p className="text-center text-slate-500 py-10">
                    Nema podataka o prodanim ulaznicama.
                </p>
            ) : (
                <div className="w-full h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            margin={{
                                top: 10,
                                right: 15,
                                left: 0,
                                bottom: 5
                            }}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="#e2e8f0"
                            />

                            <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fill: "#64748b",
                                    fontSize: 12
                                }}
                                tickMargin={12}
                            />

                            <YAxis
                                allowDecimals={false}
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fill: "#64748b",
                                    fontSize: 12
                                }}
                                tickMargin={8}
                                width={45}
                            />

                            <Tooltip
                                formatter={(value) => [
                                    Number(value).toLocaleString("hr-HR"),
                                    "Prodane ulaznice"
                                ]}
                                contentStyle={{
                                    borderRadius: "10px",
                                    border: "1px solid #e2e8f0",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
                                }}
                                cursor={{ fill: "#f1f5f9" }}
                            />

                            <Bar
                                dataKey="tickets"
                                fill="#14b8a6"
                                radius={[6, 6, 0, 0]}
                                maxBarSize={60}
                                minPointSize={2}
                            />

                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}

        </div>
    );
};

export default MonthlySoldTicketsChart;
