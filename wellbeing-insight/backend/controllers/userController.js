<<<<<<< HEAD
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWT_SECRET } from '../middleware/authMiddleware.js';

// In a real application, this would be a database connection
// For this simple implementation, we'll use an in-memory store
const users = [];

const userController = {
  // Register new user
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // Check if user already exists
      const userExists = users.find(user => user.email === email);
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user
      const newUser = {
        id: users.length + 1,
        name,
        email,
        password: hashedPassword,
        createdAt: new Date(),
        profilePicture: null,
        bio: '',
        preferences: {
          fitnessIdol: null,
          appearanceIdol: null,
          personalityIdol: null
        },
        progress: {
          fitness: 0,
          appearance: 0,
          personality: 0
        }
      };

      // Save user
      users.push(newUser);

      // Create token payload (exclude password)
      const { password: _, ...userWithoutPassword } = newUser;
      
      // Generate JWT token
      const token = jwt.sign({ user: userWithoutPassword }, JWT_SECRET, { expiresIn: '7d' });

      res.status(201).json({
        message: 'User registered successfully',
        user: userWithoutPassword,
        token
      });
    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({
        message: 'Server error during registration',
        error: error.message
      });
    }
  },

  // Login user
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find user
      const user = users.find(user => user.email === email);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Create token payload (exclude password)
      const { password: _, ...userWithoutPassword } = user;
      
      // Generate JWT token
      const token = jwt.sign({ user: userWithoutPassword }, JWT_SECRET, { expiresIn: '7d' });

      res.status(200).json({
        message: 'Login successful',
        user: userWithoutPassword,
        token
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        message: 'Server error during login',
        error: error.message
      });
    }
  },

  // Get current user
  getCurrentUser: (req, res) => {
    try {
      const userId = req.user.id;
      
      // Find user
      const user = users.find(user => user.id === userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Return user without password
      const { password, ...userWithoutPassword } = user;
      res.status(200).json({ user: userWithoutPassword });
    } catch (error) {
      console.error('Get current user error:', error);
      res.status(500).json({
        message: 'Server error retrieving user',
        error: error.message
      });
    }
  },

  // Update user profile
  updateProfile: (req, res) => {
    try {
      const userId = req.user.id;
      const { name, bio, profilePicture, preferences } = req.body;
      
      // Find user
      const userIndex = users.findIndex(user => user.id === userId);
      if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Update user fields
      if (name) users[userIndex].name = name;
      if (bio) users[userIndex].bio = bio;
      if (profilePicture) users[userIndex].profilePicture = profilePicture;
      if (preferences) {
        users[userIndex].preferences = {
          ...users[userIndex].preferences,
          ...preferences
        };
      }

      // Return updated user without password
      const { password, ...updatedUser } = users[userIndex];
      res.status(200).json({
        message: 'Profile updated successfully',
        user: updatedUser
      });
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({
        message: 'Server error updating profile',
        error: error.message
      });
    }
  },

  // Get dashboard data
  getDashboardData: (req, res) => {
    try {
      // Check if we have a logged-in user
      const userId = req.user?.id;
      const user = userId ? users.find(user => user.id === userId) : null;
      
      // Default demo data for development or non-authenticated users
      const defaultDashboardData = {
        overallProgress: 35,
        fitnessProgress: 35,
        appearanceProgress: 40,
        personalityProgress: 30,
        recentActivities: [
          { id: 1, type: 'fitness', description: 'Completed workout session', time: '2 hours ago' },
          { id: 2, type: 'appearance', description: 'Updated grooming routine', time: '5 hours ago' },
          { id: 3, type: 'personality', description: 'Completed reading goal', time: 'Yesterday' }
        ],
        goals: [
          { id: 1, title: 'Complete 30 workouts', category: 'Fitness', progress: 80, completed: false },
          { id: 2, title: 'Read 2 personal development books', category: 'Personality', progress: 100, completed: true },
          { id: 3, title: 'Establish daily skincare routine', category: 'Appearance', progress: 60, completed: false }
        ],
        recommendations: [
          {
            id: 1,
            title: 'Increase workout frequency',
            description: 'To reach your fitness goals, aim for 5 workouts per week.',
            type: 'fitness',
            priority: 'High'
          },
          {
            id: 2,
            title: 'Upgrade your skincare routine',
            description: 'Consistent morning and evening routine will improve your appearance.',
            type: 'appearance',
            priority: 'Medium'
          },
          {
            id: 3,
            title: 'Practice public speaking',
            description: 'To develop better communication, speak in public at least once a week.',
            type: 'personality',
            priority: 'High'
          }
        ]
      };

      // If no user or not authenticated, return default data
      if (!user) {
        return res.status(200).json(defaultDashboardData);
      }

      // For authenticated users, calculate real progress
      const dashboardData = {
        overallProgress: Math.floor(
          (user.progress.fitness + user.progress.appearance + user.progress.personality) / 3
        ),
        fitnessProgress: user.progress.fitness,
        appearanceProgress: user.progress.appearance,
        personalityProgress: user.progress.personality,
        recentActivities: defaultDashboardData.recentActivities,
        goals: defaultDashboardData.goals,
        recommendations: defaultDashboardData.recommendations
      };

      res.status(200).json(dashboardData);
    } catch (error) {
      console.error('Dashboard data error:', error);
      res.status(500).json({
        message: 'Server error retrieving dashboard data',
        error: error.message
      });
    }
  }
};

=======
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWT_SECRET } from '../middleware/authMiddleware.js';

// In a real application, this would be a database connection
// For this simple implementation, we'll use an in-memory store
const users = [];

const userController = {
  // Register new user
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // Check if user already exists
      const userExists = users.find(user => user.email === email);
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user
      const newUser = {
        id: users.length + 1,
        name,
        email,
        password: hashedPassword,
        createdAt: new Date(),
        profilePicture: null,
        bio: '',
        preferences: {
          fitnessIdol: null,
          appearanceIdol: null,
          personalityIdol: null
        },
        progress: {
          fitness: 0,
          appearance: 0,
          personality: 0
        }
      };

      // Save user
      users.push(newUser);

      // Create token payload (exclude password)
      const { password: _, ...userWithoutPassword } = newUser;
      
      // Generate JWT token
      const token = jwt.sign({ user: userWithoutPassword }, JWT_SECRET, { expiresIn: '7d' });

      res.status(201).json({
        message: 'User registered successfully',
        user: userWithoutPassword,
        token
      });
    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({
        message: 'Server error during registration',
        error: error.message
      });
    }
  },

  // Login user
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find user
      const user = users.find(user => user.email === email);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Create token payload (exclude password)
      const { password: _, ...userWithoutPassword } = user;
      
      // Generate JWT token
      const token = jwt.sign({ user: userWithoutPassword }, JWT_SECRET, { expiresIn: '7d' });

      res.status(200).json({
        message: 'Login successful',
        user: userWithoutPassword,
        token
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        message: 'Server error during login',
        error: error.message
      });
    }
  },

  // Get current user
  getCurrentUser: (req, res) => {
    try {
      const userId = req.user.id;
      
      // Find user
      const user = users.find(user => user.id === userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Return user without password
      const { password, ...userWithoutPassword } = user;
      res.status(200).json({ user: userWithoutPassword });
    } catch (error) {
      console.error('Get current user error:', error);
      res.status(500).json({
        message: 'Server error retrieving user',
        error: error.message
      });
    }
  },

  // Update user profile
  updateProfile: (req, res) => {
    try {
      const userId = req.user.id;
      const { name, bio, profilePicture, preferences } = req.body;
      
      // Find user
      const userIndex = users.findIndex(user => user.id === userId);
      if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Update user fields
      if (name) users[userIndex].name = name;
      if (bio) users[userIndex].bio = bio;
      if (profilePicture) users[userIndex].profilePicture = profilePicture;
      if (preferences) {
        users[userIndex].preferences = {
          ...users[userIndex].preferences,
          ...preferences
        };
      }

      // Return updated user without password
      const { password, ...updatedUser } = users[userIndex];
      res.status(200).json({
        message: 'Profile updated successfully',
        user: updatedUser
      });
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({
        message: 'Server error updating profile',
        error: error.message
      });
    }
  },

  // Get dashboard data
  getDashboardData: (req, res) => {
    try {
      // Check if we have a logged-in user
      const userId = req.user?.id;
      const user = userId ? users.find(user => user.id === userId) : null;
      
      // Default demo data for development or non-authenticated users
      const defaultDashboardData = {
        overallProgress: 35,
        fitnessProgress: 35,
        appearanceProgress: 40,
        personalityProgress: 30,
        recentActivities: [
          { id: 1, type: 'fitness', description: 'Completed workout session', time: '2 hours ago' },
          { id: 2, type: 'appearance', description: 'Updated grooming routine', time: '5 hours ago' },
          { id: 3, type: 'personality', description: 'Completed reading goal', time: 'Yesterday' }
        ],
        goals: [
          { id: 1, title: 'Complete 30 workouts', category: 'Fitness', progress: 80, completed: false },
          { id: 2, title: 'Read 2 personal development books', category: 'Personality', progress: 100, completed: true },
          { id: 3, title: 'Establish daily skincare routine', category: 'Appearance', progress: 60, completed: false }
        ],
        recommendations: [
          {
            id: 1,
            title: 'Increase workout frequency',
            description: 'To reach your fitness goals, aim for 5 workouts per week.',
            type: 'fitness',
            priority: 'High'
          },
          {
            id: 2,
            title: 'Upgrade your skincare routine',
            description: 'Consistent morning and evening routine will improve your appearance.',
            type: 'appearance',
            priority: 'Medium'
          },
          {
            id: 3,
            title: 'Practice public speaking',
            description: 'To develop better communication, speak in public at least once a week.',
            type: 'personality',
            priority: 'High'
          }
        ]
      };

      // If no user or not authenticated, return default data
      if (!user) {
        return res.status(200).json(defaultDashboardData);
      }

      // For authenticated users, calculate real progress
      const dashboardData = {
        overallProgress: Math.floor(
          (user.progress.fitness + user.progress.appearance + user.progress.personality) / 3
        ),
        fitnessProgress: user.progress.fitness,
        appearanceProgress: user.progress.appearance,
        personalityProgress: user.progress.personality,
        recentActivities: defaultDashboardData.recentActivities,
        goals: defaultDashboardData.goals,
        recommendations: defaultDashboardData.recommendations
      };

      res.status(200).json(dashboardData);
    } catch (error) {
      console.error('Dashboard data error:', error);
      res.status(500).json({
        message: 'Server error retrieving dashboard data',
        error: error.message
      });
    }
  }
};

>>>>>>> eee5085621a6e360c16703447618111aa5199450
export { userController };