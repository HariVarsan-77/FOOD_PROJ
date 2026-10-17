import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA404AcaH7V-MuJvCKCRPnK88KMFxUpkH4",
  authDomain: "food-proj-8a9cc.firebaseapp.com",
  projectId: "food-proj-8a9cc",
  storageBucket: "food-proj-8a9cc.firebasestorage.app",
  messagingSenderId: "462082374468",
  appId: "1:462082374468:web:d3cde1e343eba26c64b511",
  measurementId: "G-WWZXXWKNFY"
};

const SAMPLE_ROWS = [
  // Indian Food
  { foodItem: "Chicken Biryani", category: "Indian Food", orderValue: 520, deliveryTime: 38, customerRating: 4.4 },
  { foodItem: "Hyderabadi Biryani", category: "Indian Food", orderValue: 380, deliveryTime: 33, customerRating: 4.6 },
  { foodItem: "Veg Thali", category: "Indian Food", orderValue: 290, deliveryTime: 30, customerRating: 4.7 },
  { foodItem: "Paneer Butter Masala", category: "Indian Food", orderValue: 340, deliveryTime: 36, customerRating: 4.3 },
  { foodItem: "Butter Chicken", category: "Indian Food", orderValue: 560, deliveryTime: 40, customerRating: 4.1 },
  { foodItem: "Masala Dosa", category: "Indian Food", orderValue: 180, deliveryTime: 28, customerRating: 4.5 },

  // Pizza
  { foodItem: "Margherita Pizza", category: "Pizza", orderValue: 399, deliveryTime: 28, customerRating: 4.6 },
  { foodItem: "Farmhouse Pizza", category: "Pizza", orderValue: 549, deliveryTime: 31, customerRating: 4.4 },
  { foodItem: "Pepperoni Pizza", category: "Pizza", orderValue: 629, deliveryTime: 33, customerRating: 4.2 },
  { foodItem: "Garlic Bread", category: "Pizza", orderValue: 199, deliveryTime: 22, customerRating: 4.7 },
  { foodItem: "Cheese Burst Pizza", category: "Pizza", orderValue: 499, deliveryTime: 30, customerRating: 4.5 },
  { foodItem: "Pasta Alfredo", category: "Pizza", orderValue: 289, deliveryTime: 27, customerRating: 4.4 },

  // Chinese Food
  { foodItem: "Veg Hakka Noodles", category: "Chinese Food", orderValue: 240, deliveryTime: 41, customerRating: 4.0 },
  { foodItem: "Chicken Manchurian", category: "Chinese Food", orderValue: 320, deliveryTime: 45, customerRating: 3.8 },
  { foodItem: "Burnt Garlic Fried Rice", category: "Chinese Food", orderValue: 220, deliveryTime: 38, customerRating: 4.2 },
  { foodItem: "Chilli Paneer", category: "Chinese Food", orderValue: 300, deliveryTime: 44, customerRating: 3.9 },
  { foodItem: "Schezwan Noodles", category: "Chinese Food", orderValue: 260, deliveryTime: 42, customerRating: 4.1 },
  { foodItem: "Veg Spring Rolls", category: "Chinese Food", orderValue: 180, deliveryTime: 36, customerRating: 4.3 },

  // Burgers
  { foodItem: "Chicken Burger", category: "Burgers", orderValue: 180, deliveryTime: 24, customerRating: 4.5 },
  { foodItem: "Veg Burger", category: "Burgers", orderValue: 140, deliveryTime: 22, customerRating: 4.6 },
  { foodItem: "Cheese Burger", category: "Burgers", orderValue: 210, deliveryTime: 27, customerRating: 4.4 },
  { foodItem: "Double Patty Burger", category: "Burgers", orderValue: 280, deliveryTime: 30, customerRating: 4.1 },
  { foodItem: "Chicken Wings", category: "Burgers", orderValue: 260, deliveryTime: 29, customerRating: 4.3 },
  { foodItem: "French Fries", category: "Burgers", orderValue: 120, deliveryTime: 20, customerRating: 4.7 },

  // Fast Food
  { foodItem: "Veg Sandwich", category: "Fast Food", orderValue: 150, deliveryTime: 20, customerRating: 4.6 },
  { foodItem: "Paneer Wrap", category: "Fast Food", orderValue: 190, deliveryTime: 26, customerRating: 4.3 },
  { foodItem: "Chicken Roll", category: "Fast Food", orderValue: 210, deliveryTime: 28, customerRating: 4.2 },
  { foodItem: "Samosa (2 pcs)", category: "Fast Food", orderValue: 60, deliveryTime: 18, customerRating: 4.8 },
  { foodItem: "Vada Pav", category: "Fast Food", orderValue: 80, deliveryTime: 21, customerRating: 4.7 },
  { foodItem: "Masala Fries", category: "Fast Food", orderValue: 130, deliveryTime: 23, customerRating: 4.4 },

  // Desserts
  { foodItem: "Chocolate Brownie", category: "Desserts", orderValue: 160, deliveryTime: 22, customerRating: 4.7 },
  { foodItem: "Gulab Jamun", category: "Desserts", orderValue: 120, deliveryTime: 24, customerRating: 4.5 },
  { foodItem: "Ice Cream Sundae", category: "Desserts", orderValue: 180, deliveryTime: 19, customerRating: 4.8 },
  { foodItem: "Red Velvet Pastry", category: "Desserts", orderValue: 150, deliveryTime: 26, customerRating: 4.4 },
  { foodItem: "Rasmalai", category: "Desserts", orderValue: 140, deliveryTime: 25, customerRating: 4.3 },
  { foodItem: "Choco Lava Cake", category: "Desserts", orderValue: 190, deliveryTime: 21, customerRating: 4.6 },

  // Beverages
  { foodItem: "Cold Coffee", category: "Beverages", orderValue: 120, deliveryTime: 18, customerRating: 4.8 },
  { foodItem: "Masala Chai", category: "Beverages", orderValue: 40, deliveryTime: 15, customerRating: 4.9 },
  { foodItem: "Fresh Lime Soda", category: "Beverages", orderValue: 70, deliveryTime: 17, customerRating: 4.6 },
  { foodItem: "Mango Shake", category: "Beverages", orderValue: 130, deliveryTime: 21, customerRating: 4.7 },
  { foodItem: "Iced Tea", category: "Beverages", orderValue: 90, deliveryTime: 19, customerRating: 4.5 },
  { foodItem: "Buttermilk", category: "Beverages", orderValue: 50, deliveryTime: 16, customerRating: 4.8 },

  // Other
  { foodItem: "Combo Meal", category: "Other", orderValue: 450, deliveryTime: 32, customerRating: 4.3 },
  { foodItem: "Family Feast Box", category: "Other", orderValue: 899, deliveryTime: 45, customerRating: 3.9 },
  { foodItem: "Breakfast Platter", category: "Other", orderValue: 260, deliveryTime: 25, customerRating: 4.5 },
  { foodItem: "Salad Bowl", category: "Other", orderValue: 220, deliveryTime: 23, customerRating: 4.6 },
  { foodItem: "Soup of the Day", category: "Other", orderValue: 180, deliveryTime: 21, customerRating: 4.4 },
  { foodItem: "Midnight Snack Box", category: "Other", orderValue: 320, deliveryTime: 35, customerRating: 4.1 },
];

const START_DATE_MS = Date.UTC(2025, 0, 1);
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

async function seed() {
  console.log("Connecting to Firestore...");
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const colRef = collection(db, "food_records");

  console.log("Checking existing records...");
  const existingSnap = await getDocs(colRef);
  console.log(`Found ${existingSnap.size} records in collection.`);

  console.log(`Writing ${SAMPLE_ROWS.length} sample records...`);
  let count = 0;
  for (let i = 0; i < SAMPLE_ROWS.length; i++) {
    const row = SAMPLE_ROWS[i];
    const id = `sample-${String(i + 1).padStart(3, "0")}`;
    const createdAt = new Date(START_DATE_MS + i * ONE_DAY_MS).toISOString();
    const docRef = doc(db, "food_records", id);
    await setDoc(docRef, {
      ...row,
      createdAt,
      source: "database",
    });
    count++;
    process.stdout.write(`\rInserted ${count}/${SAMPLE_ROWS.length} records...`);
  }
  console.log("\nDone! All records written successfully.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("\nError during seeding:", err);
  process.exit(1);
});
