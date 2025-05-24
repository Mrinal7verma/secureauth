import React from "react";

const DashboardStats = ({ users, isAdmin }) => {
  const totalUsers = users.length;
  const adminUsers = users.filter((user) => user.role === "Admin").length;
  const regularUsers = users.filter((user) => user.role === "Employee").length;
  const recentUsers = users.filter((user) => {
    const userDate = new Date(user.createdAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return userDate > weekAgo;
  }).length;

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
          />
        </svg>
      ),
      bgColor: "from-blue-400 to-blue-500",
      textColor: "text-blue-600",
    },
    {
      title: "Admin Users",
      value: adminUsers,
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      bgColor: "from-purple-400 to-purple-500",
      textColor: "text-purple-600",
    },
    {
      title: "Employee Users",
      value: regularUsers,
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      bgColor: "from-green-400 to-green-500",
      textColor: "text-green-600",
    },
    {
      title: "New This Week",
      value: recentUsers,
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      ),
      bgColor: "from-pink-400 to-pink-500",
      textColor: "text-pink-600",
    },
  ];

  // Only show admin stats if user is admin
  const visibleStats = isAdmin
    ? stats
    : stats.filter((stat) => stat.title !== "Admin Users");

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 hover:border-slate-200 group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-slate-800">
                  {stat.value}
                </p>
              </div>
              <div
                className={`p-3 rounded-xl bg-gradient-to-r ${stat.bgColor} text-white shadow-lg group-hover:scale-110 transition-transform duration-200`}
              >
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardStats;
