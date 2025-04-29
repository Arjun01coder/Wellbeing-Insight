import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textLight};
  max-width: 700px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const Card = styled(motion.div)`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const CardIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const CardDescription = styled.p`
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

const Button = styled.button`
  margin-top: 1rem;
`;

const Section = styled.section`
  margin: 4rem 0;
`;

const WorkoutsContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: 2rem;
  margin: 0 auto;
`;

const WorkoutsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

const WorkoutCard = styled(motion.div)`
  border-radius: 8px;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  width: calc(33.333% - 1rem);
  box-shadow: ${({ theme }) => theme.shadows.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: calc(50% - 0.75rem);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
  }
`;

const WorkoutTitle = styled.h4`
  margin-bottom: 0.5rem;
`;

const WorkoutMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.9rem;
`;

const Badge = styled.span`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  display: inline-block;
`;

// New styled components for idol comparison feature
const ComparisonSection = styled.section`
  margin: 4rem 0;
`;

const ComparisonContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: 2rem;
`;

const IdolSelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const IdolHeading = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const IdolCardsContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.backgroundAlt};
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 10px;
  }
`;

const IdolCard = styled.div`
  min-width: 200px;
  border-radius: 8px;
  padding: 1rem;
  background-color: ${({ selected, theme }) => 
    selected ? theme.colors.primary + '20' : theme.colors.backgroundAlt};
  border: 2px solid ${({ selected, theme }) => 
    selected ? theme.colors.primary : 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const IdolImage = styled.div`
  width: 100%;
  height: 180px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
  background-color: #e0e0e0;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
`;

const IdolName = styled.h4`
  margin-bottom: 0.5rem;
`;

const IdolDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

const ProgressSection = styled.div`
  margin-top: 2rem;
`;

const ProgressBar = styled.div`
  height: 12px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: 6px;
  overflow: hidden;
  margin: 1rem 0;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${props => props.progress}%;
  background: linear-gradient(to right, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  border-radius: 6px;
  transition: width 1s ease;
`;

const ProgressText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ProgressPercentage = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

const CurrentStatsSection = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
`;

const StatCard = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textLight};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 3px solid ${({ active, theme }) => 
    active ? theme.colors.primary : 'transparent'};
  color: ${({ active, theme }) => 
    active ? theme.colors.primary : theme.colors.textLight};
  font-weight: 600;
  
  &:hover {
    background: none;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ActionPlanContainer = styled.div`
  margin-top: 2rem;
`;

const ActionPlanCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const ActionPlanTitle = styled.h4`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  
  &:before {
    content: '✅';
    margin-right: 0.5rem;
  }
`;

const Fitness = () => {
  // Sample workout data
  const workouts = [
    {
      id: 1,
      title: "Full Body Strength",
      duration: "45 min",
      level: "Intermediate",
      description: "Build overall strength with this balanced full body workout."
    },
    {
      id: 2,
      title: "HIIT Cardio",
      duration: "30 min",
      level: "Advanced",
      description: "Intense interval training to maximize calorie burn and cardiovascular health."
    },
    {
      id: 3,
      title: "Yoga Flow",
      duration: "60 min",
      level: "Beginner",
      description: "Improve flexibility and mindfulness with this gentle yoga session."
    },
    {
      id: 4,
      title: "Core Crusher",
      duration: "20 min",
      level: "Intermediate",
      description: "Focus on abdominal strength and stability with these targeted exercises."
    },
    {
      id: 5,
      title: "Upper Body Push",
      duration: "40 min",
      level: "Intermediate",
      description: "Build chest, shoulder and tricep strength with pushing movements."
    },
    {
      id: 6,
      title: "Lower Body Focus",
      duration: "50 min",
      level: "Intermediate",
      description: "Strengthen legs and glutes with this comprehensive lower body workout."
    }
  ];

  // Idol data
  const fitnessIdols = [
    {
      id: 1,
      name: "Arnold Schwarzenegger",
      image: "https://hips.hearstapps.com/hmg-prod/images/arnold-schwarzenegger-poses-during-a-1976-photo-session-at-news-photo-1607095799.?resize=980:*",
      description: "7x Mr. Olympia, legendary bodybuilder and fitness icon",
      stats: {
        bodyFat: "8%",
        muscleSize: "Advanced",
        strength: "Elite",
        endurance: "High"
      }
    },
    {
      id: 2,
      name: "Cristiano Ronaldo",
      image: "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt3a48501789cdf6d0/60db893ccf2a4f39287eb3a3/af149477f2f0a6f360b5ffcb3d540b3deda1d32a.jpg",
      description: "Elite footballer known for extraordinary fitness and athleticism",
      stats: {
        bodyFat: "7%",
        muscleSize: "Athletic",
        strength: "High",
        endurance: "Elite"
      }
    },
    {
      id: 3,
      name: "Serena Williams",
      image: "https://hips.hearstapps.com/hmg-prod/images/serena-williams-of-the-united-states-plays-a-forehand-news-photo-1681220355.jpg",
      description: "Tennis champion with extraordinary strength and agility",
      stats: {
        bodyFat: "13%",
        muscleSize: "Athletic",
        strength: "Elite",
        endurance: "Elite"
      }
    },
    {
      id: 4,
      name: "Dwayne Johnson",
      image: "https://assets.gqindia.com/photos/62a9d4653e8cdc9b632eb2ad/16:9/w_1920,h_1080,c_limit/Dwayne-Johnson.jpg",
      description: "The Rock - actor and former wrestler known for his impressive physique",
      stats: {
        bodyFat: "10%",
        muscleSize: "Elite",
        strength: "Elite",
        endurance: "High"
      }
    }
  ];

  // State
  const [selectedIdol, setSelectedIdol] = useState(null);
  const [userStats, setUserStats] = useState({
    weight: 75,
    height: 175,
    bodyFat: 18,
    muscleSize: "Intermediate",
    strength: "Intermediate",
    endurance: "Moderate",
    workoutsPerWeek: 3
  });
  const [fitnessProgress, setFitnessProgress] = useState(35); // percentage
  const [activeTab, setActiveTab] = useState('plan');

  // Select an idol on component mount
  useEffect(() => {
    setSelectedIdol(fitnessIdols[0]);
  }, []);

  // Toggle between idols
  const handleIdolSelect = (idol) => {
    setSelectedIdol(idol);
    // Recalculate progress when idol changes
    calculateProgress(idol);
  };

  // Calculate progress based on user stats and selected idol
  const calculateProgress = (idol) => {
    if (!idol) return;
    
    // This is a simplified calculation - in a real app, this would be more sophisticated
    let progress = 0;
    
    // Compare body fat (lower is better)
    const idealBodyFat = parseInt(idol.stats.bodyFat);
    const userBodyFat = userStats.bodyFat;
    const bodyFatProgress = Math.max(0, 100 - (userBodyFat - idealBodyFat) * 5);
    
    // Compare muscle size (enum: Beginner, Intermediate, Athletic, Advanced, Elite)
    const muscleSizeMap = {
      "Beginner": 1,
      "Intermediate": 2,
      "Athletic": 3,
      "Advanced": 4,
      "Elite": 5
    };
    const idealMuscleSize = muscleSizeMap[idol.stats.muscleSize];
    const userMuscleSize = muscleSizeMap[userStats.muscleSize];
    const muscleSizeProgress = (userMuscleSize / idealMuscleSize) * 100;
    
    // Compare strength (enum: Low, Moderate, High, Advanced, Elite)
    const strengthMap = {
      "Low": 1,
      "Moderate": 2,
      "High": 3, 
      "Advanced": 4,
      "Elite": 5
    };
    const idealStrength = strengthMap[idol.stats.strength];
    const userStrength = strengthMap[userStats.strength];
    const strengthProgress = (userStrength / idealStrength) * 100;
    
    // Compare endurance
    const enduranceMap = {
      "Low": 1,
      "Moderate": 2,
      "High": 3,
      "Advanced": 4,
      "Elite": 5
    };
    const idealEndurance = enduranceMap[idol.stats.endurance];
    const userEndurance = enduranceMap[userStats.endurance];
    const enduranceProgress = (userEndurance / idealEndurance) * 100;
    
    // Calculate average progress
    progress = Math.floor((bodyFatProgress + muscleSizeProgress + strengthProgress + enduranceProgress) / 4);
    
    // Update progress state
    setFitnessProgress(progress);
  };

  return (
    <PageContainer>
      <PageHeader>
        <Title>Physical Strength & Fitness</Title>
        <Description>
          Compare yourself to your fitness idols and get personalized plans to reach your ideal physique.
        </Description>
      </PageHeader>

      <ComparisonSection>
        <SectionTitle>Your Fitness Journey</SectionTitle>
        <ComparisonContainer>
          <IdolSelector>
            <IdolHeading>Choose Your Fitness Idol</IdolHeading>
            <IdolCardsContainer>
              {fitnessIdols.map((idol) => (
                <IdolCard 
                  key={idol.id}
                  selected={selectedIdol?.id === idol.id}
                  onClick={() => handleIdolSelect(idol)}
                >
                  <IdolImage src={idol.image} />
                  <IdolName>{idol.name}</IdolName>
                  <IdolDescription>{idol.description}</IdolDescription>
                </IdolCard>
              ))}
            </IdolCardsContainer>
          </IdolSelector>

          {selectedIdol && (
            <ProgressSection>
              <ProgressText>
                <div>
                  <h3>Your Progress Toward {selectedIdol.name}'s Physique</h3>
                  <p>Keep pushing! You're making great progress.</p>
                </div>
                <ProgressPercentage>{fitnessProgress}%</ProgressPercentage>
              </ProgressText>
              <ProgressBar>
                <ProgressFill progress={fitnessProgress} />
              </ProgressBar>

              <TabsContainer>
                <Tab 
                  active={activeTab === 'stats'} 
                  onClick={() => setActiveTab('stats')}
                >
                  Current Stats
                </Tab>
                <Tab 
                  active={activeTab === 'plan'} 
                  onClick={() => setActiveTab('plan')}
                >
                  Action Plan
                </Tab>
                <Tab 
                  active={activeTab === 'gap'} 
                  onClick={() => setActiveTab('gap')}
                >
                  Gap Analysis
                </Tab>
              </TabsContainer>

              {activeTab === 'stats' && (
                <CurrentStatsSection>
                  <StatCard>
                    <StatValue>{userStats.weight}kg</StatValue>
                    <StatLabel>Weight</StatLabel>
                  </StatCard>
                  <StatCard>
                    <StatValue>{userStats.height}cm</StatValue>
                    <StatLabel>Height</StatLabel>
                  </StatCard>
                  <StatCard>
                    <StatValue>{userStats.bodyFat}%</StatValue>
                    <StatLabel>Body Fat</StatLabel>
                  </StatCard>
                  <StatCard>
                    <StatValue>{userStats.muscleSize}</StatValue>
                    <StatLabel>Muscle Size</StatLabel>
                  </StatCard>
                  <StatCard>
                    <StatValue>{userStats.strength}</StatValue>
                    <StatLabel>Strength</StatLabel>
                  </StatCard>
                  <StatCard>
                    <StatValue>{userStats.endurance}</StatValue>
                    <StatLabel>Endurance</StatLabel>
                  </StatCard>
                  <StatCard>
                    <StatValue>{userStats.workoutsPerWeek}</StatValue>
                    <StatLabel>Workouts/Week</StatLabel>
                  </StatCard>
                </CurrentStatsSection>
              )}

              {activeTab === 'plan' && (
                <ActionPlanContainer>
                  <ActionPlanCard>
                    <ActionPlanTitle>Increase workout frequency to 4-5 times per week</ActionPlanTitle>
                    <p>To reach {selectedIdol.name}'s level of fitness, you'll need to train more consistently.</p>
                  </ActionPlanCard>
                  <ActionPlanCard>
                    <ActionPlanTitle>Focus on compound movements</ActionPlanTitle>
                    <p>Prioritize squats, deadlifts, bench press, and pull-ups to build overall strength.</p>
                  </ActionPlanCard>
                  <ActionPlanCard>
                    <ActionPlanTitle>Adjust nutrition for 15% body fat</ActionPlanTitle>
                    <p>Maintain a small caloric deficit and ensure adequate protein intake.</p>
                  </ActionPlanCard>
                  <ActionPlanCard>
                    <ActionPlanTitle>Add high-intensity interval training</ActionPlanTitle>
                    <p>To improve your endurance levels to match your idol's capabilities.</p>
                  </ActionPlanCard>
                  <Button>Get Your Full Custom Plan</Button>
                </ActionPlanContainer>
              )}

              {activeTab === 'gap' && (
                <div>
                  <h3>Gap Analysis</h3>
                  <p>Here's what separates you from {selectedIdol.name}:</p>
                  
                  <CurrentStatsSection>
                    <StatCard>
                      <StatValue>{userStats.bodyFat}% vs {selectedIdol.stats.bodyFat}</StatValue>
                      <StatLabel>Body Fat</StatLabel>
                    </StatCard>
                    <StatCard>
                      <StatValue>{userStats.muscleSize} vs {selectedIdol.stats.muscleSize}</StatValue>
                      <StatLabel>Muscle Size</StatLabel>
                    </StatCard>
                    <StatCard>
                      <StatValue>{userStats.strength} vs {selectedIdol.stats.strength}</StatValue>
                      <StatLabel>Strength</StatLabel>
                    </StatCard>
                    <StatCard>
                      <StatValue>{userStats.endurance} vs {selectedIdol.stats.endurance}</StatValue>
                      <StatLabel>Endurance</StatLabel>
                    </StatCard>
                  </CurrentStatsSection>
                  
                  <Button style={{marginTop: "2rem"}}>Update Your Stats</Button>
                </div>
              )}
            </ProgressSection>
          )}
        </ComparisonContainer>
      </ComparisonSection>

      <CardsGrid>
        <Card
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <CardIcon>💪</CardIcon>
          <CardTitle>Strength Training</CardTitle>
          <CardDescription>
            Build muscle, increase strength, and boost metabolism with personalized strength training programs.
          </CardDescription>
          <Button>Get Started</Button>
        </Card>
        
        <Card
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <CardIcon>🏃</CardIcon>
          <CardTitle>Cardio Fitness</CardTitle>
          <CardDescription>
            Improve heart health, endurance, and burn calories with tailored cardio workout plans.
          </CardDescription>
          <Button>Explore Plans</Button>
        </Card>
        
        <Card
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <CardIcon>🥗</CardIcon>
          <CardTitle>Nutrition</CardTitle>
          <CardDescription>
            Fuel your workouts and support your goals with personalized nutrition advice and meal plans.
          </CardDescription>
          <Button>Get Guidance</Button>
        </Card>
      </CardsGrid>

      <Section>
        <SectionTitle>Recommended Workouts</SectionTitle>
        <WorkoutsContainer>
          <WorkoutsList>
            {workouts.map((workout, index) => (
              <WorkoutCard 
                key={workout.id}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <WorkoutTitle>{workout.title}</WorkoutTitle>
                <WorkoutMeta>
                  <span>{workout.duration}</span>
                  <Badge>{workout.level}</Badge>
                </WorkoutMeta>
                <p>{workout.description}</p>
                <Button style={{ marginTop: "1rem" }}>Start Workout</Button>
              </WorkoutCard>
            ))}
          </WorkoutsList>
          
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Button>View All Workouts</Button>
          </div>
        </WorkoutsContainer>
      </Section>
    </PageContainer>
  );
};

export default Fitness;