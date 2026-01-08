import { useState, useEffect, createContext, useContext } from 'react';

export interface Subscriber {
  id: string;
  name: string;
  email: string;
  subscribedAt: Date;
  active: boolean;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  createdAt: Date;
  published: boolean;
}

const initialSubscribers: Subscriber[] = [
  { id: '1', name: 'John Smith', email: 'john@example.com', subscribedAt: new Date('2024-01-15'), active: true },
  { id: '2', name: 'Sarah Johnson', email: 'sarah.j@company.org', subscribedAt: new Date('2024-02-20'), active: true },
  { id: '3', name: 'Mike Chen', email: 'mike.chen@startup.io', subscribedAt: new Date('2024-03-10'), active: true },
  { id: '4', name: 'Emily Davis', email: 'emily@techfirm.com', subscribedAt: new Date('2024-03-25'), active: false },
  { id: '5', name: 'Alex Rodriguez', email: 'alex.r@enterprise.net', subscribedAt: new Date('2024-04-05'), active: true },
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
      id: Date.now().toString(),
      name,
      email,
      subscribedAt: new Date(),
      active: true,
    };
    setSubscribers(prev => [...prev, newSubscriber]);
  };

  const toggleSubscriberStatus = (id: string) => {
    setSubscribers(prev =>
      prev.map(sub => (sub.id === id ? { ...sub, active: !sub.active } : sub))
    );
  };

  const addPost = (title: string, content: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      title,
      content,
      excerpt: content.substring(0, 150) + '...',
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
