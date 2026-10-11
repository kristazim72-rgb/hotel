// Base prices for 6 rooms
const PRICES = {
  room1: 120, // Le Pigeonnier
  room2: 145, // La Garrigue
  room3: 155, // L'Olivier
  room4: 185, // Le Figuier
  room5: 210, // La Terrasse
  room6: 250  // La Villa
};

// Breakfast prices for 6 options
const BREAKFAST_PRICES = {
  b1: 18, // Quick Start
  b2: 24, // Continental
  b3: 28, // Vegan Delight
  b4: 35, // Provençal Feast
  b5: 42, // Mediterranean
  b6: 50  // Champagne Brunch
};

// Display names for the receipt
const ROOM_NAMES = {
  room1: 'Le Pigeonnier',
  room2: 'La Garrigue',
  room3: "L'Olivier",
  room4: 'Le Figuier',
  room5: 'La Terrasse',
  room6: 'La Villa'
};

const BREAKFAST_NAMES = {
  b1: 'Quick Start',
  b2: 'Continental',
  b3: 'Vegan Delight',
  b4: 'Provençal Feast',
  b5: 'Mediterranean',
  b6: 'Champagne Brunch'
};

// Save booking data to localStorage
function saveBookingData(key, value) {
  localStorage.setItem(`ms_${key}`, JSON.stringify(value));
}

// Get booking data from localStorage
function getBookingData(key, fallback) {
  const data = localStorage.getItem(`ms_${key}`);
  return data ? JSON.parse(data) : fallback;
}

// Calculate the total price based on selections
function calculateTotal() {
  const checkin = getBookingData('checkin', '2026-04-25');
  const checkout = getBookingData('checkout', '2026-04-29');
  const room = getBookingData('room', 'room2'); // Default to La Garrigue
  const guests = getBookingData('guests', 2);
  const breakfastType = getBookingData('breakfast', 'b2'); // Default to Continental

  // Calculate nights
  const date1 = new Date(checkin);
  const date2 = new Date(checkout);
  const diffTime = Math.abs(date2 - date1);
  const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

  // Calculate costs
  const roomCost = (PRICES[room] || 0) * nights;
  const breakfastPrice = BREAKFAST_PRICES[breakfastType] || 0;
  const breakfastCost = breakfastPrice * guests * nights;
  const taxCost = 3.60 * guests * nights; // Standard tourist tax
  const total = roomCost + breakfastCost + taxCost;

  return { nights, roomCost, breakfastCost, taxCost, total, breakfastType, room };
}