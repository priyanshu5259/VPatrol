import express, { Request, Response } from 'express';
import axios from 'axios';
import UserModel from '../models/User'; // Create this model to interact with MongoDB

const router = express.Router();

// Create or update user data based on user_id
router.post('/', async (req: Request, res: Response) => {
  try {
    const userData = req.body.data;
    const { user_id } = userData;

    // Check if the user exists in the database
    let user = await UserModel.findOne({ user_id });

    if (!user) {
      user = new UserModel(userData);
    } else {
      // Update the existing user's data
      user.set(userData);
    }

    await user.save();

    res.status(201).json({ message: 'User data saved successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error saving user data' });
  }
});

// Route to fetch and structure user details from two different APIs
router.get('/user-details/:city', async (req: Request, res: Response) => {
  try {
    const { city } = req.params;

    // Fetch weather data from OpenWeatherMap API
    

    // Fetch user data from the Razorpay IFSC API (replace with the actual API endpoint)
    const userResponse = await axios.get(`https://ifsc.razorpay.com/YESB0DNB002${city}`);
    const userData = userResponse.data; // No need for .data.data here

    const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=340af26ff8a1a82494aae93eb1bf2f8f`);
    const weatherData = weatherResponse.data;

    // Structure the combined response
    const structuredData = {
      data: {
        user_id: userData.user_id,
        user_name: userData.user_name,
        back_accounts: userData.back_accounts,
        id: userData.id,
        name: userData.name,
        accounts: {
          bank: userData.accounts.bank,
          branch: userData.accounts.branch,
          address: userData.accounts.address,
          city: userData.accounts.city,
          district: userData.accounts.district,
          state: userData.accounts.state,
          bank_code: userData.accounts.bank_code,
          weather: {
            temp: weatherData.main.temp,
            humidity: weatherData.main.humidity,
          },
        },
      },
    };

    res.json(structuredData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching and structuring data' });
  }
});

export default router;
