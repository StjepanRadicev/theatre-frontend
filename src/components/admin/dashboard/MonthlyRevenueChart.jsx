
import React from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

const MonthlyRevenueChart = ({ monthlyRevenue = [] }) => {

    const monthNames = [
        "Sij", "Velj", "Ožu", "Tra",
        "Svi", "Lip", "Srp", "Kol",
        "Ruj", "Lis", "Stu", "Pro"
    ];

    const formatCurrency = (value) =>
        new Intl.NumberFormat("hr-HR", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(Number(value));

    const chartData = monthlyRevenue.map((item) => ({
        month: `${monthNames[item.month - 1]} ${item.year}`,
        revenue: Number(item.revenue),
    }));

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mt-6">

            <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-800">
                    Mjesečni prihod
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                    Prihod od plaćenih narudžbi po mjesecima
                </p>
            </div>

            {chartData.length === 0 ? (
                <p className="text-center text-slate-500 py-10">
                    Nema podataka o prihodima.
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
                                tick={{ fill: "#64748b", fontSize: 12 }}
                                tickMargin={12}
                            />

                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: "#64748b", fontSize: 12 }}
                                tickFormatter={(value) =>
                                    `${new Intl.NumberFormat("hr-HR", {
                                        maximumFractionDigits: 0
                                    }).format(value)} €`
                                }
                                width={75}
                                tickMargin={8}
                            />

                            <Tooltip
                                formatter={(value) => [
                                    formatCurrency(value),
                                    "Prihod"
                                ]}
                                contentStyle={{
                                    borderRadius: "10px",
                                    border: "1px solid #e2e8f0",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
                                }}
                                cursor={{ fill: "#f1f5f9" }}
                            />

                            <Bar
                                dataKey="revenue"
                                fill="#3b82f6"
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

export default MonthlyRevenueChart;
