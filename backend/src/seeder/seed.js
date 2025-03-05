const { connectDB, closeDB } = require('../config/db');
const { User, Van, Booking } = require('../models');

const seedDatabase = async () => {
    await connectDB();

    try {
        // Insert a test user
        const user = await User.create({
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'securepassword',
            phone: '1234567890',
            user_type: 'USER',
            billing_address: '123 Main St, Test City'
        });
        console.log('✅ User created:', user._id);

        // Insert a test van
        const van = await Van.create({
            type: 'Campervan',
            manufacturer: 'Volkswagen',
            model: 'California',
            seats: 4,
            fuel: 'Diesel',
            baseRate: 100,
            location: 'Test City',
            distance_limit: 500,
            isAvailable: true
        });
        console.log('✅ Van created:', van._id);

        // Insert a test booking
        const booking = await Booking.create({
            user_id: user._id,
            van_id: van._id,
            start_date: new Date(),
            end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week rental
            pick_up_location: 'Test City',
            return_location: 'Test City',
            status: 'CONFIRMED'
        });
        console.log('✅ Booking created:', booking._id);

    } catch (error) {
        console.error('❌ Error inserting data:', error);
    } finally {
        await closeDB();
    }
};

const dropData = async () => {
    await connectDB();

    try {
        // Fetch the specific created records (assumes you saved their IDs in your seeding script)
        const user = await User.findOne({ email: 'testuser@example.com' });
        const van = await Van.findOne({ manufacturer: 'Volkswagen', model: 'California' });
        const booking = await Booking.findOne({ user_id: user._id, van_id: van._id });

        // Delete the booking if it exists
        if (booking) {
            await Booking.deleteOne({ _id: booking._id });
            console.log('✅ Booking deleted:', booking._id);
        }

        // Delete the van if it exists
        if (van) {
            await Van.deleteOne({ _id: van._id });
            console.log('✅ Van deleted:', van._id);
        }

        // Delete the user if it exists
        if (user) {
            await User.deleteOne({ _id: user._id });
            console.log('✅ User deleted:', user._id);
        }

    } catch (error) {
        console.error('❌ Error deleting data:', error);
    } finally {
        await closeDB();
    }
};

// Wrapping in an async function to support await to populate database before removing things
const run = async () => {
    await seedDatabase();
    await dropData();
};

run();
