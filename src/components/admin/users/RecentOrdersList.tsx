"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

interface RecentOrdersListProps {
  userId: string;
}

const RecentOrdersList = ({ userId }: RecentOrdersListProps) => {
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      setIsLoadingOrders(true);
      const { data, error } = await supabase
        .from('orders')
        .select('id, status, order_date, order_number') // Include order_number
        .eq('user_id', userId)
        .order('order_date', { ascending: false })
        .limit(3);

      if (error) {
        console.error("Error fetching recent orders:", error);
        setRecentOrders([]);
      } else {
        setRecentOrders(data);
      }
      setIsLoadingOrders(false);
    };
    fetchRecentOrders();
  }, [userId]);

  const getOrderStatusBadgeClass = (status: string) => {
    switch (status) {
      case "pending": return "bg-[#3B82F6] text-white";
      case "processing": return "bg-[#F59E0B] text-white";
      case "completed": return "bg-[#16A34A] text-white";
      case "cancelled": return "bg-[#DC2626] text-white";
      default: return "bg-gray-200 text-gray-800";
    }
  };

  if (isLoadingOrders) {
    return <p className="text-sm text-muted-foreground">Loading recent orders...</p>;
  }

  if (recentOrders.length === 0) {
    return <p className="text-sm text-muted-foreground">No recent orders found.</p>;
  }

  return (
    <ul className="space-y-2 text-sm text-muted-foreground">
      {recentOrders.map((order) => (
        <li key={order.id} className="flex justify-between items-center">
          <span>Order {order.order_number || order.id} ({new Date(order.order_date).toLocaleDateString()})</span>
          <Badge className={getOrderStatusBadgeClass(order.status)}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Badge>
        </li>
      ))}
    </ul>
  );
};

export default RecentOrdersList;