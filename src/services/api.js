import axios from "axios";

const apiClient = axios.create();

const BASE_URL = import.meta.env.VITE_API_URL || ""; // Relative paths since server proxies standard requests

apiClient.defaults.baseURL = BASE_URL;

export async function fetchRestaurant() {
  const res = await apiClient.get(`${BASE_URL}/api/restaurant`);
  if (!res.ok) throw new Error("Failed to fetch restaurant");
  return res.data;
}

export async function updateRestaurant(details) {
  const res = await apiClient.put(`${BASE_URL}/api/restaurant`, details);
  if (!res.ok) throw new Error("Failed to update restaurant");
  return res.data;
}

export async function fetchMenu() {
  const res = await apiClient.get(`${BASE_URL}/api/menu`);
  if (!res.ok) throw new Error("Failed to fetch menu");
  return res.data;
}

export async function addMenuItem(item) {
  const res = await apiClient.post(`${BASE_URL}/api/menu`, item);
  if (!res.ok) throw new Error("Failed to add menu item");
  return res.data;
}

export async function updateMenuItem(id, item) {
  const res = await apiClient.put(`${BASE_URL}/api/menu/${id}`, item);
  if (!res.ok) throw new Error("Failed to update menu item");
  return res.data;
}

export async function deleteMenuItem(id) {
  const res = await apiClient.delete(`${BASE_URL}/api/menu/${id}`);
  if (!res.ok) throw new Error("Failed to delete menu item");
  return true;
}

export async function updateMenuItem(id, item) {
  const res = await apiClient.put(`${BASE_URL}/api/menu/${id}`, item);
  if (!res.ok) throw new Error("Failed to update menu item");
  return res.data;
}

export async function deleteMenuItem(id) {
  const res = await apiClient.delete(`${BASE_URL}/api/menu/${id}`);
  if (!res.ok) throw new Error("Failed to delete menu item");
  return true;
}

export async function fetchOffers() {
  const res = await apiClient.get(`${BASE_URL}/api/offers`);
  if (!res.ok) throw new Error("Failed to fetch offers");
  return res.data;
}

export async function addOffer(offer) {
  const res = await apiClient.post(`${BASE_URL}/api/offers`, offer);
  if (!res.ok) throw new Error("Failed to add offer");
  return res.data;
}

export async function updateOffer(id, offer) {
  const res = await apiClient.put(`${BASE_URL}/api/offers/${id}`, offer);
  if (!res.ok) throw new Error("Failed to update offer");
  return res.data;
}

export async function deleteOffer(id) {
  const res = await apiClient.delete(`${BASE_URL}/api/offers/${id}`);
  if (!res.ok) throw new Error("Failed to delete offer");
  return true;
}

export async function fetchGallery() {
  const res = await apiClient.get(`${BASE_URL}/api/gallery`);
  if (!res.ok) throw new Error("Failed to fetch gallery");
  return res.data;
}

export async function addGalleryItem(item) {
  const res = await apiClient.post(`${BASE_URL}/api/gallery`, item);
  if (!res.ok) throw new Error("Failed to add gallery item");
  return res.data;
}

export async function fetchReviews() {
  const res = await apiClient.get(`${BASE_URL}/api/reviews`);
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return res.data;
}

export async function addReview(review) {
  const res = await apiClient.post(`${BASE_URL}/api/reviews`, review);
  if (!res.ok) throw new Error("Failed to submit review");
  return res.data;
}

export async function fetchReservations() {
  const res = await apiClient.get(`${BASE_URL}/api/reservations`);
  if (!res.ok) throw new Error("Failed to fetch reservations");
  return res.data;
}

export async function addReservation(reservation) {
  const res = await apiClient.post(`${BASE_URL}/api/reservations`, reservation);
  if (!res.ok) throw new Error("Failed to submit reservation");
  return res.data;
}

export async function updateReservationStatus(id, status) {
  const res = await apiClient.put(`${BASE_URL}/api/reservations/${id}`, {
    status,
  });
  if (!res.ok) throw new Error("Failed to update reservation");
  return res.data;
}

export async function deleteReservation(id) {
  const res = await apiClient.delete(`${BASE_URL}/api/reservations/${id}`);
  if (!res.ok) throw new Error("Failed to delete reservation");
  return true;
}

export async function loginAdmin(name, password) {
  const res = await apiClient.post(`${BASE_URL}/api/admin/login`, {
    name,
    password,
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
  const res = await apiClient.post(`${BASE_URL}/api/upload`, {
    image: base64Image,
  });
  if (!res.ok) throw new Error("Failed to upload image");
  return res.data;
}
