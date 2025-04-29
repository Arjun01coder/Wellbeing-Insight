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

const TipsContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: 2rem;
  margin: 0 auto;
`;

const TipsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Tip = styled.div`
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
  padding-left: 1.5rem;
`;

const TipTitle = styled.h4`
  margin-bottom: 0.5rem;
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

const Appearance = () => {
  // Appearance idols data
  const appearanceIdols = [
    {
      id: 1,
      name: "David Beckham",
      image: "https://ca.hellomagazine.com/images/0/2020/05/02/000/741/066/900x900.jpg",
      description: "Former footballer known for his impeccable style and grooming",
      stats: {
        styleRating: 95,
        groomingRoutine: "Expert",
        skincare: "Advanced",
        wardrobeVersatility: "Elite",
        fitConsistency: "Premium"
      }
    },
    {
      id: 2,
      name: "Zendaya",
      image: "https://people.com/thmb/NaCpZ9UXeYDQkn9kHKMnDtZZ4ng=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(683x492:685x494)/zendaya-2023-tout-45fe859176ac4949a762a5a8406054f4.jpg",
      description: "Actress and fashion icon known for bold and versatile style",
      stats: {
        styleRating: 98,
        groomingRoutine: "Expert",
        skincare: "Elite",
        wardrobeVersatility: "Elite",
        fitConsistency: "Custom"
      }
    },
    {
      id: 3,
      name: "Timothée Chalamet",
      image: "https://media.gq.com/photos/6579738184fcb096394bc642/master/w_1600%2Cc_limit/04-timothee-chalamet-eternals-premiere.jpg",
      description: "Actor renowned for his distinctive and modern fashion sense",
      stats: {
        styleRating: 92,
        groomingRoutine: "Advanced",
        skincare: "Advanced",
        wardrobeVersatility: "Expert",
        fitConsistency: "Custom"
      }
    },
    {
      id: 4,
      name: "Rihanna",
      image: "https://media1.popsugar-assets.com/files/thumbor/Fd5aXB9F6NIUx-gEvD6S7kkT2m8=/0x0:5760x3840/fit-in/792x528/top/filters:format_auto():upscale()/2023/03/29/745/n/1922398/95286222642499f5050133.13124817_GettyImage.jpg",
      description: "Singer, entrepreneur and style innovator who sets fashion trends",
      stats: {
        styleRating: 96,
        groomingRoutine: "Expert",
        skincare: "Elite",
        wardrobeVersatility: "Innovative",
        fitConsistency: "Premium"
      }
    }
  ];

  // State
  const [selectedIdol, setSelectedIdol] = useState(null);
  const [userStats, setUserStats] = useState({
    styleRating: 65,
    groomingRoutine: "Basic",
    skincare: "Intermediate",
    wardrobeVersatility: "Standard",
    fitConsistency: "Mixed",
    confidenceLevel: "Moderate"
  });
  const [appearanceProgress, setAppearanceProgress] = useState(40); // percentage
  const [activeTab, setActiveTab] = useState('plan');

  // Select an idol on component mount
  useEffect(() => {
    setSelectedIdol(appearanceIdols[0]);
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
    
    // Compare style rating (0-100)
    const idealStyleRating = idol.stats.styleRating;
    const userStyleRating = userStats.styleRating;
    const styleRatingProgress = (userStyleRating / idealStyleRating) * 100;
    
    // Compare grooming routine (enum: Basic, Regular, Intermediate, Advanced, Expert, Elite)
    const groomingMap = {
      "Basic": 1,
      "Regular": 2,
      "Intermediate": 3,
      "Advanced": 4,
      "Expert": 5,
      "Elite": 6
    };
    const idealGroomingRoutine = groomingMap[idol.stats.groomingRoutine];
    const userGroomingRoutine = groomingMap[userStats.groomingRoutine];
    const groomingProgress = (userGroomingRoutine / idealGroomingRoutine) * 100;
    
    // Compare skincare (enum: Basic, Regular, Intermediate, Advanced, Expert, Elite)
    const skincareMap = {
      "Basic": 1,
      "Regular": 2,
      "Intermediate": 3,
      "Advanced": 4,
      "Expert": 5,
      "Elite": 6
    };
    const idealSkincare = skincareMap[idol.stats.skincare];
    const userSkincare = skincareMap[userStats.skincare];
    const skincareProgress = (userSkincare / idealSkincare) * 100;
    
    // Compare wardrobe versatility
    const wardrobeMap = {
      "Limited": 1,
      "Basic": 2,
      "Standard": 3,
      "Varied": 4,
      "Expert": 5,
      "Elite": 6,
      "Innovative": 7,
      "Custom": 7,
      "Premium": 6
    };
    const idealWardrobe = wardrobeMap[idol.stats.wardrobeVersatility];
    const userWardrobe = wardrobeMap[userStats.wardrobeVersatility];
    const wardrobeProgress = (userWardrobe / idealWardrobe) * 100;
    
    // Calculate average progress
    progress = Math.floor((styleRatingProgress + groomingProgress + skincareProgress + wardrobeProgress) / 4);
    
    // Update progress state
    setAppearanceProgress(progress);
  };

  return (
    <PageContainer>
      <PageHeader>
        <Title>Appearance Enhancement</Title>
        <Description>
          Compare yourself to your style idols and get personalized plans to achieve their iconic look.
        </Description>
      </PageHeader>

      <ComparisonSection>
        <SectionTitle>Your Style Journey</SectionTitle>
        <ComparisonContainer>
          <IdolSelector>
            <IdolHeading>Choose Your Style Idol</IdolHeading>
            <IdolCardsContainer>
              {appearanceIdols.map((idol) => (
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
                  <h3>Your Progress Toward {selectedIdol.name}'s Style</h3>
                  <p>Keep refining your appearance to match your idol's distinctive look.</p>
                </div>
                <ProgressPercentage>{appearanceProgress}%</ProgressPercentage>
              </ProgressText>
              <ProgressBar>
                <ProgressFill progress={appearanceProgress} />
              </ProgressBar>

              <TabsContainer>
                <Tab 
                  active={activeTab === 'stats'} 
                  onClick={() => setActiveTab('stats')}
                >
                  Current Style
                </Tab>
                <Tab 
                  active={activeTab === 'plan'} 
                  onClick={() => setActiveTab('plan')}
                >
                  Style Plan
                </Tab>
                <Tab 
                  active={activeTab === 'gap'} 
                  onClick={() => setActiveTab('gap')}
                >
                  Style Gap
                </Tab>
              </TabsContainer>

              {activeTab === 'stats' && (
                <CurrentStatsSection>
                  <StatCard>
                    <StatValue>{userStats.styleRating}/100</StatValue>
                    <StatLabel>Style Rating</StatLabel>
                  </StatCard>
                  <StatCard>
                    <StatValue>{userStats.groomingRoutine}</StatValue>
                    <StatLabel>Grooming</StatLabel>
                  </StatCard>
                  <StatCard>
                    <StatValue>{userStats.skincare}</StatValue>
                    <StatLabel>Skincare</StatLabel>
                  </StatCard>
                  <StatCard>
                    <StatValue>{userStats.wardrobeVersatility}</StatValue>
                    <StatLabel>Wardrobe</StatLabel>
                  </StatCard>
                  <StatCard>
                    <StatValue>{userStats.fitConsistency}</StatValue>
                    <StatLabel>Fit Quality</StatLabel>
                  </StatCard>
                  <StatCard>
                    <StatValue>{userStats.confidenceLevel}</StatValue>
                    <StatLabel>Confidence</StatLabel>
                  </StatCard>
                </CurrentStatsSection>
              )}

              {activeTab === 'plan' && (
                <ActionPlanContainer>
                  <ActionPlanCard>
                    <ActionPlanTitle>Upgrade your grooming routine</ActionPlanTitle>
                    <p>Implement a {selectedIdol.stats.groomingRoutine}-level grooming routine similar to {selectedIdol.name}'s approach.</p>
                  </ActionPlanCard>
                  <ActionPlanCard>
                    <ActionPlanTitle>Revise your wardrobe basics</ActionPlanTitle>
                    <p>Invest in key versatile pieces that align with {selectedIdol.name}'s signature style elements.</p>
                  </ActionPlanCard>
                  <ActionPlanCard>
                    <ActionPlanTitle>Advanced skincare regimen</ActionPlanTitle>
                    <p>Adopt a {selectedIdol.stats.skincare}-level skincare routine with morning and evening components.</p>
                  </ActionPlanCard>
                  <ActionPlanCard>
                    <ActionPlanTitle>Pay attention to fit and proportions</ActionPlanTitle>
                    <p>Learn {selectedIdol.name}'s approach to clothing fit and proper proportions for your body type.</p>
                  </ActionPlanCard>
                  <Button>Get Your Custom Style Plan</Button>
                </ActionPlanContainer>
              )}

              {activeTab === 'gap' && (
                <div>
                  <h3>Style Gap Analysis</h3>
                  <p>Here's what separates your style from {selectedIdol.name}'s:</p>
                  
                  <CurrentStatsSection>
                    <StatCard>
                      <StatValue>{userStats.styleRating} vs {selectedIdol.stats.styleRating}</StatValue>
                      <StatLabel>Style Rating</StatLabel>
                    </StatCard>
                    <StatCard>
                      <StatValue>{userStats.groomingRoutine} vs {selectedIdol.stats.groomingRoutine}</StatValue>
                      <StatLabel>Grooming</StatLabel>
                    </StatCard>
                    <StatCard>
                      <StatValue>{userStats.skincare} vs {selectedIdol.stats.skincare}</StatValue>
                      <StatLabel>Skincare</StatLabel>
                    </StatCard>
                    <StatCard>
                      <StatValue>{userStats.wardrobeVersatility} vs {selectedIdol.stats.wardrobeVersatility}</StatValue>
                      <StatLabel>Wardrobe</StatLabel>
                    </StatCard>
                  </CurrentStatsSection>
                  
                  <Button style={{marginTop: "2rem"}}>Update Your Style Profile</Button>
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
          <CardIcon>👕</CardIcon>
          <CardTitle>Style Guide</CardTitle>
          <CardDescription>
            Find your personal style with tailored fashion recommendations based on your body type, lifestyle, and preferences.
          </CardDescription>
          <Button>Explore Style</Button>
        </Card>
        
        <Card
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <CardIcon>✨</CardIcon>
          <CardTitle>Skincare</CardTitle>
          <CardDescription>
            Get personalized skincare routines and product recommendations for healthier, more radiant skin.
          </CardDescription>
          <Button>Skin Analysis</Button>
        </Card>
        
        <Card
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <CardIcon>💇</CardIcon>
          <CardTitle>Grooming</CardTitle>
          <CardDescription>
            Discover haircare, beard grooming, and personal care tips to enhance your natural features.
          </CardDescription>
          <Button>Grooming Tips</Button>
        </Card>
      </CardsGrid>

      <Section>
        <SectionTitle>Style Tips & Recommendations</SectionTitle>
        <TipsContainer>
          <TipsList>
            <Tip>
              <TipTitle>Build a Capsule Wardrobe</TipTitle>
              <p>
                Focus on versatile, high-quality pieces that can be mixed and matched for multiple occasions.
                This approach reduces decision fatigue and ensures you always have something great to wear.
              </p>
            </Tip>

            <Tip>
              <TipTitle>Understand Color Theory</TipTitle>
              <p>
                Learn which colors complement your skin tone, hair, and eyes. The right colors can brighten
                your complexion and make you look more vibrant and healthy.
              </p>
            </Tip>

            <Tip>
              <TipTitle>Proper Fit is Everything</TipTitle>
              <p>
                Even inexpensive clothing looks premium when it fits well. Consider finding a good tailor
                to adjust key pieces in your wardrobe for a custom fit.
              </p>
            </Tip>

            <Tip>
              <TipTitle>Skincare is Non-Negotiable</TipTitle>
              <p>
                A consistent skincare routine with cleansing, moisturizing, and sun protection will keep your
                skin healthy and prevent premature aging.
              </p>
            </Tip>
          </TipsList>
          
          <Button style={{ marginTop: '2rem' }}>Get Personalized Recommendations</Button>
        </TipsContainer>
      </Section>
    </PageContainer>
  );
};

export default Appearance;