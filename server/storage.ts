import { type User, type InsertUser, type Post, type InsertPost, type Project, type InsertProject, type Comment, type InsertComment, type Contact, type InsertContact, type StoreItem, type InsertStoreItem } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getPosts(): Promise<Post[]>;
  getPost(id: string): Promise<Post | undefined>;
  getPostsByCategory(category: string): Promise<Post[]>;
  getFeaturedPosts(): Promise<Post[]>;
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: string, post: Partial<InsertPost>): Promise<Post | undefined>;
  deletePost(id: string): Promise<boolean>;
  
  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;
  
  getComments(postId: string): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
  deleteComment(id: string): Promise<boolean>;
  
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  
  getStoreItems(): Promise<StoreItem[]>;
  getStoreItem(id: string): Promise<StoreItem | undefined>;
  getFeaturedStoreItems(): Promise<StoreItem[]>;
  createStoreItem(item: InsertStoreItem): Promise<StoreItem>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private posts: Map<string, Post>;
  private projects: Map<string, Project>;
  private comments: Map<string, Comment>;
  private contacts: Map<string, Contact>;
  private storeItems: Map<string, StoreItem>;

  constructor() {
    this.users = new Map();
    this.posts = new Map();
    this.projects = new Map();
    this.comments = new Map();
    this.contacts = new Map();
    this.storeItems = new Map();
    
    this.initializeData();
  }

  private initializeData() {
    // Initialize with sample projects
    const sampleProjects: InsertProject[] = [
      {
        title: "E-commerce Dashboard",
        description: "A comprehensive admin dashboard for managing online stores with real-time analytics and inventory management.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "web",
        technologies: ["React", "Node.js", "MongoDB"],
        liveUrl: "https://demo.example.com",
        githubUrl: "https://github.com/example/dashboard",
        featured: true
      },
      {
        title: "Task Management App",
        description: "A collaborative task management platform with kanban boards, real-time updates, and team analytics.",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "web",
        technologies: ["Vue.js", "Express", "PostgreSQL"],
        liveUrl: "https://tasks.example.com",
        githubUrl: "https://github.com/example/tasks",
        featured: true
      },
      {
        title: "Fitness Mobile App",
        description: "A React Native fitness app with workout tracking, progress analytics, and social sharing features.",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "mobile",
        technologies: ["React Native", "Firebase", "Redux"],
        liveUrl: "https://apps.apple.com/app/fitness",
        githubUrl: "https://github.com/example/fitness",
        featured: true
      }
    ];

    sampleProjects.forEach(project => {
      const id = randomUUID();
      const fullProject: Project = {
        ...project,
        id,
        createdAt: new Date()
      };
      this.projects.set(id, fullProject);
    });

    // Initialize with sample posts
    const samplePosts: InsertPost[] = [
      {
        title: "Building Scalable React Applications in 2024",
        content: "# Building Scalable React Applications in 2024\n\nReact continues to evolve, and with it, the patterns and practices we use to build scalable applications...",
        excerpt: "Exploring the latest patterns and best practices for building maintainable React applications that scale with your team and user base.",
        category: "Development",
        tags: ["React", "JavaScript", "Best Practices"],
        featuredImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        published: true
      },
      {
        title: "The Psychology Behind Effective UI Design",
        content: "# The Psychology Behind Effective UI Design\n\nUnderstanding user psychology is crucial for creating effective interfaces...",
        excerpt: "Understanding user psychology and cognitive principles to create interfaces that feel intuitive and reduce cognitive load.",
        category: "Design",
        tags: ["UI/UX", "Psychology", "Design"],
        featuredImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        published: true
      },
      {
        title: "Remote Team Collaboration Best Practices",
        content: "# Remote Team Collaboration Best Practices\n\nWorking with distributed teams requires different approaches...",
        excerpt: "Lessons learned from leading distributed development teams and tools that make remote collaboration effective.",
        category: "Career",
        tags: ["Remote Work", "Team Management", "Productivity"],
        featuredImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        published: true
      }
    ];

    samplePosts.forEach(post => {
      const id = randomUUID();
      const now = new Date();
      const fullPost: Post = {
        ...post,
        id,
        createdAt: now,
        updatedAt: now
      };
      this.posts.set(id, fullPost);
    });

    // Initialize with sample store items
    const sampleStoreItems: InsertStoreItem[] = [
      {
        title: "React Component Library",
        description: "A comprehensive library of 50+ modern React components with TypeScript support, Storybook documentation, and customizable themes.",
        price: 4900, // $49.00
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Templates",
        downloadUrl: "https://github.com/example/react-components",
        featured: true
      },
      {
        title: "Full Stack SaaS Boilerplate",
        description: "Complete SaaS starter with authentication, payments, admin dashboard, and email templates. Built with Next.js, Prisma, and Stripe.",
        price: 12900, // $129.00
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Boilerplates",
        downloadUrl: "https://github.com/example/saas-boilerplate",
        featured: true
      },
      {
        title: "Minimalist Portfolio Template",
        description: "Clean, modern portfolio template with dark mode, blog functionality, and contact forms. Perfect for developers and designers.",
        price: 2900, // $29.00
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Templates",
        downloadUrl: "https://github.com/example/portfolio-template",
        featured: true
      },
      {
        title: "E-commerce Dashboard UI Kit",
        description: "Professional dashboard design with 40+ screens, charts, tables, and components. Includes Figma files and React implementation.",
        price: 7900, // $79.00
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "UI Kits",
        downloadUrl: "https://www.figma.com/file/example",
        featured: false
      },
      {
        title: "JavaScript Utility Functions",
        description: "Collection of 100+ tested utility functions for common JavaScript tasks. Includes TypeScript definitions and comprehensive docs.",
        price: 1900, // $19.00
        image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Utilities",
        downloadUrl: "https://github.com/example/js-utils",
        featured: false
      },
      {
        title: "Mobile App UI Design System",
        description: "Complete design system for mobile apps with 200+ components, icons, and templates. Available for Sketch and Figma.",
        price: 8900, // $89.00
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Design Systems",
        downloadUrl: "https://www.figma.com/file/mobile-design-system",
        featured: false
      },
      {
        title: "API Documentation Template",
        description: "Beautiful, interactive API documentation template with code examples, authentication guides, and responsive design.",
        price: 3900, // $39.00
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Templates",
        downloadUrl: "https://github.com/example/api-docs",
        featured: false
      },
      {
        title: "Vue.js Admin Dashboard",
        description: "Modern admin dashboard built with Vue 3, Composition API, and Vite. Includes authentication, charts, and CRUD operations.",
        price: 6900, // $69.00
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Dashboards",
        downloadUrl: "https://github.com/example/vue-admin",
        featured: false
      }
    ];

    sampleStoreItems.forEach(item => {
      const id = randomUUID();
      const fullItem: StoreItem = {
        id,
        title: item.title,
        description: item.description,
        price: item.price,
        image: item.image,
        category: item.category,
        downloadUrl: item.downloadUrl || null,
        featured: item.featured || false,
        createdAt: new Date()
      };
      this.storeItems.set(id, fullItem);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getPosts(): Promise<Post[]> {
    return Array.from(this.posts.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getPost(id: string): Promise<Post | undefined> {
    return this.posts.get(id);
  }

  async getPostsByCategory(category: string): Promise<Post[]> {
    return Array.from(this.posts.values())
      .filter(post => post.category.toLowerCase() === category.toLowerCase())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getFeaturedPosts(): Promise<Post[]> {
    return Array.from(this.posts.values())
      .filter(post => post.published)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 3);
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const id = randomUUID();
    const now = new Date();
    const post: Post = { ...insertPost, id, createdAt: now, updatedAt: now };
    this.posts.set(id, post);
    return post;
  }

  async updatePost(id: string, updateData: Partial<InsertPost>): Promise<Post | undefined> {
    const post = this.posts.get(id);
    if (!post) return undefined;

    const updatedPost: Post = { ...post, ...updateData, updatedAt: new Date() };
    this.posts.set(id, updatedPost);
    return updatedPost;
  }

  async deletePost(id: string): Promise<boolean> {
    return this.posts.delete(id);
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.category.toLowerCase() === category.toLowerCase())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.featured)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 3);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = { ...insertProject, id, createdAt: new Date() };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: string, updateData: Partial<InsertProject>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;

    const updatedProject: Project = { ...project, ...updateData };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: string): Promise<boolean> {
    return this.projects.delete(id);
  }

  async getComments(postId: string): Promise<Comment[]> {
    return Array.from(this.comments.values())
      .filter(comment => comment.postId === postId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async createComment(insertComment: InsertComment): Promise<Comment> {
    const id = randomUUID();
    const comment: Comment = { ...insertComment, id, createdAt: new Date() };
    this.comments.set(id, comment);
    return comment;
  }

  async deleteComment(id: string): Promise<boolean> {
    return this.comments.delete(id);
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { ...insertContact, id, createdAt: new Date() };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getStoreItems(): Promise<StoreItem[]> {
    return Array.from(this.storeItems.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getStoreItem(id: string): Promise<StoreItem | undefined> {
    return this.storeItems.get(id);
  }

  async getFeaturedStoreItems(): Promise<StoreItem[]> {
    return Array.from(this.storeItems.values())
      .filter(item => item.featured)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 6);
  }

  async createStoreItem(insertStoreItem: InsertStoreItem): Promise<StoreItem> {
    const id = randomUUID();
    const item: StoreItem = { ...insertStoreItem, id, createdAt: new Date() };
    this.storeItems.set(id, item);
    return item;
  }
}

export const storage = new MemStorage();
