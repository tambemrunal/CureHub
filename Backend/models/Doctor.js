import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const doctorSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "doctor" },
    mobile: { type: String },
    age: { type: Number },
    gender: { type: String },
    profileImg: { type: String },
    specialization: { type: String },
    degree: { type: String },
    experience: { type: String },
    bio: { type: String },
    availability: [
      {
        date: String, 
        timeSlots: [String] 
      }
    ],
    patients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Patient" }]
  },
  { timestamps: true }
);

// Hash password before saving
doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
doctorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
