import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertCommentSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import SocialShare from "@/components/SocialShare";
import { ArrowLeft, Calendar, User, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import ReactMarkdown from "react-markdown";
import type { Post, Comment } from "@shared/schema";
import { z } from "zod";

export default function PostPage() {
  const [, params] = useRoute("/blog/:id");
  const postId = params?.id || "";
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: post, isLoading: postLoading } = useQuery<Post>({
    queryKey: ["/api/posts", postId],
    enabled: !!postId,
  });

  const { data: comments, isLoading: commentsLoading } = useQuery<Comment[]>({
    queryKey: ["/api/posts", postId, "comments"],
    enabled: !!postId,
  });

  const commentForm = useForm<z.infer<typeof insertCommentSchema>>({
    resolver: zodResolver(insertCommentSchema.omit({ postId: true })),
    defaultValues: {
      author: "",
      email: "",
      content: "",
    },
  });

  const commentMutation = useMutation({
    mutationFn: async (data: z.infer<typeof insertCommentSchema>) => {
      const response = await apiRequest("POST", `/api/posts/${postId}/comments`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts", postId, "comments"] });
      commentForm.reset();
      toast({
        title: "Comment posted!",
        description: "Your comment has been successfully posted.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to post comment. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmitComment = (data: z.infer<typeof insertCommentSchema>) => {
    commentMutation.mutate({ ...data, postId });
  };

  if (postLoading) {
    return (
      <main className="min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Skeleton className="h-8 w-24 mb-4" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <div className="flex gap-4 mb-6">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-32" />
            </div>
          </div>
          <Skeleton className="h-64 w-full mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <Link href="/blog" data-testid="link-back-to-blog">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link href="/blog" data-testid="link-back-to-blog">
            <Button variant="ghost" className="text-secondary hover:text-primary p-0 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>

        {/* Post Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">{post.category}</Badge>
            <div className="flex items-center text-secondary text-sm gap-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(post.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric',
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center gap-2 text-secondary">
              <User className="w-4 h-4" />
              <span>Alex Chen</span>
            </div>
            <SocialShare title={post.title} description={post.excerpt} />
          </div>

          {post.featuredImage && (
            <img 
              src={post.featuredImage} 
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-xl mb-8"
              data-testid="img-featured"
            />
          )}
        </header>

        {/* Post Content */}
        <article className="prose prose-lg prose-gray dark:prose-invert max-w-none mb-16">
          <div className="markdown-content">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </article>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" data-testid={`tag-${tag}`}>
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <section className="border-t border-gray-200 dark:border-gray-700 pt-12">
          <div className="flex items-center gap-2 mb-8">
            <MessageCircle className="w-5 h-5" />
            <h2 className="text-2xl font-bold">
              Comments ({comments?.length || 0})
            </h2>
          </div>

          {/* Comment Form */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Leave a Comment</h3>
              <Form {...commentForm}>
                <form onSubmit={commentForm.handleSubmit(onSubmitComment)} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={commentForm.control}
                      name="author"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} data-testid="input-comment-author" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={commentForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Your email" {...field} data-testid="input-comment-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={commentForm.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Comment</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Share your thoughts..." 
                            className="min-h-32"
                            {...field} 
                            data-testid="textarea-comment-content"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    disabled={commentMutation.isPending}
                    className="bg-primary text-white hover:bg-blue-700"
                    data-testid="button-submit-comment"
                  >
                    {commentMutation.isPending ? "Posting..." : "Post Comment"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Comments List */}
          {commentsLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : comments && comments.length > 0 ? (
            <div className="space-y-6">
              {comments.map((comment) => (
                <Card key={comment.id} data-testid={`comment-${comment.id}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">{comment.author}</span>
                      <span className="text-sm text-secondary">
                        {new Date(comment.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {comment.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-secondary">No comments yet. Be the first to share your thoughts!</p>
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </main>
  );
}
