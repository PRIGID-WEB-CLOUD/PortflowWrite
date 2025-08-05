import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, Github, Smartphone } from "lucide-react";
import type { Project } from "@shared/schema";

export default function ProjectsPage() {
  const [filter, setFilter] = useState("all");
  
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const filteredProjects = projects?.filter(project => {
    if (filter === "all") return true;
    return project.category === filter;
  }) || [];

  const filters = [
    { key: "all", label: "All Projects" },
    { key: "web", label: "Web Apps" },
    { key: "mobile", label: "Mobile" },
    { key: "opensource", label: "Open Source" }
  ];

  return (
    <main className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6">My Projects</h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            A collection of web applications, mobile apps, and open-source contributions 
            I've worked on over the years.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filterOption) => (
            <Button
              key={filterOption.key}
              variant={filter === filterOption.key ? "default" : "outline"}
              onClick={() => setFilter(filterOption.key)}
              className={
                filter === filterOption.key
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-primary hover:text-white"
              }
              data-testid={`filter-${filterOption.key}`}
            >
              {filterOption.label}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
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
            {filteredProjects.map((project) => (
              <Card 
                key={project.id}
                className="group bg-white dark:bg-neutral-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                data-testid={`project-card-${project.id}`}
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
                        data-testid={`link-live-${project.id}`}
                      >
                        {project.category === 'mobile' ? (
                          <Smartphone className="w-4 h-4 mr-1" />
                        ) : (
                          <ExternalLink className="w-4 h-4 mr-1" />
                        )}
                        {project.category === 'mobile' ? 'App Store' : 'Live Demo'}
                      </a>
                    )}
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-secondary hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors duration-300 flex items-center"
                        data-testid={`link-github-${project.id}`}
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

        {filteredProjects.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-secondary text-lg">No projects found for the selected filter.</p>
          </div>
        )}
      </div>
    </main>
  );
}
