/*

index.js contains all the schema for database connection to create new instance and find instance into the collection of the Database

*/
const mongoose = require('mongoose');

// User Schema
const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName:String,
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // saved hashed
    phone: { type: String },
    user_type: { type: String, enum: ['ADMIN', 'USER'], required: true },
    birthdate: { type: Date, default: Date.now },
    billing_address: [String],
    driver_license_id: {type: String, unique: true, uppercase: true, minLength:30, maxLength:30},
});

// Van Schema
const VanSchema = new mongoose.Schema({
    type: { type: String, required: true },
    manufacturer: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true},
    seats: { type: Number, required: true },    
    beds: { type: Number, required: true },
    fuel: { type: String, required: true },
    baseRate: { type: Number, required: true },
    location: { type: String, required: true },
    weight: { type: Number, required: true },    
    dimension: { type: [Number],  required: true},
    isAvailable: { type: Boolean, default: true },
    utilities: [{}],
    info: String,
//  photo // need to find a way to store 
});

// Booking Schema
const BookingSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    van_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Van', required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    pick_up_location: { type: String, required: true },
    return_location: { type: String, required: true },
    status: { type: String, enum: ['PENDING', 'CONFIRMED', 'CANCELLED'], default: 'PENDING'},
    amount: { type: Number, required: true },
    delivery_location: {type: String},
    paid: { type: Boolean, default: false },
    promocode: { type: String, maxLength: 10, minLength: 10},
//  trip_id: { type/ mongoose.Schema.Types.ObjectId, ref: "Trip"}
});

// Van Review Schema
const VanReviewSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    van_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Van', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
    date: Date
});

// Guide Review Schema
const GuidReviewSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    guide_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Guide', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
    date: Date
});

// Discount Schema
const DiscountSchema = new mongoose.Schema({
    van_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Van', required: true },
    discount: { type: Number, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true }
});

// Guide Schema
const GuideSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    duration: { type: Number, required: true},
    locations: [String],
    notes: [String],
//  pictures: need to thing how to save pictures
})

// Trip Schema
const TripSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    start_date: { type: Date, required: true},
    end_date: { type: Date, required: true},
    locations: [String],
    notes: [String],
//  pictures: need to thing how to save pictures
})

// export collection of the schema, schema is only the structure of the collection
module.exports = {
    User: mongoose.model('User', UserSchema),
    Van: mongoose.model('Van', VanSchema),
    Booking: mongoose.model('Booking', BookingSchema),
    VanReview: mongoose.model('VanReview', VanReviewSchema),
    GuideReview: mongoose.model('GuideReview', GuidReviewSchema),
    Discount: mongoose.model('Discount', DiscountSchema),
    Guide: mongoose.model('Guide', GuideSchema),
    Trip: mongoose.model('Trip', TripSchema)
};
