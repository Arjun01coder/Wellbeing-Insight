import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    position: relative;
  }

  #root {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 100%;
    margin: 0;
    padding: 0;
    position: relative;
    z-index: 1; /* Ensure content appears above the 3D background */
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.primary};
    position: relative; /* Ensure headings have their own stacking context */
  }

  p {
    margin-bottom: 1rem;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary};
    transition: color 0.2s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-weight: 600;
    transition: all 0.2s ease;

    &:hover {
      background-color: ${({ theme }) => theme.colors.secondary};
    }
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    width: 100%;
    position: relative; /* Ensure containers stack properly */
  }

  section {
    padding: 4rem 0;
    position: relative; /* Ensure sections stack properly */
    z-index: 1;
  }

  /* Fix title positioning for better layering */
  .page-title {
    margin-top: 2rem;
    margin-bottom: 2rem;
    position: relative;
    z-index: 2;
  }

  /* Improve content visibility over animated background */
  .content-container {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(8px);
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
    position: relative;
    z-index: 1;
  }
`;

export default GlobalStyles;