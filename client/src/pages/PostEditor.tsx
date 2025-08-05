import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPostSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MarkdownEditor from "@/components/MarkdownEditor";
import { Link, useLocation } from "wouter";
import { ArrowLeft, ImageIcon } from "lucide-react";
import { z } from "zod";

export default function PostEditor() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");

  const form = useForm<z.infer<typeof insertPostSchema>>({
    resolver: zodResolver(insertPostSchema),
    defaultValues: {
      title: "",
      content: "",
      excerpt: "",
      category: "",
      tags: [],
      featuredImage: "",
      published: false,
    },
  });

  const publishMutation = useMutation({
    mutationFn: async (data: z.infer<typeof insertPostSchema>) => {
      const response = await apiRequest("POST", "/api/posts", { ...data, published: true });
      return response.json();
    },
    onSuccess: (post) => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      toast({
        title: "Post published!",
        description: "Your post has been successfully published.",
      });
      setLocation(`/blog/${post.id}`);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to publish post. Please try again.",
        variant: "destructive",
      });
    },
  });

  const draftMutation = useMutation({
    mutationFn: async (data: z.infer<typeof insertPostSchema>) => {
      const response = await apiRequest("POST", "/api/posts", { ...data, published: false });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      toast({
        title: "Draft saved!",
        description: "Your post has been saved as a draft.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save draft. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onPublish = (data: z.infer<typeof insertPostSchema>) => {
    publishMutation.mutate({ ...data, content });
  };

  const onSaveDraft = () => {
    const data = form.getValues();
    draftMutation.mutate({ ...data, content });
  };

  const categories = ["Development", "Design", "Career", "Tutorials"];

  return (
    <main className="min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link href="/blog" data-testid="link-back-to-blog">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Write New Post</h1>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onSaveDraft}
              disabled={draftMutation.isPending}
              data-testid="button-save-draft"
            >
              {draftMutation.isPending ? "Saving..." : "Save Draft"}
            </Button>
            <Button
              onClick={form.handleSubmit(onPublish)}
              disabled={publishMutation.isPending}
              className="bg-primary text-white hover:bg-blue-700"
              data-testid="button-publish"
            >
              {publishMutation.isPending ? "Publishing..." : "Publish Post"}
            </Button>
          </div>
        </div>

        <Form {...form}>
          <form className="space-y-6">
            {/* Post Metadata */}
            <Card>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Post Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter post title..." {...field} data-testid="input-title" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-category">
                              <SelectValue placeholder="Select category..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="react, javascript, tutorial (comma separated)"
                            value={field.value?.join(", ") || ""}
                            onChange={(e) => {
                              const tags = e.target.value.split(",").map(tag => tag.trim()).filter(Boolean);
                              field.onChange(tags);
                            }}
                            data-testid="input-tags"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="featuredImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Featured Image URL</FormLabel>
                        <FormControl>
                          <div className="flex gap-2">
                            <Input 
                              placeholder="https://example.com/image.jpg"
                              {...field}
                              data-testid="input-featured-image"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              data-testid="button-browse-image"
                            >
                              <ImageIcon className="w-4 h-4" />
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Excerpt</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Brief description of your post..."
                          {...field}
                          data-testid="input-excerpt"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Markdown Editor */}
            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <MarkdownEditor 
                value={content}
                onChange={setContent}
                placeholder="Write your post content in Markdown..."
              />
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
