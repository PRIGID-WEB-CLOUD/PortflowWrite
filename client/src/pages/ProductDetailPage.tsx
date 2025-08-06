
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, ExternalLink } from "lucide-react";
import PaystackButton from "@/components/PaystackButton";
import { useLocation } from "wouter";
import type { StoreItem } from "@shared/schema";

export default function ProductDetailPage() {
  const params = useParams();
  const [, navigate] = useLocation();
  const productId = params.id;

  const { data: product, isLoading } = useQuery<StoreItem>({
    queryKey: ["/api/store", productId],
  });

  const formatPrice = (price: number) => {
    return `$${(price / 100).toFixed(2)}`;
  };

  if (isLoading) {
    return (
      <main className="min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <div className="grid md:grid-cols-2 gap-8">
            <Skeleton className="h-96 w-full rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-secondary mb-6">The product you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/store")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Store
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/store")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Store
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <img 
              src={product.image} 
              alt={product.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="mb-2">
                  {product.category}
                </Badge>
                {product.featured && (
                  <Badge variant="secondary" className="bg-accent/10 text-accent">
                    Featured
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
              <p className="text-4xl font-bold text-primary mb-4">
                {formatPrice(product.price)}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-secondary leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <PaystackButton
                amount={product.price}
                title={product.title}
                itemId={product.id}
                onSuccess={() => {
                  console.log(`Successfully purchased: ${product.title}`);
                }}
              />
              {product.downloadUrl && (
                <Button 
                  variant="outline"
                  asChild
                >
                  <a href={product.downloadUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Preview
                  </a>
                </Button>
              )}
            </div>

            <Card className="mt-6">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">What's Included:</h4>
                <ul className="text-sm text-secondary space-y-1">
                  <li>• Complete source code</li>
                  <li>• Documentation</li>
                  <li>• Installation guide</li>
                  <li>• 30-day support</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
