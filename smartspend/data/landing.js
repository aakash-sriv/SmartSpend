import {
  BarChart3,
  Receipt,
  PieChart,
  CreditCard,
  Globe,
  Zap,
} from "lucide-react";

// Stats Data
export const statsData = [
  {
    value: "50K+",
    label: "Active Users",
  },
  {
    value: "$2B+",
    label: "Transactions Tracked",
  },
  {
    value: "99.9%",
    label: "Uptime",
  },
  {
    value: "4.9/5",
    label: "User Rating",
  },
];

// Features Data
export const featuresData = [
  {
    icon: <BarChart3 className="h-8 w-8 text-[#93BFC7]" />,
    title: "Advanced Analytics",
    description:
      "Get detailed insights into your spending patterns with AI-powered analytics",
  },
  {
    icon: <Receipt className="h-8 w-8 text-[#ABE7B2]" />,
    title: "Smart Receipt Scanner",
    description:
      "Extract data automatically from receipts using advanced AI technology",
  },
  {
    icon: <PieChart className="h-8 w-8 text-[#93BFC7]" />,
    title: "Budget Planning",
    description: "Create and manage budgets with intelligent recommendations",
  },
  {
    icon: <CreditCard className="h-8 w-8 text-[#ABE7B2]" />,
    title: "Multi-Account Support",
    description: "Manage multiple accounts and credit cards in one place",
  },
  {
    icon: <Globe className="h-8 w-8 text-[#93BFC7]" />,
    title: "Multi-Currency",
    description: "Support for multiple currencies with real-time conversion",
  },
  {
    icon: <Zap className="h-8 w-8 text-[#ABE7B2]" />,
    title: "Automated Insights",
    description: "Get automated financial insights and recommendations",
  },
];

// How It Works Data
export const howItWorksData = [
  {
    icon: <CreditCard className="h-8 w-8 text-[#ABE7B2]" />,
    title: "1. Create Your Account",
    description:
      "Get started in minutes with our simple and secure sign-up process",
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-[#93BFC7]" />,
    title: "2. Track Your Spending",
    description:
      "Automatically categorize and track your transactions in real-time",
  },
  {
    icon: <PieChart className="h-8 w-8 text-[#ABE7B2]" />,
    title: "3. Get Insights",
    description:
      "Receive AI-powered insights and recommendations to optimize your finances",
  },
];

// Testimonials Data
export const testimonialsData = [
  {
    name: "Priya Sharma",
    role: "Freelance Designer",
    image: "https://randomuser.me/api/portraits/women/75.jpg",
    quote:
      "SmartSpend has completely transformed how I track my freelance income. The categorized breakdown helps me see exactly where my money goes every month.",
  },
  {
    name: "Rajesh Patel",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    quote:
      "I used to rely on messy spreadsheets, but this app makes budgeting effortless. The insights feature is a game-changer for planning my savings.",
  },
  {
    name: "Ananya Singh",
    role: "Small Business Owner",
    image: "https://randomuser.me/api/portraits/women/74.jpg",
    quote:
      "Managing business expenses used to be a headache. SmartSpend's intuitive interface and auto-categorization save me hours of work every week.",
  },
];