const mongoose = require('mongoose');
require('dotenv').config();

const Medicine = require('./models/Medicine');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/medisearch';

// Sample medicine data with all requirements
const medicinesData = [
  // Pain & Fever
  { brandName: 'Dolo', genericName: 'Paracetamol', manufacturer: 'Micro Labs', dosageForm: 'Tablet', strength: '650mg', route: 'Oral', pricing: { branded: 35, generic: 12, savings: 23, savingsPercentage: 66 }, category: 'Pain Relief', indication: 'Fever, Pain, Headache', searchTerms: ['dolo', 'paracetamol', 'acetaminophen', 'pain', 'fever', '650mg'] },
  { brandName: 'Crocin', genericName: 'Paracetamol', manufacturer: 'GlaxoSmithKline', dosageForm: 'Tablet', strength: '500mg', route: 'Oral', pricing: { branded: 40, generic: 12, savings: 28, savingsPercentage: 70 }, category: 'Pain Relief', indication: 'Fever, Pain, Cold', searchTerms: ['crocin', 'paracetamol', 'pain', 'fever', 'cold'] },
  { brandName: 'Brufen', genericName: 'Ibuprofen', manufacturer: 'Abbott', dosageForm: 'Tablet', strength: '400mg', route: 'Oral', pricing: { branded: 55, generic: 18, savings: 37, savingsPercentage: 67 }, category: 'Anti-inflammatory', indication: 'Pain, Inflammation, Fever', searchTerms: ['brufen', 'ibuprofen', 'pain', 'inflammation'] },
  { brandName: 'Combiflam', genericName: 'Ibuprofen + Paracetamol', manufacturer: 'Sanofi', dosageForm: 'Tablet', strength: '400mg + 325mg', route: 'Oral', pricing: { branded: 45, generic: 15, savings: 30, savingsPercentage: 67 }, category: 'Pain Relief', indication: 'Severe Pain, Fever', searchTerms: ['combiflam', 'ibuprofen', 'paracetamol', 'pain', 'fever'] },
  { brandName: 'Aspirin', genericName: 'Aspirin', manufacturer: 'Bayer', dosageForm: 'Tablet', strength: '500mg', route: 'Oral', pricing: { branded: 30, generic: 8, savings: 22, savingsPercentage: 73 }, category: 'Pain Relief', indication: 'Pain, Fever, Heart Health', searchTerms: ['aspirin', 'pain', 'fever'] },

  // Antibiotics
  { brandName: 'Augmentin', genericName: 'Amoxicillin + Clavulanic Acid', manufacturer: 'GlaxoSmithKline', dosageForm: 'Tablet', strength: '625mg', route: 'Oral', pricing: { branded: 120, generic: 35, savings: 85, savingsPercentage: 71 }, category: 'Antibiotic', indication: 'Bacterial Infections', searchTerms: ['augmentin', 'amoxicillin', 'antibiotic', 'infection'] },
  { brandName: 'Moxcil', genericName: 'Amoxicillin', manufacturer: 'Cipla', dosageForm: 'Tablet', strength: '500mg', route: 'Oral', pricing: { branded: 80, generic: 22, savings: 58, savingsPercentage: 73 }, category: 'Antibiotic', indication: 'Bacterial Infections', searchTerms: ['moxcil', 'amoxicillin', 'antibiotic'] },
  { brandName: 'Ciprofloxacin', genericName: 'Ciprofloxacin', manufacturer: 'Cipla', dosageForm: 'Tablet', strength: '500mg', route: 'Oral', pricing: { branded: 120, generic: 28, savings: 92, savingsPercentage: 77 }, category: 'Antibiotic', indication: 'Bacterial Infections', searchTerms: ['ciprofloxacin', 'antibiotic', 'infection', 'cipro'] },
  { brandName: 'Azithromycin', genericName: 'Azithromycin', manufacturer: 'Cipla', dosageForm: 'Tablet', strength: '500mg', route: 'Oral', pricing: { branded: 140, generic: 32, savings: 108, savingsPercentage: 77 }, category: 'Antibiotic', indication: 'Bacterial Infections, Respiratory', searchTerms: ['azithromycin', 'antibiotic', 'z-pack'] },
  { brandName: 'Levofloxacin', genericName: 'Levofloxacin', manufacturer: 'Cipla', dosageForm: 'Tablet', strength: '500mg', route: 'Oral', pricing: { branded: 110, generic: 25, savings: 85, savingsPercentage: 77 }, category: 'Antibiotic', indication: 'Respiratory, UTI Infections', searchTerms: ['levofloxacin', 'antibiotic'] },
  { brandName: 'Cefixime', genericName: 'Cefixime', manufacturer: 'Cipla', dosageForm: 'Tablet', strength: '400mg', route: 'Oral', pricing: { branded: 125, generic: 30, savings: 95, savingsPercentage: 76 }, category: 'Antibiotic', indication: 'Bacterial Infections', searchTerms: ['cefixime', 'antibiotic', 'cephalosporin'] },

  // Diabetes
  { brandName: 'Glucophage', genericName: 'Metformin', manufacturer: 'Merck', dosageForm: 'Tablet', strength: '500mg', route: 'Oral', pricing: { branded: 150, generic: 25, savings: 125, savingsPercentage: 83 }, category: 'Diabetes', indication: 'Type 2 Diabetes', searchTerms: ['glucophage', 'metformin', 'diabetes'] },
  { brandName: 'Glycomet', genericName: 'Metformin', manufacturer: 'USV', dosageForm: 'Tablet', strength: '500mg', route: 'Oral', pricing: { branded: 120, generic: 25, savings: 95, savingsPercentage: 79 }, category: 'Diabetes', indication: 'Type 2 Diabetes', searchTerms: ['glycomet', 'metformin', 'diabetes'] },
  { brandName: 'Glynase', genericName: 'Glyburide', manufacturer: 'Cipla', dosageForm: 'Tablet', strength: '5mg', route: 'Oral', pricing: { branded: 80, generic: 20, savings: 60, savingsPercentage: 75 }, category: 'Diabetes', indication: 'Type 2 Diabetes', searchTerms: ['glynase', 'glyburide', 'diabetes'] },
  { brandName: 'Pioglit', genericName: 'Pioglitazone', manufacturer: 'Cipla', dosageForm: 'Tablet', strength: '15mg', route: 'Oral', pricing: { branded: 160, generic: 40, savings: 120, savingsPercentage: 75 }, category: 'Diabetes', indication: 'Type 2 Diabetes', searchTerms: ['pioglit', 'pioglitazone', 'diabetes'] },

  // Cholesterol
  { brandName: 'Atorvastatin', genericName: 'Atorvastatin', manufacturer: 'Cipla', dosageForm: 'Tablet', strength: '10mg', route: 'Oral', pricing: { branded: 150, generic: 35, savings: 115, savingsPercentage: 77 }, category: 'Lipid Lowering', indication: 'High Cholesterol', searchTerms: ['atorvastatin', 'cholesterol', 'lipid'] },
  { brandName: 'Lipitor', genericName: 'Atorvastatin', manufacturer: 'Pfizer', dosageForm: 'Tablet', strength: '20mg', route: 'Oral', pricing: { branded: 200, generic: 35, savings: 165, savingsPercentage: 83 }, category: 'Lipid Lowering', indication: 'High Cholesterol', searchTerms: ['lipitor', 'atorvastatin', 'cholesterol'] },
  { brandName: 'Simvastatin', genericName: 'Simvastatin', manufacturer: 'Cipla', dosageForm: 'Tablet', strength: '20mg', route: 'Oral', pricing: { branded: 140, generic: 30, savings: 110, savingsPercentage: 79 }, category: 'Lipid Lowering', indication: 'High Cholesterol', searchTerms: ['simvastatin', 'cholesterol'] },

  // Acid Reflux & GI
  { brandName: 'Omeprazole', genericName: 'Omeprazole', manufacturer: 'Cipla', dosageForm: 'Capsule', strength: '20mg', route: 'Oral', pricing: { branded: 70, generic: 15, savings: 55, savingsPercentage: 79 }, category: 'Acid Reflux', indication: 'GERD, Acidity', searchTerms: ['omeprazole', 'acidity', 'gerd', 'acid reflux'] },
  { brandName: 'Nexium', genericName: 'Esomeprazole', manufacturer: 'AstraZeneca', dosageForm: 'Capsule', strength: '20mg', route: 'Oral', pricing: { branded: 110, generic: 18, savings: 92, savingsPercentage: 84 }, category: 'Acid Reflux', indication: 'GERD, Acidity', searchTerms: ['nexium', 'esomeprazole', 'acidity'] },
  { brandName: 'Ranitidine', genericName: 'Ranitidine', manufacturer: 'Cipla', dosageForm: 'Tablet', strength: '150mg', route: 'Oral', pricing: { branded: 50, generic: 12, savings: 38, savingsPercentage: 76 }, category: 'Acid Reflux', indication: 'Acidity, Ulcer', searchTerms: ['ranitidine', 'acidity', 'ulcer'] },
  { brandName: 'Pantoprazole', genericName: 'Pantoprazole', manufacturer: 'Cipla', dosageForm: 'Tablet', strength: '40mg', route: 'Oral', pricing: { branded: 85, generic: 20, savings: 65, savingsPercentage: 76 }, category: 'Acid Reflux', indication: 'GERD, Acidity', searchTerms: ['pantoprazole', 'acidity', 'gerd'] },

  // Allergies
  { brandName: 'Cetirizine', genericName: 'Cetirizine', manufacturer: 'Cipla', dosageForm: 'Tablet', strength: '10mg', route: 'Oral', pricing: { branded: 40, generic: 8, savings: 32, savingsPercentage: 80 }, category: 'Antihistamine', indication: 'Allergies, Itching', searchTerms: ['cetirizine', 'allergy', 'antihistamine'] },
  { brandName: 'Loratadine', genericName: 'Loratadine', manufacturer: 'Cipla', dosageForm: 'Tablet', strength: '10mg', route: 'Oral', pricing: { branded: 45, generic: 10, savings: 35, savingsPercentage: 78 }, category: 'Antihistamine', indication: 'Allergies', searchTerms: ['loratadine', 'allergy', 'antihistamine'] },
  { brandName: 'Fexofenadine', genericName: 'Fexofenadine', manufacturer: 'Cipla', dosageForm: 'Tablet', strength: '180mg', route: 'Oral', pricing: { branded: 55, generic: 12, savings: 43, savingsPercentage: 78 }, category: 'Antihistamine', indication: 'Allergies, Hay Fever', searchTerms: ['fexofenadine', 'allergy'] },

  // Blood Pressure
  { brandName: 'Amlodipine', genericName: 'Amlodipine', manufacturer: 'Cipla', dosageForm: 'Tablet', strength: '5mg', route: 'Oral', pricing: { branded: 85, generic: 20, savings: 65, savingsPercentage: 76 }, category: 'Blood Pressure', indication: 'Hypertension', searchTerms: ['amlodipine', 'blood pressure', 'hypertension'] },
  { brandName: 'Lisinopril', genericName: 'Lisinopril', manufacturer: 'Cipla', dosageForm: 'Tablet', strength: '5mg', route: 'Oral', pricing: { branded: 75, generic: 18, savings: 57, savingsPercentage: 76 }, category: 'Blood Pressure', indication: 'Hypertension', searchTerms: ['lisinopril', 'blood pressure'] },
  { brandName: 'Metoprolol', genericName: 'Metoprolol', manufacturer: 'Cipla', dosageForm: 'Tablet', strength: '25mg', route: 'Oral', pricing: { branded: 65, generic: 15, savings: 50, savingsPercentage: 77 }, category: 'Blood Pressure', indication: 'Hypertension, Heart Disease', searchTerms: ['metoprolol', 'blood pressure'] },

  // Cold & Cough
  { brandName: 'Corex', genericName: 'Dextromethorphan + Paracetamol', manufacturer: 'Cipla', dosageForm: 'Syrup', strength: '10ml', route: 'Oral', pricing: { branded: 120, generic: 40, savings: 80, savingsPercentage: 67 }, category: 'Cough Suppressant', indication: 'Cough, Cold', searchTerms: ['corex', 'cough', 'cold', 'dextromethorphan'] },
  { brandName: 'Robitussin', genericName: 'Dextromethorphan', manufacturer: 'Wyeth', dosageForm: 'Syrup', strength: '10ml', route: 'Oral', pricing: { branded: 140, generic: 40, savings: 100, savingsPercentage: 71 }, category: 'Cough Suppressant', indication: 'Cough', searchTerms: ['robitussin', 'cough', 'dextromethorphan'] },

  // Vitamins & Supplements
  { brandName: 'Celin', genericName: 'Vitamin C', manufacturer: 'Abbott', dosageForm: 'Tablet', strength: '500mg', route: 'Oral', pricing: { branded: 45, generic: 12, savings: 33, savingsPercentage: 73 }, category: 'Vitamin', indication: 'Immunity, Antioxidant', searchTerms: ['celin', 'vitamin c', 'immunity'] },
  { brandName: 'B-Complex', genericName: 'Vitamin B Complex', manufacturer: 'Cipla', dosageForm: 'Tablet', strength: '1 tablet', route: 'Oral', pricing: { branded: 50, generic: 15, savings: 35, savingsPercentage: 70 }, category: 'Vitamin', indication: 'Energy, Stress', searchTerms: ['b-complex', 'vitamin b', 'energy'] },
  { brandName: 'Becosules', genericName: 'Vitamin B Complex', manufacturer: 'Pfizer', dosageForm: 'Capsule', strength: '1 capsule', route: 'Oral', pricing: { branded: 60, generic: 15, savings: 45, savingsPercentage: 75 }, category: 'Vitamin', indication: 'Energy, Stress', searchTerms: ['becosules', 'vitamin b'] },
  { brandName: 'Evion', genericName: 'Vitamin E', manufacturer: 'Merck', dosageForm: 'Capsule', strength: '400 IU', route: 'Oral', pricing: { branded: 55, generic: 15, savings: 40, savingsPercentage: 73 }, category: 'Vitamin', indication: 'Antioxidant, Skin Health', searchTerms: ['evion', 'vitamin e'] },

  // Thyroid
  { brandName: 'Eltroxin', genericName: 'Levothyroxine', manufacturer: 'GlaxoSmithKline', dosageForm: 'Tablet', strength: '50mcg', route: 'Oral', pricing: { branded: 95, generic: 22, savings: 73, savingsPercentage: 77 }, category: 'Thyroid', indication: 'Hypothyroidism', searchTerms: ['eltroxin', 'levothyroxine', 'thyroid'] },
  { brandName: 'Thyronorm', genericName: 'Levothyroxine', manufacturer: 'Abbott', dosageForm: 'Tablet', strength: '50mcg', route: 'Oral', pricing: { branded: 85, generic: 22, savings: 63, savingsPercentage: 74 }, category: 'Thyroid', indication: 'Hypothyroidism', searchTerms: ['thyronorm', 'levothyroxine', 'thyroid'] },

  // Asthma & Respiratory
  { brandName: 'Asthalin', genericName: 'Salbutamol', manufacturer: 'Cipla', dosageForm: 'Inhaler', strength: '100mcg', route: 'Inhalation', pricing: { branded: 130, generic: 35, savings: 95, savingsPercentage: 73 }, category: 'Asthma', indication: 'Asthma, COPD', searchTerms: ['asthalin', 'salbutamol', 'asthma'] },
  { brandName: 'Budecort', genericName: 'Budesonide', manufacturer: 'Cipla', dosageForm: 'Inhaler', strength: '200mcg', route: 'Inhalation', pricing: { branded: 150, generic: 40, savings: 110, savingsPercentage: 73 }, category: 'Asthma', indication: 'Asthma', searchTerms: ['budecort', 'budesonide', 'asthma'] },

  // Sleep & Anxiety
  { brandName: 'Alprazolam', genericName: 'Alprazolam', manufacturer: 'Cipla', dosageForm: 'Tablet', strength: '0.5mg', route: 'Oral', pricing: { branded: 70, generic: 18, savings: 52, savingsPercentage: 74 }, category: 'Anti-anxiety', indication: 'Anxiety, Panic Disorder', searchTerms: ['alprazolam', 'anxiety', 'panic'] },
  { brandName: 'Lorazepam', genericName: 'Lorazepam', manufacturer: 'Cipla', dosageForm: 'Tablet', strength: '1mg', route: 'Oral', pricing: { branded: 80, generic: 20, savings: 60, savingsPercentage: 75 }, category: 'Anti-anxiety', indication: 'Anxiety, Sleep', searchTerms: ['lorazepam', 'anxiety', 'sleep'] },
];

async function seedMedicines() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected');

    // Clear existing medicines
    await Medicine.deleteMany({});
    console.log('🗑️  Cleared existing medicines');

    // Insert new medicines
    const result = await Medicine.insertMany(medicinesData);
    console.log(`✅ Seeded ${result.length} medicines successfully!`);

    // Show seeded data
    console.log('\n📋 Seeded Medicines:');
    result.forEach(med => {
      console.log(
        `   - ${med.brandName} (${med.genericName}) | ₹${med.pricing.branded} → ₹${med.pricing.generic} | Save ₹${med.pricing.savings}`
      );
    });

    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding medicines:', err.message);
    process.exit(1);
  }
}

seedMedicines();
