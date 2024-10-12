"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import AppointmentForm from "./forms/AppointmentForm";
import { Appointment } from "@/types/appwrite.types";

const AppointmentModal = ({
  userId,
  patientId,
  type,
  appointment,
  setOpen, // Prop setOpen bleibt unverändert
}: {
  userId: string;
  patientId: string;
  type: "erstellen" | "planen" | "absagen";
  appointment?: Appointment;
  setOpen: (open: boolean) => void;
}) => {
  const [localOpen, setLocalOpen] = useState(false); // Lokale State-Variable umbenennen

  const closeModal = () => {
    setOpen(false); // setze das Modal über die Prop
    setLocalOpen(false); // setze das lokale Modal ebenfalls auf false
  };

  return (
    <Dialog open={localOpen} onOpenChange={setLocalOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`capitalize ${type === "planen" && "text-green-500"}`}
          onClick={() => setLocalOpen(true)} // Lokales Modal öffnen
        >
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">Termin {type}</DialogTitle>
          <DialogDescription>
            Bitte geben Sie die folgenden Details ein, um{" "}
            {type === "planen"
              ? "einen Termin zu planen"
              : "den Termin abzusagen"}
            .
          </DialogDescription>
        </DialogHeader>

        <AppointmentForm
          userId={userId}
          patientId={patientId}
          type={type}
          appointment={appointment}
          setOpen={closeModal} // Close Modal übergeben
        />
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
