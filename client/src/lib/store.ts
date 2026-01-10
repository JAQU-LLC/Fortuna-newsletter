import { useState, useEffect, createContext, useContext } from 'react';
import { Subscriber } from '@/models/subscriber';
import { Post } from '@/models/post';

const initialSubscribers: Subscriber[] = [
  { _id: '1', email: 'john@example.com', name: 'John Smith', is_active: true, subscribed_at: '2024-01-15T00:00:00.000Z', unsubscribed_at: null },
  { _id: '2', email: 'sarah.j@company.org', name: 'Sarah Johnson', is_active: true, subscribed_at: '2024-02-20T00:00:00.000Z', unsubscribed_at: null },
  { _id: '3', email: 'mike.chen@startup.io', name: 'Mike Chen', is_active: true, subscribed_at: '2024-03-10T00:00:00.000Z', unsubscribed_at: null },
  { _id: '4', email: 'emily@techfirm.com', name: 'Emily Davis', is_active: false, subscribed_at: '2024-03-25T00:00:00.000Z', unsubscribed_at: '2024-04-01T00:00:00.000Z' },
  { _id: '5', email: 'alex.r@enterprise.net', name: 'Alex Rodriguez', is_active: true, subscribed_at: '2024-04-05T00:00:00.000Z', unsubscribed_at: null },
];

const initialPosts: Post[] = [
  {
    id: '1',
    title: 'The Future of AI in 2025',
    content: 'Artificial intelligence continues to evolve at an unprecedented pace. From large language models to autonomous systems, the landscape is shifting rapidly. In this article, we explore the key trends shaping the future of AI and what it means for businesses and individuals alike.\n\nThe integration of AI into everyday applications has become seamless. Whether it\'s generating code, creating content, or analyzing data, AI tools are now essential for productivity. As we move further into 2025, expect to see even more sophisticated applications that blur the line between human and machine capabilities.',
    excerpt: 'Exploring the key trends shaping the future of artificial intelligence and what it means for businesses.',
    createdAt: new Date('2024-04-01'),
    published: true,
  },
  {
    id: '2',
    title: 'Building Scalable Systems with Modern Architecture',
    content: 'Scalability is no longer optional—it\'s a requirement. Modern applications need to handle millions of users while maintaining performance and reliability. This guide walks through the principles of building systems that scale gracefully.\n\nWe cover microservices, event-driven architecture, and the role of cloud-native technologies in achieving true scalability. Whether you\'re a startup preparing for growth or an enterprise modernizing legacy systems, these patterns will help you build for the future.',
    excerpt: 'A comprehensive guide to building systems that scale gracefully with modern architecture patterns.',
    createdAt: new Date('2024-03-15'),
    published: true,
  },
  {
    id: '3',
    title: 'The Rise of Edge Computing',
    content: 'As data continues to grow exponentially, processing everything in centralized cloud data centers is becoming impractical. Edge computing brings computation closer to data sources, reducing latency and bandwidth costs while enabling real-time processing.\n\nThis paradigm shift is particularly important for IoT applications, autonomous vehicles, and real-time analytics. Learn how edge computing is reshaping infrastructure and what it means for your technology strategy.',
    excerpt: 'How edge computing is reshaping infrastructure by bringing computation closer to data sources.',
    createdAt: new Date('2024-02-28'),
    published: true,
  },
];

export function useStore() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>(initialSubscribers);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [isAdmin, setIsAdmin] = useState(false);

  const addSubscriber = (name: string, email: string) => {
    const newSubscriber: Subscriber = {
      _id: Date.now().toString(),
      email,
      name,
      is_active: true,
      subscribed_at: new Date().toISOString(),
      unsubscribed_at: null,
    };
    setSubscribers(prev => [...prev, newSubscriber]);
  };

  const toggleSubscriberStatus = (id: string) => {
    setSubscribers(prev =>
      prev.map(sub => {
        if (sub._id === id) {
          const isActive = !sub.is_active;
          return {
            ...sub,
            is_active: isActive,
            unsubscribed_at: isActive ? null : new Date().toISOString(),
          };
        }
        return sub;
      })
    );
  };

  const addPost = (title: string, content: string) => {
    // Strip markdown formatting for excerpt (simple approach)
    const plainText = content
      .replace(/#{1,6}\s+/g, '') // Remove headers
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.*?)\*/g, '$1') // Remove italic
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links, keep text
      .replace(/`([^`]+)`/g, '$1') // Remove inline code
      .replace(/\n+/g, ' ') // Replace newlines with spaces
      .trim();
    
    const newPost: Post = {
      id: Date.now().toString(),
      title,
      content,
      excerpt: plainText.substring(0, 150) + (plainText.length > 150 ? '...' : ''),
      createdAt: new Date(),
      published: true,
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const login = (username: string, password: string): boolean => {
    if (username === 'admin' && password === 'admin123') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
  };

  return {
    subscribers,
    posts,
    isAdmin,
    addSubscriber,
    toggleSubscriberStatus,
    addPost,
    login,
    logout,
  };
}
