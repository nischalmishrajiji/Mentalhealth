function verifyUserIdinParam(req, res, next) {
    const { userId } = req.params; // Get userId from request parameters
    const loggedInUserId = req.user.id; // Get userId from authenticated user info
    if (parseInt(userId) !== loggedInUserId) {
      return res.status(403).json({ message: 'Unauthorized access' }); // Forbidden
    }
  
    next(); // User is authorized, proceed to the next middleware/route handler
  }
  
  module.exports = verifyUserIdinParam;
  