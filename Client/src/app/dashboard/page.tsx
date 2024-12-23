"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Users, RadioReceiver, TestTube, Crosshair } from "lucide-react";
import { useGetUsers } from "../hooks/users/useGetUsers";

const staticStatsData = [
  {
    title: "Pilot Users",
    value: "342",
    change: "+8.2%",
    icon: Crosshair,
  },
  {
    title: "Testers",
    value: "648",
    change: "+15.3%",
    icon: TestTube,
  },
];

const barChartData = [
  { name: "Week 1", Users: 200, Devices: 150 },
  { name: "Week 2", Users: 300, Devices: 250 },
  { name: "Week 3", Users: 400, Devices: 300 },
  { name: "Week 4", Users: 500, Devices: 400 },
];

const pieChartData = [
  { name: "Pilot Users", value: 342 },
  { name: "Testers", value: 648 },
  { name: "Devices", value: 342 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

export default function Home() {
  const { data: users } = useGetUsers();

  // Calculate total users
  const totalUsers = users ? users.length : 0;
  // Calculate change percentage (assuming 5% increase for this example)
  const changePercentage = "+5.0%";

  const dynamicStatsData = [
    {
      title: "Total Users",
      value: totalUsers.toString(),
      change: changePercentage,
      icon: Users,
    },
    {
      title: "Devices",
      value: "342",
      change: changePercentage,
      icon: RadioReceiver,
    },
    ...staticStatsData,
  ];

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-xl md:text-2xl lg:text-3xl text-primary font-bold">
            Dashboard Overview
          </CardTitle>
        </div>
        <p className="text-sm md:text-base text-gray-400">
          Monitor your key metrics and recent activities
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {dynamicStatsData?.map((stat, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between space-x-2">
                  <stat.icon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    {stat.change}
                  </span>
                </div>
                <div className="mt-3 sm:mt-4">
                  <p className="text-xs sm:text-sm font-medium text-gray-400">
                    {stat.title}
                  </p>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
                    {stat.value}
                  </h2>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bar Chart */}
        <Card className="p-4">
          <CardTitle className="text-lg font-bold">Users and Devices Growth</CardTitle>
          <div className="w-full overflow-x-auto">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={barChartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Users" fill="#8884d8" />
                <Bar dataKey="Devices" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Pie Chart */}
        <Card className="p-4">
          <CardTitle className="text-lg font-bold">Users Distribution</CardTitle>
          <div className="flex justify-center w-full">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </CardContent>
    </Card>
  );
}
