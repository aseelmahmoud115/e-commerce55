"use client";
import EmptyState from "@/app/_sharedComponents/EmptyState/EmptyState";
import { toast } from "@/components/ui/toast";
import { IAddress } from "@/interface/address.interface";
import { AddressForm } from "@/schema/address.schema";
import {
  AddAddress,
  getAddresses,
  RemoveAddress,
  UpdateAddress,
} from "@/services/addressAction/addresses";
import { useCallback, useEffect, useState } from "react";
import { FaBuilding, FaLocationDot, FaPen, FaPhone, FaPlus, FaTrash } from "react-icons/fa6";
import { ImSpinner2 } from "react-icons/im";
import AddressModal from "./AddressModal";

export default function Addresses() {
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<IAddress | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getAddresses().then((response) => {
      if (!active) return;
      if (response.ok) setAddresses(response.data?.data ?? []);
      else toast.add({ title: "Error", description: response.message, type: "error" });
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const openAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };
  const openEdit = (a: IAddress) => {
    setEditing(a);
    setModalOpen(true);
  };
  const closeModal = useCallback(() => setModalOpen(false), []);

  async function save(values: AddressForm) {
    const response = editing ? await UpdateAddress(editing._id, values) : await AddAddress(values);
    if (!response.ok) {
      toast.add({ title: "Error", description: response.message, type: "error" });
      return false;
    }
    setAddresses(response.data?.data ?? []);
    toast.add({
      title: editing ? "Address updated" : "Address added",
      description: editing ? "Your address was updated successfully" : "Your address was added successfully",
      type: "success",
    });
    return true;
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this address?")) return;
    setDeleting(id);
    const response = await RemoveAddress(id);
    setDeleting(null);
    if (!response.ok) {
      toast.add({ title: "Error", description: response.message, type: "error" });
      return;
    }
    setAddresses(response.data?.data ?? []);
    toast.add({ title: "Address removed", description: "The address was removed", type: "success" });
  }

  return (
    <section>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">My Addresses</h2>
          <p className="text-sm text-gray-500">Manage your saved delivery addresses</p>
        </div>
        <button onClick={openAdd} className="btn-green">
          <FaPlus /> Add Address
        </button>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2].map((i) => <div key={i} className="h-28 animate-pulse rounded-2xl bg-white ring-1 ring-gray-100" />)}
        </div>
      ) : addresses.length === 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white">
          <EmptyState
            icon={<FaLocationDot />}
            title="No Addresses Yet"
            text="Add your first delivery address to make checkout faster and easier."
          />
          <div className="-mt-8 pb-12 text-center">
            <button onClick={openAdd} className="btn-green">
              <FaPlus /> Add Your First Address
            </button>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {addresses.map((a) => (
            <article key={a._id} className={`flex gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md ${deleting === a._id ? "opacity-50" : ""}`}>
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <FaLocationDot />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-gray-900">{a.name}</h3>
                <p className="mt-0.5 text-sm text-gray-500">{a.details}</p>
                <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5"><FaPhone className="text-xs" /> {a.phone}</span>
                  <span className="flex items-center gap-1.5"><FaBuilding className="text-xs" /> {a.city}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(a)} aria-label={`Edit ${a.name}`} className="flex size-9 items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-600 transition hover:bg-green-100 hover:text-green-700">
                  <FaPen />
                </button>
                <button onClick={() => remove(a._id)} disabled={deleting === a._id} aria-label={`Delete ${a.name}`} className="flex size-9 items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-600 transition hover:bg-red-100 hover:text-red-600">
                  {deleting === a._id ? <ImSpinner2 className="animate-spin" /> : <FaTrash />}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      <AddressModal open={modalOpen} address={editing} onClose={closeModal} onSubmit={save} />
    </section>
  );
}
