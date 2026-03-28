const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://postgres.tfphqhgiwtmiljliduaw:acu_72UX*f%23F%24Wb@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
        }
    }
});

const properties = [
  {
    title: "Luxury Villa in Banjara Hills",
    description: "Spacious 4BHK villa with a private garden, modern amenities, and 24/7 security. Perfect for families looking for peaceful living in a premium neighborhood.",
    price: 85000,
    city: "Hyderabad",
    area: "3200 sq.ft",
    address: "Banjara Hills, Road No 12, Hyderabad",
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"],
    isPureVeg: false,
    genderPref: "Any",
    lifestyle: "Family",
    availableFrom: "Immediate",
    hasWifi: true,
    hasAC: true,
    isFurnished: true,
    hasParking: true,
    hasGym: false,
    hasPool: true
  },
  {
    title: "Sea View Apartment",
    description: "Beautiful 3BHK flat overlooking the Arabian Sea. Furnished interiors with a large balcony and premium fittings.",
    price: 120000,
    city: "Mumbai",
    area: "1800 sq.ft",
    address: "Bandra West, Carter Road, Mumbai",
    imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800",
    images: ["https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800"],
    isPureVeg: false,
    genderPref: "Any",
    lifestyle: "Working Professionals",
    availableFrom: "Next Month",
    hasWifi: true,
    hasAC: true,
    isFurnished: true,
    hasParking: true,
    hasGym: true,
    hasPool: false
  },
  {
    title: "Cozy Studio Flat",
    description: "Perfect 1RK studio apartment for bachelors or students. Close to tech parks, fully ventilated, and partially furnished.",
    price: 18000,
    city: "Bangalore",
    area: "500 sq.ft",
    address: "Koramangala 4th Block, Bengaluru",
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"],
    isPureVeg: true,
    genderPref: "Bachelors",
    lifestyle: "Student",
    availableFrom: "Immediate",
    hasWifi: true,
    hasAC: false,
    isFurnished: false,
    hasParking: false,
    hasGym: false,
    hasPool: false
  },
  {
    title: "Modern Condo with Amenities",
    description: "A newly built 2BHK condo in a gated society, featuring a swimming pool, gym, and clubhouse. Fully furnished ready to move.",
    price: 45000,
    city: "Pune",
    area: "1100 sq.ft",
    address: "Kalyani Nagar, Pune",
    imageUrl: "https://images.unsplash.com/photo-1628102434685-7977a450e181?w=800",
    images: ["https://images.unsplash.com/photo-1628102434685-7977a450e181?w=800"],
    isPureVeg: false,
    genderPref: "Any",
    lifestyle: "Family",
    availableFrom: "15th Next Month",
    hasWifi: true,
    hasAC: true,
    isFurnished: true,
    hasParking: true,
    hasGym: true,
    hasPool: true
  },
  {
    title: "Heritage Independent House",
    description: "Experience royal living in this large heritage style independent house. Beautifully decorated interiors with authentic Rajasthani touches.",
    price: 60000,
    city: "Jaipur",
    area: "2500 sq.ft",
    address: "C Scheme, Jaipur, Rajasthan",
    imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800",
    images: ["https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800"],
    isPureVeg: true,
    genderPref: "Family",
    lifestyle: "Family",
    availableFrom: "Immediate",
    hasWifi: false,
    hasAC: true,
    isFurnished: true,
    hasParking: true,
    hasGym: false,
    hasPool: false
  },
  {
    title: "Lake View Penthouse",
    description: "Ultra-luxurious 4BHK penthouse giving panoramic views of the upper lake. Exclusive lift, private terrace, and top-end modular kitchen.",
    price: 80000,
    city: "Bhopal",
    area: "3000 sq.ft",
    address: "VIP Road, Bhopal, MP",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
    images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"],
    isPureVeg: false,
    genderPref: "Any",
    lifestyle: "Family",
    availableFrom: "Immediate",
    hasWifi: true,
    hasAC: true,
    isFurnished: true,
    hasParking: true,
    hasGym: true,
    hasPool: false
  },
  {
    title: "Quiet Suburban Unit",
    description: "2BHK house in a serene, quiet neighborhood away from city traffic. Ideal for remote workers looking for peace.",
    price: 25000,
    city: "Chandigarh",
    area: "950 sq.ft",
    address: "Sector 15, Chandigarh",
    imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
    images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800"],
    isPureVeg: true,
    genderPref: "Any",
    lifestyle: "Working Professionals",
    availableFrom: "Tomorrow",
    hasWifi: true,
    hasAC: true,
    isFurnished: false,
    hasParking: true,
    hasGym: false,
    hasPool: false
  },
  {
    title: "High-Rise Tech Park Flat",
    description: "Premium 3BHK high rise apartment located right next to the IT corridor. Overlooks the city skyline. Unfurnished.",
    price: 55000,
    city: "Delhi NCR",
    area: "1600 sq.ft",
    address: "Cyber City, Gurugram",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"],
    isPureVeg: false,
    genderPref: "Any",
    lifestyle: "Working Professionals",
    availableFrom: "Weekend",
    hasWifi: false,
    hasAC: true,
    isFurnished: false,
    hasParking: true,
    hasGym: true,
    hasPool: true
  },
  {
    title: "Traditional South Indian Villa",
    description: "Large 4BHK Chettinad style villa with open courtyards and wooden pillars. Fully renovated for modern living.",
    price: 70000,
    city: "Chennai",
    area: "2800 sq.ft",
    address: "Adyar, Chennai, TN",
    imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
    images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800"],
    isPureVeg: true,
    genderPref: "Family",
    lifestyle: "Family",
    availableFrom: "Immediate",
    hasWifi: true,
    hasAC: true,
    isFurnished: true,
    hasParking: true,
    hasGym: false,
    hasPool: false
  },
  {
    title: "Riverside Shared Apartment",
    description: "Looking for flatmates! 1 private room available in a 3BHK flat facing the river. Fully furnished with modular kitchen.",
    price: 15000,
    city: "Kolkata",
    area: "400 sq.ft",
    address: "New Town, Rajarhat, Kolkata",
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1e50692557?w=800",
    images: ["https://images.unsplash.com/photo-1502672260266-1c1e50692557?w=800"],
    isPureVeg: false,
    genderPref: "Girls Only",
    lifestyle: "Student",
    availableFrom: "Immediate",
    hasWifi: true,
    hasAC: false,
    isFurnished: true,
    hasParking: false,
    hasGym: true,
    hasPool: false
  }
];

async function seed() {
  let user = await prisma.user.findFirst();
  if (!user) {
    user = await prisma.user.create({
      data: {
        name: "Admin",
        email: "admin@linkhome.com",
        password: "hashedpassword"
      }
    });
  }

  for (const p of properties) {
    await prisma.listing.create({
      data: {
        ...p,
        ownerId: user.id
      }
    });
  }
  console.log("Created 10 properties successfully!");
}

seed().catch(console.error).finally(() => prisma.$disconnect());
