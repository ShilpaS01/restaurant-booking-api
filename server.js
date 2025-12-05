// server.js

const express = require('express');
const path = require('path');
const app = express();
const PORT = 54321; // safer dynamic/private port

// ==========================================
// Middleware
// ==========================================

// Body parser for POST requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve all frontend files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname, '../'))); 
// assumes frontend files are in the parent folder of 'backend'

// ==========================================
// Sample data
// ==========================================

// Hotels data
const hotels = [
    { name: "The Leela Palace Bengaluru", location: "Bengaluru" },
    { name: "ITC Gardenia", location: "Bengaluru" },
    { name: "Radisson Blu Plaza Hotel", location: "Mysuru" },
    { name: "Taj Madikeri Resort & Spa", location: "Coorg" },
    { name: "Evolve Back, Coorg", location: "Coorg" },
    { name: "The Serai Chikmagalur", location: "Chikmagalur" },
    { name: "Trivik Hotels & Resorts", location: "Chikmagalur" },
    { name: "Evolve Back, Hampi", location: "Hampi" },
    { name: "Heritage Resort Hampi", location: "Hampi" },
    { name: "Paradise Isle Beach Resort", location: "Udupi" },
    { name: "Samanvay Boutique Hotel", location: "Udupi" }
];

// Booking data
let bookings = [
    { name: "John Doe", hotel: "The Leela Palace Bengaluru", checkin: "2025-12-01", checkout: "2025-12-03", amount: "$500" },
    { name: "Jane Smith", hotel: "Radisson Blu Mysuru", checkin: "2025-11-28", checkout: "2025-11-30", amount: "$300" },
    { name: "Alice Johnson", hotel: "Taj Madikeri Resort", checkin: "2025-12-05", checkout: "2025-12-10", amount: "$800" }
];

// Admin credentials
const adminEmail = "shilpakodadur2004@gmail.com";
const adminPassword = "Shilpa@123S";

// ==========================================
// Routes
// ==========================================

// Home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Booking home page
app.get('/bookinghome.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../bookinghome.html'));
});

// Booking page
app.get('/booking.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../booking.html'));
});

// Contact page
app.get('/contact.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../contact.html'));
});

// Admin login page
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../admin.html'));
});

// ==========================================
// API endpoints
// ==========================================

// Get hotels
app.get('/api/hotels', (req, res) => {
    res.json(hotels);
});

// Admin login validation
app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body;

    if (email === adminEmail && password === adminPassword) {
        res.json({ success: true, message: "Login successful" });
    } else {
        res.json({ success: false, message: "Invalid email or password" });
    }
});

// Get all bookings (admin only)
app.get('/api/bookings', (req, res) => {
    res.json(bookings);
});

// Add new booking
app.post('/api/bookings', (req, res) => {
    const { name, hotel, checkin, checkout, amount } = req.body;

    if (!name || !hotel || !checkin || !checkout || !amount) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newBooking = { name, hotel, checkin, checkout, amount };
    bookings.push(newBooking);

    res.json({ success: true, message: "Booking added successfully", booking: newBooking });
});

// ==========================================
// Start server
// ==========================================
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
