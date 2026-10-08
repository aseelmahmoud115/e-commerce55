"use server";
import { apiRequest } from "@/Utilites/apiRequest";

type UserPayload = { name: string; email: string; role?: string };

export async function UpdateMe(data: { name: string; email: string; phone: string }) {
  return apiRequest<{ message: string; user: UserPayload }>("/users/updateMe/", {
    method: "PUT",
    body: data,
  });
}

export async function ChangeMyPassword(data: {
  currentPassword: string;
  password: string;
  rePassword: string;
}) {
  return apiRequest<{ message: string; token: string; user: UserPayload }>(
    "/users/changeMyPassword",
    { method: "PUT", body: data },
  );
}
