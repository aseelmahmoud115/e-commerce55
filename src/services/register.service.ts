"use server";
import { apiRequest } from "@/Utilites/apiRequest";

export interface registerPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  rePassword: string;
}

export async function RegisterForm(payload: registerPayload) {
  return apiRequest<{ message: string; token: string }>("/auth/signup", {
    method: "POST",
    body: payload,
    auth: false,
  });
}
