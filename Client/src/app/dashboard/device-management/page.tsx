"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

const mockDeviceData = [
  { id: 1, device_id: "thyro_001", assigned_user: "User A", last_active: "2024-12-01 10:00 AM" },
  { id: 2, device_id: "thyro_002", assigned_user: "User B", last_active: "2024-12-01 11:00 AM" },
  { id: 3, device_id: "thyro_003", assigned_user: "User C", last_active: "2024-12-01 12:00 PM" },
  { id: 4, device_id: "thyro_004", assigned_user: "User D", last_active: "2024-12-02 09:00 AM" },
  { id: 5, device_id: "thyro_005", assigned_user: "User E", last_active: "2024-12-02 10:00 AM" },
  { id: 6, device_id: "thyro_006", assigned_user: "User F", last_active: "2024-12-03 02:00 PM" },
  { id: 7, device_id: "thyro_007", assigned_user: "User G", last_active: "2024-12-03 03:00 PM" },
];

const ITEMS_PER_PAGE = 5;

export default function Devices() {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = mockDeviceData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(mockDeviceData.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setCurrentPage(page);
  };

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl md:text-2xl lg:text-3xl text-primary font-bold">
          Devices Overview
        </CardTitle>
        <p className="text-sm md:text-base text-gray-400">
          List of all devices with their assigned users and last active status
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table className="w-full text-sm md:text-base">
            <TableHeader>
              <TableRow>
                <TableHead>SI/No</TableHead>
                <TableHead>Device ID</TableHead>
                <TableHead>Assigned User</TableHead>
                <TableHead>Last Active</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((device, index) => (
                <TableRow key={device.id}>
                  <TableCell>{indexOfFirstItem + index + 1}</TableCell>
                  <TableCell>{device.device_id}</TableCell>
                  <TableCell>{device.assigned_user}</TableCell>
                  <TableCell>{device.last_active}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            className="px-4 py-2 text-white bg-primary rounded-md disabled:opacity-50"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 text-white bg-primary rounded-md disabled:opacity-50"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
