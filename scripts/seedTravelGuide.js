/**
 * Seed script for Travel Guide collection.
 *
 * Usage:
 *   node scripts/seedTravelGuide.js
 *
 * Make sure the DATABASE_URI and DATABASE_NAME env vars are set,
 * or create a .env file in the project root.
 */

import dotenv from "dotenv";
import mongoose from "mongoose";
import TravelGuide from "../models/travelGuideModel.js";

dotenv.config();

const MONGO_URI = process.env.DATABASE_URI;

const dummyGuides = [
  {
    place: "Airport (LGBI Airport)",
    iconType: "airplane",
    description:
      "Lokpriya Gopinath Bordoloi International Airport is about 30 km from IIT Guwahati campus. Multiple transport options are available.",
    transportMethods: [
      {
        method: "By Cab",
        recommendation: "Recommended for 1-4 people with luggage.",
        details:
          "Book an Ola/Uber from campus main gate. Travel time is approximately 45 minutes to 1 hour depending on traffic. Fare ranges from ₹500-₹700.",
        hasCabSharing: true,
      },
      {
        method: "By Bus",
        recommendation: "Budget-friendly option.",
        details:
          "Take the campus bus to Jalukbari, then take a city bus going towards the airport from the NH-37 bus stop. Alternatively, take an auto to the airport from Jalukbari.",
        hasCabSharing: false,
      },
      {
        method: "By Auto",
        recommendation: "Convenient for 1-3 people.",
        details:
          "Autos are available from the main gate. Negotiate the fare beforehand. Typical fare is ₹400-₹500 to the airport.",
        hasCabSharing: false,
      },
    ],
  },
  {
    place: "Kamakhya Railway Station",
    iconType: "train",
    description:
      "Kamakhya Railway Station is the nearest major railway station, about 8 km from campus. It is well-connected to major cities.",
    transportMethods: [
      {
        method: "By Cab",
        recommendation: "Recommended for 1-4 people with luggage.",
        details:
          "Book an Ola/Uber from the main gate. Travel time is about 20 minutes. Fare ranges from ₹150-₹250.",
        hasCabSharing: true,
      },
      {
        method: "By Auto",
        recommendation: "Quick and affordable.",
        details:
          "Autos are available from the main gate or Jalukbari. Fare is approximately ₹100-₹150.",
        hasCabSharing: false,
      },
      {
        method: "By Bus + Auto",
        recommendation: "Most budget-friendly option.",
        details:
          "Take the campus bus to Jalukbari, then take a shared auto to Kamakhya station. Total cost is around ₹20-₹30.",
        hasCabSharing: false,
      },
    ],
  },
  {
    place: "Guwahati Railway Station",
    iconType: "train",
    description:
      "Guwahati Railway Station (Paltan Bazar) is about 18 km from IIT Guwahati. It is the main railway station of the city.",
    transportMethods: [
      {
        method: "By Cab",
        recommendation: "Recommended for comfort.",
        details:
          "Book an Ola/Uber. Travel time is about 30-40 minutes. Fare ranges from ₹300-₹400.",
        hasCabSharing: true,
      },
      {
        method: "By Bus",
        recommendation: "Budget-friendly.",
        details:
          "Take the campus bus to Pan Bazar or Fancy Bazar, then walk or take a short auto ride to the station.",
        hasCabSharing: false,
      },
      {
        method: "By Ferry + Auto",
        recommendation: "Scenic and affordable.",
        details:
          "Take the ferry from campus ghat to Fancy Bazar ghat, then take an auto to the railway station. Total time is about 40-50 minutes.",
        hasCabSharing: false,
      },
    ],
  },
  {
    place: "City Center Mall",
    iconType: "shopping",
    description:
      "City Center Mall in Guwahati is a popular shopping destination, about 20 km from campus.",
    transportMethods: [
      {
        method: "By Cab",
        recommendation: "Recommended for groups.",
        details:
          "Book an Ola/Uber. Travel time is about 35-45 minutes. Fare is around ₹350-₹450.",
        hasCabSharing: true,
      },
      {
        method: "By Bus",
        recommendation: "Cheapest option.",
        details:
          "Take the campus bus to Fancy Bazar or Pan Bazar, then take a city bus towards Christianbasti/Zoo Road. The mall is a short walk from the bus stop.",
        hasCabSharing: false,
      },
    ],
  },
  {
    place: "Kamakhya Temple",
    iconType: "temple",
    description:
      "Kamakhya Temple is one of the most revered temples in India, located on Nilachal Hill, about 10 km from campus.",
    transportMethods: [
      {
        method: "By Cab",
        recommendation: "Recommended for 1-4 people.",
        details:
          "Book an Ola/Uber from the main gate. Travel time is about 25 minutes. Fare is ₹200-₹300. The cab will drop you at the base of the hill; you may need to walk or take a shared vehicle to the top.",
        hasCabSharing: true,
      },
      {
        method: "By Auto",
        recommendation: "Affordable option.",
        details:
          "Take an auto from the main gate or Jalukbari. Fare is around ₹150-₹200.",
        hasCabSharing: false,
      },
    ],
  },
  {
    place: "Fancy Bazar",
    iconType: "market",
    description:
      "Fancy Bazar is the biggest commercial area in Guwahati, about 15 km from campus. Great for shopping and street food.",
    transportMethods: [
      {
        method: "By Campus Bus",
        recommendation: "Free and convenient.",
        details:
          "The campus bus goes directly to Fancy Bazar on weekdays. Check the bus schedule for timings. Journey takes about 40 minutes.",
        hasCabSharing: false,
      },
      {
        method: "By Ferry",
        recommendation: "Scenic river route.",
        details:
          "Take the ferry from the campus ghat. The Mazgaon ghat is closest to Fancy Bazar. Journey time is about 30 minutes. Fare is ₹10-₹20.",
        hasCabSharing: false,
      },
      {
        method: "By Cab",
        recommendation: "Fastest option.",
        details:
          "Book an Ola/Uber. Travel time is 25-35 minutes. Fare ranges from ₹250-₹350.",
        hasCabSharing: true,
      },
    ],
  },
  {
    place: "Nehru Park",
    iconType: "park",
    description:
      "Nehru Park is a recreational area in Pan Bazar, about 18 km from campus. It's near the Brahmaputra riverfront.",
    transportMethods: [
      {
        method: "By Campus Bus",
        recommendation: "Free option.",
        details:
          "Take the campus bus to Pan Bazar. Nehru Park is a short walk from the bus stop.",
        hasCabSharing: false,
      },
      {
        method: "By Cab",
        recommendation: "Comfortable option.",
        details:
          "Book an Ola/Uber. Travel time is 30-40 minutes. Fare is ₹300-₹400.",
        hasCabSharing: true,
      },
    ],
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing travel guide entries
    const deleted = await TravelGuide.deleteMany({});
    console.log(`Cleared ${deleted.deletedCount} existing travel guide entries`);

    // Insert dummy data
    const result = await TravelGuide.insertMany(dummyGuides);
    console.log(`Inserted ${result.length} travel guide entries:`);
    result.forEach((g) => console.log(`  - ${g.place} (${g.iconType})`));

    await mongoose.disconnect();
    console.log("Done. Disconnected from MongoDB.");
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seed();
