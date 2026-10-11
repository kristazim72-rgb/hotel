// --- 1. WI-FI COPY FUNCTION ---
function copyWifi() {
  const password = "soleil-2026";
  // Use event.target to get the button that was clicked
  const btn = event.target;
  const originalText = btn.innerText;

  navigator.clipboard.writeText(password).then(() => {
    btn.innerText = "COPIED!";
    btn.style.backgroundColor = "var(--sun-300)";
    
    // Reset the button after 2 seconds
    setTimeout(() => {
      btn.innerText = originalText;
      btn.style.backgroundColor = "";
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy password: ', err);
    // Fallback for older browsers
    alert("Password is: " + password);
  });
}

// --- 2. SIDEBAR ACTIVE LINK HIGHLIGHTING ---
document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".nav-menu li a");
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute("href");
    // Check if the link matches the current page
    if (linkPath === currentPath || (currentPath === "" && linkPath === "dashboard.html")) {
      link.parentElement.classList.add("active");
    } else {
      link.parentElement.classList.remove("active");
    }
  });
});

// --- 3. CUSTOM DROPDOWN CONVERSION ---
document.addEventListener('DOMContentLoaded', () => {
  const selects = document.querySelectorAll('select.form-control');
  
  if (selects.length === 0) return; // Exit if no dropdowns on this page

  selects.forEach(select => {
    // Hide the native select element
    select.style.display = 'none';
    
    // Create the custom wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'custom-select-wrapper';
    
    // Create the trigger (closed state)
    const trigger = document.createElement('div');
    trigger.className = 'custom-select-trigger';
    trigger.innerHTML = `<span>${select.options[select.selectedIndex]?.text || 'Choose...'}</span><span class="arrow">▼</span>`;
    
    // Create the options list (open state)
    const optionsList = document.createElement('ul');
    optionsList.className = 'custom-options';
    
    // Populate options from the native select
    Array.from(select.options).forEach((option, index) => {
      const li = document.createElement('li');
      li.className = 'custom-option';
      li.textContent = option.text;
      li.dataset.value = option.value;
      
      if (index === select.selectedIndex) {
        li.classList.add('selected');
      }
      
      // Handle option click
      li.addEventListener('click', () => {
        // Update native select value
        select.value = option.value;
        
        // Dispatch change event so any existing listeners (like booking.js) are triggered
        select.dispatchEvent(new Event('change'));
        
        // Update the UI
        trigger.querySelector('span').textContent = option.text;
        optionsList.querySelectorAll('.custom-option').forEach(opt => opt.classList.remove('selected'));
        li.classList.add('selected');
        wrapper.classList.remove('open');
      });
      
      optionsList.appendChild(li);
    });
    
    // Toggle dropdown on trigger click
    trigger.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent the click from bubbling to document
      wrapper.classList.toggle('open');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
      wrapper.classList.remove('open');
    });
    
    // Assemble the custom dropdown and insert it into the DOM
    wrapper.appendChild(trigger);
    wrapper.appendChild(optionsList);
    select.parentNode.insertBefore(wrapper, select.nextSibling);
  });
});

// --- 4. AROUND TOWN FILTER LOGIC ---
function filterPlaces(category) {
  // 1. Update the active button state
  const buttons = document.querySelectorAll('.chip-btn');
  buttons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.filter === category) {
      btn.classList.add('active');
    }
  });

  // 2. Filter the cards
  const cards = document.querySelectorAll('.place-card');
  cards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}