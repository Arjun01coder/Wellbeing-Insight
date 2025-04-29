// In a real application, this would be a database connection
// For this simple implementation, we'll use an in-memory store
const idols = [
  {
    id: 1,
    name: "Arnold Schwarzenegger",
    type: "fitness",
    image: "https://hips.hearstapps.com/hmg-prod/images/arnold-schwarzenegger-poses-during-a-1976-photo-session-at-news-photo-1607095799.?resize=980:*",
    description: "7x Mr. Olympia",
    achievements: [
      "7 times Mr. Olympia winner",
      "World-renowned bodybuilder",
      "Successful actor and politician"
    ],
    routines: [
      "5-day split workout focusing on muscle groups",
      "Heavy compound lifts for muscle growth",
      "Strict diet with high protein intake"
    ]
  },
  {
    id: 2,
    name: "David Beckham",
    type: "appearance",
    image: "https://ca.hellomagazine.com/images/0/2020/05/02/000/741/066/900x900.jpg",
    description: "Style icon",
    achievements: [
      "Global style icon",
      "Prestigious fashion collaborations",
      "Influential grooming trends setter"
    ],
    routines: [
      "Daily skincare regimen",
      "Regular professional haircuts",
      "Curated wardrobe with high-quality basics"
    ]
  },
  {
    id: 3,
    name: "Jordan Peterson",
    type: "personality",
    image: "https://images.seattletimes.com/wp-content/uploads/2018/04/3a6ce60a-4764-11e8-bf18-19187d7272cc.jpg",
    description: "Clinical psychologist",
    achievements: [
      "Best-selling author",
      "Clinical psychologist and professor",
      "Influential public speaker"
    ],
    routines: [
      "Daily writing and reflection",
      "Structured reading habits",
      "Regular public speaking practice"
    ]
  },
  {
    id: 4,
    name: "Dwayne Johnson",
    type: "fitness",
    image: "https://m.media-amazon.com/images/M/MV5BMTkyNDQ3NzAxM15BMl5BanBnXkFtZTgwODIwMTQ0NTE@._V1_.jpg",
    description: "Actor and former WWE wrestler",
    achievements: [
      "WWE Champion",
      "Successful actor",
      "Fitness entrepreneur"
    ],
    routines: [
      "Early morning workouts starting at 4am",
      "Split training focusing on different muscle groups",
      "High-protein, disciplined diet"
    ]
  },
  {
    id: 5,
    name: "Ryan Reynolds",
    type: "appearance",
    image: "https://flxt.tmsimg.com/assets/178012_v9_bb.jpg",
    description: "Actor and entrepreneur",
    achievements: [
      "Hollywood A-lister",
      "Style icon",
      "Successful businessman"
    ],
    routines: [
      "Simple but effective grooming routine",
      "Classic style with modern elements",
      "Attention to detail in fashion choices"
    ]
  },
  {
    id: 6,
    name: "Barack Obama",
    type: "personality",
    image: "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTE4MDAzNDEwNzg5ODI4MTEw/barack-obama-12782369-1-402.jpg",
    description: "Former US President",
    achievements: [
      "First African American President",
      "Nobel Peace Prize winner",
      "Best-selling author"
    ],
    routines: [
      "Daily morning reading",
      "Regular exercise to maintain mental clarity",
      "Structured decision-making process"
    ]
  }
];

// User idol selections (in a real app, this would be in the user model)
const userIdols = [];

const idolController = {
  // Get featured idols for the homepage
  getFeaturedIdols: (req, res) => {
    try {
      const featuredIdols = idols.slice(0, 3); // Get first 3 idols
      res.status(200).json(featuredIdols);
    } catch (error) {
      console.error('Get featured idols error:', error);
      res.status(500).json({
        message: 'Server error retrieving featured idols',
        error: error.message
      });
    }
  },

  // Get idols selected by a user
  getUserIdols: (req, res) => {
    try {
      const userId = req.user.id;
      
      // Find user's idols
      const userIdolSelections = userIdols.filter(selection => selection.userId === userId);
      
      if (userIdolSelections.length === 0) {
        return res.status(200).json({ 
          message: 'No idols selected yet',
          idols: [] 
        });
      }
      
      // Get full idol details for each selection
      const selectedIdols = userIdolSelections.map(selection => {
        const idol = idols.find(idol => idol.id === selection.idolId);
        return {
          ...idol,
          progress: selection.progress || 0
        };
      });
      
      res.status(200).json(selectedIdols);
    } catch (error) {
      console.error('Get user idols error:', error);
      res.status(500).json({
        message: 'Server error retrieving user idols',
        error: error.message
      });
    }
  },

  // Add an idol to user's selection
  addIdol: (req, res) => {
    try {
      const userId = req.user.id;
      const { idolId, type } = req.body;
      
      // Check if idol exists
      const idolExists = idols.some(idol => idol.id === idolId);
      if (!idolExists) {
        return res.status(404).json({ message: 'Idol not found' });
      }
      
      // Check if user already selected this idol
      const alreadySelected = userIdols.some(
        selection => selection.userId === userId && selection.idolId === idolId
      );
      
      if (alreadySelected) {
        return res.status(400).json({ message: 'This idol is already selected' });
      }
      
      // Check if user already has an idol for this type
      const existingTypeIndex = userIdols.findIndex(
        selection => selection.userId === userId && selection.type === type
      );
      
      if (existingTypeIndex !== -1) {
        // Replace existing idol for this type
        userIdols[existingTypeIndex] = {
          userId,
          idolId,
          type,
          progress: 0,
          selectedAt: new Date()
        };
        
        res.status(200).json({ 
          message: 'Idol replaced successfully',
          selection: userIdols[existingTypeIndex]
        });
      } else {
        // Add new idol selection
        const newSelection = {
          userId,
          idolId,
          type,
          progress: 0,
          selectedAt: new Date()
        };
        
        userIdols.push(newSelection);
        
        res.status(201).json({ 
          message: 'Idol added successfully',
          selection: newSelection
        });
      }
    } catch (error) {
      console.error('Add idol error:', error);
      res.status(500).json({
        message: 'Server error adding idol',
        error: error.message
      });
    }
  },

  // Update idol selection
  updateIdol: (req, res) => {
    try {
      const userId = req.user.id;
      const idolId = parseInt(req.params.idolId);
      const { progress } = req.body;
      
      // Find the idol selection
      const selectionIndex = userIdols.findIndex(
        selection => selection.userId === userId && selection.idolId === idolId
      );
      
      if (selectionIndex === -1) {
        return res.status(404).json({ message: 'Idol selection not found' });
      }
      
      // Update progress
      userIdols[selectionIndex] = {
        ...userIdols[selectionIndex],
        progress: progress !== undefined ? progress : userIdols[selectionIndex].progress
      };
      
      res.status(200).json({ 
        message: 'Idol selection updated successfully',
        selection: userIdols[selectionIndex]
      });
    } catch (error) {
      console.error('Update idol error:', error);
      res.status(500).json({
        message: 'Server error updating idol',
        error: error.message
      });
    }
  },

  // Delete idol selection
  deleteIdol: (req, res) => {
    try {
      const userId = req.user.id;
      const idolId = parseInt(req.params.idolId);
      
      // Find the idol selection
      const selectionIndex = userIdols.findIndex(
        selection => selection.userId === userId && selection.idolId === idolId
      );
      
      if (selectionIndex === -1) {
        return res.status(404).json({ message: 'Idol selection not found' });
      }
      
      // Remove the selection
      userIdols.splice(selectionIndex, 1);
      
      res.status(200).json({ message: 'Idol selection removed successfully' });
    } catch (error) {
      console.error('Delete idol error:', error);
      res.status(500).json({
        message: 'Server error deleting idol',
        error: error.message
      });
    }
  },

  // Get all fitness idols
  getFitnessIdols: (req, res) => {
    try {
      const fitnessIdols = idols.filter(idol => idol.type === 'fitness');
      res.status(200).json(fitnessIdols);
    } catch (error) {
      console.error('Get fitness idols error:', error);
      res.status(500).json({
        message: 'Server error retrieving fitness idols',
        error: error.message
      });
    }
  },

  // Get all appearance idols
  getAppearanceIdols: (req, res) => {
    try {
      const appearanceIdols = idols.filter(idol => idol.type === 'appearance');
      res.status(200).json(appearanceIdols);
    } catch (error) {
      console.error('Get appearance idols error:', error);
      res.status(500).json({
        message: 'Server error retrieving appearance idols',
        error: error.message
      });
    }
  },

  // Get all personality idols
  getPersonalityIdols: (req, res) => {
    try {
      const personalityIdols = idols.filter(idol => idol.type === 'personality');
      res.status(200).json(personalityIdols);
    } catch (error) {
      console.error('Get personality idols error:', error);
      res.status(500).json({
        message: 'Server error retrieving personality idols',
        error: error.message
      });
    }
  }
};

export { idolController };