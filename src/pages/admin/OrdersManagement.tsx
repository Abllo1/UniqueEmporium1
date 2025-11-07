import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import React from "react";

// Placeholder for Order data structure
interface Order {
  id: string;
  customerName: string;
  totalAmount: number;
  status: "Pending" | "Shipped" | "Delivered";
}

const orders: Order[] = [
  { id: "ORD001", customerName: "Alice Johnson", totalAmount: 150.00, status: "Delivered" },
  { id: "ORD002", customerName: "Bob Smith", totalAmount: 45.99, status: "Shipped" },
  { id: "ORD003", customerName: "Charlie Brown", totalAmount: 300.50, status: "Pending" },
];

const OrdersManagement: React.FC = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Order Management</h1>
      
      <Card className="rounded-xl shadow-sm">
        <CardHeader>
          {/* Added responsive wrapper: flex-wrap ensures content stacks if needed */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" /> All Orders
            </CardTitle>
            {/* Future elements (e.g., buttons, search bar) would go here */}
          </div>
        </CardHeader>
        <CardContent>
          {/* Placeholder for the actual data table */}
          <div className="min-h-[300px] flex items-center justify-center border border-dashed rounded-lg p-4 text-muted-foreground">
            Order data table goes here. (Currently showing {orders.length} orders)
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersManagement;