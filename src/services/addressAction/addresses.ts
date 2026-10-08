"use server";
import { AddressPayload, AddressResponse } from "@/interface/address.interface";
import { apiRequest } from "@/Utilites/apiRequest";

export async function getAddresses() {
  return apiRequest<AddressResponse>("/addresses");
}

export async function AddAddress(address: AddressPayload) {
  return apiRequest<AddressResponse>("/addresses", {
    method: "POST",
    body: address,
  });
}

export async function RemoveAddress(addressId: string) {
  return apiRequest<AddressResponse>(`/addresses/${addressId}`, {
    method: "DELETE",
  });
}

export async function UpdateAddress(addressId: string, address: AddressPayload) {
  const added = await AddAddress(address);
  if (!added.ok) return added;
  return RemoveAddress(addressId);
}
