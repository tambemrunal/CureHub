import mongoose from "mongoose";
import dotenv from "dotenv";
import Doctor from "./models/Doctor.js";
import doctors from "./doctors.js";

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

const seedDoctors = async () => {
  try {
    await Doctor.deleteMany();
    for (let doc of doctors) {
      const doctor = new Doctor(doc);
      await doctor.save(); // password hashing happens here
    }
    console.log("Doctor Data Seeded ✅");
    process.exit();
  } catch (error) {
    console.error("Error seeding doctors:", error);
    process.exit(1);
  }
};

seedDoctors();