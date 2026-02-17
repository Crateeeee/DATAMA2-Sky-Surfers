/* ============================================================
   SKYSURFERS TRAVEL & TOURS — script.js
   Powered by Supabase (Real Cloud Database)
   ============================================================ */

// 🟢 CONFIGURATION
// ✅ FIX 2: Full URL format must be https://[PROJECT_ID].supabase.co
const SUPABASE_URL = 'https://yrizqxaoykexrwfcktdu.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Rw8TQ4r8dWjG-WGmwzKKog_ZNHxazv2';

// ✅ FIX 3: The CDN exposes the library as window.supabase — use window.supabase.createClient
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ── SEED DATA (Static Content) ──────────────────────────────
// We keep these in JS for the frontend UI, but bookings go to DB.

const TRAVEL_PACKAGES = [
  { id: 400000001, name: "City Explorer",        type: "City Tour",          price: 2500,  description: "A day tour featuring major landmarks and attractions in the city." },
  { id: 400000002, name: "Island Adventure",     type: "Beach Package",      price: 8500,  description: "3D2N stay at a tropical island resort with snorkeling and diving." },
  { id: 400000003, name: "Cultural Heritage",    type: "Cultural Tour",      price: 6500,  description: "Explore museums, heritage sites, and cultural performances." },
  { id: 400000004, name: "Mountain Escape",      type: "Adventure Tour",     price: 7800,  description: "2D1N hiking and camping trip with scenic mountain views." },
  { id: 400000005, name: "Foodie Delight",       type: "Culinary Tour",      price: 5000,  description: "Taste local delicacies through guided food trips and market visits." },
  { id: 400000006, name: "Romantic Getaway",     type: "Couple Package",     price: 12000, description: "Luxury resort stay for couples with spa and candlelight dinner." },
  { id: 400000007, name: "Nature Retreat",       type: "Eco Tour",           price: 7200,  description: "Eco-friendly package highlighting waterfalls and forest reserves." },
  { id: 400000008, name: "Island Hopping Fiesta",type: "Group Tour",         price: 9500,  description: "Perfect for groups, includes 3 islands, lunch, and boat transfer." },
  { id: 400000009, name: "Weekend Chill",        type: "Short Trip",         price: 4300,  description: "Relaxing 2-day trip with scenic views and local accommodation." },
  { id: 400000010, name: "Ultimate Explorer",    type: "All-in-One Package", price: 15000, description: "Includes city, nature, and cultural tours with transportation." },
];

const ITINERARIES = [
  { id: 1,  name: "Baguio Summer Escape",    duration: "3 Days / 2 Nights", destination: "Baguio City",       activity: "Visit Burnham Park, Camp John Hay, and Strawberry Farm" },
  { id: 2,  name: "Cebu Island Adventure",   duration: "4 Days / 3 Nights", destination: "Cebu",              activity: "Island hopping in Mactan, Kawasan Falls canyoneering" },
  { id: 3,  name: "Manila City Tour",        duration: "1 Day",             destination: "Metro Manila",      activity: "Intramuros walking tour, Rizal Park, Mall of Asia visit" },
  { id: 4,  name: "Boracay Beach Getaway",   duration: "5 Days / 4 Nights", destination: "Boracay Island",   activity: "Snorkeling, sunset sailing, and beach party nights" },
  { id: 5,  name: "Palawan Paradise Trip",   duration: "6 Days / 5 Nights", destination: "El Nido, Palawan", activity: "Island hopping, lagoons, and snorkeling" },
  { id: 6,  name: "Siargao Surfing Tour",    duration: "4 Days / 3 Nights", destination: "Siargao Island",   activity: "Surfing lessons, island hopping, Sugba Lagoon" },
  { id: 7,  name: "Bohol Heritage Trail",    duration: "3 Days / 2 Nights", destination: "Bohol",            activity: "Chocolate Hills, Tarsier Sanctuary, Loboc River Cruise" },
  { id: 8,  name: "Davao Eco Tour",          duration: "3 Days / 2 Nights", destination: "Davao City",       activity: "Eden Nature Park, Philippine Eagle Center, Roxas Night Market" },
  { id: 9,  name: "Ilocos Heritage Journey", duration: "4 Days / 3 Nights", destination: "Ilocos Norte & Sur",activity: "Paoay Church, Vigan Heritage Village, Windmills" },
  { id: 10, name: "Coron Island Expedition", duration: "5 Days / 4 Nights", destination: "Coron, Palawan",   activity: "Kayangan Lake, snorkeling, island hopping" },
];

const TOURS = [
  { id: 100000001, name: "Manila City Highlights",    date: "2025-11-05", location: "Intramuros, Manila" },
  { id: 100000002, name: "Tagaytay Picnic & Taal View", date: "2025-12-01", location: "Tagaytay City, Cavite" },
  { id: 100000003, name: "Boracay Beach Escape",      date: "2026-01-10", location: "Boracay, Aklan" },
  { id: 100000004, name: "Vigan Heritage Tour",       date: "2026-02-14", location: "Vigan, Ilocos Sur" },
  { id: 100000005, name: "Chocolate Hills Day Trip",  date: "2025-11-20", location: "Bohol (Carmen)" },
  { id: 100000006, name: "Cebu City Cultural Walk",   date: "2026-03-03", location: "Cebu City, Cebu" },
  { id: 100000007, name: "Davao Nature & Food Tour",  date: "2026-04-12", location: "Davao City, Davao del Sur" },
  { id: 100000008, name: "Baguio Pine & Coffee Trail",date: "2025-12-15", location: "Baguio City, Benguet" },
  { id: 100000009, name: "Coron Island Hopping",      date: "2026-02-28", location: "Coron, Palawan" },
  { id: 100000010, name: "Iloilo Heritage & Cuisine", date: "2026-03-25", location: "Iloilo City, Iloilo" },
];

const CSR_TEAM = [
  { id: 700000001, fname: "Maria",   lname: "Santos",    email: "maria.santos@skysurfers.com",   phone: "09171234567", position: "Senior CSR" },
  { id: 700000002, fname: "John",    lname: "Reyes",     email: "john.reyes@skysurfers.com",     phone: "09181234568", position: "Junior CSR" },
  { id: 700000003, fname: "Angela",  lname: "Cruz",      email: "angela.cruz@skysurfers.com",    phone: "09191234569", position: "Junior CSR" },
  { id: 700000004, fname: "Mark",    lname: "Villanueva",email: "mark.villanueva@skysurfers.com",phone: "09201234570", position: "Senior CSR" },
  { id: 700000005, fname: "Ella",    lname: "Torres",    email: "ella.torres@skysurfers.com",    phone: "09211234571", position: "Junior CSR" },
];

const COORDINATORS = [
  { id: 200000001, fname: "Mark",    lname: "Reyes",     phone: "09171234567", email: "markreyes@gmail.com",          experience: "5 years experience managing local city tours" },
  { id: 200000002, fname: "Anna",    lname: "Santos",    phone: "09281234568", email: "annasantos@yahoo.com",          experience: "3 years coordinating island-hopping and beach packages" },
  { id: 200000003, fname: "James",   lname: "Villanueva",phone: "09391234569", email: "jamesvillanueva@outlook.com",   experience: "7 years handling cultural and historical tours" },
  { id: 200000004, fname: "Ella",    lname: "Garcia",    phone: "09451234570", email: "ellagarcia@icloud.com",         experience: "2 years in mountain and hiking expeditions" },
  { id: 200000005, fname: "Rico",    lname: "Dela Cruz", phone: "09561234571", email: "ricodelacruz@gmail.com",        experience: "6 years in adventure and nature-based tours" },
];

const PKG_IMAGES = [
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
  "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80",
  "https://images.unsplash.com/photo-1573790387438-4da905039392?w=600&q=80",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80",
  "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80",
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
  "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=600&q=80",
  "https://images.unsplash.com/photo-1509233725247-49e657c54213?w=600&q=80",
  "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80",
];

// ── LOCAL STATE (Mirror of DB) ────────────────────────────────
let db = {
  customers: [],
  bookings: [],
  payments: [],
};

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  refreshData(); // Fetch from Supabase
  renderPackages();
  renderTours();
  populateFormDropdowns();
  renderSidebarStaff();
  setDefaultDate();
  setupNavScroll();
  setupStepSummary();
});

// ── SUPABASE FETCHING ─────────────────────────────────────────

async function refreshData() {
  console.log("Fetching data from Supabase...");
  
  // ✅ FIX 1 applied: using `supabaseClient` instead of `supabase` everywhere below

  // 1. Fetch Customers
  let { data: customers, error: errC } = await supabaseClient.from('customers').select('*').order('created_at', { ascending: false });
  if (errC) console.error("Error fetching customers:", errC);
  else db.customers = customers;

  // 2. Fetch Bookings
  let { data: bookings, error: errB } = await supabaseClient.from('bookings').select('*').order('created_at', { ascending: false });
  if (errB) console.error("Error fetching bookings:", errB);
  else db.bookings = bookings;

  // 3. Fetch Payments
  let { data: payments, error: errP } = await supabaseClient.from('payments').select('*').order('created_at', { ascending: false });
  if (errP) console.error("Error fetching payments:", errP);
  else db.payments = payments;

  // 4. Update UI
  renderRecords();
  updateStats();
}

// ── FORM SUBMIT ────────────────────────────────────────────────
document.getElementById('bookingForm')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  if (!validateStep(3)) return;

  const btn = document.querySelector('.btn-submit');
  const originalText = btn.textContent;
  btn.textContent = "Processing...";
  btn.disabled = true;

  try {
    const pkg = TRAVEL_PACKAGES.find(p => p.id == document.getElementById('packageId').value);
    const itn = ITINERARIES.find(i => i.id == document.getElementById('itineraryId').value);
    const csr = CSR_TEAM.find(c => c.id == document.getElementById('csrId').value);

    // 1. Insert Customer
    const { data: custData, error: custErr } = await supabaseClient
      .from('customers')
      .insert([{
        fname: document.getElementById('custFname').value.trim(),
        lname: document.getElementById('custLname').value.trim(),
        email: document.getElementById('custEmail').value.trim(),
        phone: document.getElementById('custPhone').value.trim(),
        address: document.getElementById('custAddress').value.trim(),
        type: document.getElementById('custType').value
      }])
      .select();

    if (custErr) throw custErr;
    const newCustomer = custData[0];

    // 2. Insert Booking
    const { data: bookData, error: bookErr } = await supabaseClient
      .from('bookings')
      .insert([{
        customer_id: newCustomer.id,
        customer_name: `${newCustomer.fname} ${newCustomer.lname}`,
        package_id: pkg ? pkg.id : null,
        package_name: pkg ? pkg.name : '—',
        itinerary_id: itn ? itn.id : null,
        itinerary_name: itn ? itn.name : '—',
        destination: itn ? itn.destination : '—',
        book_date: document.getElementById('bookDate').value,
        book_status: document.getElementById('bookStatus').value,
        tour_type: document.getElementById('tourType').value,
        csr_name: csr ? `${csr.fname} ${csr.lname}` : '—'
      }])
      .select();

    if (bookErr) throw bookErr;
    const newBooking = bookData[0];

    // 3. Insert Payment
    const method = document.getElementById('payMethod').value;
    const { error: payErr } = await supabaseClient
      .from('payments')
      .insert([{
        customer_id: newCustomer.id,
        customer_name: `${newCustomer.fname} ${newCustomer.lname}`,
        booking_id: newBooking.id,
        amount: parseFloat(document.getElementById('payAmount').value),
        method: method,
        status: document.getElementById('payStatus').value,
        date: new Date().toISOString().split('T')[0],
        cc_type: method === 'Credit Card' ? document.getElementById('ccType')?.value : null,
        cc_number: method === 'Credit Card' ? document.getElementById('ccNumber')?.value : null,
        cc_expiry: method === 'Credit Card' ? document.getElementById('ccExpiry')?.value : null,
        bt_bank: method === 'Bank Transfer' ? document.getElementById('btBank')?.value : null,
        bt_ref: method === 'Bank Transfer' ? document.getElementById('btRef')?.value : null,
        cash_receipt: method === 'Cash' ? document.getElementById('cashReceipt')?.value : null,
      }]);

    if (payErr) throw payErr;

    // Success!
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);

    this.reset();
    setDefaultDate();
    document.getElementById('itineraryPreview').innerHTML = '<em>Select an itinerary to see details</em>';
    goToStep(1);
    
    // Refresh table data
    await refreshData();

  } catch (err) {
    alert("Error saving booking: " + err.message);
    console.error(err);
  } finally {
    btn.textContent = originalText;
    btn.disabled = false;
  }
});

// ── RECORD ACTIONS ─────────────────────────────────────────────

async function deleteRecord(table, id) {
  if (!confirm('Delete this record? This cannot be undone.')) return;
  
  const { error } = await supabaseClient.from(table).delete().eq('id', id);
  
  if (error) {
    alert("Error deleting: " + error.message);
  } else {
    refreshData();
  }
}

async function clearAllData() {
  if (!confirm('DANGER: This will wipe ALL database records. Continue?')) return;
  
  // Delete in order to respect Foreign Keys
  await supabaseClient.from('payments').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabaseClient.from('bookings').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabaseClient.from('customers').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  
  refreshData();
}

// ── UI HELPERS ──────────────────────────────────────────────────

function setupNavScroll() {
  window.addEventListener('scroll', () => {
    const nb = document.getElementById('navbar');
    if (nb) nb.classList.toggle('scrolled', window.scrollY > 50);
  });
}

function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

function renderPackages() {
  const grid = document.getElementById('packagesGrid');
  if (!grid) return;
  grid.innerHTML = TRAVEL_PACKAGES.map((p, i) => `
    <div class="pkg-card" onclick="openPackageModal(${p.id})">
      <div class="pkg-img-wrap">
        <img src="${PKG_IMAGES[i] || PKG_IMAGES[0]}" alt="${p.name}" loading="lazy"/>
        <div class="pkg-badge">${p.type}</div>
      </div>
      <div class="pkg-body">
        <div class="pkg-type">${p.type}</div>
        <div class="pkg-name">${p.name}</div>
        <div class="pkg-desc">${p.description}</div>
        <div class="pkg-footer">
          <div class="pkg-price">₱${p.price.toLocaleString()}<small> /pax</small></div>
          <button class="pkg-btn" onclick="event.stopPropagation(); selectPackageAndBook(${p.id})">Book Now</button>
        </div>
      </div>
    </div>
  `).join('');
}

function openPackageModal(id) {
  const p = TRAVEL_PACKAGES.find(x => x.id === id);
  if (!p) return;
  const i = ITINERARIES;
  document.getElementById('modalContent').innerHTML = `
    <h3 class="modal-title">${p.name}</h3>
    <div class="modal-row"><strong>Type:</strong><span>${p.type}</span></div>
    <div class="modal-row"><strong>Price:</strong><span>₱${p.price.toLocaleString()} /pax</span></div>
    <div class="modal-row"><strong>Description:</strong><span>${p.description}</span></div>
    <div class="modal-section">
      <h5>Available Itineraries</h5>
      ${i.slice(0,3).map(it => `
        <div style="margin-bottom:10px;padding:10px 12px;background:#f8f5f0;border-radius:8px;">
          <strong style="font-size:0.88rem;color:#0b1f3a;">${it.name}</strong><br>
          <span style="font-size:0.78rem;color:#666;">📅 ${it.duration} &nbsp;·&nbsp; 📍 ${it.destination}</span>
        </div>
      `).join('')}
    </div>
    <button class="btn-primary" style="width:100%;margin-top:16px" onclick="selectPackageAndBook(${p.id});closeModal()">✈ Book This Package</button>
  `;
  document.getElementById('modalOverlay').classList.remove('hidden');
}

function selectPackageAndBook(id) {
  const sel = document.getElementById('packageId');
  if (sel) { sel.value = id; onPackageChange(); }
  document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
}

function closeModal() {
  document.getElementById('modalOverlay').classList.add('hidden');
}

function renderTours() {
  const grid = document.getElementById('toursGrid');
  const tbody = document.getElementById('toursBody');
  if (grid) {
    grid.innerHTML = TOURS.map(t => `
      <div class="tour-card">
        <div class="tour-id">Tour ID: ${t.id}</div>
        <div class="tour-name">${t.name}</div>
        <div class="tour-meta">
          <span>📅 ${formatDate(t.date)}</span>
          <span>📍 ${t.location}</span>
        </div>
      </div>
    `).join('');
  }
  if (tbody) {
    tbody.innerHTML = TOURS.map(t => `
      <tr><td>${t.id}</td><td>${t.name}</td><td>${formatDate(t.date)}</td><td>${t.location}</td></tr>
    `).join('');
  }
}

function populateFormDropdowns() {
  const pkgSel = document.getElementById('packageId');
  if (pkgSel) {
    TRAVEL_PACKAGES.forEach(p => {
      const o = document.createElement('option');
      o.value = p.id; o.textContent = `${p.name} (₱${p.price.toLocaleString()})`;
      pkgSel.appendChild(o);
    });
  }
  const itnSel = document.getElementById('itineraryId');
  if (itnSel) {
    ITINERARIES.forEach(i => {
      const o = document.createElement('option');
      o.value = i.id; o.textContent = `${i.name} — ${i.destination}`;
      itnSel.appendChild(o);
    });
  }
  const csrSel = document.getElementById('csrId');
  if (csrSel) {
    CSR_TEAM.forEach(c => {
      const o = document.createElement('option');
      o.value = c.id; o.textContent = `${c.fname} ${c.lname} (${c.position})`;
      csrSel.appendChild(o);
    });
  }
}

function onPackageChange() {
  const val = document.getElementById('packageId').value;
  const pkg = TRAVEL_PACKAGES.find(p => p.id == val);
  const priceField = document.getElementById('packagePrice');
  if (pkg && priceField) {
    priceField.value = '₱' + pkg.price.toLocaleString();
    const amtField = document.getElementById('payAmount');
    if (amtField && !amtField.value) amtField.value = pkg.price;
  } else if (priceField) {
    priceField.value = '';
  }
  updateSummary();
}

function onItineraryChange() {
  const val = document.getElementById('itineraryId').value;
  const itn = ITINERARIES.find(i => i.id == val);
  const preview = document.getElementById('itineraryPreview');
  if (itn && preview) {
    preview.innerHTML = `
      <div class="itin-row"><strong>Name:</strong><span>${itn.name}</span></div>
      <div class="itin-row"><strong>Duration:</strong><span>${itn.duration}</span></div>
      <div class="itin-row"><strong>Destination:</strong><span>${itn.destination}</span></div>
      <div class="itin-row"><strong>Activities:</strong><span>${itn.activity}</span></div>
    `;
  } else if (preview) {
    preview.innerHTML = '<em>Select an itinerary to see details</em>';
  }
  updateSummary();
}

function renderSidebarStaff() {
  const csrList = document.getElementById('csrList');
  if (csrList) {
    csrList.innerHTML = CSR_TEAM.slice(0, 5).map(c => `
      <div class="staff-item">
        <div class="staff-avatar">${c.fname[0]}${c.lname[0]}</div>
        <div class="staff-info">
          <span class="staff-name">${c.fname} ${c.lname}</span>
          <span class="staff-role">${c.position}</span>
        </div>
      </div>
    `).join('');
  }
  const coordList = document.getElementById('coordinatorList');
  if (coordList) {
    coordList.innerHTML = COORDINATORS.slice(0, 4).map(c => `
      <div class="staff-item">
        <div class="staff-avatar">${c.fname[0]}${c.lname[0]}</div>
        <div class="staff-info">
          <span class="staff-name">${c.fname} ${c.lname}</span>
          <span class="staff-role" title="${c.experience}">${c.experience.substring(0, 32)}…</span>
        </div>
      </div>
    `).join('');
  }
}

let currentStep = 1;

function nextStep(step) {
  if (!validateStep(currentStep)) return;
  goToStep(step);
}
function prevStep(step) { goToStep(step); }

function goToStep(step) {
  document.getElementById('step' + currentStep).classList.remove('active');
  document.getElementById('stepItem' + currentStep).classList.remove('active');
  if (step > currentStep) document.getElementById('stepItem' + currentStep).classList.add('done');

  currentStep = step;
  document.getElementById('step' + currentStep).classList.add('active');
  document.getElementById('stepItem' + currentStep).classList.add('active');

  if (step === 3) updateSummary();
}

function validateStep(step) {
  let valid = true;
  const rules = {
    1: [
      { id: 'custFname',   label: 'First name is required' },
      { id: 'custLname',   label: 'Last name is required' },
      { id: 'custEmail',   label: 'A valid email is required', type: 'email' },
      { id: 'custPhone',   label: 'Phone number is required', pattern: /^09\d{9}$/, msg: 'Use format 09XXXXXXXXX' },
      { id: 'custAddress', label: 'Address is required' },
    ],
    2: [
      { id: 'packageId',   label: 'Please select a travel package' },
      { id: 'itineraryId', label: 'Please select an itinerary' },
      { id: 'bookDate',    label: 'Booking date is required' },
    ],
    3: [
      { id: 'payMethod', label: 'Please select a payment method' },
      { id: 'payAmount', label: 'Please enter the payment amount', type: 'number' },
    ]
  };
  (rules[step] || []).forEach(rule => {
    const el = document.getElementById(rule.id);
    const errEl = document.getElementById('e-' + rule.id);
    if (!el) return;
    let err = '';
    if (!el.value.trim()) {
      err = rule.label;
    } else if (rule.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)) {
      err = rule.label;
    } else if (rule.pattern && !rule.pattern.test(el.value)) {
      err = rule.msg || rule.label;
    } else if (rule.type === 'number' && (isNaN(el.value) || Number(el.value) <= 0)) {
      err = 'Enter a valid amount greater than 0';
    }
    if (errEl) errEl.textContent = err;
    if (err) { valid = false; el.focus(); }
  });
  return valid;
}

function setDefaultDate() {
  const today = new Date().toISOString().split('T')[0];
  const bd = document.getElementById('bookDate');
  if (bd) bd.value = today;
}

function togglePayFields() {
  const method = document.getElementById('payMethod').value;
  document.getElementById('ccFields').style.display   = method === 'Credit Card'   ? 'block' : 'none';
  document.getElementById('btFields').style.display   = method === 'Bank Transfer' ? 'block' : 'none';
  document.getElementById('cashFields').style.display = method === 'Cash'          ? 'block' : 'none';
  updateSummary();
}

function updateSummary() {
  const grid = document.getElementById('summaryGrid');
  if (!grid) return;
  const pkg = TRAVEL_PACKAGES.find(p => p.id == document.getElementById('packageId')?.value);
  const itn = ITINERARIES.find(i => i.id == document.getElementById('itineraryId')?.value);
  const items = [
    ['Customer',    [document.getElementById('custFname')?.value, document.getElementById('custLname')?.value].filter(Boolean).join(' ') || '—'],
    ['Package',     pkg ? pkg.name : '—'],
    ['Destination', itn ? itn.destination : '—'],
    ['Duration',    itn ? itn.duration : '—'],
    ['Tour Type',   document.getElementById('tourType')?.value || '—'],
    ['Book Date',   document.getElementById('bookDate')?.value || '—'],
    ['Pay Method',  document.getElementById('payMethod')?.value || '—'],
    ['Amount',      document.getElementById('payAmount')?.value ? '₱' + Number(document.getElementById('payAmount').value).toLocaleString() : '—'],
  ];
  grid.innerHTML = items.map(([k, v]) => `
    <div class="summary-item"><span>${k}</span><span>${v}</span></div>
  `).join('');
}

function setupStepSummary() {
  ['custFname','custLname','payAmount','tourType','bookDate','payMethod'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updateSummary);
  });
}

// ── ADMIN / RECORDS ────────────────────────────────────────────

let activeTab = 'bookings';

function switchTab(tab) {
  activeTab = tab;
  document.querySelectorAll('.rtab').forEach((b, i) => {
    b.classList.toggle('active', ['bookings','customers','payments','tourtab'][i] === tab);
  });
  ['bookings','customers','payments','tourtab'].forEach(t => {
    const el = document.getElementById('tab-' + t);
    if (el) el.classList.toggle('hidden', t !== tab);
  });
  filterRecords();
}

function filterRecords() {
  const q = (document.getElementById('searchInput')?.value || '').toLowerCase();
  const sf = document.getElementById('statusFilter')?.value || '';
  renderBookingsTable(q, sf);
  renderCustomersTable(q, sf);
  renderPaymentsTable(q, sf);
  updateStats();
}

function renderRecords() {
  filterRecords();
}

function renderBookingsTable(q, sf) {
  const tbody = document.getElementById('bookingsBody');
  const empty = document.getElementById('emptyBookings');
  if (!tbody) return;

  let data = (db.bookings || []).filter(b =>
    (!q || (
       (b.customer_name || '').toLowerCase().includes(q) ||
       (b.package_name || '').toLowerCase().includes(q)
    )) &&
    (!sf || b.book_status === sf)
  );

  if (!data.length) {
    tbody.innerHTML = '';
    if (empty) empty.classList.remove('hidden');
    return;
  }
  if (empty) empty.classList.add('hidden');

  tbody.innerHTML = data.map((b, i) => `
    <tr>
      <td><span style="font-size:0.75rem;color:#999;">${i+1}</span></td>
      <td><strong>${b.customer_name || '—'}</strong></td>
      <td>${b.package_name || '—'}</td>
      <td>${b.itinerary_name || '—'}</td>
      <td><span class="badge badge-regular">${b.tour_type || '—'}</span></td>
      <td>${formatDate(b.book_date)}</td>
      <td><span class="badge ${statusBadge(b.book_status)}">${b.book_status}</span></td>
      <td>
        <button class="tb-btn tb-view" onclick="viewBooking('${b.id}')">View</button>
        <button class="tb-btn tb-delete" onclick="deleteRecord('bookings','${b.id}')">Del</button>
      </td>
    </tr>
  `).join('');
}

function renderCustomersTable(q, sf) {
  const tbody = document.getElementById('customersBody');
  const empty = document.getElementById('emptyCustomers');
  if (!tbody) return;

  let data = (db.customers || []).filter(c =>
    (!q || (
      (c.fname || '').toLowerCase().includes(q) ||
      (c.lname || '').toLowerCase().includes(q)
    )) &&
    (!sf || c.type === sf)
  );

  if (!data.length) {
    tbody.innerHTML = '';
    if (empty) empty.classList.remove('hidden');
    return;
  }
  if (empty) empty.classList.add('hidden');

  tbody.innerHTML = data.map(c => `
    <tr>
      <td><span style="font-size:0.72rem;color:#999;">${c.id.slice(0,8)}...</span></td>
      <td><strong>${c.fname} ${c.lname}</strong></td>
      <td>${c.email}</td>
      <td>${c.phone}</td>
      <td>${c.address}</td>
      <td><span class="badge ${c.type === 'VIP' ? 'badge-vip' : 'badge-regular'}">${c.type}</span></td>
      <td>
        <button class="tb-btn tb-view" onclick="viewCustomer('${c.id}')">View</button>
        <button class="tb-btn tb-delete" onclick="deleteRecord('customers','${c.id}')">Del</button>
      </td>
    </tr>
  `).join('');
}

function renderPaymentsTable(q, sf) {
  const tbody = document.getElementById('paymentsBody');
  const empty = document.getElementById('emptyPayments');
  if (!tbody) return;

  let data = (db.payments || []).filter(p =>
    (!q || (p.customer_name || '').toLowerCase().includes(q)) &&
    (!sf || p.status === sf)
  );

  if (!data.length) {
    tbody.innerHTML = '';
    if (empty) empty.classList.remove('hidden');
    return;
  }
  if (empty) empty.classList.add('hidden');

  tbody.innerHTML = data.map(p => `
    <tr>
      <td><span style="font-size:0.72rem;color:#999;">${p.id.slice(0,8)}...</span></td>
      <td>${p.customer_name || '—'}</td>
      <td><span style="font-size:0.72rem;color:#999;">${(p.booking_id || '').slice(0,8)}...</span></td>
      <td><strong>₱${(p.amount || 0).toLocaleString()}</strong></td>
      <td>${p.method}</td>
      <td><span class="badge ${statusBadge(p.status)}">${p.status}</span></td>
      <td>
        <button class="tb-btn tb-view" onclick="viewPayment('${p.id}')">View</button>
        <button class="tb-btn tb-delete" onclick="deleteRecord('payments','${p.id}')">Del</button>
      </td>
    </tr>
  `).join('');
}

// ── MODAL VIEWS ────────────────────────────────────────────────

function viewBooking(id) {
  const b = db.bookings.find(x => x.id === id);
  const p = db.payments.find(x => x.booking_id === id);
  if (!b) return;
  document.getElementById('modalContent').innerHTML = `
    <h3 class="modal-title">📋 Booking Details</h3>
    <div class="modal-row"><strong>Booking ID:</strong><span>${b.id}</span></div>
    <div class="modal-row"><strong>Customer:</strong><span>${b.customer_name}</span></div>
    <div class="modal-row"><strong>Package:</strong><span>${b.package_name}</span></div>
    <div class="modal-row"><strong>Itinerary:</strong><span>${b.itinerary_name}</span></div>
    <div class="modal-row"><strong>Destination:</strong><span>${b.destination}</span></div>
    <div class="modal-row"><strong>Tour Type:</strong><span>${b.tour_type}</span></div>
    <div class="modal-row"><strong>Booking Date:</strong><span>${formatDate(b.book_date)}</span></div>
    <div class="modal-row"><strong>Status:</strong><span class="badge ${statusBadge(b.book_status)}">${b.book_status}</span></div>
    <div class="modal-row"><strong>Assigned CSR:</strong><span>${b.csr_name}</span></div>
    ${p ? `
    <div class="modal-section">
      <h5>Payment Info</h5>
      <div class="modal-row"><strong>Amount:</strong><span>₱${(p.amount || 0).toLocaleString()}</span></div>
      <div class="modal-row"><strong>Method:</strong><span>${p.method}</span></div>
      <div class="modal-row"><strong>Status:</strong><span class="badge ${statusBadge(p.status)}">${p.status}</span></div>
    </div>` : ''}
  `;
  document.getElementById('modalOverlay').classList.remove('hidden');
}

function viewCustomer(id) {
  const c = db.customers.find(x => x.id === id);
  if (!c) return;
  const bookings = db.bookings.filter(b => b.customer_id === id);
  document.getElementById('modalContent').innerHTML = `
    <h3 class="modal-title">👤 Customer Profile</h3>
    <div class="modal-row"><strong>Name:</strong><span>${c.fname} ${c.lname}</span></div>
    <div class="modal-row"><strong>Email:</strong><span>${c.email}</span></div>
    <div class="modal-row"><strong>Phone:</strong><span>${c.phone}</span></div>
    <div class="modal-row"><strong>Address:</strong><span>${c.address}</span></div>
    <div class="modal-row"><strong>Type:</strong><span class="badge ${c.type === 'VIP' ? 'badge-vip' : 'badge-regular'}">${c.type}</span></div>
    ${bookings.length ? `
    <div class="modal-section">
      <h5>Bookings (${bookings.length})</h5>
      ${bookings.map(b => `<div class="modal-row"><strong>${b.package_name}</strong><span class="badge ${statusBadge(b.book_status)}">${b.book_status}</span></div>`).join('')}
    </div>` : ''}
  `;
  document.getElementById('modalOverlay').classList.remove('hidden');
}

function viewPayment(id) {
  const p = db.payments.find(x => x.id === id);
  if (!p) return;
  document.getElementById('modalContent').innerHTML = `
    <h3 class="modal-title">💳 Payment Details</h3>
    <div class="modal-row"><strong>Payment ID:</strong><span>${p.id}</span></div>
    <div class="modal-row"><strong>Customer:</strong><span>${p.customer_name}</span></div>
    <div class="modal-row"><strong>Booking ID:</strong><span>${p.booking_id}</span></div>
    <div class="modal-row"><strong>Amount:</strong><span>₱${(p.amount||0).toLocaleString()}</span></div>
    <div class="modal-row"><strong>Method:</strong><span>${p.method}</span></div>
    <div class="modal-row"><strong>Status:</strong><span class="badge ${statusBadge(p.status)}">${p.status}</span></div>
    <div class="modal-row"><strong>Date:</strong><span>${formatDate(p.date)}</span></div>
    ${p.cc_type ? `<div class="modal-section"><h5>Credit Card</h5>
      <div class="modal-row"><strong>Type:</strong><span>${p.cc_type}</span></div>
      <div class="modal-row"><strong>Card No:</strong><span>${p.cc_number || '—'}</span></div>
      <div class="modal-row"><strong>Expiry:</strong><span>${p.cc_expiry || '—'}</span></div>
    </div>` : ''}
    ${p.bt_bank ? `<div class="modal-section"><h5>Bank Transfer</h5>
      <div class="modal-row"><strong>Bank:</strong><span>${p.bt_bank}</span></div>
      <div class="modal-row"><strong>Reference:</strong><span>${p.bt_ref || '—'}</span></div>
    </div>` : ''}
    ${p.cash_receipt ? `<div class="modal-section"><h5>Cash</h5>
      <div class="modal-row"><strong>Receipt No:</strong><span>${p.cash_receipt}</span></div>
    </div>` : ''}
  `;
  document.getElementById('modalOverlay').classList.remove('hidden');
}

function updateStats() {
  const totalB = db.bookings ? db.bookings.length : 0;
  const confirmed = db.bookings ? db.bookings.filter(b => b.book_status === 'Confirmed' || b.book_status === 'Completed').length : 0;
  const revenue = db.payments ? db.payments.filter(p => p.status === 'Completed').reduce((s, p) => s + (p.amount || 0), 0) : 0;
  const vip = db.customers ? db.customers.filter(c => c.type === 'VIP').length : 0;

  setEl('statBookings',  totalB);
  setEl('statConfirmed', confirmed);
  setEl('statRevenue',   '₱' + revenue.toLocaleString());
  setEl('statVIP',       vip);
  setEl('totalBookings', totalB);
}

function exportCSV() {
  if (!db.bookings || !db.bookings.length) { alert('No bookings to export.'); return; }
  const headers = ['Booking ID','Customer','Package','Itinerary','Destination','Tour Type','Date','Status','CSR'];
  const rows = db.bookings.map(b => [
    b.id, b.customer_name, b.package_name, b.itinerary_name,
    b.destination, b.tour_type, b.book_date, b.book_status, b.csr_name
  ]);
  const csv = [headers, ...rows].map(r => r.map(c => `"${c || ''}"`).join(',')).join('\n');
  const a = document.createElement('a');
  a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
  a.download = 'skysurfers_bookings_' + new Date().toISOString().slice(0,10) + '.csv';
  a.click();
}

function statusBadge(s) {
  const map = { Pending: 'badge-pending', Confirmed: 'badge-confirmed', Completed: 'badge-completed', Cancelled: 'badge-cancelled' };
  return map[s] || 'badge-regular';
}

function formatDate(d) {
  if (!d) return '—';
  const dt = new Date(d);
  return dt.toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' });
}

function setEl(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}