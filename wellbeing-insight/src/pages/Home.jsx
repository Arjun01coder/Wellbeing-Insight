import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 15vh;
  text-align: center;
  min-height: 100vh;
  padding: 2rem;
  position: relative;
  color: white;
  overflow: hidden;
`;

const VideoBackground = styled.div`
  position: absolute;
  top: -15vh; /* Push video upward, making top go out of view */
  left: 0;
  width: 100%;
  height: 110vh; /* Increased height to compensate for the negative top */
  overflow: hidden;
  z-index: -1;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* Dark overlay instead of blue tint */
    z-index: 1;
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin-top: 12vh; /* Push content higher up */
  display: flex;
  flex-direction: column;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: 26vh; /* Add spacing only between title and subtitle */
  color: white;
  text-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.8rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.3rem;
  max-width: 600px;
  margin-bottom: 1.5rem; /* Reduced spacing between subtitle and button */
  text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.4);
  margin: 0 auto 1.5rem; /* Added bottom margin here */
`;

const CTAButton = styled(motion.button)`
  padding: 1.2rem 2.5rem;
  font-size: 1.1rem;
  background-color: white;
  color: #4F46E5;
  border-radius: 50px;
  font-weight: 600;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.3);
  /* Removed margin-top to keep closer to subtitle */
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
    transform: translateY(-2px);
    box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.4);
    transition: all 0.3s ease;
  }
`;


const Home = () => {
  return (
    <main>
      <HeroSection>
        <VideoBackground>
          <video autoPlay muted loop>
            <source src="/home.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </VideoBackground>
        
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Become Your Ideal You
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Transform into the best version of yourself by comparing your current self with your idols across three key areas of life.
          </HeroSubtitle>
          <CTAButton
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            as={Link}
            to="/dashboard"
          >
            Start Your Transformation
          </CTAButton>
        </HeroContent>
      </HeroSection>

      {/* Rest of the components remain unchanged */}
      
    </main>
  );
};

export default Home;