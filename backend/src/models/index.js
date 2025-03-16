/*

index.js contains all the schema for database connection to create new instance and find instance into the collection of the Database

*/
const mongoose = require('mongoose');

// User Schema
const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName:String,
    email: { type: String, 
        required: [true, "E-mail is required"], 
        unique: true, 
        match: [/^[a-zA-Z0-9._%+/$^&*#\-\[\]{}]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email format error"]
    },
    phone:{type: [Number], minLength: 2, maxlength: 2}, //match: [/^353 \d{3} \d{3} \d{4}$/, "Contact Number format error"]},
    user_type: { type: String, enum: ['ADMIN', 'USER'], required: true },
    birthdate: { type: Date, default: Date.now },
    billing_address: {
        street: String,
        city: String,
        county: String,
        zip: String,
        country: String
      },
    driver_license: {type: String, unique: true, uppercase: true, minLength:30, maxLength:30},
    username: {
        type: String,
        required: [true, "Username is required"], 
        minlength: [3, "Username must atleast 3 characters long"],
        maxlength: [20, "Name can't exceed 20 characters long"]
    },
    password: {
        type: String,
        required: true
    }
});

// Van Schema
const VanSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: { type: String, required: true },
    manufacturer: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true},
    seats: { type: Number, required: true },    
    beds: { type: Number, required: true },
    transmission: { type: String, required: true },
    baseRate: { type: Number, required: true },
    color: { type: String, required: true },
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
    _id: mongoose.Schema.Types.ObjectId,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    van_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Van', required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    pick_up_location: { type: String, required: false }, //edited
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
    _id: mongoose.Schema.Types.ObjectId,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    van_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Van', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
    date: Date
});

// Guide Review Schema
const GuidReviewSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    guide_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Guide', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
    date: Date
});

// Discount Schema
const DiscountSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    van_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Van', required: true },
    discount: { type: Number, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true }
});

// Guide Schema
const GuideSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    duration: { type: Number, required: true},
    locations: [String],
    notes: [String],
//  pictures: need to thing how to save pictures
})

// Trip Schema
const TripSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    start_date: { type: Date, required: true},
    end_date: { type: Date, required: true},
    locations: [String],
    notes: [String],
//  pictures: need to thing how to save pictures
})

const DealSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    van_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Van', required: true },
    discount: { type: Number, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true }
});

// export collection of the schema, schema is only the structure of the collection
module.exports = {
    User: mongoose.model('User', UserSchema),
    Van: mongoose.model('Van', VanSchema),
    Booking: mongoose.model('Booking', BookingSchema),
    VanReview: mongoose.model('VanReview', VanReviewSchema),
    GuideReview: mongoose.model('GuideReview', GuidReviewSchema),
    Discount: mongoose.model('Discount', DiscountSchema),
    Guide: mongoose.model('Guide', GuideSchema),
    Trip: mongoose.model('Trip', TripSchema),
    Deal: mongoose.model('Deal', DealSchema)
};
