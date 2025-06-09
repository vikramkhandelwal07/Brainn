import { useState } from "react"
import { Chart, registerables } from "chart.js"
import { Pie, Bar, Line, Doughnut } from "react-chartjs-2"

Chart.register(...registerables)

export default function InstructorPanel() {
  // Sample data - replace with your actual courses prop
  const courses = [
    { courseName: "React Fundamentals", totalStudentsEnrolled: 150, totalAmountGenerated: 45000 },
    { courseName: "JavaScript Mastery", totalStudentsEnrolled: 120, totalAmountGenerated: 36000 },
    { courseName: "Node.js Backend", totalStudentsEnrolled: 90, totalAmountGenerated: 27000 },
    { courseName: "Python Data Science", totalStudentsEnrolled: 200, totalAmountGenerated: 60000 },
    { courseName: "UI/UX Design", totalStudentsEnrolled: 80, totalAmountGenerated: 24000 }
  ]

  // State to keep track of the currently selected chart
  const [currChart, setCurrChart] = useState("students")
  const [chartType, setChartType] = useState("pie")

  // Enhanced professional color palette
  const generateProfessionalColors = (numColors) => {
    const colorSets = [
      { bg: '#667eea', border: '#5a67d8' },
      { bg: '#f093fb', border: '#e879f9' },
      { bg: '#4facfe', border: '#3b82f6' },
      { bg: '#43e97b', border: '#10b981' },
      { bg: '#fa71cd', border: '#ec4899' },
      { bg: '#ff8a80', border: '#f87171' },
      { bg: '#ffecd2', border: '#fbbf24' },
      { bg: '#a8edea', border: '#06b6d4' },
      { bg: '#fed6e3', border: '#f472b6' },
      { bg: '#d299c2', border: '#a855f7' }
    ]

    return colorSets.slice(0, numColors)
  }

  const professionalColors = generateProfessionalColors(courses.length)

  // Data for the chart displaying student information
  const chartDataStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        label: 'Students Enrolled',
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: professionalColors.map(color => color.bg),
        borderColor: professionalColors.map(color => color.border),
        borderWidth: 2,
        hoverBorderWidth: 3,
        hoverBorderColor: '#ffffff',
        hoverBackgroundColor: professionalColors.map(color => color.border),
      },
    ],
  }

  // Data for the chart displaying income information
  const chartIncomeData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        label: 'Revenue Generated (₹)',
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: professionalColors.map(color => color.bg),
        borderColor: professionalColors.map(color => color.border),
        borderWidth: 2,
        hoverBorderWidth: 3,
        hoverBorderColor: '#ffffff',
        hoverBackgroundColor: professionalColors.map(color => color.border),
      },
    ],
  }

  // Combined data for comparison charts
  const combinedData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        label: 'Students Enrolled',
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: 'rgba(102, 126, 234, 0.8)',
        borderColor: '#667eea',
        borderWidth: 2,
        yAxisID: 'y',
      },
      {
        label: 'Revenue (₹ in thousands)',
        data: courses.map((course) => course.totalAmountGenerated / 1000),
        backgroundColor: 'rgba(67, 233, 123, 0.8)',
        borderColor: '#43e97b',
        borderWidth: 2,
        yAxisID: 'y1',
      },
    ],
  }

  // Revenue per student data
  const revenuePerStudentData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        label: 'Revenue per Student (₹)',
        data: courses.map((course) =>
          Math.round(course.totalAmountGenerated / course.totalStudentsEnrolled)
        ),
        backgroundColor: professionalColors.map(color => color.bg),
        borderColor: professionalColors.map(color => color.border),
        borderWidth: 2,
        fill: false,
        tension: 0.4,
      },
    ],
  }

  // Chart options for different chart types
  const pieOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 12,
            family: 'Inter, system-ui, sans-serif'
          },
          color: '#cbd5e1',
          generateLabels: function (chart) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => {
                const dataset = data.datasets[0];
                const value = dataset.data[i];
                const total = dataset.data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);

                return {
                  text: `${label} (${percentage}%)`,
                  fillStyle: dataset.backgroundColor[i],
                  strokeStyle: dataset.borderColor[i],
                  lineWidth: dataset.borderWidth,
                  hidden: false,
                  index: i
                };
              });
            }
            return [];
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        borderColor: '#475569',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);

            if (currChart === 'students') {
              return `${label}: ${value} students (${percentage}%)`;
            } else {
              return `${label}: ₹${value.toLocaleString()} (${percentage}%)`;
            }
          }
        }
      }
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1000,
      easing: 'easeInOutQuart'
    }
  }

  const barOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        borderColor: '#475569',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: function (context) {
            const value = context.parsed.y;
            if (currChart === 'students') {
              return `Students: ${value}`;
            } else {
              return `Revenue: ₹${value.toLocaleString()}`;
            }
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#cbd5e1'
        },
        grid: {
          color: 'rgba(203, 213, 225, 0.1)'
        }
      },
      y: {
        ticks: {
          color: '#cbd5e1'
        },
        grid: {
          color: 'rgba(203, 213, 225, 0.1)'
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart'
    }
  }

  const combinedOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#cbd5e1',
          font: {
            size: 12,
            family: 'Inter, system-ui, sans-serif'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        borderColor: '#475569',
        borderWidth: 1,
        cornerRadius: 8,
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#cbd5e1'
        },
        grid: {
          color: 'rgba(203, 213, 225, 0.1)'
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        ticks: {
          color: '#cbd5e1'
        },
        grid: {
          color: 'rgba(203, 213, 225, 0.1)'
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        ticks: {
          color: '#cbd5e1'
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  }

  const lineOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        borderColor: '#475569',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: function (context) {
            return `Revenue per Student: ₹${context.parsed.y.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#cbd5e1'
        },
        grid: {
          color: 'rgba(203, 213, 225, 0.1)'
        }
      },
      y: {
        ticks: {
          color: '#cbd5e1'
        },
        grid: {
          color: 'rgba(203, 213, 225, 0.1)'
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart'
    }
  }

  const renderChart = () => {
    const data = currChart === "students" ? chartDataStudents :
      currChart === "income" ? chartIncomeData :
        currChart === "combined" ? combinedData : revenuePerStudentData

    const options = chartType === "pie" || chartType === "doughnut" ? pieOptions :
      chartType === "bar" ? barOptions :
        chartType === "line" ? lineOptions : combinedOptions

    switch (chartType) {
      case "pie":
        return <Pie data={data} options={options} />
      case "doughnut":
        return <Doughnut data={data} options={options} />
      case "bar":
        return <Bar data={data} options={options} />
      case "line":
        return <Line data={data} options={options} />
      default:
        return <Pie data={data} options={options} />
    }
  }

  return (
    <div className="h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
      {/* Enhanced Header */}
      <div className="relative p-6 border-b border-slate-700/50">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
                Analytics Overview
              </h2>
            </div>
          </div>

          {/* Data Type Toggle */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center bg-slate-700/30 rounded-xl p-1 border border-slate-600/30">
              <button
                onClick={() => setCurrChart("students")}
                className={`relative px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${currChart === "students"
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105"
                    : "text-slate-400 hover:text-slate-300"
                  }`}
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  <span>Students</span>
                </div>
              </button>

              <button
                onClick={() => setCurrChart("income")}
                className={`relative px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${currChart === "income"
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg transform scale-105"
                    : "text-slate-400 hover:text-slate-300"
                  }`}
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  <span>Income</span>
                </div>
              </button>

              <button
                onClick={() => setCurrChart("combined")}
                className={`relative px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${currChart === "combined"
                    ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg transform scale-105"
                    : "text-slate-400 hover:text-slate-300"
                  }`}
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>Combined</span>
                </div>
              </button>

              <button
                onClick={() => setCurrChart("efficiency")}
                className={`relative px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${currChart === "efficiency"
                    ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg transform scale-105"
                    : "text-slate-400 hover:text-slate-300"
                  }`}
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span>Efficiency</span>
                </div>
              </button>
            </div>

            {/* Chart Type Toggle */}
            <div className="flex items-center bg-slate-700/30 rounded-xl p-1 border border-slate-600/30">
              {["pie", "doughnut", "bar", "line"].map((type) => (
                <button
                  key={type}
                  onClick={() => setChartType(type)}
                  className={`relative px-3 py-2 rounded-lg font-medium text-xs transition-all duration-200 ${chartType === type
                      ? "bg-slate-600 text-white shadow-md"
                      : "text-slate-400 hover:text-slate-300"
                    }`}
                  disabled={currChart === "combined" && (type === "pie" || type === "doughnut")}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Chart Description */}
          <p className="text-slate-400 font-medium">
            {currChart === "students" && "Student enrollment distribution across your courses"}
            {currChart === "income" && "Revenue distribution across your courses"}
            {currChart === "combined" && "Students vs Revenue comparison across courses"}
            {currChart === "efficiency" && "Revenue per student efficiency across courses"}
          </p>
        </div>
      </div>

      {/* Chart Container */}
      <div className="p-6 h-full">
        <div className="relative h-full">
          {/* Chart Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800/20 to-slate-700/10 rounded-xl"></div>

          {/* Chart */}
          <div className="relative h-full flex flex-col">
            <div className="flex-1 min-h-0">
              {renderChart()}
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="px-6 pb-6">
        <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/30">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center justify-between">
              <div className="text-slate-400">
                Total Students:
              </div>
              <div className="font-bold text-slate-200">
                {courses.reduce((acc, course) => acc + course.totalStudentsEnrolled, 0)}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-slate-400">
                Total Revenue:
              </div>
              <div className="font-bold text-slate-200">
                ₹{courses.reduce((acc, course) => acc + course.totalAmountGenerated, 0).toLocaleString()}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-slate-400">
                Avg Students/Course:
              </div>
              <div className="font-semibold text-slate-300">
                {Math.round(courses.reduce((acc, course) => acc + course.totalStudentsEnrolled, 0) / courses.length)}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-slate-400">
                Avg Revenue/Student:
              </div>
              <div className="font-semibold text-slate-300">
                ₹{Math.round(courses.reduce((acc, course) => acc + course.totalAmountGenerated, 0) / courses.reduce((acc, course) => acc + course.totalStudentsEnrolled, 0)).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}