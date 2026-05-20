import React, { useEffect, useState } from 'react'
import axiosInstance from '../api/axiosInstance'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export const Report = () => {
    const [expenses, setExpenses] = useState([])
    const [isLoading, setisLoading] = useState(true)
    const [reportType, setReportType] = useState("expense")
    const [chartData, setChartData] = useState({labels:[],datasets:[]})

    const getMyData = async () => {
        try {
            setisLoading(true)
            const res = await axiosInstance.get(`/exp/expbyuserid`)
            const rawData = res.data.data
            setExpenses(rawData)
            
            updateChart(rawData, reportType)

        } catch (err) {
            console.error("Error fetching data", err)
        } finally {
            setisLoading(false)
        }
    }

    const updateChart = (allData, type) => {
        if (!Array.isArray(allData)) return

        const filtered = allData.filter(item => {
            if (type === "income") return item.income && item.income > 0
            return item.amount && item.amount > 0
        })

        const labels = filtered.map(item => 
            type === "income" 
                ? (item.incomeCategory?.catName || "General Income")
                : (item.expCat?.catName || "General Expense")
        )

        const values = filtered.map(item => type === "income" ? item.income : item.amount)

        setChartData({
            labels: labels,
            datasets: [
                {
                    label: type === "income" ? "Income Amount" : "Expense Amount",
                    data: values,
                    backgroundColor: [
                        'rgba(34, 197, 94, 0.6)', // Green
                        'rgba(239, 68, 68, 0.6)', // Red
                        'rgba(59, 130, 246, 0.6)', // Blue
                        'rgba(245, 158, 11, 0.6)', // Amber
                        'rgba(139, 92, 246, 0.6)', // Violet
                        'rgba(236, 72, 153, 0.6)', // Pink
                    ],
                    borderColor: '#ffffff',
                    borderWidth: 2,
                }
            ]
        })
    }

    useEffect(() => {
        getMyData()
    }, [])

    useEffect(() => {
        updateChart(expenses, reportType)
    }, [reportType, expenses])

    return (
        <div className="container mx-auto p-8">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
                <div>
                    <h1 className="text-4xl font-black text-stone-900 tracking-tighter uppercase">Financial Analysis</h1>
                    <p className="text-stone-400 mt-1 italic">Visualizing your wealth distribution</p>
                </div>

                <div className="flex items-center bg-stone-100 p-1.5 rounded-2xl shadow-inner">
                    <button
                        onClick={() => setReportType("expense")}
                        className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                            reportType === "expense"
                                ? "bg-white text-stone-900 shadow-sm scale-100"
                                : "text-stone-400 hover:text-stone-600 scale-95"
                        }`}
                    >
                        Expenses
                    </button>
                    <button
                        onClick={() => setReportType("income")}
                        className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                            reportType === "income"
                                ? "bg-white text-stone-900 shadow-sm scale-100"
                                : "text-stone-400 hover:text-stone-600 scale-95"
                        }`}
                    >
                        Income
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-12 h-12 border-4 border-stone-200 border-t-stone-900 rounded-full animate-spin mb-4"></div>
                    <p className="text-stone-400 font-bold uppercase tracking-widest text-xs">Analyzing Data...</p>
                </div>
            ) : chartData.labels.length > 0 ? (
                <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white p-12 rounded-[3rem] shadow-xl border border-stone-50">
                    <div className="max-w-md mx-auto w-full">
                        <Pie 
                            data={chartData} 
                            options={{
                                plugins: {
                                    legend: {
                                        position: 'bottom',
                                        labels: {
                                            padding: 20,
                                            font: {
                                                family: 'Inter',
                                                weight: 'bold',
                                                size: 10
                                            },
                                            usePointStyle: true
                                        }
                                    }
                                }
                            }}
                        />
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-2xl font-black text-stone-800 uppercase tracking-tight">Summary Details</h2>
                        <div className="space-y-4">
                            {chartData.labels.map((label, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl border border-stone-100">
                                    <div className="flex items-center">
                                        <div 
                                            className="w-3 h-3 rounded-full mr-3" 
                                            style={{ backgroundColor: chartData.datasets[0].backgroundColor[idx % 6] }}
                                        ></div>
                                        <span className="font-bold text-stone-700">{label}</span>
                                    </div>
                                    <span className="font-mono font-black text-stone-900">
                                        ${chartData.datasets[0].data[idx].toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-12 bg-white p-12 rounded-[3rem] shadow-xl border border-stone-50">
                    <h2 className="text-2xl font-black text-stone-800 uppercase tracking-tight mb-8">Comparative Analysis</h2>
                    <div className="h-[400px]">
                        <Bar 
                            data={chartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        display: false
                                    }
                                },
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        grid: {
                                            color: 'rgba(0,0,0,0.05)'
                                        },
                                        ticks: {
                                            font: {
                                                family: 'Inter',
                                                weight: 'bold'
                                            }
                                        }
                                    },
                                    x: {
                                        grid: {
                                            display: false
                                        },
                                        ticks: {
                                            font: {
                                                family: 'Inter',
                                                weight: 'bold'
                                            }
                                        }
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
                </>
            ) : (
                <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-stone-200">
                    <p className="text-stone-400 font-bold uppercase tracking-widest">No {reportType} data found for this period</p>
                </div>
            )}
        </div>
    )
}