import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Twitter, Dribbble, Code, Server, Gavel, Briefcase, GraduationCap } from "lucide-react";

export default function AboutPage() {
  const skills = {
    frontend: ["React", "Vue.js", "TypeScript", "Tailwind"],
    backend: ["Node.js", "Python", "PostgreSQL", "MongoDB"],
    tools: ["Docker", "AWS", "Figma", "Git"]
  };

  const experience = [
    {
      title: "Senior Full Stack Developer",
      company: "TechCorp Inc.",
      period: "2021 - Present",
      description: "Leading development of customer-facing applications serving 100k+ users. Architected microservices infrastructure that improved system reliability by 40%.",
      icon: Briefcase,
      color: "text-primary"
    },
    {
      title: "Frontend Developer",
      company: "StartupXYZ",
      period: "2019 - 2021",
      description: "Built responsive web applications using React and TypeScript. Collaborated with design team to implement pixel-perfect interfaces and improve user engagement.",
      icon: Code,
      color: "text-accent"
    },
    {
      title: "Computer Science Degree",
      company: "UC Berkeley",
      period: "2015 - 2019",
      description: "Bachelor of Science in Computer Science with focus on software engineering and human-computer interaction.",
      icon: GraduationCap,
      color: "text-orange-500"
    }
  ];

  return (
    <main className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6">About Me</h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Passionate full-stack developer with 5+ years of experience creating digital solutions 
            that make a difference.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600" 
              alt="Alex Chen Profile" 
              className="rounded-2xl shadow-lg w-full"
              data-testid="img-profile"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Hi, I'm Alex Chen</h2>
            <p className="text-secondary leading-relaxed">
              I'm a full-stack developer based in San Francisco, specializing in creating 
              beautiful, functional web applications. My journey in tech started with a 
              computer science degree, but my passion for user experience and design has 
              shaped my approach to development.
            </p>
            <p className="text-secondary leading-relaxed">
              When I'm not coding, you can find me hiking the Bay Area trails, experimenting 
              with new coffee brewing methods, or contributing to open-source projects that 
              make the web more accessible.
            </p>
            <div className="flex flex-wrap gap-3">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-blue-700 transition-colors duration-300"
                data-testid="link-github"
              >
                <Github className="w-6 h-6" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-blue-700 transition-colors duration-300"
                data-testid="link-linkedin"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-blue-700 transition-colors duration-300"
                data-testid="link-twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a 
                href="https://dribbble.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-blue-700 transition-colors duration-300"
                data-testid="link-dribbble"
              >
                <Dribbble className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-center">Skills & Technologies</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="text-primary w-8 h-8" />
                </div>
                <h3 className="font-semibold mb-3">Frontend Development</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {skills.frontend.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm" data-testid={`skill-frontend-${skill.toLowerCase()}`}>
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Server className="text-accent w-8 h-8" />
                </div>
                <h3 className="font-semibold mb-3">Backend Development</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {skills.backend.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm" data-testid={`skill-backend-${skill.toLowerCase()}`}>
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gavel className="text-orange-600 w-8 h-8" />
                </div>
                <h3 className="font-semibold mb-3">Tools & Platforms</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {skills.tools.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm" data-testid={`skill-tools-${skill.toLowerCase()}`}>
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Experience Timeline */}
        <div>
          <h2 className="text-2xl font-semibold mb-8 text-center">Experience</h2>
          <div className="space-y-8">
            {experience.map((item, index) => (
              <div key={index} className="flex gap-4" data-testid={`experience-${index}`}>
                <div className={`flex-shrink-0 w-12 h-12 bg-current rounded-full flex items-center justify-center ${item.color}`}>
                  <item.icon className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className={`${item.color} font-medium`}>{item.company} • {item.period}</p>
                  <p className="text-secondary mt-2 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
