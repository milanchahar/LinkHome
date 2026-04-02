require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function verify() {
  const listingId = 33; 
  console.log(`Checking listing ${listingId}...`);
  try {
    const listing = await prisma.listing.findUnique({
      where: { id: listingId }
    });
    
    if (!listing) {
      console.log("Listing not found. Finding any listing...");
      const anyListing = await prisma.listing.findFirst();
      if (!anyListing) {
        console.error("No listings found in DB.");
        return;
      }
      console.log(`Found listing ${anyListing.id} instead.`);
      checkListing(anyListing);
    } else {
      checkListing(listing);
    }
  } catch (err) {
    console.error("Error during verification:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

function checkListing(listing) {
  console.log("Listing data:", JSON.stringify(listing, null, 2));
  const images = listing.images;
  console.log("Type of images:", typeof images);
  console.log("Is array?", Array.isArray(images));
  
  if (typeof images === "string") {
    try {
      const parsed = JSON.parse(images);
      console.log("Successfully parsed stringified images:", parsed);
    } catch (e) {
      console.error("Failed to parse images:", e.message);
    }
  }
}

verify();
