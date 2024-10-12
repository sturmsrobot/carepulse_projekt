"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SelectItem } from "../ui/select";
import { Doctors } from "@/constants";
import {
  createAppointment,
  updateAppointment,
} from "@/lib/actions/appointment.actions";
import { getAppointmentSchema } from "@/lib/validation";
import { Appointment } from "@/types/appwrite.types";

import "react-datepicker/dist/react-datepicker.css";

import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../ui/SubmitButton";
import { Form } from "@/components/ui/form";
import NewAppointment from "@/app/patients/[userId]/new-appointment/page";
import { Status } from "@/types/appwrite.types";
import { StatusIcon } from "@/constants";

const AppointmentForm = ({
  userId,
  patientId,
  type = "planen",
  appointment,
  setOpen,
}: {
  userId: string;
  patientId: string;
  type: "erstellen" | "planen" | "absagen";
  appointment?: Appointment;
  setOpen?: (open: boolean) => void;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment.primaryPhysician : "",
      schedule: appointment ? new Date(appointment.schedule) : new Date(),
      reason: appointment ? appointment.reason : "",
      note: appointment ? appointment.note : "",
      cancellationReason: appointment
        ? appointment.cancellationReason || ""
        : "",
    },
  });

  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    setIsLoading(true);

    let status: Status;
    switch (type) {
      case "planen":
        status = "planen"; // Erlaubter Status
        break;
      case "absagen":
        status = "absagen"; // Erlaubter Status
        break;
      case "erstellen":
        status = "pending"; // Erlaubter Status für den Erstellungsvorgang
        break;
      default:
        status = "pending"; // Fallback-Status
    }

    try {
      if (type === "erstellen" && patientId) {
        // Neuer Termin wird erstellt
        const newAppointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          note: values.note,
          status: status as Status,
        };
        console.log("Submitting appointment data:", newAppointmentData);

        const newAppointment = await createAppointment(newAppointmentData);

        if (newAppointment) {
          console.log("New appointment created:", newAppointment);
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`
          );
        } else {
          console.error("Fehler: Der Termin konnte nicht erstellt werden.");
        }
        //Termin aktualisieren
        const appointmentToUpdate = {
          userId,
          appointmentId: appointment?.$id!,
          appointment: {
            primaryPhysician: values?.primaryPhysician,
            schedule: new Date(values?.schedule),
            status: status as Status,
            cancellationReason: values?.cancellationReason,
          },
          type,
        };
        const updatedAppointment = await updateAppointment(appointmentToUpdate);

        if (updatedAppointment) {
          setOpen && setOpen(false); // sicherstellen, dass setOpen aufgerufen wird, wenn es übergeben wurde
          form.reset();
        } else {
          console.error("Fehler: Der Termin konnte nicht aktualisiert werden.");
        }
      }
    } catch (error) {
      console.error("Fehler beim Verarbeiten des Termins:", error);
    } finally {
      setIsLoading(false); // sicherstellen, dass der Ladezustand zurückgesetzt wird
    }
  }

  let buttonLabel;

  switch (type) {
    case "absagen":
      buttonLabel = "Termin absagen";
      break;
    case "erstellen":
      buttonLabel = "Termin erstellen";
      break;
    case "planen":
      buttonLabel = "Termin buchen";
      break;
    default:
      buttonLabel = "Absenden";
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        {type === "erstellen" && (
          <section className="mb-12 space-y-4">
            <h1 className="header">Neuer Termin</h1>
            <p className="text-dark-700">Jetzt neuen Termin anfordern!</p>
          </section>
        )}

        {type !== "absagen" && (
          <>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Arzt"
              placeholder="Bitte wählen Sie einen Arzt"
            >
              {Doctors.map((doctor, i) => (
                <SelectItem key={doctor.name + i} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt="doctor"
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Voraussichtliches Termindatum"
              showTimeSelect
              dateFormat="dd.MM.yyyy - HH:mm"
            />

            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Grund der Anfrage"
                placeholder="Bitte geben Sie einen Grund für die Anfrage an"
              />

              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="Notizen"
                placeholder="Notizen"
              />
            </div>
          </>
        )}

        {type === "absagen" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Grund der Absage"
            placeholder="Bitte geben Sie einen Grund für die Absage an"
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`${
            type === "absagen" ? "shad-danger-btn" : "shad-primary-btn"
          } w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
