const UserModel = require('../Models/user');

// Register or log in a user coming from Google OAuth on the frontend
exports.register = async (req, res) => {
  try {
    const { name, email, photoUrl } = req.body;

    if (!email || !name) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    let user = await UserModel.findOne({ email });

    // If user doesn't exist, create a new one
    if (!user) {
      user = new UserModel({
        name,
        email,
        photoUrl,
      });
      await user.save();
      return res.status(201).json({
        message: 'User registered successfully',
        user,
      });
    }

    // If user exists, update basic info and log them in
    user.name = name;
    user.photoUrl = photoUrl || user.photoUrl;
    await user.save();

    return res.status(200).json({
      message: 'Welcome back',
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
};