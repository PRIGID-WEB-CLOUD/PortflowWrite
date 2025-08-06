import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPostSchema, insertProjectSchema, insertCommentSchema, insertContactSchema, insertStoreItemSchema } from "@shared/schema";
import { z } from "zod";

// Paystack payment integration
async function initializePaystackPayment(amount: number, email: string, metadata: any) {
  const response = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: amount * 100, // Paystack expects amount in kobo
      email,
      metadata,
    }),
  });

  return response.json();
}

async function verifyPaystackPayment(reference: string) {
  const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    headers: {
      'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    },
  });

  return response.json();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Posts routes
  app.get("/api/posts", async (req, res) => {
    try {
      const { category } = req.query;
      let posts;
      
      if (category && typeof category === "string") {
        posts = await storage.getPostsByCategory(category);
      } else {
        posts = await storage.getPosts();
      }
      
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  app.get("/api/posts/featured", async (req, res) => {
    try {
      const posts = await storage.getFeaturedPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured posts" });
    }
  });

  app.get("/api/posts/:id", async (req, res) => {
    try {
      const post = await storage.getPost(req.params.id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch post" });
    }
  });

  app.post("/api/posts", async (req, res) => {
    try {
      const validatedData = insertPostSchema.parse(req.body);
      const post = await storage.createPost(validatedData);
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid post data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create post" });
    }
  });

  app.put("/api/posts/:id", async (req, res) => {
    try {
      const validatedData = insertPostSchema.partial().parse(req.body);
      const post = await storage.updatePost(req.params.id, validatedData);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid post data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update post" });
    }
  });

  app.delete("/api/posts/:id", async (req, res) => {
    try {
      const deleted = await storage.deletePost(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete post" });
    }
  });

  // Projects routes
  app.get("/api/projects", async (req, res) => {
    try {
      const { category } = req.query;
      let projects;
      
      if (category && typeof category === "string") {
        projects = await storage.getProjectsByCategory(category);
      } else {
        projects = await storage.getProjects();
      }
      
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/featured", async (req, res) => {
    try {
      const projects = await storage.getFeaturedProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.getProject(req.params.id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.status(201).json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid project data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create project" });
    }
  });

  // Comments routes
  app.get("/api/posts/:postId/comments", async (req, res) => {
    try {
      const comments = await storage.getComments(req.params.postId);
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch comments" });
    }
  });

  app.post("/api/posts/:postId/comments", async (req, res) => {
    try {
      const validatedData = insertCommentSchema.parse({
        ...req.body,
        postId: req.params.postId
      });
      const comment = await storage.createComment(validatedData);
      res.status(201).json(comment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid comment data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create comment" });
    }
  });

  // Contact routes
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json(contact);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid contact data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  // Store routes
  app.get("/api/store", async (req, res) => {
    try {
      const items = await storage.getStoreItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch store items" });
    }
  });

  app.get("/api/store/featured", async (req, res) => {
    try {
      const items = await storage.getFeaturedStoreItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured store items" });
    }
  });

  app.get("/api/store/:id", async (req, res) => {
    try {
      const item = await storage.getStoreItem(req.params.id);
      if (!item) {
        return res.status(404).json({ message: "Store item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch store item" });
    }
  });

  // Payment verification route
  app.post("/api/payments/verify", async (req, res) => {
    try {
      const { reference, item_id } = req.body;
      
      // In a real implementation, you would verify the payment with Paystack
      // using their API and your secret key
      console.log(`Payment verification for reference: ${reference}, item: ${item_id}`);
      
      // For demo purposes, we'll assume the payment is valid
      // In production, make a request to Paystack's verification endpoint
      
      res.json({ 
        status: 'success', 
        message: 'Payment verified successfully',
        download_url: '/api/downloads/' + item_id
      });
    } catch (error) {
      res.status(500).json({ message: "Payment verification failed" });
    }
  });

  // Download endpoint (protected)
  app.get("/api/downloads/:itemId", async (req, res) => {
    try {
      const item = await storage.getStoreItem(req.params.itemId);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      
      // In a real implementation, you would check if the user has purchased this item
      // For demo purposes, we'll redirect to the download URL
      if (item.downloadUrl) {
        res.redirect(item.downloadUrl);
      } else {
        res.status(404).json({ message: "Download not available" });
      }
    } catch (error) {
      res.status(500).json({ message: "Download failed" });
    }
  });

  // Payment routes
  app.post("/api/payments/initialize", async (req, res) => {
    try {
      const { amount, email, storeItemId } = req.body;
      
      if (!amount || !email || !storeItemId) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const storeItem = await storage.getStoreItem(storeItemId);
      if (!storeItem) {
        return res.status(404).json({ message: "Store item not found" });
      }

      const paymentData = await initializePaystackPayment(amount, email, {
        storeItemId,
        itemTitle: storeItem.title,
      });

      if (paymentData.status) {
        res.json({
          status: true,
          authorization_url: paymentData.data.authorization_url,
          access_code: paymentData.data.access_code,
          reference: paymentData.data.reference,
        });
      } else {
        res.status(400).json({ message: "Payment initialization failed", error: paymentData.message });
      }
    } catch (error) {
      console.error('Payment initialization error:', error);
      res.status(500).json({ message: "Failed to initialize payment" });
    }
  });

  app.post("/api/payments/verify", async (req, res) => {
    try {
      const { reference } = req.body;
      
      if (!reference) {
        return res.status(400).json({ message: "Payment reference is required" });
      }

      const verificationData = await verifyPaystackPayment(reference);

      if (verificationData.status && verificationData.data.status === 'success') {
        // Payment was successful, you can update your database here
        res.json({
          status: true,
          data: {
            reference: verificationData.data.reference,
            amount: verificationData.data.amount / 100, // Convert from kobo back to naira
            status: verificationData.data.status,
            metadata: verificationData.data.metadata,
          }
        });
      } else {
        res.status(400).json({ 
          message: "Payment verification failed", 
          status: false,
          data: verificationData.data 
        });
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      res.status(500).json({ message: "Failed to verify payment" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
