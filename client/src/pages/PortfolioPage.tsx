
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, Send, Github, Linkedin, Twitter, Mail, MapPin, Calendar, Award } from "lucide-react";

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isClient: boolean;
}

export default function PortfolioPage() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm Jhaid, a passionate full-stack developer. How can I help you with your project today?",
      timestamp: new Date(),
      isClient: false
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        timestamp: new Date(),
        isClient: true
      };
      setMessages([...messages, message]);
      setNewMessage("");
      
      // Simulate developer response
      setTimeout(() => {
        const response: Message = {
          id: (Date.now() + 1).toString(),
          text: "Thanks for reaching out! I'll get back to you shortly with more details.",
          timestamp: new Date(),
          isClient: false
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const skills = {
    frontend: ["React", "Vue.js", "TypeScript", "Next.js", "Tailwind CSS"],
    backend: ["Node.js", "Python", "Express", "FastAPI", "PostgreSQL"],
    tools: ["Docker", "AWS", "Git", "Figma", "VS Code"]
  };

  const achievements = [
    {
      title: "Full-Stack Certification",
      organization: "Tech Institute",
      year: "2023",
      icon: Award
    },
    {
      title: "React Specialist",
      organization: "Meta",
      year: "2022",
      icon: Award
    }
  ];

  return (
    <main className="min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Avatar className="w-32 h-32 mx-auto mb-6">
            <AvatarImage src="/attached_assets/FB_IMG_1753300044728_1754451640003.jpg" alt="Jhaid Dev" />
            <AvatarFallback className="text-2xl">JD</AvatarFallback>
          </Avatar>
          <h1 className="text-4xl font-bold mb-4">Jhaid Dev</h1>
          <p className="text-xl text-secondary mb-6 max-w-2xl mx-auto">
            Passionate Full-Stack Developer crafting innovative digital solutions. 
            Specialized in React, Node.js, and modern web technologies.
          </p>
          <div className="flex justify-center items-center gap-4 mb-8">
            <Badge variant="outline" className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              Available Worldwide
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              3+ Years Experience
            </Badge>
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <a href="https://github.com/jhaiddev" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href="https://linkedin.com/in/jhaiddev" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href="https://twitter.com/jhaiddev" target="_blank" rel="noopener noreferrer">
                <Twitter className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href="mailto:jhaid@example.com">
                <Mail className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>

        {/* Skills Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Technical Skills</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Frontend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.frontend.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Backend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.backend.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.tools.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Achievements */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Achievements</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {achievements.map((achievement, index) => (
              <Card key={index}>
                <CardContent className="p-6 flex items-center gap-4">
                  <achievement.icon className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">{achievement.title}</h3>
                    <p className="text-sm text-secondary">{achievement.organization} • {achievement.year}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center mb-16">
          <h2 className="text-2xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-secondary mb-6">
            Have a project in mind? Let's discuss how I can help bring your ideas to life.
          </p>
          <Button 
            size="lg"
            onClick={() => setShowChat(true)}
            className="bg-primary text-white hover:bg-blue-700"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Start Conversation
          </Button>
        </section>

        {/* Chat Widget */}
        {showChat && (
          <div className="fixed bottom-4 right-4 w-80 h-96 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/attached_assets/FB_IMG_1753300044728_1754451640003.jpg" alt="Jhaid Dev" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-sm">Jhaid Dev</h3>
                  <p className="text-xs text-green-500">Online</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowChat(false)}
              >
                ×
              </Button>
            </div>
            
            <div className="h-64 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={`flex ${message.isClient ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-xs p-3 rounded-lg text-sm ${
                      message.isClient 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 dark:bg-gray-700'
                    }`}
                  >
                    {message.text}
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1"
                />
                <Button 
                  size="sm"
                  onClick={sendMessage}
                  className="bg-primary text-white hover:bg-blue-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
