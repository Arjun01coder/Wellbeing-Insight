import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const MenuToggle = styled.button`
  display: none;
  background: none;
  color: ${({ theme }) => theme.colors.text};
  padding: 0.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    background-color: white;
    padding: 1rem;
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover, &.active {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Nav>
      <Logo to="/">Wellbeing Insight</Logo>
      
      <MenuToggle onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? 'Close' : 'Menu'}
      </MenuToggle>
      
      <NavLinks isOpen={isMenuOpen}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/personality">Personality</NavLink>
        <NavLink to="/appearance">Appearance</NavLink>
        <NavLink to="/fitness">Fitness</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </NavLinks>
    </Nav>
  );
};

export default Navbar;