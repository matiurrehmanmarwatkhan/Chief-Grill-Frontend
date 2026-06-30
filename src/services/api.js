/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const BASE_URL = import.meta.env.VITE_API_URL || ""; // Relative paths since server proxies standard requests

export async function fetchRestaurant() {
  const res = await fetch(`${BASE_URL}/api/restaurant`);
  if (!res.ok) throw new Error("Failed to fetch restaurant");
  return res.json();
}

export async function updateRestaurant(details) {
  const res = await fetch(`${BASE_URL}/api/restaurant`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(details),
  });
  if (!res.ok) throw new Error("Failed to update restaurant");
  return res.json();
}

export async function fetchMenu() {
  const res = await fetch(`${BASE_URL}/api/menu`);
  if (!res.ok) throw new Error("Failed to fetch menu");
  return res.json();
}

export async function addMenuItem(item) {
  const res = await fetch(`${BASE_URL}/api/menu`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error("Failed to add menu item");
  return res.json();
}

export async function updateMenuItem(id, item) {
  const res = await fetch(`${BASE_URL}/api/menu/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error("Failed to update menu item");
  return res.json();
}

export async function deleteMenuItem(id) {
  const res = await fetch(`${BASE_URL}/api/menu/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete menu item");
  return true;
}

export async function fetchOffers() {
  const res = await fetch(`${BASE_URL}/api/offers`);
  if (!res.ok) throw new Error("Failed to fetch offers");
  return res.json();
}

export async function addOffer(offer) {
  const res = await fetch(`${BASE_URL}/api/offers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(offer),
  });
  if (!res.ok) throw new Error("Failed to add offer");
  return res.json();
}

export async function updateOffer(id, offer) {
  const res = await fetch(`${BASE_URL}/api/offers/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(offer),
  });
  if (!res.ok) throw new Error("Failed to update offer");
  return res.json();
}

export async function deleteOffer(id) {
  const res = await fetch(`${BASE_URL}/api/offers/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete offer");
  return true;
}

export async function fetchGallery() {
  const res = await fetch(`${BASE_URL}/api/gallery`);
  if (!res.ok) throw new Error("Failed to fetch gallery");
  return res.json();
}

export async function addGalleryItem(item) {
  const res = await fetch(`${BASE_URL}/api/gallery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error("Failed to add gallery item");
  return res.json();
}

export async function fetchReviews() {
  const res = await fetch(`${BASE_URL}/api/reviews`);
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return res.json();
}

export async function addReview(review) {
  const res = await fetch(`${BASE_URL}/api/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  if (!res.ok) throw new Error("Failed to submit review");
  return res.json();
}

export async function fetchReservations() {
  const res = await fetch(`${BASE_URL}/api/reservations`);
  if (!res.ok) throw new Error("Failed to fetch reservations");
  return res.json();
}

export async function addReservation(reservation) {
  const res = await fetch(`${BASE_URL}/api/reservations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reservation),
  });
  if (!res.ok) throw new Error("Failed to submit reservation");
  return res.json();
}

export async function updateReservationStatus(id, status) {
  const res = await fetch(`${BASE_URL}/api/reservations/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Failed to update reservation");
  return res.json();
}

export async function deleteReservation(id) {
  const res = await fetch(`${BASE_URL}/api/reservations/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete reservation");
  return true;
}

export async function loginAdmin(name, password) {
  const res = await fetch(`${BASE_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, password }),
  });
  if (res.status === 401) {
    return { success: false, error: "Invalid name or password" };
  }
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    return {
      success: false,
      error: errorData.error || "Authentication failed",
    };
  }
  return res.json();
}

export async function uploadImage(base64Image) {
  const res = await fetch(`${BASE_URL}/api/upload`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: base64Image }),
  });
  if (!res.ok) throw new Error("Failed to upload image");
  return res.json();
}
