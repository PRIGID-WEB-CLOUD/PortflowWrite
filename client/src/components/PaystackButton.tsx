
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaystackButtonProps {
  amount: number;
  title: string;
  itemId: string;
  onSuccess?: () => void;
}

declare global {
  interface Window {
    PaystackPop: any;
  }
}

export default function PaystackButton({ amount, title, itemId, onSuccess }: PaystackButtonProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handlePayment = () => {
    setLoading(true);

    // Initialize Paystack payment
    const handler = window.PaystackPop.setup({
      key: 'pk_test_your_paystack_public_key', // Replace with your Paystack public key
      email: 'customer@example.com', // You can get this from user input or auth
      amount: amount, // Amount in kobo (cents)
      currency: 'NGN',
      ref: `store_${itemId}_${Date.now()}`,
      metadata: {
        item_id: itemId,
        item_title: title
      },
      callback: function(response: any) {
        setLoading(false);
        toast({
          title: "Payment Successful!",
          description: `Your purchase of "${title}" has been completed. Check your email for download instructions.`,
        });
        if (onSuccess) {
          onSuccess();
        }
        // Here you would typically send the payment reference to your backend
        console.log('Payment successful:', response);
      },
      onClose: function() {
        setLoading(false);
        toast({
          title: "Payment Cancelled",
          description: "You cancelled the payment process.",
          variant: "destructive",
        });
      }
    });

    handler.openIframe();
  };

  return (
    <Button 
      onClick={handlePayment}
      disabled={loading}
      className="flex-1 bg-primary text-white hover:bg-blue-700"
    >
      {loading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <ShoppingCart className="w-4 h-4 mr-2" />
      )}
      {loading ? 'Processing...' : 'Buy Now'}
    </Button>
  );
}
