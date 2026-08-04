const Pharmacy = require('../models/Pharmacy');

const defaultKendras = [
  // ── MUMBAI & THANE ──
  {
    kendraCode: 'PMBJP-MH-101',
    name: 'Pradhan Mantri Bhartiya Janaushadhi Kendra — Dadar West',
    address: 'Shop No. 4, Near Dadar Railway Station, Senapati Bapat Marg, Dadar West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400028',
    phone: '+91 98201 12345',
    openingHours: '08:30 AM - 09:30 PM',
    location: { type: 'Point', coordinates: [72.8397, 19.0178] },
    inStockGenerics: ['Paracetamol', 'Metformin', 'Atorvastatin', 'Amoxicillin', 'Pantoprazole', 'Telmisartan', 'Amlodipine', 'Cetirizine', 'Azithromycin']
  },
  {
    kendraCode: 'PMBJP-MH-102',
    name: 'PMBJP Jan Aushadhi Kendra — Andheri East',
    address: 'Opp. Railway Station, SV Road, Andheri East',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400069',
    phone: '+91 98202 23456',
    openingHours: '09:00 AM - 09:00 PM',
    location: { type: 'Point', coordinates: [72.8530, 19.1197] },
    inStockGenerics: ['Paracetamol', 'Metformin', 'Atorvastatin', 'Amoxicillin', 'Pantoprazole', 'Montelukast', 'Losartan', 'Omeprazole']
  },
  {
    kendraCode: 'PMBJP-MH-103',
    name: 'PMBJP Jan Aushadhi Kendra — Thane West',
    address: 'Shop 12, Gokhale Road, Naupada, Thane West',
    city: 'Thane',
    state: 'Maharashtra',
    pincode: '400602',
    phone: '+91 98203 34567',
    openingHours: '09:00 AM - 09:00 PM',
    location: { type: 'Point', coordinates: [72.9781, 19.1943] },
    inStockGenerics: ['Paracetamol', 'Metformin', 'Atorvastatin', 'Telmisartan', 'Calcium Carbonate', 'Vitamin D3', 'Ciprofloxacin']
  },

  // ── DELHI & NCR ──
  {
    kendraCode: 'PMBJP-DL-201',
    name: 'Jan Aushadhi Store — AIIMS Campus',
    address: 'Ground Floor, OPD Building, AIIMS Hospital, Ansari Nagar',
    city: 'Delhi',
    state: 'Delhi',
    pincode: '110029',
    phone: '+91 98101 45678',
    openingHours: '24 Hours Open',
    location: { type: 'Point', coordinates: [77.2100, 28.5672] },
    inStockGenerics: ['Paracetamol', 'Metformin', 'Atorvastatin', 'Amoxicillin', 'Pantoprazole', 'Telmisartan', 'Amlodipine', 'Azithromycin', 'Levofloxacin', 'Doxycycline']
  },
  {
    kendraCode: 'PMBJP-DL-202',
    name: 'PMBJP Kendra — Connaught Place',
    address: 'Block B, Inner Circle, Connaught Place',
    city: 'Delhi',
    state: 'Delhi',
    pincode: '110001',
    phone: '+91 98102 56789',
    openingHours: '09:00 AM - 08:30 PM',
    location: { type: 'Point', coordinates: [77.2197, 28.6315] },
    inStockGenerics: ['Paracetamol', 'Metformin', 'Atorvastatin', 'Pantoprazole', 'Cetirizine', 'Fexofenadine']
  },

  // ── AHMEDABAD & GUJARAT ──
  {
    kendraCode: 'PMBJP-GJ-301',
    name: 'Jan Aushadhi Kendra — Ellisbridge',
    address: 'Near VS Hospital, Ashram Road, Ellisbridge',
    city: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '380006',
    phone: '+91 98980 11223',
    openingHours: '09:00 AM - 09:00 PM',
    location: { type: 'Point', coordinates: [72.5714, 23.0225] },
    inStockGenerics: ['Paracetamol', 'Metformin', 'Atorvastatin', 'Amoxicillin', 'Pantoprazole', 'Telmisartan', 'Cetirizine', 'Fluconazole']
  },
  {
    kendraCode: 'PMBJP-GJ-302',
    name: 'PMBJP Store — Satellite',
    address: 'Shop 8, Shivranjani Cross Roads, Satellite',
    city: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '380015',
    phone: '+91 98981 22334',
    openingHours: '09:00 AM - 09:00 PM',
    location: { type: 'Point', coordinates: [72.5270, 23.0264] },
    inStockGenerics: ['Paracetamol', 'Metformin', 'Atorvastatin', 'Telmisartan', 'Amlodipine', 'Montelukast']
  },
  {
    kendraCode: 'PMBJP-GJ-303',
    name: 'Jan Aushadhi Kendra — Ring Road, Surat',
    address: 'Ground Floor, Millennium Market, Ring Road',
    city: 'Surat',
    state: 'Gujarat',
    pincode: '395002',
    phone: '+91 98982 33445',
    openingHours: '09:00 AM - 09:00 PM',
    location: { type: 'Point', coordinates: [72.8311, 21.1702] },
    inStockGenerics: ['Paracetamol', 'Metformin', 'Atorvastatin', 'Amoxicillin', 'Pantoprazole']
  },

  // ── BENGALURU ──
  {
    kendraCode: 'PMBJP-KA-401',
    name: 'Jan Aushadhi Kendra — Jayanagar',
    address: '4th Block Complex, 11th Main Road, Jayanagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560011',
    phone: '+91 98450 66778',
    openingHours: '08:30 AM - 09:00 PM',
    location: { type: 'Point', coordinates: [77.5848, 12.9250] },
    inStockGenerics: ['Paracetamol', 'Metformin', 'Atorvastatin', 'Amoxicillin', 'Pantoprazole', 'Telmisartan', 'Azithromycin']
  },

  // ── PUNE ──
  {
    kendraCode: 'PMBJP-MH-104',
    name: 'Jan Aushadhi Kendra — Kothrud',
    address: 'Karve Road, Near Paud Phata, Kothrud',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411038',
    phone: '+91 98220 77889',
    openingHours: '09:00 AM - 09:00 PM',
    location: { type: 'Point', coordinates: [73.8182, 18.5074] },
    inStockGenerics: ['Paracetamol', 'Metformin', 'Atorvastatin', 'Pantoprazole', 'Telmisartan', 'Amlodipine']
  }
];

async function seedPharmacies() {
  try {
    const count = await Pharmacy.countDocuments();
    if (count === 0) {
      await Pharmacy.insertMany(defaultKendras);
      console.log('✅ Jan Aushadhi Kendras seeded successfully (10 stores)');
    }
  } catch (err) {
    console.error('❌ Error seeding Jan Aushadhi Kendras:', err.message);
  }
}

module.exports = seedPharmacies;
