import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Card components with Accernity styling
export const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #4F46E5, #10B981, #F59E0B);
  }
`;

export const GlassCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.4);
  overflow: hidden;
`;

// Button components
export const Button = styled.button`
  background: ${props => props.variant === 'primary' 
    ? 'linear-gradient(90deg, #4F46E5, #7C3AED)' 
    : props.variant === 'secondary' 
      ? 'linear-gradient(90deg, #10B981, #059669)'
      : props.variant === 'tertiary'
        ? 'linear-gradient(90deg, #F59E0B, #D97706)'
        : 'transparent'};
  color: ${props => props.variant ? 'white' : '#4F46E5'};
  border: ${props => props.variant ? 'none' : '2px solid #4F46E5'};
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.variant ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.variant ? '0 8px 16px rgba(0, 0, 0, 0.2)' : 'none'};
    opacity: 0.9;
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

// Tab components with animation
export const TabGroup = styled.div`
  display: flex;
  margin-bottom: 2rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  border-radius: 16px;
  padding: 0.5rem;
  gap: 0.5rem;
`;

export const Tab = styled.button`
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.9)' : 'transparent'};
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.textLight};
  border: none;
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  position: relative;
  transition: all 0.3s ease;
  z-index: 1;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

export const AnimatedTab = ({ children, active, ...props }) => (
  <Tab active={active} {...props}>
    {active && (
      <motion.div
        layoutId="activeTab"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'white',
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          zIndex: -1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    )}
    {children}
  </Tab>
);

// Input fields
export const InputField = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
  }
`;

// Typography
export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(90deg, #4F46E5, #7C3AED);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
`;

export const Subtitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 60px;
    height: 4px;
    border-radius: 2px;
    background: linear-gradient(90deg, #4F46E5, #7C3AED);
  }
`;

// Progress indicators
export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

export const ProgressFill = styled.div`
  height: 100%;
  width: ${props => `${props.progress}%`};
  background: linear-gradient(90deg, #4F46E5, #7C3AED);
  border-radius: 4px;
  transition: width 0.5s ease;
`;

// Circular progress
export const CircleProgressContainer = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto;
`;

export const CircleBackground = styled.circle`
  fill: none;
  stroke: rgba(0, 0, 0, 0.1);
  stroke-width: 8;
`;

export const CircleFill = styled.circle`
  fill: none;
  stroke: ${props => 
    props.color || 'linear-gradient(90deg, #4F46E5, #7C3AED)'};
  stroke-width: 8;
  stroke-linecap: round;
  stroke-dasharray: ${props => `${props.progress * 2.51327} 251.327`};
  transform: rotate(-90deg);
  transform-origin: center;
  transition: stroke-dasharray 1s ease;
`;

export const CircleText = styled.text`
  font-size: 24px;
  font-weight: bold;
  fill: ${props => props.theme.colors.text || '#1F2937'};
  text-anchor: middle;
  dominant-baseline: middle;
`;

// Container layouts
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  z-index: 1; // Ensure content appears above the 3D background
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 'auto-fit, minmax(300px, 1fr)'});
  gap: ${props => props.gap || '1.5rem'};
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: ${props => props.align || 'stretch'};
  gap: ${props => props.gap || '1rem'};
  flex-wrap: ${props => props.wrap || 'nowrap'};
`;

// Badge component
export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${props => 
    props.variant === 'primary' ? 'rgba(79, 70, 229, 0.2)' :
    props.variant === 'success' ? 'rgba(16, 185, 129, 0.2)' :
    props.variant === 'warning' ? 'rgba(245, 158, 11, 0.2)' :
    props.variant === 'danger' ? 'rgba(239, 68, 68, 0.2)' :
    'rgba(107, 114, 128, 0.2)'};
  color: ${props => 
    props.variant === 'primary' ? '#4F46E5' :
    props.variant === 'success' ? '#10B981' :
    props.variant === 'warning' ? '#F59E0B' :
    props.variant === 'danger' ? '#EF4444' :
    '#6B7280'};
`;

// Avatar component
export const Avatar = styled.div`
  width: ${props => props.size || '40px'};
  height: ${props => props.size || '40px'};
  border-radius: 50%;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  border: 2px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

// Animation variants for Framer Motion
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

export const slideUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const pulseAnimation = {
  scale: [1, 1.02, 1],
  transition: { duration: 2, repeat: Infinity }
};