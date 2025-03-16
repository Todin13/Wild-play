/*

Help controller

*/

exports.getRoutesInfo = (req, res) => {
    res.json({
        message: "Welcome to the API",
        routes: {
            users: {
                base: "/api/users",
                description: "User authentication and management",
                endpoints: {
                    register: "POST /api/users/register - Register a new user",
                    login: "POST /api/users/login - Login user",
                    search: "GET /api/users/search - Search users (Admin only)",
                    update: "PUT /api/users/update/:user - Update user profile",
                    delete: "DELETE /api/users/delete/:id - Delete a user",
                    profile: "GET /api/users/profile - Get user profile",
                    logout: "POST /api/users/logout - Logout user"
                }
            },
            search: {
                base: "/api/search",
                description: "Search for various resources",
                endpoints: {
                    searchAll: "GET /api/search - Perform a global search"
                }
            },
            campers: {
                base: "/api/campers",
                description: "Manage camper rentals",
                endpoints: {
                    getAll: "GET /api/campers - Fetch all campers",
                    add: "POST /api/campers - Add a new camper (Admin only)",
                    delete: "DELETE /api/campers/:id - Delete a camper (Admin only)"
                }
            },
            deals: {
                base: "/api/deals",
                description: "Manage discount deals",
                endpoints: {
                    getAll: "GET /api/deals - Fetch all deals",
                    add: "POST /api/deals - Add a new deal (Admin only)",
                    delete: "DELETE /api/deals/:id - Delete a deal (Admin only)"
                }
            },
            bookings: {
                base: "/api/bookings",
                description: "Manage bookings",
                endpoints: {
                    getAll: "GET /api/bookings/all/:user_id - Get all bookings for a user",
                    getById: "GET /api/bookings/:booking_id - Get a specific booking",
                    create: "POST /api/bookings - Create a new booking",
                    update: "PUT /api/bookings/:booking_id - Edit an existing booking",
                    changeStatus: "PATCH /api/bookings/:booking_id/status - Change booking status",
                    delete: "DELETE /api/bookings/:booking_id - Delete a booking"
                }
            },
            trips: {
                base: "/api/trips",
                description: "Trip planning and management",
                endpoints: {
                    getAll: "GET /api/trips - Get all user trips",
                    getById: "GET /api/trips/:id - Get trip details",
                    create: "POST /api/trips - Create a new trip",
                    update: "PUT /api/trips/:id - Update a trip",
                    delete: "DELETE /api/trips/:id - Delete a trip",
                    fromGuide: "POST /api/trips/fromGuide - Create a trip from a guide"
                }
            },
            guides: {
                base: "/api/guides",
                description: "Manage travel guides",
                endpoints: {
                    getAll: "GET /api/guides - Get all guides",
                    getById: "GET /api/guides/:id - Get a guide by ID",
                    create: "POST /api/guides - Create a new guide",
                    update: "PUT /api/guides/:id - Update a guide",
                    delete: "DELETE /api/guides/:id - Delete a guide",
                    fromTrip: "POST /api/guides/fromTrip - Create a guide from a trip"
                }
            },
            reviews: {
                base: "/api/reviews",
                description: "Manage reviews for vans and guides",
                endpoints: {
                    createVanReview: "POST /api/reviews/van - Add a review for a van",
                    getVanReviews: "GET /api/reviews/van/:van_id - Get reviews for a specific van",
                    createGuideReview: "POST /api/reviews/guide - Add a review for a guide",
                    getGuideReviews: "GET /api/reviews/guide/:guide_id - Get reviews for a specific guide"
                }
            },
            help: {
                base: "/help",
                description: "Provides help and documentation",
                endpoints: {
                    getHelp: "GET /help - Access API documentation and guidance"
                }
            }            
        }
    });
};
