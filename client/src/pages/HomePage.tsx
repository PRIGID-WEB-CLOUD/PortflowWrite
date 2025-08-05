import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { ExternalLink, Github, Heart, Share2, ArrowRight } from "lucide-react";
import type { Post, Project } from "@shared/schema";

export default function HomePage() {
  const { data: featuredProjects, isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects/featured"],
  });

  const { data: recentPosts, isLoading: postsLoading } = useQuery<Post[]>({
    queryKey: ["/api/posts/featured"],
  });

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Full Stack Developer & 
              <span className="text-primary"> UI Designer</span>
            </h1>
            <p className="text-xl text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
              I create beautiful, functional web applications that solve real-world problems. 
              Passionate about clean code, user experience, and cutting-edge technologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/projects" data-testid="button-view-work">
                <Button size="lg" className="bg-primary text-white hover:bg-blue-700 transform hover:scale-105 transition-all duration-300">
                  View My Work
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                data-testid="button-download-resume"
              >
                Download Resume
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 bg-white dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
            <p className="text-secondary max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills in web development, 
              design, and problem-solving.
            </p>
          </div>

          {projectsLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <div className="flex gap-2 mb-4">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-18" />
                    </div>
                    <div className="flex gap-3">
                      <Skeleton className="h-8 w-24" />
                      <Skeleton className="h-8 w-16" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects?.map((project) => (
                <Card 
                  key={project.id} 
                  className="group bg-neutral-50 dark:bg-neutral-900 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                  data-testid={`card-project-${project.id}`}
                >
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-secondary mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:text-blue-700 transition-colors duration-300 flex items-center"
                          data-testid={`link-demo-${project.id}`}
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-secondary hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors duration-300 flex items-center"
                          data-testid={`link-code-${project.id}`}
                        >
                          <Github className="w-4 h-4 mr-1" />
                          Code
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/projects" data-testid="button-view-all-projects">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white">
                View All Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Blog Posts Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Recent Blog Posts</h2>
            <p className="text-secondary max-w-2xl mx-auto">
              Thoughts on web development, design trends, and the latest technologies I'm exploring.
            </p>
          </div>

          {postsLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="p-6">
                    <div className="flex gap-2 mb-3">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-6 w-full mb-3" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <div className="flex justify-between">
                      <Skeleton className="h-8 w-24" />
                      <div className="flex gap-2">
                        <Skeleton className="h-6 w-6" />
                        <Skeleton className="h-6 w-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts?.map((post) => (
                <Card 
                  key={post.id} 
                  className="group bg-white dark:bg-neutral-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                  data-testid={`card-post-${post.id}`}
                >
                  {post.featuredImage && (
                    <img 
                      src={post.featuredImage} 
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="text-sm">{post.category}</Badge>
                      <span className="text-sm text-secondary">
                        {new Date(post.createdAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-secondary mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <Link href={`/blog/${post.id}`} data-testid={`link-read-more-${post.id}`}>
                        <Button variant="ghost" className="text-primary hover:text-blue-700 p-0">
                          Read More <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="text-secondary hover:text-red-500 p-1" data-testid={`button-like-${post.id}`}>
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-secondary hover:text-primary p-1" data-testid={`button-share-${post.id}`}>
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/blog" data-testid="button-view-all-posts">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white">
                View All Posts
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
