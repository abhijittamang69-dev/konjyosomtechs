const ActivityLog = require('../models/ActivityLog');

// Records a user action in the activity log. Never throws — logging
// failures must not break the main request.
const logActivity = async (req, action, entityType = null, entityId = null, details = {}) => {
  try {
    await ActivityLog.create({
      user: req.user?._id,
      userEmail: req.user?.email,
      userRole: req.user?.role,
      action,
      entityType,
      entityId,
      details,
      ipAddress: req.ip,
      userAgent: req.headers?.['user-agent']
    });
  } catch (error) {
    console.error('Activity log error:', error.message);
  }
};

module.exports = { logActivity };
