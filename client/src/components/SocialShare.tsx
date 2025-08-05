import { Button } from "@/components/ui/button";
import { Share2, Twitter, Linkedin, Facebook, Copy } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface SocialShareProps {
  title: string;
  url?: string;
  description?: string;
}

export default function SocialShare({ title, url, description }: SocialShareProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  
  const currentUrl = url || window.location.href;
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedDescription = encodeURIComponent(description || "");

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast({
        title: "Link copied!",
        description: "The link has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually.",
        variant: "destructive",
      });
    }
  };

  const openShareWindow = (url: string) => {
    window.open(url, "_blank", "width=600,height=400,scrollbars=yes,resizable=yes");
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
        data-testid="button-share"
      >
        <Share2 className="w-4 h-4" />
        Share
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 z-20 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 min-w-48">
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={() => {
                  openShareWindow(shareLinks.twitter);
                  setIsOpen(false);
                }}
                data-testid="button-share-twitter"
              >
                <Twitter className="w-4 h-4 mr-2 text-blue-500" />
                Twitter
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={() => {
                  openShareWindow(shareLinks.linkedin);
                  setIsOpen(false);
                }}
                data-testid="button-share-linkedin"
              >
                <Linkedin className="w-4 h-4 mr-2 text-blue-700" />
                LinkedIn
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={() => {
                  openShareWindow(shareLinks.facebook);
                  setIsOpen(false);
                }}
                data-testid="button-share-facebook"
              >
                <Facebook className="w-4 h-4 mr-2 text-blue-600" />
                Facebook
              </Button>
              
              <hr className="border-gray-200 dark:border-gray-700" />
              
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={() => {
                  copyToClipboard();
                  setIsOpen(false);
                }}
                data-testid="button-copy-link"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Link
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
