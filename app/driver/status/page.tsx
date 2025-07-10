"use client";
import {
  Package,
  Clock,
  AlertTriangle,
  Camera,
  DollarSign,
} from "lucide-react";

// Driver navigation items
const driverNavItems = [
  {
    title: "Assignments",
    href: "/driver/assignments",
    icon: <Package className="h-4 w-4 mr-2" />,
  },
  {
    title: "Status Updates",
    href: "/driver/status",
    icon: <Clock className="h-4 w-4 mr-2" />,
  },
  {
    title: "Proof of Delivery",
    href: "/driver/pod",
    icon: <Camera className="h-4 w-4 mr-2" />,
  },
  {
    title: "Report Issue",
    href: "/driver/issues",
    icon: <AlertTriangle className="h-4 w-4 mr-2" />,
  },
];

// Mock status updates data
const statusUpdates = {
  today: [
    {
      id: "SU-001",
      orderId: "ORD-1234",
      customer: "John Doe",
      address: "123 Main St, New York, NY 10001",
      status: "Delivered",
      time: "10:30 AM",
      notes: "Left package at front door as requested.",
    },
    {
      id: "SU-002",
      orderId: "ORD-1235",
      customer: "Jane Smith",
      address: "456 Park Ave, New York, NY 10022",
      status: "Failed Delivery",
      time: "11:45 AM",
      notes: "Customer not available. Will attempt redelivery tomorrow.",
    },
    {
      id: "SU-003",
      orderId: "ORD-1236",
      customer: "Robert Johnson",
      address: "789 Broadway, New York, NY 10003",
      status: "In Transit",
      time: "Current",
      notes: "On the way to customer.",
    },
  ],
  pending: [
    {
      id: "SU-004",
      orderId: "ORD-1237",
      customer: "Emily Davis",
      address: "321 5th Ave, New York, NY 10016",
      status: "Scheduled",
      time: "1:30 PM - 3:30 PM",
      notes: "",
    },
  ],
};
