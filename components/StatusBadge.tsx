import { StatusIcon } from "@/constants";
import clsx from "clsx";
import Image from "next/image";
import React from "react";
import { Status } from "@/types/appwrite.types";

const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div
      className={clsx("status-badge", {
        "bg-green-600": status === "planen",
        "bg-blue-600": status === "erstellen",
        "bg-red-600": status === "absagen",
      })}
    >
      <Image
        src={StatusIcon[status]}
        alt={status}
        width={24}
        height={24}
        className="h-fit w-3"
      />
      <p
        className={clsx("text-12-semibold capitalize", {
          "text-green-500": status === "planen",
          "text-blue-500": status === "erstellen",
          "text-red-500": status === "absagen",
        })}
      >
        {status}{" "}
      </p>
    </div>
  );
};

export default StatusBadge;
