document.addEventListener('DOMContentLoaded', () => {
  // Get data from localStorage
  const checkin = getBookingData('checkin', '2026-04-25');
  const checkout = getBookingData('checkout', '2026-04-29');
  const guests = getBookingData('guests', 2);

  // Format dates
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  };
  const formatDay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { weekday: 'long' });
  };

  const checkinFormatted = formatDate(checkin);
  const checkoutFormatted = formatDate(checkout);
  const checkinDay = formatDay(checkin);
  const checkoutDay = formatDay(checkout);

  // Calculate costs (this also returns the room and breakfast keys)
  const { nights, roomCost, breakfastCost, taxCost, total, breakfastType, room } = calculateTotal();

  // Get the display names from our lookup objects
  const roomDisplayName = ROOM_NAMES[room] || 'La Garrigue';
  const breakfastDisplayName = BREAKFAST_NAMES[breakfastType] || 'Continental';

  // Update Receipt Header
  document.querySelector('.receipt-title').textContent = 'Your stay';
  
  // Update Dates
  const dateValues = document.querySelectorAll('.date-value');
  const dateSubs = document.querySelectorAll('.date-sub');
  dateValues[0].textContent = checkinFormatted;
  dateValues[1].textContent = checkoutFormatted;
  dateSubs[0].textContent = `${checkinDay} · 15:00`;
  dateSubs[1].textContent = `${checkoutDay} · 11:00`;

  // Update Line Items
  const lineItems = document.querySelector('.line-items');
  let breakfastLine = '';
  if (breakfastType !== 'none') {
    breakfastLine = `
    <div class="line-item">
      <span>${breakfastDisplayName} × ${guests} guests</span>
      <span>€ ${breakfastCost.toFixed(2)}</span>
    </div>`;
  }

  lineItems.innerHTML = `
    <div class="line-item">
      <span>Room · ${roomDisplayName} × ${nights} nights</span>
      <span>€ ${roomCost.toFixed(2)}</span>
    </div>
    ${breakfastLine}
    <div class="line-item">
      <span>Tourist tax</span>
      <span>€ ${taxCost.toFixed(2)}</span>
    </div>
  `;

  // Update Total
  document.querySelector('.total-amount').textContent = `€ ${total.toFixed(2)}`;

  // Update Welcome Card Room Name
  document.querySelector('.room-name').textContent = roomDisplayName;

  // Update Page Title
  document.querySelector('.header-text h1').innerHTML = `Bienvenue, <span>Lucia.</span>`;
});