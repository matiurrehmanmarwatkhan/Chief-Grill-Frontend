import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || ""; // Relative paths since server proxies standard requests in dev

const apiClient = axios.create({
  baseURL: BASE_URL,
});

export async function fetchRestaurant() {
  const res = await apiClient.get("/api/restaurant");
  return res.data;
}

export async function updateRestaurant(details) {
  const res = await apiClient.put("/api/restaurant", details);
  return res.data;
}

export async function fetchMenu() {
  const res = await apiClient.get("/api/menu");
  return res.data;
}

export async function addMenuItem(item) {
  const res = await apiClient.post("/api/menu", item);
  return res.data;
}

export async function updateMenuItem(id, item) {
  const res = await apiClient.put(`/api/menu/${id}`, item);
  return res.data;
}

export async function deleteMenuItem(id) {
  await apiClient.delete(`/api/menu/${id}`);
  return true;
}

export async function fetchOffers() {
  const res = await apiClient.get("/api/offers");
  return res.data;
}

export async function addOffer(offer) {
  const res = await apiClient.post("/api/offers", offer);
  return res.data;
}

export async function updateOffer(id, offer) {
  const res = await apiClient.put(`/api/offers/${id}`, offer);
  return res.data;
}

export async function deleteOffer(id) {
  await apiClient.delete(`/api/offers/${id}`);
  return true;
}

export async function fetchGallery() {
  const res = await apiClient.get("/api/gallery");
  return res.data;
}

export async function addGalleryItem(item) {
  const res = await apiClient.post("/api/gallery", item);
  return res.data;
}

export async function fetchReviews() {
  const res = await apiClient.get("/api/reviews");
  return res.data;
}

export async function addReview(review) {
  const res = await apiClient.post("/api/reviews", review);
  return res.data;
}

export async function fetchReservations() {
  const res = await apiClient.get("/api/reservations");
  return res.data;
}

export async function addReservation(reservation) {
  const res = await apiClient.post("/api/reservations", reservation);
  return res.data;
}

export async function updateReservationStatus(id, status) {
  const res = await apiClient.put(`/api/reservations/${id}`, {
    status,
  });
  return res.data;
}

export async function deleteReservation(id) {
  await apiClient.delete(`/api/reservations/${id}`);
  return true;
}

export async function loginAdmin(name, password) {
  try {
    const res = await apiClient.post("/api/admin/login", {
      name,
      password,
    });
    return res.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        return { success: false, error: "Invalid name or password" };
      }
      return {
        success: false,
        error: error.response.data?.error || "Authentication failed",
      };
    }
    return {
      success: false,
      error: error.message || "Authentication failed",
    };
  }
}

export async function uploadImage(base64Image) {
  const res = await apiClient.post("/api/upload", {
    image: base64Image,
  });
  return res.data;
}
