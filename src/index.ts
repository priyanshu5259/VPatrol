import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT || 3005;

app.use(express.json());

// Define a Mongoose schema for the user data
const userSchema = new mongoose.Schema({
  user_id: Number,
  user_name: String,
  back_accounts: [String],
  id: Number,
  name: String,
  accounts: {
    bank: String,
    branch: String,
    address: String,
    city: String,
    district: String,
    state: String,
    bank_code: String,
    weather: {
      temp: Number,
      humidity: Number,
    },
  },
});

// Create a Mongoose model based on the schema
const UserModel = mongoose.model('User', userSchema);

// MongoDB connection setup (replace with your MongoDB URI)
const mongoURI = 'mongodb+srv://dayaramanipriyanshu6908:priyanshu@cluster0.3urpwut.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoURI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// API endpoint to create a new user
app.post('/api/users', async (req, res) => {
  try {
    const userData = req.body.data;
    const newUser = new UserModel(userData);
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

// API endpoint to get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


