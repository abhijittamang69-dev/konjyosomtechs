const Customer = require('../models/Customer');

// @desc    Get all customers (from bookings/quotations)
// @route   GET /api/customers
// @access  Admin
const getAllCustomers = async (req, res) => {
  try {
    const { search } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const customers = await Customer.find(query).sort('-createdAt');

    res.json({
      success: true,
      total: customers.length,
      customers
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllCustomers };
