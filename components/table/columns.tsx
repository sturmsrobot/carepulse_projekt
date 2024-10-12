"use client";

import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react";

import { Button } from "../ui/button";

import StatusBadge from "../StatusBadge";
import { formatDateTime } from "@/lib/utils";
import { Doctors } from "@/constants";
import Image from "next/image";
import AppointmentModal from "../AppointmentModal";
import { Appointment } from "@/types/appwrite.types";

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => (
      <p className="text-14-medium">
        {row.original.patient?.name || "Kein Patient"}
      </p>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: "schedule",
    header: "Termin",
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[100px]">
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    ),
  },
  {
    accessorKey: "primaryPhysician",
    header: () => "Facharzt",
    cell: ({ row }) => {
      const doctor = Doctors.find(
        (doc) => doc.name === row.original.primaryPhysician
      );
      return (
        <div className="flex items-center gap-3">
          {doctor && (
            <>
              <Image
                src={doctor.image}
                alt={doctor.name}
                height={32}
                width={32}
                className="rounded-full border border-dark-500"
              />
              <p className="whitespace-nowrap">Dr. {doctor.name}</p>
            </>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Aktionen</div>,
    cell: ({ row: { original: data } }) => {
      return (
        <div className="flex gap-1">
          <AppointmentModal
            type="planen"
            patientId={data.patient ? data.patient.$id : ""}
            userId={data.userId}
            appointment={data}
            setOpen={function (open: boolean): void {
              throw new Error("Function not implemented.");
            }}
          />
          <AppointmentModal
            type="absagen"
            patientId={data.patient ? data.patient.$id : ""}
            userId={data.userId}
            appointment={data}
            setOpen={function (open: boolean): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
      );
    },
  },
];
