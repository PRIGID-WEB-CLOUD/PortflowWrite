import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ExternalLink, Download, ShoppingCart, Check } from "lucide-react";
import type { StoreItem } from "@shared/schema";

export default function StorePage() {
  const [selectedItem, setSelectedItem] = useState<StoreItem | null>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const { toast } = useToast();

  const { data: storeItems, isLoading } = useQuery<StoreItem[]>({
    queryKey: ["/api/store"],
  });

  const { data: featuredItems, isLoading: featuredLoading } = useQuery<StoreItem[]>({
    queryKey: ["/api/store/featured"],
  });

  const formatPrice = (price: number) => {
    return `$${(price / 100).toFixed(2)}`;
  };

  const handleBuyClick = (item: StoreItem) => {
    setSelectedItem(item);
  };

  const handlePurchase = async () => {
    if (!selectedItem) return;
    
    setIsPurchasing(true);
    
    // Simulate purchase process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Purchase Successful!",
        description: `You've successfully purchased ${selectedItem.title}. Check your email for download instructions.`,
      });

      // Close dialog and reset state
      setSelectedItem(null);
      
      // If there's a download URL, open it
      if (selectedItem.downloadUrl) {
        window.open(selectedItem.downloadUrl, '_blank');
      }
    } catch (error) {
      toast({
        title: "Purchase Failed",
        description: "There was an error processing your purchase. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <main className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6">Digital Store</h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Premium digital products, templates, and resources to help you build amazing projects.
          </p>
        </div>

        {/* Featured Products Section */}
        {featuredItems && featuredItems.length > 0 && (
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
              <p className="text-secondary">
                Hand-picked products that developers love
              </p>
            </div>

            {featuredLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <CardContent className="p-6">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full mb-4" />
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-8 w-24" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredItems.map((item) => (
                  <Card 
                    key={item.id}
                    className="group bg-white dark:bg-neutral-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                    data-testid={`featured-item-${item.id}`}
                  >
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="bg-accent/10 text-accent">
                          Featured
                        </Badge>
                        <span className="text-lg font-bold text-primary">
                          {formatPrice(item.price)}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-secondary mb-4">{item.description}</p>
                      <div className="flex gap-2">
                        <Button 
                          className="flex-1 bg-primary text-white hover:bg-blue-700"
                          onClick={() => handleBuyClick(item)}
                          data-testid={`button-buy-${item.id}`}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Buy Now
                        </Button>
                        {item.downloadUrl && (
                          <Button 
                            variant="outline" 
                            size="icon"
                            asChild
                            data-testid={`button-preview-${item.id}`}
                          >
                            <a href={item.downloadUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
        )}

        {/* All Products Section */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">All Products</h2>
            <p className="text-secondary">
              Browse our complete collection of digital products
            </p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-40 w-full" />
                  <CardContent className="p-4">
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-3" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-5 w-12" />
                      <Skeleton className="h-8 w-20" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : storeItems && storeItems.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {storeItems.map((item) => (
                <Card 
                  key={item.id}
                  className="group bg-white dark:bg-neutral-800 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  data-testid={`store-item-${item.id}`}
                >
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                      <span className="font-bold text-primary">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-secondary text-sm mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-primary text-white hover:bg-blue-700"
                        onClick={() => handleBuyClick(item)}
                        data-testid={`button-purchase-${item.id}`}
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Buy
                      </Button>
                      {item.downloadUrl && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          asChild
                          data-testid={`button-demo-${item.id}`}
                        >
                          <a href={item.downloadUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <ShoppingCart className="w-16 h-16 mx-auto text-secondary mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Products Available</h3>
                <p className="text-secondary">
                  We're working on adding amazing digital products to our store. 
                  Check back soon for updates!
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Categories Section */}
        {storeItems && storeItems.length > 0 && (
          <section className="mt-16 pt-16 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Product Categories</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {[...new Set(storeItems.map(item => item.category))].map((category) => (
                <Badge 
                  key={category} 
                  variant="outline" 
                  className="text-lg py-2 px-4 hover:bg-primary hover:text-white transition-colors duration-300 cursor-pointer"
                  data-testid={`category-${category.toLowerCase().replace(' ', '-')}`}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Purchase Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Complete Purchase</DialogTitle>
            <DialogDescription>
              You're about to purchase {selectedItem?.title}
            </DialogDescription>
          </DialogHeader>
          
          {selectedItem && (
            <div className="py-4">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{selectedItem.title}</h3>
                  <p className="text-sm text-secondary">{selectedItem.category}</p>
                  <p className="text-lg font-bold text-primary mt-1">
                    {formatPrice(selectedItem.price)}
                  </p>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-secondary mb-2">
                  <strong>What you'll get:</strong>
                </p>
                <ul className="text-sm space-y-1">
                  <li className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-green-500" />
                    Instant download access
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-green-500" />
                    Lifetime updates
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-green-500" />
                    Email support
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-green-500" />
                    Commercial license
                  </li>
                </ul>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setSelectedItem(null)}
              disabled={isPurchasing}
            >
              Cancel
            </Button>
            <Button 
              onClick={handlePurchase}
              disabled={isPurchasing}
              className="bg-primary text-white hover:bg-blue-700"
            >
              {isPurchasing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Complete Purchase
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
