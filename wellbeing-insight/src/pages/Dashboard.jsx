import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { authService, progressService, idolService } from '../services/api';
import { 
  Container, 
  Title, 
  Subtitle, 
  Card,
  GlassCard,
  Button,
  TabGroup,
  AnimatedTab,
  Avatar,
  Badge,
  Grid,
  Flex,
  ProgressBar,
  ProgressFill,
  CircleProgressContainer,
  CircleBackground,
  CircleFill,
  CircleText,
  fadeIn,
  slideUp,
  staggerContainer
} from '../components/AccernityUI';

// Styled components
const PageContainer = styled(Container)`
  // No additional styles needed
`;

const DashboardGrid = styled(Grid)`
  margin-bottom: 2rem;
`;

const StatCard = styled(Card)`
  padding: 1.5rem;
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(90deg, #4F46E5, #7C3AED);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Section = styled(Card)`
  margin-bottom: 2rem;
`;

const SectionTitle = styled(Subtitle)`
  // No additional styles needed
`;

const GoalsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Goal = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: rgba(245, 247, 250, 0.8);
  border-radius: 12px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const GoalIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ completed }) => 
    completed ? 'linear-gradient(90deg, #10B981, #059669)' : 'linear-gradient(90deg, #4F46E5, #7C3AED)'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  color: white;
  font-weight: bold;
  box-shadow: 0 4px 8px ${({ completed }) => 
    completed ? 'rgba(16, 185, 129, 0.3)' : 'rgba(79, 70, 229, 0.3)'};
`;

const GoalDetails = styled.div`
  flex: 1;
`;

const GoalTitle = styled.h4`
  margin-bottom: 0.25rem;
`;

const GoalMeta = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

const GoalProgressBar = styled(ProgressBar)`
  width: 100px;
  margin-right: 1rem;
`;

const ProgressPercent = styled.div`
  font-weight: 600;
  color: ${({ completed }) => 
    completed ? '#10B981' : '#4F46E5'};
`;

const ActivitiesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Activity = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  
  &:last-child {
    border-bottom: none;
  }
`;

const ActivityTime = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.9rem;
  width: 100px;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

// New components for idol comparison dashboard
const IdolComparisonGrid = styled(Grid)`
  margin-bottom: 2rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints?.md || '768px'}) {
    grid-template-columns: 1fr;
  }
`;

const PillarCard = styled(GlassCard)`
  overflow: hidden;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const PillarHeader = styled.div`
  background: ${({ type }) => {
    switch(type) {
      case 'fitness': return 'linear-gradient(90deg, #4F46E5, #3730A3)';
      case 'appearance': return 'linear-gradient(90deg, #10B981, #059669)';
      case 'personality': return 'linear-gradient(90deg, #F59E0B, #D97706)';
      default: return 'linear-gradient(90deg, #4F46E5, #7C3AED)';
    }
  }};
  color: white;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: -2rem -2rem 1.5rem -2rem;
`;

const PillarTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
`;

const PillarProgress = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const IdolComparison = styled.div`
  display: flex;
  gap: 1rem;
`;

const IdolAvatar = styled(Avatar)`
  width: 60px;
  height: 60px;
  flex-shrink: 0;
`;

const IdolInfo = styled.div`
  flex: 1;
`;

const IdolName = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const IdolMeta = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 0.5rem;
`;

const CompareButton = styled(Link)`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: ${({ type }) => {
    switch(type) {
      case 'fitness': return 'linear-gradient(90deg, #4F46E5, #3730A3)';
      case 'appearance': return 'linear-gradient(90deg, #10B981, #059669)';
      case 'personality': return 'linear-gradient(90deg, #F59E0B, #D97706)';
      default: return 'linear-gradient(90deg, #4F46E5, #7C3AED)';
    }
  }};
  color: white;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-top: 0.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const ProgressSection = styled(Card)`
  margin-bottom: 2rem;
`;

const ProgressTitle = styled(Subtitle)`
  // No additional styles needed
`;

const ProgressGrid = styled(Grid)`
  grid-template-columns: 1fr 1fr 1fr 1fr;
  
  @media (max-width: ${({ theme }) => theme.breakpoints?.md || '768px'}) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints?.sm || '640px'}) {
    grid-template-columns: 1fr;
  }
`;

const RecommendationsSection = styled(Card)`
  margin-bottom: 2rem;
`;

const RecommendationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RecommendationItem = styled(motion.div)`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: rgba(245, 247, 250, 0.8);
  border-radius: 12px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }
`;

const RecommendationIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${({ type }) => {
    switch(type) {
      case 'fitness': return 'linear-gradient(90deg, #4F46E5, #3730A3)';
      case 'appearance': return 'linear-gradient(90deg, #10B981, #059669)';
      case 'personality': return 'linear-gradient(90deg, #F59E0B, #D97706)';
      default: return 'linear-gradient(90deg, #6B7280, #4B5563)';
    }
  }};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
`;

const RecommendationContent = styled.div`
  flex: 1;
`;

const RecommendationTitle = styled.h4`
  margin-bottom: 0.5rem;
`;

const RecommendationMeta = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 0.5rem;
  display: flex;
  gap: 0.5rem;
`;

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    overallProgress: 0,
    fitnessProgress: 0,
    appearanceProgress: 0,
    personalityProgress: 0,
    recentActivities: [],
    goals: [],
    recommendations: []
  });
  const [idols, setIdols] = useState({
    fitness: null,
    appearance: null,
    personality: null
  });

  // Fetch dashboard data from API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Fetch user's dashboard data
        const dashboardResponse = await authService.getDashboardData();
        setDashboardData(dashboardResponse.data);

        // Fetch user's idols
        const idolsResponse = await idolService.getUserIdols();
        
        // Transform idols data into the expected format
        const idolsData = {};
        idolsResponse.data.forEach(idol => {
          if (idol.type) {
            idolsData[idol.type] = {
              name: idol.name,
              image: idol.image,
              progress: idol.progress || 0,
              description: idol.description
            };
          }
        });

        // If user has no idols yet, fetch featured idols as placeholders
        if (Object.keys(idolsData).length === 0) {
          const featuredResponse = await idolService.getFeaturedIdols();
          featuredResponse.data.forEach(idol => {
            idolsData[idol.type] = {
              name: idol.name,
              image: idol.image,
              progress: 0,
              description: idol.description
            };
          });
        }

        setIdols(idolsData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again later.");
        setLoading(false);
        
        // Fallback to sample data for demo purposes
        setDashboardData({
          overallProgress: 35,
          fitnessProgress: 35,
          appearanceProgress: 40,
          personalityProgress: 30,
          recentActivities: [
            { id: 1, type: 'fitness', description: 'Completed HIIT workout', time: '2 hours ago' },
            { id: 2, type: 'appearance', description: 'Updated personal profile', time: '5 hours ago' },
            { id: 3, type: 'personality', description: 'Read a book chapter', time: 'Yesterday' },
            { id: 4, type: 'fitness', description: 'Started new workout plan', time: '3 days ago' }
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
              description: 'To reach Arnold\'s level of fitness, aim for 5 workouts per week.',
              type: 'fitness',
              priority: 'High'
            },
            {
              id: 2,
              title: 'Upgrade your skincare routine',
              description: 'Consistent morning and evening routine will help you match David\'s appearance.',
              type: 'appearance',
              priority: 'Medium'
            },
            {
              id: 3,
              title: 'Practice public speaking',
              description: 'To develop Jordan\'s articulation, speak in public at least once a week.',
              type: 'personality',
              priority: 'High'
            }
          ]
        });
        
        setIdols({
          fitness: {
            name: "Arnold Schwarzenegger",
            image: "https://hips.hearstapps.com/hmg-prod/images/arnold-schwarzenegger-poses-during-a-1976-photo-session-at-news-photo-1607095799.?resize=980:*",
            progress: 35,
            description: "7x Mr. Olympia"
          },
          appearance: {
            name: "David Beckham",
            image: "https://ca.hellomagazine.com/images/0/2020/05/02/000/741/066/900x900.jpg",
            progress: 40,
            description: "Style icon"
          },
          personality: {
            name: "Jordan Peterson",
            image: "https://images.seattletimes.com/wp-content/uploads/2018/04/3a6ce60a-4764-11e8-bf18-19187d7272cc.jpg",
            progress: 30,
            description: "Clinical psychologist"
          }
        });
      }
    };

    fetchDashboardData();
  }, []);

  // Log an activity (for demo purposes)
  const logActivity = async (type, description) => {
    try {
      await progressService.logActivity({ type, description, impact: 'medium' });
      // Refresh dashboard data after logging activity
      const dashboardResponse = await authService.getDashboardData();
      setDashboardData(dashboardResponse.data);
    } catch (err) {
      console.error("Error logging activity:", err);
    }
  };

  if (loading) {
    return (
      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ textAlign: 'center', padding: '4rem 0' }}
        >
          <h2>Loading your dashboard...</h2>
          <p>Fetching your personalized data</p>
        </motion.div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ textAlign: 'center', padding: '4rem 0' }}
        >
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </motion.div>
      </Container>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <PageContainer>
        <Title>Your Dashboard</Title>
        
        <TabGroup>
          <AnimatedTab 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </AnimatedTab>
          <AnimatedTab 
            active={activeTab === 'fitness'} 
            onClick={() => setActiveTab('fitness')}
          >
            Fitness
          </AnimatedTab>
          <AnimatedTab 
            active={activeTab === 'personality'} 
            onClick={() => setActiveTab('personality')}
          >
            Personality
          </AnimatedTab>
          <AnimatedTab 
            active={activeTab === 'appearance'} 
            onClick={() => setActiveTab('appearance')}
          >
            Appearance
          </AnimatedTab>
        </TabGroup>
        
        {activeTab === 'overview' && (
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={slideUp}>
              <IdolComparisonGrid columns="repeat(3, 1fr)">
                {idols.fitness && (
                  <PillarCard>
                    <PillarHeader type="fitness">
                      <PillarTitle>Fitness Journey</PillarTitle>
                      <PillarProgress>{idols.fitness.progress}%</PillarProgress>
                    </PillarHeader>
                    <IdolComparison>
                      <IdolAvatar src={idols.fitness.image} />
                      <IdolInfo>
                        <IdolName>Your Idol: {idols.fitness.name}</IdolName>
                        <IdolMeta>{idols.fitness.description}</IdolMeta>
                        <div>You're {idols.fitness.progress}% of the way to your ideal physique</div>
                        <CompareButton to="/fitness" type="fitness">Continue Journey</CompareButton>
                      </IdolInfo>
                    </IdolComparison>
                  </PillarCard>
                )}
                
                {idols.appearance && (
                  <PillarCard>
                    <PillarHeader type="appearance">
                      <PillarTitle>Appearance Journey</PillarTitle>
                      <PillarProgress>{idols.appearance.progress}%</PillarProgress>
                    </PillarHeader>
                    <IdolComparison>
                      <IdolAvatar src={idols.appearance.image} />
                      <IdolInfo>
                        <IdolName>Your Idol: {idols.appearance.name}</IdolName>
                        <IdolMeta>{idols.appearance.description}</IdolMeta>
                        <div>You're {idols.appearance.progress}% of the way to your ideal style</div>
                        <CompareButton to="/appearance" type="appearance">Continue Journey</CompareButton>
                      </IdolInfo>
                    </IdolComparison>
                  </PillarCard>
                )}
                
                {idols.personality && (
                  <PillarCard>
                    <PillarHeader type="personality">
                      <PillarTitle>Personality Journey</PillarTitle>
                      <PillarProgress>{idols.personality.progress}%</PillarProgress>
                    </PillarHeader>
                    <IdolComparison>
                      <IdolAvatar src={idols.personality.image} />
                      <IdolInfo>
                        <IdolName>Your Idol: {idols.personality.name}</IdolName>
                        <IdolMeta>{idols.personality.description}</IdolMeta>
                        <div>You're {idols.personality.progress}% of the way to your ideal traits</div>
                        <CompareButton to="/personality" type="personality">Continue Journey</CompareButton>
                      </IdolInfo>
                    </IdolComparison>
                  </PillarCard>
                )}
              </IdolComparisonGrid>
            </motion.div>
            
            <motion.div variants={slideUp}>
              <ProgressSection>
                <ProgressTitle>Your Transformation Progress</ProgressTitle>
                <ProgressGrid>
                  <div>
                    <CircleProgressContainer>
                      <svg width="120" height="120" viewBox="0 0 100 100">
                        <CircleBackground cx="50" cy="50" r="40" />
                        <CircleFill 
                          cx="50" 
                          cy="50" 
                          r="40" 
                          color="#4F46E5"
                          progress={dashboardData.overallProgress} 
                        />
                        <CircleText x="50" y="50">{dashboardData.overallProgress}%</CircleText>
                      </svg>
                    </CircleProgressContainer>
                    <h3 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Overall Progress</h3>
                    <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#6B7280' }}>
                      Your journey to becoming your ideal self across all three pillars
                    </p>
                  </div>
                  
                  <div>
                    <CircleProgressContainer>
                      <svg width="120" height="120" viewBox="0 0 100 100">
                        <CircleBackground cx="50" cy="50" r="40" />
                        <CircleFill 
                          cx="50" 
                          cy="50" 
                          r="40" 
                          color="#4F46E5"
                          progress={dashboardData.fitnessProgress} 
                        />
                        <CircleText x="50" y="50">{dashboardData.fitnessProgress}%</CircleText>
                      </svg>
                    </CircleProgressContainer>
                    <h3 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Fitness Progress</h3>
                    <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#6B7280' }}>
                      Your journey to {idols.fitness?.name}'s level of physical fitness
                    </p>
                    <Button 
                      variant="primary" 
                      style={{ width: '100%', marginTop: '1rem' }} 
                      as={Link} to="/fitness"
                    >
                      Update Fitness Plan
                    </Button>
                  </div>
                  
                  <div>
                    <CircleProgressContainer>
                      <svg width="120" height="120" viewBox="0 0 100 100">
                        <CircleBackground cx="50" cy="50" r="40" />
                        <CircleFill 
                          cx="50" 
                          cy="50" 
                          r="40" 
                          color="#10B981"
                          progress={dashboardData.appearanceProgress} 
                        />
                        <CircleText x="50" y="50">{dashboardData.appearanceProgress}%</CircleText>
                      </svg>
                    </CircleProgressContainer>
                    <h3 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Appearance Progress</h3>
                    <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#6B7280' }}>
                      Your journey to {idols.appearance?.name}'s level of style
                    </p>
                    <Button 
                      variant="secondary" 
                      style={{ width: '100%', marginTop: '1rem' }} 
                      as={Link} to="/appearance"
                    >
                      Update Style Plan
                    </Button>
                  </div>
                  
                  <div>
                    <CircleProgressContainer>
                      <svg width="120" height="120" viewBox="0 0 100 100">
                        <CircleBackground cx="50" cy="50" r="40" />
                        <CircleFill 
                          cx="50" 
                          cy="50" 
                          r="40" 
                          color="#F59E0B"
                          progress={dashboardData.personalityProgress} 
                        />
                        <CircleText x="50" y="50">{dashboardData.personalityProgress}%</CircleText>
                      </svg>
                    </CircleProgressContainer>
                    <h3 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Personality Progress</h3>
                    <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#6B7280' }}>
                      Your journey to {idols.personality?.name}'s personality traits
                    </p>
                    <Button 
                      variant="tertiary" 
                      style={{ width: '100%', marginTop: '1rem' }} 
                      as={Link} to="/personality"
                    >
                      Update Personality Plan
                    </Button>
                  </div>
                </ProgressGrid>
              </ProgressSection>
            </motion.div>
            
            <motion.div variants={slideUp}>
              <RecommendationsSection>
                <SectionTitle>Recommended Next Steps</SectionTitle>
                <RecommendationsList>
                  {dashboardData.recommendations.map(recommendation => (
                    <RecommendationItem key={recommendation.id} variants={slideUp}>
                      <RecommendationIcon type={recommendation.type}>
                        {recommendation.type === 'fitness' ? '💪' : 
                         recommendation.type === 'appearance' ? '✨' : '🎭'}
                      </RecommendationIcon>
                      <RecommendationContent>
                        <RecommendationTitle>{recommendation.title}</RecommendationTitle>
                        <RecommendationMeta>
                          <Badge variant={recommendation.type === 'fitness' ? 'primary' : recommendation.type === 'appearance' ? 'success' : 'warning'}>
                            {recommendation.type.charAt(0).toUpperCase() + recommendation.type.slice(1)}
                          </Badge>
                          <Badge>
                            {recommendation.priority} Priority
                          </Badge>
                        </RecommendationMeta>
                        <p>{recommendation.description}</p>
                      </RecommendationContent>
                    </RecommendationItem>
                  ))}
                </RecommendationsList>
              </RecommendationsSection>
            </motion.div>
        
            <motion.div variants={slideUp}>
              <Grid columns="1fr 300px">
                <Section>
                  <SectionTitle>Your Goals</SectionTitle>
                  <GoalsList>
                    {dashboardData.goals.map((goal) => (
                      <Goal key={goal.id}>
                        <GoalIcon completed={goal.completed}>
                          {goal.completed ? '✓' : goal.id}
                        </GoalIcon>
                        <GoalDetails>
                          <GoalTitle>{goal.title}</GoalTitle>
                          <GoalMeta>{goal.category}</GoalMeta>
                        </GoalDetails>
                        <GoalProgressBar>
                          <ProgressFill progress={goal.progress} />
                        </GoalProgressBar>
                        <ProgressPercent completed={goal.completed}>
                          {goal.completed ? 'Complete' : `${goal.progress}%`}
                        </ProgressPercent>
                      </Goal>
                    ))}
                  </GoalsList>
                  <Button 
                    variant="primary" 
                    style={{ marginTop: '1.5rem' }}
                    onClick={() => logActivity('fitness', 'Completed a workout session')}
                  >
                    Log New Activity
                  </Button>
                </Section>
                
                <Section>
                  <SectionTitle>Recent Activity</SectionTitle>
                  <ActivitiesList>
                    {dashboardData.recentActivities.map((activity) => (
                      <Activity key={activity.id}>
                        <ActivityTime>{activity.time}</ActivityTime>
                        <ActivityContent>{activity.description}</ActivityContent>
                      </Activity>
                    ))}
                  </ActivitiesList>
                </Section>
              </Grid>
            </motion.div>
          </motion.div>
        )}
        
        {activeTab === 'fitness' && (
          <motion.div variants={fadeIn} initial="hidden" animate="visible">
            <SectionTitle>Your Fitness Journey</SectionTitle>
            <p>Detailed information about your fitness progress and goals will appear here.</p>
            <Button variant="primary" as={Link} to="/fitness">Go to Fitness Page</Button>
          </motion.div>
        )}
        
        {activeTab === 'appearance' && (
          <motion.div variants={fadeIn} initial="hidden" animate="visible">
            <SectionTitle>Your Appearance Journey</SectionTitle>
            <p>Detailed information about your appearance progress and style goals will appear here.</p>
            <Button variant="secondary" as={Link} to="/appearance">Go to Appearance Page</Button>
          </motion.div>
        )}
        
        {activeTab === 'personality' && (
          <motion.div variants={fadeIn} initial="hidden" animate="visible">
            <SectionTitle>Your Personality Journey</SectionTitle>
            <p>Detailed information about your personality development goals will appear here.</p>
            <Button variant="tertiary" as={Link} to="/personality">Go to Personality Page</Button>
          </motion.div>
        )}
      </PageContainer>
    </motion.div>
  );
};

export default Dashboard;