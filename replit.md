# Personal Portfolio & Blog Platform

## Overview

This is a full-stack personal portfolio and blog platform built with React, Express, and PostgreSQL. The application serves as a comprehensive showcase for a developer's work, featuring a blog system, project portfolio, digital store, and contact functionality. It's designed as a modern, responsive web application with a focus on content management and user engagement.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Routing**: Wouter for lightweight client-side routing without the complexity of React Router
- **UI Components**: Shadcn/ui component library built on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with a custom design system supporting light/dark themes and consistent spacing
- **State Management**: TanStack Query (React Query) for server state management, caching, and synchronization
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js for the REST API server
- **Database ORM**: Drizzle ORM for type-safe database operations and schema management
- **API Design**: RESTful API with consistent error handling and request/response patterns
- **Session Management**: Connect-pg-simple for PostgreSQL-backed session storage
- **Development Setup**: Dual-mode server supporting both API routes and Vite development middleware

### Database Design
- **Primary Database**: PostgreSQL with Neon serverless hosting
- **Schema Management**: Drizzle Kit for migrations and schema synchronization
- **Data Models**: 
  - Users (authentication and profiles)
  - Posts (blog content with categories, tags, and publication status)
  - Projects (portfolio items with technology stacks and links)
  - Comments (user feedback on blog posts)
  - Contacts (form submissions)
  - Store Items (digital products with pricing and categories)

### Authentication & Authorization
- **Session-based Authentication**: PostgreSQL-backed sessions for stateful user management
- **Form Validation**: Comprehensive validation using Zod schemas shared between client and server
- **Security**: CSRF protection through session management and secure cookie handling

### Content Management
- **Rich Text Editing**: Custom Markdown editor with live preview and formatting toolbar
- **Media Handling**: Image upload and management system for featured images and project assets
- **Content Organization**: Category-based filtering and tagging system for both blog posts and projects
- **Publication Control**: Draft/published status for content management workflow

## External Dependencies

### Database & Hosting
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling and automatic scaling
- **Replit**: Development environment with integrated deployment and domain management

### UI & Component Libraries
- **Radix UI**: Comprehensive set of accessible, unstyled UI primitives for complex components
- **Lucide React**: Modern icon library with consistent design and tree-shaking support
- **React Markdown**: Markdown rendering with customizable styling and component mapping
- **Embla Carousel**: Lightweight carousel component for image galleries and content sliders

### Development & Build Tools
- **TypeScript**: Static typing for both frontend and backend code
- **ESBuild**: Fast bundling for server-side code in production builds
- **PostCSS**: CSS processing with Tailwind CSS integration and autoprefixing
- **Drizzle Kit**: Database schema management and migration tooling

### Validation & Forms
- **Zod**: Runtime validation library providing type-safe schemas shared across the application
- **React Hook Form**: Performant form library with minimal re-renders and built-in validation
- **Hookform Resolvers**: Integration layer between React Hook Form and Zod validation schemas

### State Management & API
- **TanStack Query**: Server state management with intelligent caching, background refetching, and error handling
- **Date-fns**: Lightweight date manipulation library for timestamp formatting and date calculations