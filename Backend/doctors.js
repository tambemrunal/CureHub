const generateAvailability = () => {
    const availability = [];
    const startDate = new Date("2025-05-09");
    const endDate = new Date("2025-06-09");
  
    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      availability.push({
        date: d.toISOString().split("T")[0],
        timeSlots: ["10:00", "13:00", "16:00"],
      });
    }
    return availability;
  };
  
  const doctors = [
    {
      name: "Aryan Mehta",
      email: "aryan.mehta@example.com",
      password: "Password@123",
      mobile: "9876543210",
      age: 45,
      gender: "Male",
      profileImg: "",
      specialization: "Cardiologist",
      degree: "MD Cardiology",
      experience: "20 years",
      bio: "Expert in treating cardiovascular diseases with 20+ years of experience.",
      availability: generateAvailability()
    },
    {
      name: "Sneha Rane",
      email: "sneha.rane@example.com",
      password: "SecurePass123",
      mobile: "9123456780",
      age: 38,
      gender: "Female",
      profileImg: "",
      specialization: "Dermatologist",
      degree: "MD Dermatology",
      experience: "12 years",
      bio: "Specializes in skin care, acne, and cosmetic dermatology.",
      availability: generateAvailability()
    },
    {
      name: "Rakesh Kumar",
      email: "rakesh.kumar@example.com",
      password: "Doctor@123",
      mobile: "9012345678",
      age: 50,
      gender: "Male",
      profileImg: "",
      specialization: "Orthopedic",
      degree: "MS Orthopedics",
      experience: "25 years",
      bio: "Highly experienced in treating bone and joint disorders.",
      availability: generateAvailability()
    },
    {
      name: "Alisha D'Souza",
      email: "alisha.dsouza@example.com",
      password: "Pass@456",
      mobile: "9988776655",
      age: 35,
      gender: "Female",
      profileImg: "",
      specialization: "Gynecologist",
      degree: "MS Obstetrics and Gynecology",
      experience: "10 years",
      bio: "Focused on women's reproductive health and pregnancy care.",
      availability: generateAvailability()
    },
    {
      name: "Imran Shaikh",
      email: "imran.shaikh@example.com",
      password: "MyStrongPass1",
      mobile: "7894561230",
      age: 42,
      gender: "Male",
      profileImg: "",
      specialization: "Neurologist",
      degree: "DM Neurology",
      experience: "18 years",
      bio: "Specialist in treating brain and nerve disorders.",
      availability: generateAvailability()
    },
    {
      name: "Kavita Sharma",
      email: "kavita.sharma@example.com",
      password: "SafePass@789",
      mobile: "8822334455",
      age: 40,
      gender: "Female",
      profileImg: "",
      specialization: "Pediatrician",
      degree: "MD Pediatrics",
      experience: "15 years",
      bio: "Committed to the health and well-being of children.",
      availability: generateAvailability()
    },
    {
      name: "Nikhil Joshi",
      email: "nikhil.joshi@example.com",
      password: "NikhilPass123",
      mobile: "7865432109",
      age: 37,
      gender: "Male",
      profileImg: "",
      specialization: "General Physician",
      degree: "MBBS, MD",
      experience: "14 years",
      bio: "Providing comprehensive medical care for general illnesses.",
      availability: generateAvailability()
    },
    {
      name: "Priya Menon",
      email: "priya.menon@example.com",
      password: "PriyaDoc@2025",
      mobile: "8123456789",
      age: 32,
      gender: "Female",
      profileImg: "",
      specialization: "ENT Specialist",
      degree: "MS ENT",
      experience: "9 years",
      bio: "Expert in ear, nose, and throat treatments and surgeries.",
      availability: generateAvailability()
    },
    {
      name: "Aditya Narayan",
      email: "aditya.narayan@example.com",
      password: "AdityaSecure12",
      mobile: "7890123456",
      age: 39,
      gender: "Male",
      profileImg: "",
      specialization: "Oncologist",
      degree: "DM Oncology",
      experience: "16 years",
      bio: "Dedicated to cancer diagnosis and treatment.",
      availability: generateAvailability()
    },
    {
      name: "Ritu Malhotra",
      email: "ritu.malhotra@example.com",
      password: "MalhotraPass456",
      mobile: "8967452310",
      age: 36,
      gender: "Female",
      profileImg: "",
      specialization: "Psychiatrist",
      degree: "MD Psychiatry",
      experience: "11 years",
      bio: "Focused on mental health and psychiatric treatments.",
      availability: generateAvailability()
    },
  
    // Additional Specializations
    {
      name: "Aniket Deshmukh",
      email: "aniket.deshmukh@example.com",
      password: "EndoPass2025",
      mobile: "9090909090",
      age: 41,
      gender: "Male",
      profileImg: "",
      specialization: "Endocrinologist",
      degree: "DM Endocrinology",
      experience: "17 years",
      bio: "Specializes in hormone-related disorders including diabetes and thyroid conditions.",
      availability: generateAvailability()
    },
    {
      name: "Meera Patil",
      email: "meera.patil@example.com",
      password: "GastroCare@123",
      mobile: "8888444422",
      age: 44,
      gender: "Female",
      profileImg: "",
      specialization: "Gastroenterologist",
      degree: "DM Gastroenterology",
      experience: "19 years",
      bio: "Experienced in digestive system disorders including liver and colon health.",
      availability: generateAvailability()
    },
    {
      name: "Siddharth Jain",
      email: "siddharth.jain@example.com",
      password: "LungHealth@456",
      mobile: "8899776655",
      age: 46,
      gender: "Male",
      profileImg: "",
      specialization: "Pulmonologist",
      degree: "MD Pulmonology",
      experience: "21 years",
      bio: "Expert in respiratory disorders including asthma and COPD.",
      availability: generateAvailability()
    },
    {
      name: "Neha Kapoor",
      email: "neha.kapoor@example.com",
      password: "KidneyCare789",
      mobile: "9001122334",
      age: 40,
      gender: "Female",
      profileImg: "",
      specialization: "Nephrologist",
      degree: "DM Nephrology",
      experience: "15 years",
      bio: "Specializes in kidney care and dialysis management.",
      availability: generateAvailability()
    },
    {
      name: "Rajiv Verma",
      email: "rajiv.verma@example.com",
      password: "EyeSafe@321",
      mobile: "7777888899",
      age: 43,
      gender: "Male",
      profileImg: "",
      specialization: "Ophthalmologist",
      degree: "MS Ophthalmology",
      experience: "18 years",
      bio: "Focused on vision care and eye surgeries.",
      availability: generateAvailability()
    },
    {
      name: "Isha Nair",
      email: "isha.nair@example.com",
      password: "JointRelief2025",
      mobile: "7788990011",
      age: 39,
      gender: "Female",
      profileImg: "",
      specialization: "Rheumatologist",
      degree: "DM Rheumatology",
      experience: "14 years",
      bio: "Expert in arthritis and autoimmune joint disorders.",
      availability: generateAvailability()
    },
    {
      name: "Anurag Sen",
      email: "anurag.sen@example.com",
      password: "UroStrong456",
      mobile: "8855667788",
      age: 48,
      gender: "Male",
      profileImg: "",
      specialization: "Urologist",
      degree: "MCH Urology",
      experience: "22 years",
      bio: "Specializes in urinary tract and male reproductive health.",
      availability: generateAvailability()
    },
    {
      name: "Pooja Shetty",
      email: "pooja.shetty@example.com",
      password: "BloodCare@789",
      mobile: "8800997766",
      age: 35,
      gender: "Female",
      profileImg: "",
      specialization: "Hematologist",
      degree: "DM Hematology",
      experience: "10 years",
      bio: "Focused on blood disorders including anemia and leukemia.",
      availability: generateAvailability()
    },
    {
      name: "Kunal Bansal",
      email: "kunal.bansal@example.com",
      password: "InfectCare123",
      mobile: "8665544332",
      age: 38,
      gender: "Male",
      profileImg: "",
      specialization: "Infectious Disease Specialist",
      degree: "MD Infectious Diseases",
      experience: "13 years",
      bio: "Experienced in managing bacterial, viral, and fungal infections.",
      availability: generateAvailability()
    }
  ];
  
  export default doctors;