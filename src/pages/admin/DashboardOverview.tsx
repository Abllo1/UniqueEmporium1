"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, Easing } from "framer-motion";
import AdminStatCard from "@/components/admin/AdminStatCard.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, DollarSign, CheckCircle2, Users, Clock, Package, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as Easing } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingPayments: 0,
    completedOrders: 0,
    activeUsers: 0,
    totalRevenue: 0,
    newProductsLastMonth: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardStats = useCallback(async () => {
    setIsLoading(true);
    try {
      // Total Orders
      const { count: totalOrdersCount, error: ordersError } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true });
      if (ordersError) throw ordersError;

      // Pending Payments
      const { count: pendingPaymentsCount, error: paymentsError } = await supabase
        .from('payment_receipts')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');
      if (paymentsError) throw paymentsError;

      // Completed Orders
      const { count: completedOrdersCount, error: completedOrdersError } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'completed');
      if (completedOrdersError) throw completedOrdersError;

      // Active Users
      const { count: activeUsersCount, error: usersError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active');
      if (usersError) throw usersError;

      // Total Revenue (from completed orders)
      const { data: completedOrdersData, error: revenueError } = await supabase
        .from('orders')
        .select('total_amount')
        .eq('status', 'completed');
      if (revenueError) throw revenueError;
      const totalRevenueAmount = completedOrdersData.reduce((sum, order) => sum + order.total_amount, 0);

      // New Products Last Month
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      const { count: newProductsCount, error: productsError } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', oneMonthAgo.toISOString());
      if (productsError) throw productsError;

      setStats({
        totalOrders: totalOrdersCount || 0,
        pendingPayments: pendingPaymentsCount || 0,
        completedOrders: completedOrdersCount || 0,
        activeUsers: activeUsersCount || 0,
        totalRevenue: totalRevenueAmount || 0,
        newProductsLastMonth: newProductsCount || 0,
      });

    } catch (error: any) {
      console.error("Error fetching dashboard stats:", error);
      toast.error("Failed to load dashboard statistics.", { description: error.message });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-3 text-muted-foreground">Loading dashboard statistics...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-8"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <div className="space-y-2">
        <motion.h1 className="text-2xl md:text-3xl font-bold text-foreground" variants={fadeInUp}>
          Admin Dashboard
        </motion.h1>
        <motion.p className="text-base md:text-lg text-muted-foreground" variants={fadeInUp}>
          Welcome to your Unique Emporium Admin Panel.
        </motion.p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AdminStatCard
          title="Total Orders"
          value={stats.totalOrders}
          description="All time orders"
          icon={ShoppingBag}
          delay={0.1}
        />
        <AdminStatCard
          title="Pending Payments"
          value={stats.pendingPayments}
          description="Awaiting verification"
          icon={Clock}
          iconColorClass="text-yellow-500"
          delay={0.2}
        />
        <AdminStatCard
          title="Completed Orders"
          value={stats.completedOrders}
          description="Successfully delivered"
          icon={CheckCircle2}
          iconColorClass="text-green-500"
          delay={0.3}
        />
        <AdminStatCard
          title="Active Users"
          value={stats.activeUsers}
          description="Currently registered"
          icon={Users}
          delay={0.4}
        />
        <AdminStatCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          description="All time sales"
          icon={DollarSign}
          iconColorClass="text-green-600"
          delay={0.5}
        />
        <AdminStatCard
          title="New Products"
          value={stats.newProductsLastMonth}
          description="Last 30 days"
          icon={Package}
          delay={0.6}
        />
      </div>

      {/* Placeholder for recent activities or quick actions */}
      <motion.div variants={fadeInUp} transition={{ delay: 0.7 }}>
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No recent activities to display.</p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default DashboardOverview;