import type { Address, ContactInfo } from "@/types";

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[\d\s()-]{7,20}$/;
const POSTAL = /^[A-Za-z0-9][A-Za-z0-9\s-]{2,9}$/;

const required = (v: string, label: string) => (v.trim() ? undefined : `${label} is required`);

export function validateContact(c: ContactInfo): FieldErrors<ContactInfo> {
  const e: FieldErrors<ContactInfo> = {};
  e.firstName = required(c.firstName, "First name");
  e.lastName = required(c.lastName, "Last name");
  e.email = required(c.email, "Email") ?? (EMAIL.test(c.email.trim()) ? undefined : "Enter a valid email address");
  e.phone = required(c.phone, "Phone number") ?? (PHONE.test(c.phone.trim()) ? undefined : "Enter a valid phone number");
  return prune(e);
}

export function validateAddress(a: Address): FieldErrors<Address> {
  const e: FieldErrors<Address> = {};
  e.street = required(a.street, "Street address");
  e.city = required(a.city, "Town/City");
  e.state = required(a.state, "State/Region");
  e.postalCode =
    required(a.postalCode, "Postal code") ??
    (POSTAL.test(a.postalCode.trim()) ? undefined : "Enter a valid postal code");
  e.country = required(a.country, "Country");
  return prune(e);
}

function prune<T>(e: FieldErrors<T>): FieldErrors<T> {
  for (const k of Object.keys(e) as (keyof T)[]) if (!e[k]) delete e[k];
  return e;
}

export const hasErrors = (e: object) => Object.keys(e).length > 0;
