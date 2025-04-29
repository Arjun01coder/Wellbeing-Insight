import { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const PageContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const ProfileSection = styled.section`
  background-color: white;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: 2rem;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ProfileHeaderSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ProfileImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primary};
  overflow: hidden;
`;

const ProfileMeta = styled.div`
  flex: 1;
`;

const ProfileName = styled.h2`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const ProfileEmail = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 1rem;
`;

const Profile = () => {
  const { currentUser } = useAuth();
  
  // State for form fields
  const [formData, setFormData] = useState({
    name: currentUser?.name || 'Demo User',
    email: currentUser?.email || 'demo@example.com',
    bio: '',
    fitnessLevel: 'intermediate',
    fitnessGoal: 'strength',
    stylePreferences: '',
    personalityGoals: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would call an API to update the user profile
    console.log('Profile updated:', formData);
    alert('Profile updated successfully!');
  };
  
  return (
    <PageContainer>
      <Title>Your Profile</Title>
      
      <ProfileSection>
        <ProfileHeaderSection>
          <ProfileImage>
            {formData.name.charAt(0)}
          </ProfileImage>
          <ProfileMeta>
            <ProfileName>{formData.name}</ProfileName>
            <ProfileEmail>{formData.email}</ProfileEmail>
            <Button>Change Profile Picture</Button>
          </ProfileMeta>
        </ProfileHeaderSection>
        
        <form onSubmit={handleSubmit}>
          <SectionTitle>Personal Information</SectionTitle>
          
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="bio">Bio</Label>
            <Textarea 
              id="bio" 
              name="bio" 
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us a bit about yourself..."
            />
          </FormGroup>
          
          <SectionTitle>Fitness Preferences</SectionTitle>
          
          <FormGroup>
            <Label htmlFor="fitnessLevel">Fitness Level</Label>
            <Select 
              id="fitnessLevel" 
              name="fitnessLevel"
              value={formData.fitnessLevel}
              onChange={handleChange}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="fitnessGoal">Primary Fitness Goal</Label>
            <Select 
              id="fitnessGoal" 
              name="fitnessGoal"
              value={formData.fitnessGoal}
              onChange={handleChange}
            >
              <option value="strength">Build Strength</option>
              <option value="cardio">Improve Cardio</option>
              <option value="flexibility">Increase Flexibility</option>
              <option value="weight-loss">Weight Loss</option>
              <option value="muscle-gain">Muscle Gain</option>
            </Select>
          </FormGroup>
          
          <SectionTitle>Other Preferences</SectionTitle>
          
          <FormGroup>
            <Label htmlFor="stylePreferences">Style Preferences</Label>
            <Textarea 
              id="stylePreferences" 
              name="stylePreferences"
              value={formData.stylePreferences}
              onChange={handleChange}
              placeholder="Describe your style preferences, clothing types you enjoy..."
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="personalityGoals">Personality Development Goals</Label>
            <Textarea 
              id="personalityGoals" 
              name="personalityGoals"
              value={formData.personalityGoals}
              onChange={handleChange}
              placeholder="What aspects of your personality would you like to develop?"
            />
          </FormGroup>
          
          <ButtonGroup>
            <Button type="submit">Save Changes</Button>
            <Button type="button" style={{ 
              backgroundColor: 'transparent', 
              color: '#6B7280',
              border: '1px solid #E5E7EB'
            }}>
              Cancel
            </Button>
          </ButtonGroup>
        </form>
      </ProfileSection>
    </PageContainer>
  );
};

export default Profile;