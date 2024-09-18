function verifyUserIdinBody(req, res, next) {
    const { userId } = req.body; // Get userId from request body
    const loggedInUserId = req.user.id; // Get userId from authenticated user info
    if (parseInt(userId) !== loggedInUserId) {
      return res.status(403).json({ message: 'Unauthorized access' }); // Forbidden
    }
  
    next(); // User is authorized, proceed to the next middleware/route handler
  }
  
  module.exports = verifyUserIdinBody;
  
  