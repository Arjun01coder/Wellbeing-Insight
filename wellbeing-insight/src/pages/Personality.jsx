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

const PersonalityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const PersonalityCard = styled(motion.div)`
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

const Section = styled.section`
  margin: 4rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const AssessmentContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Question = styled.div`
  margin-bottom: 2rem;
`;

const QuestionText = styled.h4`
  margin-bottom: 1rem;
`;

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Option = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
  }
`;

const Button = styled.button`
  margin-top: 2rem;
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

const assessmentQuestions = [
  {
    id: 1,
    text: "How do you typically respond to criticism?",
    options: [
      "I take it personally and get defensive",
      "I listen but often feel hurt",
      "I consider it objectively and use it to improve",
      "I welcome it as an opportunity for growth"
    ]
  },
  {
    id: 2,
    text: "In social situations, you usually:",
    options: [
      "Feel anxious and uncomfortable",
      "Prefer to observe rather than participate",
      "Engage with people I already know",
      "Feel energized and connect easily with new people"
    ]
  },
  {
    id: 3,
    text: "When facing a challenging situation, you typically:",
    options: [
      "Avoid it if possible",
      "Feel stressed but try to handle it",
      "Break it down into manageable steps",
      "See it as an exciting opportunity to grow"
    ]
  }
];

const Personality = () => {
  // Personality idols data
  const personalityIdols = [
    {
      id: 1,
      name: "Jordan Peterson",
      image: "https://images.seattletimes.com/wp-content/uploads/2018/04/3a6ce60a-4764-11e8-bf18-19187d7272cc.jpg",
      description: "Clinical psychologist and professor known for intellectual depth and articulation",
      stats: {
        communicationSkill: "Elite",
        emotionalIntelligence: "Expert",
        charisma: "Advanced",
        resilience: "Elite",
        discipline: "Elite",
        confidence: "Expert"
      }
    },
    {
      id: 2,
      name: "Oprah Winfrey",
      image: "https://www.oprah.com/g/image-resizer?width=670&link=https://static.oprah.com/images/o2/201301-orig-oprah-600x411.jpg",
      description: "Media executive and philanthropist with exceptional empathy and communication skills",
      stats: {
        communicationSkill: "Elite",
        emotionalIntelligence: "Elite",
        charisma: "Elite",
        resilience: "Elite",
        discipline: "Expert",
        confidence: "Elite"
      }
    },
    {
      id: 3,
      name: "Barack Obama",
      image: "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTcxMjIxNTM5NDcyNTkxNjA3/barack-obama-andrew-harrer_bloomberg-via-getty-images.jpg",
      description: "Former president known for composed demeanor and eloquent public speaking",
      stats: {
        communicationSkill: "Elite",
        emotionalIntelligence: "Elite",
        charisma: "Elite",
        resilience: "Elite",
        discipline: "Expert",
        confidence: "Elite"
      }
    },
    {
      id: 4,
      name: "Brené Brown",
      image: "https://images.squarespace-cdn.com/content/v1/57d1d334d1758e2f981631ef/1580326166475-RS6DAM3EKRMUDCPC43CZ/DSC_8600.jpg",
      description: "Research professor and author focused on courage, vulnerability and empathy",
      stats: {
        communicationSkill: "Elite",
        emotionalIntelligence: "Elite",
        charisma: "Advanced",
        resilience: "Expert",
        discipline: "Advanced",
        confidence: "Expert"
      }
    }
  ];

  // State
  const [answers, setAnswers] = useState({});
  const [selectedIdol, setSelectedIdol] = useState(null);
  const [userStats, setUserStats] = useState({
    communicationSkill: "Intermediate",
    emotionalIntelligence: "Intermediate",
    charisma: "Basic",
    resilience: "Intermediate",
    discipline: "Basic",
    confidence: "Basic"
  });
  const [personalityProgress, setPersonalityProgress] = useState(30); // percentage
  const [activeTab, setActiveTab] = useState('plan');

  // Select an idol on component mount
  useEffect(() => {
    setSelectedIdol(personalityIdols[0]);
  }, []);

  const handleOptionSelect = (questionId, optionIndex) => {
    setAnswers({
      ...answers,
      [questionId]: optionIndex
    });
  };

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
    
    // Compare personality traits (enum: Basic, Developing, Intermediate, Advanced, Expert, Elite)
    const traitMap = {
      "Basic": 1,
      "Developing": 2,
      "Intermediate": 3,
      "Advanced": 4,
      "Expert": 5,
      "Elite": 6
    };
    
    // Calculate progress for each trait
    const communicationProgress = (traitMap[userStats.communicationSkill] / traitMap[idol.stats.communicationSkill]) * 100;
    const emotionalIntelligenceProgress = (traitMap[userStats.emotionalIntelligence] / traitMap[idol.stats.emotionalIntelligence]) * 100;
    const charismaProgress = (traitMap[userStats.charisma] / traitMap[idol.stats.charisma]) * 100;
    const resilienceProgress = (traitMap[userStats.resilience] / traitMap[idol.stats.resilience]) * 100;
    const disciplineProgress = (traitMap[userStats.discipline] / traitMap[idol.stats.discipline]) * 100;
    const confidenceProgress = (traitMap[userStats.confidence] / traitMap[idol.stats.confidence]) * 100;
    
    // Calculate average progress
    progress = Math.floor(
      (communicationProgress + emotionalIntelligenceProgress + charismaProgress + 
      resilienceProgress + disciplineProgress + confidenceProgress) / 6
    );
    
    // Update progress state
    setPersonalityProgress(progress);
  };

  return (
    <PageContainer>
      <PageHeader>
        <Title>Personality Development</Title>
        <Description>
          Compare yourself to your personality idols and get a customized plan to develop similar traits and abilities.
        </Description>
      </PageHeader>

      <ComparisonSection>
        <SectionTitle>Your Personality Journey</SectionTitle>
        <ComparisonContainer>
          <IdolSelector>
            <IdolHeading>Choose Your Personality Idol</IdolHeading>
            <IdolCardsContainer>
              {personalityIdols.map((idol) => (
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
                  <h3>Your Progress Toward {selectedIdol.name}'s Personality Traits</h3>
                  <p>Develop your personality to match the qualities you admire in your idol.</p>
                </div>
                <ProgressPercentage>{personalityProgress}%</ProgressPercentage>
              </ProgressText>
              <ProgressBar>
                <ProgressFill progress={personalityProgress} />
              </ProgressBar>

              <TabsContainer>
                <Tab 
                  active={activeTab === 'stats'} 
                  onClick={() => setActiveTab('stats')}
                >
                  Current Traits
                </Tab>
                <Tab 
                  active={activeTab === 'plan'} 
                  onClick={() => setActiveTab('plan')}
                >
                  Development Plan
                </Tab>
                <Tab 
                  active={activeTab === 'gap'} 
                  onClick={() => setActiveTab('gap')}
                >
                  Trait Gap
                </Tab>
              </TabsContainer>

              {activeTab === 'stats' && (
                <CurrentStatsSection>
                  <StatCard>
                    <StatValue>{userStats.communicationSkill}</StatValue>
                    <StatLabel>Communication</StatLabel>
                  </StatCard>
                  <StatCard>
                    <StatValue>{userStats.emotionalIntelligence}</StatValue>
                    <StatLabel>Emotional IQ</StatLabel>
                  </StatCard>
                  <StatCard>
                    <StatValue>{userStats.charisma}</StatValue>
                    <StatLabel>Charisma</StatLabel>
                  </StatCard>
                  <StatCard>
                    <StatValue>{userStats.resilience}</StatValue>
                    <StatLabel>Resilience</StatLabel>
                  </StatCard>
                  <StatCard>
                    <StatValue>{userStats.discipline}</StatValue>
                    <StatLabel>Discipline</StatLabel>
                  </StatCard>
                  <StatCard>
                    <StatValue>{userStats.confidence}</StatValue>
                    <StatLabel>Confidence</StatLabel>
                  </StatCard>
                </CurrentStatsSection>
              )}

              {activeTab === 'plan' && (
                <ActionPlanContainer>
                  <ActionPlanCard>
                    <ActionPlanTitle>Master the art of articulation</ActionPlanTitle>
                    <p>Practice speaking clearly and thoughtfully like {selectedIdol.name} through daily speaking exercises.</p>
                  </ActionPlanCard>
                  <ActionPlanCard>
                    <ActionPlanTitle>Develop emotional intelligence</ActionPlanTitle>
                    <p>Learn to recognize and manage emotions in yourself and others through mindfulness practices.</p>
                  </ActionPlanCard>
                  <ActionPlanCard>
                    <ActionPlanTitle>Build authentic confidence</ActionPlanTitle>
                    <p>Develop the quiet confidence that {selectedIdol.name} exhibits through gradual exposure to challenging situations.</p>
                  </ActionPlanCard>
                  <ActionPlanCard>
                    <ActionPlanTitle>Strengthen your discipline</ActionPlanTitle>
                    <p>Create daily habits and routines that build the consistency and follow-through demonstrated by {selectedIdol.name}.</p>
                  </ActionPlanCard>
                  <Button>Get Your Personal Development Plan</Button>
                </ActionPlanContainer>
              )}

              {activeTab === 'gap' && (
                <div>
                  <h3>Personality Gap Analysis</h3>
                  <p>Here's what separates your personality traits from {selectedIdol.name}'s:</p>
                  
                  <CurrentStatsSection>
                    <StatCard>
                      <StatValue>{userStats.communicationSkill} vs {selectedIdol.stats.communicationSkill}</StatValue>
                      <StatLabel>Communication</StatLabel>
                    </StatCard>
                    <StatCard>
                      <StatValue>{userStats.emotionalIntelligence} vs {selectedIdol.stats.emotionalIntelligence}</StatValue>
                      <StatLabel>Emotional IQ</StatLabel>
                    </StatCard>
                    <StatCard>
                      <StatValue>{userStats.charisma} vs {selectedIdol.stats.charisma}</StatValue>
                      <StatLabel>Charisma</StatLabel>
                    </StatCard>
                    <StatCard>
                      <StatValue>{userStats.resilience} vs {selectedIdol.stats.resilience}</StatValue>
                      <StatLabel>Resilience</StatLabel>
                    </StatCard>
                  </CurrentStatsSection>
                  
                  <Button style={{marginTop: "2rem"}}>Update Your Personality Profile</Button>
                </div>
              )}
            </ProgressSection>
          )}
        </ComparisonContainer>
      </ComparisonSection>

      <PersonalityGrid>
        <PersonalityCard
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <CardIcon>🧠</CardIcon>
          <CardTitle>Self-awareness</CardTitle>
          <CardDescription>
            Understanding your strengths, weaknesses, emotions, and impact on others is the foundation of personal growth.
          </CardDescription>
          <Button>Explore Tools</Button>
        </PersonalityCard>
        
        <PersonalityCard
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <CardIcon>🗣️</CardIcon>
          <CardTitle>Communication Skills</CardTitle>
          <CardDescription>
            Learn to express yourself clearly, listen actively, and connect meaningfully with others.
          </CardDescription>
          <Button>View Exercises</Button>
        </PersonalityCard>
        
        <PersonalityCard
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <CardIcon>🤝</CardIcon>
          <CardTitle>Social Confidence</CardTitle>
          <CardDescription>
            Develop the confidence to navigate social situations with ease and authenticity.
          </CardDescription>
          <Button>Get Started</Button>
        </PersonalityCard>
      </PersonalityGrid>

      <Section>
        <SectionTitle>Personality Assessment</SectionTitle>
        <AssessmentContainer>
          {assessmentQuestions.map(question => (
            <Question key={question.id}>
              <QuestionText>{question.text}</QuestionText>
              <OptionsList>
                {question.options.map((option, index) => (
                  <Option key={index}>
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      checked={answers[question.id] === index}
                      onChange={() => handleOptionSelect(question.id, index)}
                    />
                    {option}
                  </Option>
                ))}
              </OptionsList>
            </Question>
          ))}
          <Button>Submit Assessment</Button>
        </AssessmentContainer>
      </Section>
    </PageContainer>
  );
};

export default Personality;