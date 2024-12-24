"use client"

import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataItem } from "@/app/@types/data"
import { useGetData } from "@/app/hooks/ble/useGetData"
 
 
export default function DataManagementTable() {
  const { data, isLoading, isError } = useGetData()

  if (isLoading) return <div className="text-center py-4">Loading...</div>
  if (isError) return <div className="text-center py-4 text-red-500">Error fetching data</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Data Management</h1>
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">S.No</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Emotion</TableHead>
              <TableHead className="text-right">Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item, index) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{item.data}</TableCell>
                <TableCell>{item.emotion || "N/A"}</TableCell>
                <TableCell className="text-right">
                  {new Date(item.timestamp).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

