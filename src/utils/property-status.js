const STATUS_LABELS = {
  for_sale: "For Sale",
  for_rent: "For Rent",
  for_lease: "For Lease",
  sold: "Sold",
  rented: "Rented",
  pending: "Pending",
};

export const formatPropertyStatus = (status) => {
  if (status === null || status === undefined) {
    return "";
  }

  const rawStatus = String(status).trim();

  if (!rawStatus) {
    return "";
  }

  const normalizedStatus = rawStatus.toLowerCase().replace(/[\s-]+/g, "_");

  if (STATUS_LABELS[normalizedStatus]) {
    return STATUS_LABELS[normalizedStatus];
  }

  return rawStatus
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
};