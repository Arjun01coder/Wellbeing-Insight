// In a real application, this would be a database connection
// For this simple implementation, we'll use an in-memory store
const userProgress = [];
const userActivities = [];

const progressController = {
  // Get all progress data for a user
  getUserProgress: (req, res) => {
    try {
      const userId = req.user.id;
      
      // Find user's progress data
      const progressData = userProgress.find(progress => progress.userId === userId);
      
      if (!progressData) {
        // Create initial progress data if not exists
        const newProgressData = {
          userId,
          fitness: 0,
          appearance: 0,
          personality: 0,
          overall: 0,
          lastUpdated: new Date()
        };
        
        userProgress.push(newProgressData);
        return res.status(200).json(newProgressData);
      }
      
      res.status(200).json(progressData);
    } catch (error) {
      console.error('Get user progress error:', error);
      res.status(500).json({
        message: 'Server error retrieving user progress',
        error: error.message
      });
    }
  },
  
  // Update user progress
  updateProgress: (req, res) => {
    try {
      const userId = req.user.id;
      const { fitness, appearance, personality } = req.body;
      
      // Find user's progress data
      const progressIndex = userProgress.findIndex(progress => progress.userId === userId);
      
      if (progressIndex === -1) {
        // Create initial progress data if not exists
        const newProgressData = {
          userId,
          fitness: fitness || 0,
          appearance: appearance || 0,
          personality: personality || 0,
          overall: calculateOverall(fitness || 0, appearance || 0, personality || 0),
          lastUpdated: new Date()
        };
        
        userProgress.push(newProgressData);
        return res.status(201).json({
          message: 'Progress created successfully',
          progress: newProgressData
        });
      }
      
      // Update existing progress
      const currentProgress = userProgress[progressIndex];
      const updatedProgress = {
        ...currentProgress,
        fitness: fitness !== undefined ? fitness : currentProgress.fitness,
        appearance: appearance !== undefined ? appearance : currentProgress.appearance,
        personality: personality !== undefined ? personality : currentProgress.personality,
        lastUpdated: new Date()
      };
      
      // Calculate overall progress
      updatedProgress.overall = calculateOverall(
        updatedProgress.fitness,
        updatedProgress.appearance,
        updatedProgress.personality
      );
      
      userProgress[progressIndex] = updatedProgress;
      
      res.status(200).json({
        message: 'Progress updated successfully',
        progress: updatedProgress
      });
    } catch (error) {
      console.error('Update progress error:', error);
      res.status(500).json({
        message: 'Server error updating progress',
        error: error.message
      });
    }
  },
  
  // Get fitness progress
  getFitnessProgress: (req, res) => {
    try {
      const userId = req.user.id;
      
      // Find user's progress data
      const progressData = userProgress.find(progress => progress.userId === userId);
      
      if (!progressData) {
        return res.status(200).json({ 
          fitness: 0,
          activities: []
        });
      }
      
      // Get fitness activities
      const fitnessActivities = userActivities
        .filter(activity => activity.userId === userId && activity.type === 'fitness')
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      
      res.status(200).json({
        fitness: progressData.fitness,
        activities: fitnessActivities
      });
    } catch (error) {
      console.error('Get fitness progress error:', error);
      res.status(500).json({
        message: 'Server error retrieving fitness progress',
        error: error.message
      });
    }
  },
  
  // Get appearance progress
  getAppearanceProgress: (req, res) => {
    try {
      const userId = req.user.id;
      
      // Find user's progress data
      const progressData = userProgress.find(progress => progress.userId === userId);
      
      if (!progressData) {
        return res.status(200).json({ 
          appearance: 0,
          activities: []
        });
      }
      
      // Get appearance activities
      const appearanceActivities = userActivities
        .filter(activity => activity.userId === userId && activity.type === 'appearance')
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      
      res.status(200).json({
        appearance: progressData.appearance,
        activities: appearanceActivities
      });
    } catch (error) {
      console.error('Get appearance progress error:', error);
      res.status(500).json({
        message: 'Server error retrieving appearance progress',
        error: error.message
      });
    }
  },
  
  // Get personality progress
  getPersonalityProgress: (req, res) => {
    try {
      const userId = req.user.id;
      
      // Find user's progress data
      const progressData = userProgress.find(progress => progress.userId === userId);
      
      if (!progressData) {
        return res.status(200).json({ 
          personality: 0,
          activities: []
        });
      }
      
      // Get personality activities
      const personalityActivities = userActivities
        .filter(activity => activity.userId === userId && activity.type === 'personality')
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      
      res.status(200).json({
        personality: progressData.personality,
        activities: personalityActivities
      });
    } catch (error) {
      console.error('Get personality progress error:', error);
      res.status(500).json({
        message: 'Server error retrieving personality progress',
        error: error.message
      });
    }
  },
  
  // Log a new activity
  logActivity: (req, res) => {
    try {
      const userId = req.user.id;
      const { type, description, impact } = req.body;
      
      // Validate type
      if (!['fitness', 'appearance', 'personality'].includes(type)) {
        return res.status(400).json({ message: 'Invalid activity type' });
      }
      
      if (!description) {
        return res.status(400).json({ message: 'Activity description is required' });
      }
      
      // Create new activity
      const newActivity = {
        id: userActivities.length + 1,
        userId,
        type,
        description,
        impact: impact || 'medium',
        timestamp: new Date()
      };
      
      userActivities.push(newActivity);
      
      // Update user progress based on the activity
      const progressIndex = userProgress.findIndex(progress => progress.userId === userId);
      
      if (progressIndex !== -1) {
        // Apply progress impact
        let progressUpdate = 0;
        
        switch (newActivity.impact) {
          case 'low':
            progressUpdate = 1;
            break;
          case 'medium':
            progressUpdate = 3;
            break;
          case 'high':
            progressUpdate = 5;
            break;
          default:
            progressUpdate = 2;
        }
        
        // Update specific progress type and cap at 100
        const currentProgress = userProgress[progressIndex];
        const updatedProgress = { ...currentProgress };
        
        updatedProgress[type] = Math.min(100, currentProgress[type] + progressUpdate);
        updatedProgress.lastUpdated = new Date();
        
        // Recalculate overall progress
        updatedProgress.overall = calculateOverall(
          updatedProgress.fitness,
          updatedProgress.appearance,
          updatedProgress.personality
        );
        
        userProgress[progressIndex] = updatedProgress;
      }
      
      res.status(201).json({
        message: 'Activity logged successfully',
        activity: newActivity
      });
    } catch (error) {
      console.error('Log activity error:', error);
      res.status(500).json({
        message: 'Server error logging activity',
        error: error.message
      });
    }
  }
};

// Helper function to calculate overall progress
function calculateOverall(fitness, appearance, personality) {
  return Math.floor((fitness + appearance + personality) / 3);
}

export { progressController };