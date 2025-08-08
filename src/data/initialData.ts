import { Contact, Goal, Event, Achievement, Resource } from '../types';

export const initialContacts: Contact[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Senior Software Engineer',
    company: 'Google',
    location: 'Mountain View, CA',
    email: 'sarah.chen@google.com',
    linkedinUrl: 'https://linkedin.com/in/sarahchen',
    priority: 9,
    lastContact: '2 days ago',
    tags: ['AI/ML', 'Alumni', 'Recruiter Contact'],
    status: 'active',
    avatar: '👩‍💻',
    notes: 'Met at Columbia alumni event. Very helpful with ML career advice. Mentioned Google is hiring for new grad positions.',
    addedDate: '2024-12-15',
    industry: 'Technology',
    expertise: ['Machine Learning', 'Python', 'TensorFlow']
  },
  {
    id: '2',
    name: 'Raj Patel',
    company: 'Microsoft',
    role: 'Principal Engineer',
    location: 'Seattle, WA',
    email: 'raj.patel@microsoft.com',
    priority: 8,
    lastContact: '1 week ago',
    tags: ['Cloud', 'Indian Network', 'Senior'],
    status: 'active',
    avatar: '👨‍💻',
    notes: 'Connected through Indian professional network. Works on Azure cloud services. Offered to refer for internships.',
    addedDate: '2024-12-10',
    industry: 'Technology',
    expertise: ['Cloud Computing', 'Azure', 'Distributed Systems']
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    company: 'Amazon',
    role: 'Product Manager',
    location: 'New York, NY',
    email: 'emily.rodriguez@amazon.com',
    priority: 7,
    lastContact: '3 weeks ago',
    tags: ['Product', 'NYC', 'Startup Background'],
    status: 'needs_followup',
    avatar: '👩‍💼',
    notes: 'Former startup founder, now PM at Amazon. Great insights on product strategy. Need to follow up on coffee chat.',
    addedDate: '2024-11-28',
    industry: 'Technology',
    expertise: ['Product Management', 'Strategy', 'Leadership']
  }
];

export const initialGoals: Goal[] = [
  {
    id: '1',
    text: 'Send LinkedIn message to Sarah Chen (Google recruiter)',
    completed: true,
    icon: 'MessageSquare',
    priority: 'high',
    category: 'outreach',
    dueDate: '2025-01-15'
  },
  {
    id: '2',
    text: 'Schedule coffee chat with Alumni network contact',
    completed: false,
    icon: 'Coffee',
    priority: 'medium',
    category: 'meeting',
    dueDate: '2025-01-16'
  },
  {
    id: '3',
    text: 'Follow up with Microsoft connection from last week',
    completed: false,
    icon: 'Phone',
    priority: 'high',
    category: 'follow-up',
    dueDate: '2025-01-15'
  }
];

export const initialEvents: Event[] = [
  {
    id: '1',
    date: new Date(2025, 0, 16),
    time: '2:00 PM',
    title: 'Coffee Chat with Sarah Chen',
    type: 'meetup',
    location: 'Starbucks, Times Square',
    priority: 'high',
    contactId: '1',
    description: 'Discuss ML career opportunities at Google',
    completed: false
  },
  {
    id: '2',
    date: new Date(2025, 0, 17),
    time: '10:00 AM',
    title: 'LinkedIn call with Raj Patel',
    type: 'call',
    location: 'Virtual',
    priority: 'medium',
    contactId: '2',
    description: 'Follow up on Azure internship opportunities',
    completed: false
  }
];

export const initialAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First Connection',
    description: 'Made your first professional connection',
    earned: true,
    icon: '🎯',
    earnedDate: '2024-12-01',
    category: 'milestone'
  },
  {
    id: '2',
    title: 'Week Warrior',
    description: 'Maintained 7-day networking streak',
    earned: true,
    icon: '🔥',
    earnedDate: '2024-12-15',
    category: 'streak'
  },
  {
    id: '3',
    title: 'Coffee Champion',
    description: 'Scheduled 10 coffee chats',
    earned: false,
    icon: '☕',
    category: 'meetings'
  }
];

export const initialResources: Resource[] = [
  {
    id: '1',
    title: 'The Art of Professional Networking',
    type: 'article',
    readTime: '8 min',
    category: 'Networking Fundamentals',
    content: `# The Art of Professional Networking

## Introduction
Professional networking is one of the most crucial skills for career success, especially in the competitive tech industry. This comprehensive guide will teach you the fundamentals of building meaningful professional relationships.

## Key Principles

### 1. Give Before You Receive
The most successful networkers understand that networking is about building mutually beneficial relationships. Always look for ways to help others before asking for favors.

### 2. Quality Over Quantity
It's better to have 50 meaningful connections than 500 superficial ones. Focus on building deep, authentic relationships.

### 3. Be Genuine
People can sense authenticity. Be yourself and show genuine interest in others' work and achievements.

## Networking Strategies

### Online Networking
- Optimize your LinkedIn profile
- Engage meaningfully with others' posts
- Share valuable content regularly
- Join industry-specific groups

### In-Person Networking
- Attend industry meetups and conferences
- Join professional organizations
- Participate in alumni events
- Volunteer for causes you care about

## Follow-Up Best Practices
- Send a personalized message within 24 hours
- Reference specific topics from your conversation
- Offer value or assistance
- Suggest a concrete next step

## Common Mistakes to Avoid
- Being too transactional
- Only reaching out when you need something
- Failing to follow up
- Not maintaining existing relationships

## Conclusion
Networking is a long-term investment in your career. Start early, be consistent, and always focus on building genuine relationships.`
  },
  {
    id: '2',
    title: 'Coffee Chat Conversation Starters',
    type: 'guide',
    readTime: '5 min',
    category: 'Networking Fundamentals',
    content: `# Coffee Chat Conversation Starters

## Before the Meeting
Research your contact's background, recent projects, and company news. This shows respect and genuine interest.

## Opening Questions
- "How did you get started in [their field/company]?"
- "What's the most exciting project you're working on right now?"
- "How has your role evolved since you started at [company]?"

## Career Journey Questions
- "What advice would you give to someone starting their career in tech?"
- "What skills do you think are most important for success in your role?"
- "How do you stay updated with industry trends?"

## Company Culture Questions
- "What do you enjoy most about working at [company]?"
- "How would you describe the company culture?"
- "What opportunities for growth and learning does the company provide?"

## Industry Insights
- "What trends do you see shaping the industry?"
- "What challenges is your industry facing right now?"
- "Where do you see the field heading in the next few years?"

## Closing Questions
- "Is there anyone else you'd recommend I speak with?"
- "What resources would you suggest for someone in my position?"
- "How can I be helpful to you or your team?"

## Remember
- Listen more than you speak
- Take notes (with permission)
- Be respectful of their time
- Always follow up with a thank you message`
  },
  {
    id: '3',
    title: 'Networking as an International Student in US',
    type: 'guide',
    readTime: '20 min',
    category: 'International Students',
    featured: true,
    content: `# Networking as an International Student in the US

## Understanding the American Professional Culture

### Key Cultural Differences
- Americans value direct communication and confidence
- Small talk is important for building rapport
- Professional relationships often extend beyond work
- Self-promotion is expected and respected

### Building Your Personal Brand
- Develop a clear elevator pitch
- Highlight your unique international perspective
- Emphasize your adaptability and global mindset
- Showcase technical skills and academic achievements

## Leveraging Your International Background

### Your Unique Value Proposition
- Multilingual abilities
- Cross-cultural communication skills
- Global perspective on technology and business
- Diverse problem-solving approaches

### Common Challenges and Solutions
**Challenge**: Feeling intimidated by native speakers
**Solution**: Practice your elevator pitch, prepare conversation topics, and remember that your perspective is valuable

**Challenge**: Understanding workplace culture
**Solution**: Observe, ask questions, and find mentors who can guide you

**Challenge**: Building trust quickly
**Solution**: Be reliable, follow through on commitments, and show genuine interest in others

## Networking Strategies for International Students

### On-Campus Opportunities
- Join student organizations related to your field
- Attend career fairs and networking events
- Connect with professors and teaching assistants
- Participate in research projects and competitions

### Professional Organizations
- IEEE (for engineering students)
- ACM (for computer science students)
- Local tech meetups and user groups
- Industry-specific associations

### Online Networking
- Optimize your LinkedIn profile with US-focused keywords
- Join LinkedIn groups for international professionals
- Follow and engage with industry leaders
- Share content that showcases your expertise

## Overcoming Common Obstacles

### Language and Communication
- Practice speaking clearly and confidently
- Learn industry-specific terminology
- Don't apologize for your accent - it's part of your unique identity
- Ask for clarification when needed

### Cultural Navigation
- Observe how Americans network at events
- Learn the art of small talk
- Understand the importance of follow-up
- Be prepared to talk about your achievements

### Building Credibility
- Highlight your academic achievements
- Showcase relevant projects and internships
- Get involved in the local tech community
- Seek recommendations from professors and supervisors

## Practical Tips for Success

### Before Networking Events
- Research attendees and speakers
- Prepare your elevator pitch
- Set specific goals for the event
- Bring business cards or have a digital contact method ready

### During Events
- Arrive early to meet people in a less crowded environment
- Ask open-ended questions
- Listen actively and show genuine interest
- Exchange contact information with promising connections

### After Events
- Follow up within 24-48 hours
- Reference specific topics from your conversation
- Offer value or assistance
- Suggest a concrete next step (coffee chat, informational interview)

## Long-term Relationship Building

### Maintaining Connections
- Regular check-ins (quarterly or bi-annually)
- Share relevant articles or opportunities
- Congratulate on promotions and achievements
- Offer help when possible

### Giving Back
- Mentor newer international students
- Share your experiences and insights
- Volunteer for organizations that helped you
- Become a bridge between cultures in your workplace

## Success Stories

Many international students have successfully built strong professional networks in the US. The key is to start early, be consistent, and always focus on building genuine relationships rather than just collecting contacts.

Remember: Your international background is an asset, not a liability. Embrace it, leverage it, and use it to stand out in the competitive US job market.`
  }
];