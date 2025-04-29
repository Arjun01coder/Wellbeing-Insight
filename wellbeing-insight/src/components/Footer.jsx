import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 3rem 2rem;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h4`
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const FooterLink = styled(Link)`
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.textLight};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textLight};
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Wellbeing Insight</FooterTitle>
          <p>Your journey to a better you starts here. Holistic wellness for mind, body, and spirit.</p>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Features</FooterTitle>
          <FooterLink to="/personality">Personality Development</FooterLink>
          <FooterLink to="/appearance">Appearance</FooterLink>
          <FooterLink to="/fitness">Physical Fitness</FooterLink>
          <FooterLink to="/dashboard">Progress Dashboard</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Resources</FooterTitle>
          <FooterLink to="/blog">Blog</FooterLink>
          <FooterLink to="/guides">Guides</FooterLink>
          <FooterLink to="/faq">FAQ</FooterLink>
          <FooterLink to="/support">Support</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Connect</FooterTitle>
          <FooterLink to="#">Instagram</FooterLink>
          <FooterLink to="#">Twitter</FooterLink>
          <FooterLink to="#">Facebook</FooterLink>
          <FooterLink to="#">YouTube</FooterLink>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        &copy; {new Date().getFullYear()} Wellbeing Insight. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;