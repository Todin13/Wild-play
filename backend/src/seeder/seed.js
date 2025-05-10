/*

FIle to populate DB created at the first day not modified with the update of db schema
Author: ODIN Thomas

*/

const { connectDB, closeDB } = require("../config/db");
const {
  User,
  Van,
  Booking,
  VanReview,
  Guide,
  Trip,
  GuideReview,
  Discount,
} = require("../models");

const seedDatabase = async () => {
  await connectDB();

  try {
    // Insert a test user
    const user = await User.create({
      firstName: "John",
      lastName: "Doe",
      username: "testuser",
      email: "testuser@example.com",
      password: "securepassword",
      phone: "1234567890",
      user_type: "USER",
      billing_address: ["123 Main St, Test City"],
      driver_license_id: "123456789012345678901234567890",
    });
    console.log("✅ User created:", user._id);

    // Insert a test van
    const van = await Van.create({
      type: "Campervan",
      manufacturer: "Volkswagen",
      model: "California",
      price: 50000,
      seats: 4,
      beds: 2,
      fuel: "Diesel",
      baseRate: 100,
      location: "Test City",
      weight: 3000,
      dimension: [5, 2, 2],
      isAvailable: true,
      utilities: [{ fridge: true, stove: true }],
      info: "A great campervan for road trips.",
    });
    console.log("✅ Van created:", van._id);

    // Insert a test booking
    const booking = await Booking.create({
      user_id: user._id,
      van_id: van._id,
      start_date: new Date(),
      end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week rental
      pick_up_location: "Test City",
      return_location: "Test City",
      status: "CONFIRMED",
      amount: 700,
      paid: true,
    });
    console.log("✅ Booking created:", booking._id);

    // Insert a test van review
    const review = await VanReview.create({
      user_id: user._id,
      van_id: van._id,
      rating: 5,
      review: "Amazing experience! Highly recommended.",
      date: new Date(),
    });
    console.log("✅ Van Review created:", review._id);

    // Insert a test guide
    const guide = await Guide.create({
      user_id: user._id,
      duration: 5,
      locations: ["Test City", "Mountain View"],
      notes: ["Great views", "Hiking trails"],
    });
    console.log("✅ Guide created:", guide._id);

    // Insert a test trip
    const trip = await Trip.create({
      user_id: user._id,
      start_date: new Date(),
      end_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      locations: ["Test City", "Lakeview"],
      notes: ["Relaxing trip", "Photography spots"],
    });
    console.log("✅ Trip created:", trip._id);

    // Insert a test guide review
    const guideReview = await GuideReview.create({
      user_id: user._id,
      guide_id: guide._id,
      rating: 4,
      review: "Very knowledgeable and friendly guide.",
      date: new Date(),
    });
    console.log("✅ Guide Review created:", guideReview._id);

    // Insert a test discount
    const discount = await Discount.create({
      van_id: van._id,
      discount: 10,
      start_date: new Date(),
      end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });
    console.log("✅ Discount created:", discount._id);

    return { user, van, booking, review, guide, trip, guideReview, discount };
  } catch (error) {
    console.error("❌ Error inserting data:", error);
  }
};

const dropData = async (data) => {
  await connectDB();

  try {
    if (data) {
      await Booking.deleteOne({ _id: data.booking._id });
      await VanReview.deleteOne({ _id: data.review._id });
      await GuideReview.deleteOne({ _id: data.guideReview._id });
      await Discount.deleteOne({ _id: data.discount._id });
      await Trip.deleteOne({ _id: data.trip._id });
      await Guide.deleteOne({ _id: data.guide._id });
      await Van.deleteOne({ _id: data.van._id });
      await User.deleteOne({ _id: data.user._id });
    }
    console.log("✅ Created test data deleted");
  } catch (error) {
    console.error("❌ Error deleting data:", error);
  } finally {
    await closeDB();
  }
};

const run = async () => {
  const data = await seedDatabase();
  await dropData(data);
};

run();
