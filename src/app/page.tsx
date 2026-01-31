"use client";

import { useState, useEffect, useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Coffee,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Clock,
  Plus,
  Trash2,
  ChevronRight,
  Lock,
  Upload,
} from "lucide-react";
import Image from "next/image";
import FIKA from "@/../public/FIKA.png";
import FIKAwhite from "@/../public/FIKA-White.png";
type PageType =
  | "home"
  | "menu"
  | "events"
  | "contact"
  | "admin"
  | "login"
  | "gallery";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  image: string;
};

type Event = {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  day: string;
  time: string;
  location: string;
};

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  gender: string;
  ageRange: string;
  message: string;
  timestamp: string;
};

type GalleryImage = {
  id: string;
  image: string;
};

type MenuCategory = {
  id: string;
  name: string;
  subcategories: string[];
};

// Sample data - no prices
const initialMenuItems: MenuItem[] = [
  // Hot Drinks - Classic
  {
    id: "1",
    name: "Espresso",
    description: "Rich, bold, and perfectly extracted single shot",
    category: "hot-drinks",
    subcategory: "classic",
    image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400",
  },
  {
    id: "2",
    name: "Americano",
    description: "Espresso with hot water for a smooth, rich flavor",
    category: "hot-drinks",
    subcategory: "classic",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400",
  },
  {
    id: "3",
    name: "Cappuccino",
    description: "Equal parts espresso, steamed milk, and foam",
    category: "hot-drinks",
    subcategory: "classic",
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400",
  },
  // Hot Drinks - Lattes
  {
    id: "4",
    name: "Caffè Latte",
    description: "Smooth espresso with steamed milk and light foam",
    category: "hot-drinks",
    subcategory: "lattes",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400",
  },
  {
    id: "5",
    name: "Caramel Latte",
    description: "Sweet caramel syrup blended with latte perfection",
    category: "hot-drinks",
    subcategory: "lattes",
    image: "https://images.unsplash.com/photo-1594489218816-409227d8edd6?w=400",
  },
  // Hot Drinks - Tea
  {
    id: "6",
    name: "Earl Grey",
    description: "Classic black tea with bergamot flavor",
    category: "hot-drinks",
    subcategory: "tea",
    image: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=400",
  },
  // Cold Drinks - Over Ice Coffee
  {
    id: "7",
    name: "Iced Latte",
    description: "Chilled espresso over ice with milk",
    category: "cold-drinks",
    subcategory: "over-ice",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400",
  },
  {
    id: "8",
    name: "Cold Brew",
    description: "Slow-steeped for 12 hours, smooth and bold",
    category: "cold-drinks",
    subcategory: "over-ice",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b5c7fa53?w=400",
  },
  // Cold Drinks - Smoothies
  {
    id: "9",
    name: "Berry Blast",
    description: "Mixed berries blended with yogurt",
    category: "cold-drinks",
    subcategory: "smoothies",
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400",
  },
  // Cold Drinks - Mojitos
  {
    id: "10",
    name: "Mint Mojito",
    description: "Refreshing mint with lime and soda",
    category: "cold-drinks",
    subcategory: "mojitos",
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400",
  },
  // Cold Drinks - Iced Tea
  {
    id: "11",
    name: "Peach Iced Tea",
    description: "Fresh peaches with iced tea",
    category: "cold-drinks",
    subcategory: "iced-tea",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400",
  },
  // Snacks & Desserts - Sandwiches
  {
    id: "12",
    name: "Club Sandwich",
    description: "Triple-layer with chicken, bacon, and fresh veggies",
    category: "snacks-desserts",
    subcategory: "sandwiches",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400",
  },
  // Snacks & Desserts - Salads
  {
    id: "13",
    name: "Caesar Salad",
    description: "Classic with parmesan and croutons",
    category: "snacks-desserts",
    subcategory: "salads",
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400",
  },
  // Snacks & Desserts - Desserts
  {
    id: "14",
    name: "Chocolate Cake",
    description: "Rich chocolate layers with ganache",
    category: "snacks-desserts",
    subcategory: "desserts",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
  },
  {
    id: "15",
    name: "Cheesecake",
    description: "New York style with berry topping",
    category: "snacks-desserts",
    subcategory: "desserts",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400",
  },
];

const initialEvents: Event[] = [
  {
    id: "1",
    name: "Coffee Tasting Workshop",
    shortDescription: "Learn the art of coffee tasting",
    fullDescription:
      "Join our expert baristas for an immersive coffee tasting experience. Discover different origins, roast profiles, and brewing methods. Perfect for coffee enthusiasts looking to deepen their knowledge.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
    day: "Saturday",
    time: "3:00 PM - 5:00 PM",
    location: "FIKA Main Hall",
  },
  {
    id: "2",
    name: "Live Music Night",
    shortDescription: "Acoustic sessions with local artists",
    fullDescription:
      "Enjoy an evening of live acoustic music while sipping your favorite brew. Featuring talented local musicians performing original songs and covers in a cozy atmosphere.",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400",
    day: "Friday",
    time: "7:00 PM - 10:00 PM",
    location: "FIKA Lounge",
  },
  {
    id: "3",
    name: "Barista Championship",
    shortDescription: "Watch the best compete",
    fullDescription:
      "Witness the skills of our finest baristas as they compete in creating the perfect espresso drinks. A celebration of craftsmanship and passion for coffee.",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400",
    day: "Sunday",
    time: "2:00 PM - 6:00 PM",
    location: "FIKA Main Hall",
  },
];

// Admin credentials (for demo purposes)
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "fika2026";

// Custom hook for chart animation on scroll
function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.3 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isVisible] as const;
}

// Doughnut Chart Component
function DoughnutChart({
  value,
  title,
  subtitle,
}: {
  value: number;
  title: string;
  subtitle: string;
}) {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <Card
      ref={ref}
      className="p-8 text-center hover:shadow-xl transition-all duration-300"
    >
      <div className="relative w-48 h-48 mx-auto mb-6">
        <svg className="w-48 h-48 transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            fill="none"
            stroke="oklch(0.922 0 0)"
            strokeWidth="12"
          />
          <circle
            cx="96"
            cy="96"
            r="88"
            fill="none"
            stroke="oklch(0.828 0.189 84.429)"
            strokeWidth="12"
            strokeDasharray={`${isVisible ? value * 5.53 : 0} 553`}
            strokeLinecap="round"
            className="transition-all duration-[2000ms] ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold text-foreground">{value}%</span>
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground">{subtitle}</p>
    </Card>
  );
}

// Helper function to convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export default function Home() {
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([
    {
      id: "hot-drinks",
      name: "Hot Drinks",
      subcategories: ["classic", "lattes", "tea"],
    },
    {
      id: "cold-drinks",
      name: "Cold Drinks",
      subcategories: ["over-ice", "smoothies", "mojitos", "iced-tea"],
    },
    {
      id: "snacks-desserts",
      name: "Snacks & Desserts",
      subcategories: ["sandwiches", "salads", "desserts"],
    },
  ]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(
    null,
  );
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [menuTab, setMenuTab] = useState("hot-drinks");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    gender: "",
    ageRange: "",
    message: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [heroBackgroundImage, setHeroBackgroundImage] = useState("/Bg.jpeg");

  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const galleryRef = useRef<HTMLDivElement>(null);
  const LOOP_BUFFER = 2;

  const extendedGallery = [
    ...galleryImages.slice(-LOOP_BUFFER),
    ...galleryImages,
    ...galleryImages.slice(0, LOOP_BUFFER),
  ];
  const [galleryIndex, setGalleryIndex] = useState(LOOP_BUFFER);
  const prevGallery = () => {
    setGalleryIndex((prev) => prev - 1);
  };

  const nextGallery = () => {
    setGalleryIndex((prev) => prev + 1);
  };
  useEffect(() => {
    if (galleryIndex === 0) {
      setTimeout(() => {
        setGalleryIndex(galleryImages.length);
      }, 300);
    }

    if (galleryIndex === galleryImages.length + LOOP_BUFFER) {
      setTimeout(() => {
        setGalleryIndex(LOOP_BUFFER);
      }, 300);
    }
  }, [galleryIndex, galleryImages.length]);

  useEffect(() => {
    if (!menuCategories.find((c) => c.id === menuTab)) {
      setMenuTab(menuCategories[0]?.id ?? "");
    }
  }, [menuCategories, menuTab]);

  const handleUpdateEvent = (updatedEvent: Event) => {
    setEvents((prev) =>
      prev.map((ev) => (ev.id === updatedEvent.id ? updatedEvent : ev)),
    );
    setEditingEvent(null);
  };

  // Menu categories and subcategories
  // const menuCategories = [
  //   {
  //     id: "hot-drinks",
  //     name: "Hot Drinks",
  //     subcategories: ["classic", "lattes", "tea"],
  //   },
  //   {
  //     id: "cold-drinks",
  //     name: "Cold Drinks",
  //     subcategories: [
  //       "over-ice",
  //       "smoothies",
  //       "mojitos",
  //       "iced-tea",
  //       "soft-drinks",
  //     ],
  //   },
  //   {
  //     id: "snacks-desserts",
  //     name: "Snacks & Desserts",
  //     subcategories: ["sandwiches", "salads", "desserts"],
  //   },
  // ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      loginForm.username === ADMIN_USERNAME &&
      loginForm.password === ADMIN_PASSWORD
    ) {
      setIsLoggedIn(true);
      setCurrentPage("admin");
      setLoginForm({ username: "", password: "" });
      setLoginError("");
    } else {
      setLoginError("Invalid username or password");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("home");
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMessage: ContactMessage = {
      id: Date.now().toString(),
      ...contactForm,
      timestamp: new Date().toISOString(),
    };
    setContactMessages([...contactMessages, newMessage]);
    setContactForm({
      name: "",
      email: "",
      gender: "",
      ageRange: "",
      message: "",
    });
    alert("Message sent successfully!");
  };

  const handleAddMenuItem = (newItem: Omit<MenuItem, "id">) => {
    setMenuItems([...menuItems, { ...newItem, id: Date.now().toString() }]);
  };

  const handleAddEvent = (newEvent: Omit<Event, "id">) => {
    setEvents([...events, { ...newEvent, id: Date.now().toString() }]);
  };

  const handleDeleteMenuItem = (id: string) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const handleDeleteMessage = (id: string) => {
    setContactMessages(contactMessages.filter((msg) => msg.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <button
                onClick={() => setCurrentPage("home")}
                className="flex items-center space-x-2"
              >
                <Image src={FIKA} alt="" className="w-[50px]" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => setCurrentPage("home")}
                className={`text-sm font-medium transition-colors hover:text-foreground ${
                  currentPage === "home"
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setCurrentPage("menu")}
                className={`text-sm font-medium transition-colors hover:text-foreground ${
                  currentPage === "menu"
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                Menu
              </button>
              <button
                onClick={() => setCurrentPage("events")}
                className={`text-sm font-medium transition-colors hover:text-foreground ${
                  currentPage === "events"
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                Events
              </button>
              <button
                onClick={() => setCurrentPage("gallery")}
                className={`text-sm font-medium transition-colors hover:text-foreground ${
                  currentPage === "gallery"
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                Gallery
              </button>
              <button
                onClick={() =>
                  isLoggedIn ? setCurrentPage("admin") : setCurrentPage("login")
                }
                className={`text-sm font-medium transition-colors hover:text-foreground ${
                  currentPage === "admin" || currentPage === "login"
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {isLoggedIn ? "Admin" : "Login"}
              </button>
            </div>

            {/* Contact Button */}
            <button
              onClick={() => setCurrentPage("contact")}
              className="px-4 py-2 text-sm font-medium border-2 border-foreground rounded-md hover:bg-foreground hover:text-background transition-all duration-300"
            >
              Contact
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex justify-center space-x-6 pb-3">
            <button
              onClick={() => setCurrentPage("home")}
              className={`text-sm font-medium ${currentPage === "home" ? "text-foreground" : "text-muted-foreground"}`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage("menu")}
              className={`text-sm font-medium ${currentPage === "menu" ? "text-foreground" : "text-muted-foreground"}`}
            >
              Menu
            </button>
            <button
              onClick={() => setCurrentPage("events")}
              className={`text-sm font-medium ${currentPage === "events" ? "text-foreground" : "text-muted-foreground"}`}
            >
              Events
            </button>
            <button
              onClick={() =>
                isLoggedIn ? setCurrentPage("admin") : setCurrentPage("login")
              }
              className={`text-sm font-medium ${currentPage === "admin" || currentPage === "login" ? "text-foreground" : "text-muted-foreground"}`}
            >
              {isLoggedIn ? "Admin" : "Login"}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {/* LOGIN PAGE */}
        {currentPage === "login" && (
          <div className="min-h-[80vh] flex items-center justify-center px-4">
            <Card className="w-full max-w-md p-8">
              <div className="flex justify-center mb-2">
                <Image src={FIKA} alt="logo" className="w-50" />
              </div>
              <h1 className="text-3xl font-bold text-center mb-2 text-foreground">
                Admin Login
              </h1>
              <p className="text-muted-foreground text-center mb-6">
                Enter your credentials to access the admin panel
              </p>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={loginForm.username}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, username: e.target.value })
                    }
                    placeholder="Enter username"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, password: e.target.value })
                    }
                    placeholder="Enter password"
                  />
                </div>
                {loginError && (
                  <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-2 rounded-md text-sm">
                    {loginError}
                  </div>
                )}
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </Card>
          </div>
        )}

        {/* HOME PAGE */}
        {currentPage === "home" && (
          <div className="space-y-0">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${heroBackgroundImage})`,
                  filter: "brightness(0.4)",
                }}
              />
              <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <Image src={FIKA} alt="" className="" />
                <div className="h-1 w-full max-w-2xl mx-auto mb-6 bg-gradient-to-r from-transparent via-[oklch(0.828_0.189_84.429)] to-transparent" />
                <p className="text-2xl md:text-4xl text-background mb-8 font-light tracking-wide">
                  "Experience Exceptional Coffee"
                </p>
                <button className="px-8 py-4 text-lg font-semibold border-2 border-background rounded-full text-background hover:bg-background hover:text-foreground transition-all duration-1000 animate-pulse">
                  Open 24/7
                </button>
              </div>
            </section>

            {/* FIKA in Numbers Section */}
            <section className="py-20 px-4 bg-background">
              <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-12">
                  <h2 className="flex items-center justify-center text-4xl md:text-5xl font-bold mb-6 text-foreground">
                    {" "}
                    FIKA in Numbers
                  </h2>
                  <div className="h-1 w-full max-w-2xl mx-auto mb-6 bg-gradient-to-r from-transparent via-[oklch(0.828_0.189_84.429)] to-transparent" />
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  <DoughnutChart
                    value={85}
                    title="Loyal Customers"
                    subtitle="Returning customers who love our coffee"
                  />
                  <DoughnutChart
                    value={100}
                    title="Open Hours"
                    subtitle="Serving you around the clock"
                  />
                  <DoughnutChart
                    value={70}
                    title="Drinks in Menu"
                    subtitle="Variety of beverages to choose from"
                  />
                </div>
              </div>
            </section>
            {/* Our Story Section */}
            <section className="py-20 px-4 bg-background">
              <div className="container mx-auto max-w-6xl">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                      Our Story
                    </h2>
                    <div className="h-1 w-full mb-6 bg-gradient-to-r from-transparent via-[oklch(0.828_0.189_84.429)] to-transparent" />
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      <span style={{ color: "oklch(0.828 0.189 84.429)" }}>
                        FIKA
                      </span>{" "}
                      began as a dream to create more than just a coffee house –
                      we wanted to build a community where people could gather,
                      connect, and share meaningful moments over exceptional
                      coffee. Our journey started with a simple belief that
                      great coffee has the power to bring people together,
                      transform ordinary moments into extraordinary experiences,
                      and create lasting memories. Today,{" "}
                      <span style={{ color: "oklch(0.828 0.189 84.429)" }}>
                        FIKA
                      </span>{" "}
                      stands as a testament to that vision, serving as a beacon
                      of quality, passion, and community in the heart of Jordan.
                    </p>
                  </div>
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80"
                      alt="Our Story"
                      className="rounded-2xl shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Our Commitment Section */}
            <section className="py-20 px-4 bg-muted/30">
              <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                    Our Commitment
                  </h2>
                  <div className="h-1 w-full max-w-2xl mx-auto mb-6 bg-gradient-to-r from-transparent via-[oklch(0.828_0.189_84.429)] to-transparent" />
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    Guiding our journey with quality, passion, and a commitment
                    to exceptional coffee experience
                  </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      title: "Mission",
                      content:
                        "We are on a mission to spread passion with every cup of coffee. We look forward to many years of roasting and brewing most inspirational taste ever.",
                    },
                    {
                      title: "Vision",
                      content:
                        "To become the most trusted as perfect coffee house in local, regional and international markets.",
                    },
                    {
                      title: "Dream",
                      content:
                        "Our dream is for FIKA to become the most loved and respected coffee house in Jordan. We are committed to building a culture of joy, passion, and belief in community and people.",
                    },
                    {
                      title: "Promise",
                      content:
                        "To share our customer's daily moments by providing perfect, delicious and inspirational coffee, anytime, anywhere.",
                    },
                  ].map((item, index) => (
                    <Card
                      key={index}
                      className="p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      <h3
                        className="text-3xl font-[400] mb-0 text-center"
                        style={{
                          color: "oklch(0.828 0.189 84.429)",
                          fontFamily: "Montserrat, serif",
                        }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-center">
                        {item.content}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* Our Gallery Section */}
            <section className="py-20 px-4 bg-muted/30 overflow-hidden">
              <div className="container mx-auto max-w-7xl text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                  Our Gallery
                </h2>

                <div className="h-1 w-full max-w-2xl mx-auto mb-12 bg-gradient-to-r from-transparent via-[oklch(0.828_0.189_84.429)] to-transparent" />

                {/* Desktop Carousel */}
                <div className="relative hidden md:flex items-center justify-center">
                  {/* Left Arrow */}

                  <button
                    onClick={prevGallery}
                    className="absolute left-0 z-20 bg-background/80 backdrop-blur p-3 rounded-full shadow
               hover:bg-foreground hover:text-background transition"
                  >
                    ‹
                  </button>

                  {/* Slides */}
                  <div className="relative flex items-center justify-center w-full h-[340px]">
                    {extendedGallery.map((img, index) => {
                      const offset = index - galleryIndex;

                      if (Math.abs(offset) > 2) return null;

                      return (
                        <div
                          key={img.id}
                          className="absolute transition-all duration-500 ease-out"
                          style={{
                            transform: `
                  translateX(${offset * 260}px)
                  scale(${offset === 0 ? 1 : offset === -1 || offset === 1 ? 0.9 : 0.8})
                `,
                            opacity:
                              offset === 0 || offset === -1 || offset === 1
                                ? 1
                                : 0.35,
                            zIndex: 10 - Math.abs(offset),
                          }}
                        >
                          <div className="w-[260px] h-[260px] rounded-xl overflow-hidden shadow-2xl">
                            <img
                              src={img.image}
                              alt="Gallery"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Right Arrow */}

                  <button
                    onClick={nextGallery}
                    className="absolute right-0 z-20 bg-background/80 backdrop-blur p-3 rounded-full shadow
               hover:bg-foreground hover:text-background transition"
                  >
                    ›
                  </button>
                </div>

                {/* Mobile Swipe Gallery */}
                <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4">
                  {galleryImages.map((img) => (
                    <div
                      key={img.id}
                      className="min-w-[280px] h-[280px] snap-center rounded-xl overflow-hidden shadow-lg"
                    >
                      <img
                        src={img.image}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                <Button
                  className="mt-12"
                  onClick={() => setCurrentPage("gallery")}
                >
                  Explore More
                </Button>
              </div>
            </section>
          </div>
        )}

        {/* MENU PAGE */}
        {currentPage === "menu" && (
          <div className="py-12 px-4">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
                  Our Menu
                </h1>
                <div className="h-1 w-full max-w-2xl mx-auto mb-6 bg-gradient-to-r from-transparent via-[oklch(0.828_0.189_84.429)] to-transparent" />
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Discover our carefully crafted selection of beverages and
                  food, made with the finest ingredients and lots of love.
                </p>
              </div>

              <Tabs
                value={menuTab}
                onValueChange={setMenuTab}
                className="w-full"
              >
                <TabsList
                  className="grid w-full mb-8"
                  style={{
                    gridTemplateColumns: `repeat(${menuCategories.length}, minmax(0, 1fr))`,
                  }}
                >
                  {menuCategories.map((cat) => (
                    <TabsTrigger
                      key={cat.id}
                      value={cat.id}
                      className="text-base"
                    >
                      {cat.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {menuCategories.map((category) => (
                  <TabsContent key={category.id} value={category.id}>
                    {/* Show all subcategories in sections */}
                    {category.subcategories.map((subcategory) => {
                      const subcategoryItems = menuItems.filter(
                        (item) =>
                          item.category === category.id &&
                          item.subcategory === subcategory,
                      );

                      if (subcategoryItems.length === 0) return null;

                      return (
                        <div key={subcategory} className="mb-12">
                          <h3 className="text-2xl font-bold mb-6 text-foreground capitalize">
                            {subcategory.replace("-", " ")}
                          </h3>
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {subcategoryItems.map((item) => (
                              <Card
                                key={item.id}
                                className="overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group"
                              >
                                <div className="aspect-square overflow-hidden">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                  />
                                </div>
                                <CardContent className="p-4">
                                  <h3 className="font-bold text-lg mb-2 text-foreground">
                                    {item.name}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    {item.description}
                                  </p>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        )}

        {/* EVENTS PAGE */}
        {currentPage === "events" && (
          <div className="py-12 px-4">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
                  Upcoming Events
                </h1>
                <div className="h-1 w-full max-w-2xl mx-auto mb-6 bg-gradient-to-r from-transparent via-[oklch(0.828_0.189_84.429)] to-transparent" />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event) => (
                  <Card
                    key={event.id}
                    className="overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold mb-3 text-foreground">
                        {event.name}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {event.shortDescription}
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{event.day}</span>
                          <Clock className="h-4 w-4 ml-4 mr-2" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <Button
                        onClick={() => setSelectedEvent(event)}
                        className="w-full"
                        variant="outline"
                      >
                        Learn More <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {events.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Calendar className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>No upcoming events at the moment.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CONTACT PAGE */}
        {currentPage === "contact" && (
          <div className="py-12 px-4">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
                  Contact Us
                </h1>
                <div className="h-1 w-full max-w-2xl mx-auto mb-6 bg-gradient-to-r from-transparent via-[oklch(0.828_0.189_84.429)] to-transparent" />
              </div>

              <div className="grid xl:grid-cols-2 gap-8">
                {/* Left Box - Get in Touch */}
                <Card className="p-8">
                  <h2 className="text-3xl font-bold mb-6 text-foreground">
                    Get in Touch
                  </h2>

                  {/* Contact Information */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 mr-4 text-foreground" />
                      <span className="text-muted-foreground">
                        +962 6 123 4567
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 mr-4 text-foreground" />
                      <span className="text-muted-foreground">
                        hello@fikacoffee.com
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-4 text-foreground" />
                      <span className="text-muted-foreground">
                        Amman, Jordan
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-4 text-foreground" />
                      <span className="text-muted-foreground">Open 24/7</span>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Contact Form */}
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={contactForm.name}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            name: e.target.value,
                          })
                        }
                        required
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            email: e.target.value,
                          })
                        }
                        required
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="gender">Gender *</Label>
                        <select
                          id="gender"
                          value={contactForm.gender}
                          onChange={(e) =>
                            setContactForm({
                              ...contactForm,
                              gender: e.target.value,
                            })
                          }
                          required
                          className="w-full px-3 py-2 border border-input rounded-md bg-background"
                        >
                          <option value="">Select</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="ageRange">Age Range *</Label>
                        <select
                          id="ageRange"
                          value={contactForm.ageRange}
                          onChange={(e) =>
                            setContactForm({
                              ...contactForm,
                              ageRange: e.target.value,
                            })
                          }
                          required
                          className="w-full px-3 py-2 border border-input rounded-md bg-background"
                        >
                          <option value="">Select</option>
                          <option value="under-18">Under 18</option>
                          <option value="18-25">From 18 to 25</option>
                          <option value="25-35">From 25 to 35</option>
                          <option value="35-50">From 35 to 50</option>
                          <option value="above-50">Above 50</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={contactForm.message}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            message: e.target.value,
                          })
                        }
                        required
                        placeholder="Your message..."
                        rows={5}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </Card>

                {/* Right Box - Find Us */}
                <Card className="p-8">
                  <h2 className="text-3xl font-bold mb-6 text-foreground">
                    Find Us
                  </h2>

                  {/* Map */}
                  <div className="mb-6 rounded-lg overflow-hidden border border-border">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4165.618781891121!2d35.869588876228214!3d31.950266725775997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151ca10046ea605f%3A0x88b1f34f6e556e80!2sFIKA%20Coffe%20House!5e1!3m2!1sen!2sjo!4v1769842142785!5m2!1sen!2sjo"
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 mr-4 mt-1 text-foreground" />
                      <div>
                        <h3 className="font-bold text-lg text-foreground">
                          FIKA Coffee House
                        </h3>
                        <p className="text-muted-foreground">Amman, Jordan</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-4 text-foreground" />
                      <p className="text-muted-foreground">
                        Opens 24/7 - Your Perfect Coffee Destination
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}
        {/* GALLERY PAGE */}
        {currentPage === "gallery" && (
          <div className="py-16 px-4">
            <div className="container mx-auto max-w-7xl">
              <div className="text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
                  Our Gallery
                </h1>
                <div className="h-1 w-full max-w-2xl mx-auto bg-gradient-to-r from-transparent via-[oklch(0.828_0.189_84.429)] to-transparent" />
              </div>

              {galleryImages.length === 0 ? (
                <p className="text-center text-muted-foreground">
                  No images uploaded yet.
                </p>
              ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {galleryImages.map((img) => (
                    <div
                      key={img.id}
                      className="rounded-xl overflow-hidden w-full h-full object-cover duration-500 shadow-lg hover:scale-105 transition-transform"
                    >
                      <img
                        src={img.image}
                        alt="Gallery"
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ADMIN PAGE */}
        {currentPage === "admin" && isLoggedIn && (
          <div className="py-12 px-4">
            <div className="container mx-auto max-w-7xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
                    Admin Panel
                  </h1>
                  <div className="h-1 w-full max-w-2xl mb-6 bg-gradient-to-r from-transparent via-[oklch(0.828_0.189_84.429)] to-transparent" />
                </div>
                <Button onClick={handleLogout} variant="outline">
                  Logout
                </Button>
              </div>

              <Tabs defaultValue="menu" className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-8">
                  <TabsTrigger value="menu">Manage Menu</TabsTrigger>
                  <TabsTrigger value="events">Manage Events</TabsTrigger>
                  <TabsTrigger value="messages">Messages</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                  <TabsTrigger value="gallery">Gallery</TabsTrigger>
                </TabsList>

                {/* Menu Management */}
                <TabsContent value="menu">
                  <Card className="p-6 mb-6">
                    <h2 className="text-2xl font-bold mb-4">Menu Categories</h2>

                    <AddCategoryForm
                      categories={menuCategories}
                      setCategories={setMenuCategories}
                    />
                  </Card>

                  <Card className="p-6 mb-6">
                    <h2 className="text-2xl font-bold mb-4">
                      Add New Menu Item
                    </h2>
                    <AddMenuItemForm
                      onAdd={handleAddMenuItem}
                      categories={menuCategories}
                    />
                  </Card>

                  <Card className="p-6">
                    <h2 className="text-2xl font-bold mb-4">
                      Current Menu Items
                    </h2>
                    <ScrollArea className="h-[600px]">
                      <div className="space-y-4">
                        {menuItems.map((item) => (
                          <Card key={item.id} className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-16 h-16 object-cover rounded-md"
                                />
                                <div>
                                  <h3 className="font-bold text-foreground">
                                    {item.name}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    {item.description}
                                  </p>
                                  <div className="flex gap-2 mt-1">
                                    <Badge variant="secondary">
                                      {item.category}
                                    </Badge>
                                    <Badge variant="outline">
                                      {item.subcategory}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                              <Button
                                onClick={() => handleDeleteMenuItem(item.id)}
                                variant="destructive"
                                size="icon"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </Card>
                </TabsContent>

                {/* Events Management */}
                <TabsContent value="events">
                  <Card className="p-6 mb-6">
                    <h2 className="text-2xl font-bold mb-4">Add New Event</h2>
                    <AddEventForm onAdd={handleAddEvent} />
                  </Card>

                  <Card className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Current Events</h2>
                    <ScrollArea className="h-[600px]">
                      <div className="grid md:grid-cols-2 gap-4">
                        {events.map((event) => (
                          <Card key={event.id} className="overflow-hidden">
                            <img
                              src={event.image}
                              alt={event.name}
                              className="w-full h-32 object-cover"
                            />
                            <CardContent className="p-4">
                              <h3 className="font-bold text-foreground mb-2">
                                {event.name}
                              </h3>
                              <p className="text-sm text-muted-foreground mb-2">
                                {event.shortDescription}
                              </p>
                              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                                <span>
                                  {event.day} - {event.time}
                                </span>
                                <span>{event.location}</span>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="w-70"
                                  onClick={() => setEditingEvent(event)}
                                >
                                  Edit
                                </Button>

                                <Button
                                  onClick={() => handleDeleteEvent(event.id)}
                                  variant="destructive"
                                  size="sm"
                                  className="w-70"
                                >
                                  Delete
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </Card>
                </TabsContent>

                {/* Messages */}
                <TabsContent value="messages">
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold">Contact Messages</h2>
                      <Badge variant="secondary">
                        {contactMessages.length} messages
                      </Badge>
                    </div>
                    <ScrollArea className="h-[700px]">
                      {contactMessages.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                          <Mail className="h-16 w-16 mx-auto mb-4 opacity-50" />
                          <p>No messages yet.</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {contactMessages.map((msg) => (
                            <Card key={msg.id} className="p-4">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h3 className="font-bold text-foreground">
                                    {msg.name}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    {msg.email}
                                  </p>
                                </div>
                                <Button
                                  onClick={() => handleDeleteMessage(msg.id)}
                                  variant="destructive"
                                  size="icon"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="flex gap-2 mb-3">
                                <Badge variant="outline">
                                  Gender: {msg.gender}
                                </Badge>
                                <Badge variant="secondary">
                                  Age: {msg.ageRange}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                                {msg.message}
                              </p>
                              <p className="text-xs text-muted-foreground mt-2">
                                {new Date(msg.timestamp).toLocaleString()}
                              </p>
                            </Card>
                          ))}
                        </div>
                      )}
                    </ScrollArea>
                  </Card>
                </TabsContent>

                {/* Settings - Hero Background */}
                <TabsContent value="settings">
                  <Card className="p-6">
                    <h2 className="text-2xl font-bold mb-4">
                      Hero Background Image
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Upload a new background image for the hero section on the
                      home page.
                    </p>
                    <div className="mb-6">
                      <Label htmlFor="hero-image">Current Hero Image</Label>
                      <div className="mt-4">
                        <img
                          src={heroBackgroundImage}
                          alt="Current hero background"
                          className="w-full h-64 object-cover rounded-md"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="upload-hero-image">
                        Upload New Image
                      </Label>
                      <div className="mt-2">
                        <Input
                          id="upload-hero-image"
                          type="file"
                          accept="image/*"
                          onChange={async (
                            e: ChangeEvent<HTMLInputElement>,
                          ) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              try {
                                const base64 = await fileToBase64(file);
                                setHeroBackgroundImage(base64);
                              } catch (error) {
                                console.error("Error uploading image:", error);
                              }
                            }
                          }}
                          className="cursor-pointer"
                        />
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                {/* Gallery Management */}
                <TabsContent value="gallery">
                  <Card className="p-6 mb-6">
                    <h2 className="text-2xl font-bold mb-4">
                      Upload Gallery Image
                    </h2>

                    <Input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        const base64 = await fileToBase64(file);
                        setGalleryImages((prev) => [
                          ...prev,
                          { id: Date.now().toString(), image: base64 },
                        ]);
                      }}
                    />
                  </Card>

                  <Card className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Gallery Images</h2>

                    {galleryImages.length === 0 ? (
                      <p className="text-muted-foreground">No images yet.</p>
                    ) : (
                      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {galleryImages.map((img) => (
                          <div key={img.id} className="relative">
                            <img
                              src={img.image}
                              className="w-full h-40 object-cover rounded-lg"
                            />
                            <Button
                              size="icon"
                              variant="destructive"
                              className="absolute top-2 right-2"
                              onClick={() =>
                                setGalleryImages(
                                  galleryImages.filter((i) => i.id !== img.id),
                                )
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </main>

      {/* Menu Item Modal */}
      <Dialog
        open={!!selectedMenuItem}
        onOpenChange={() => setSelectedMenuItem(null)}
      >
        <DialogContent className="sm:max-w-lg">
          {selectedMenuItem && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl">
                  {selectedMenuItem.name}
                </DialogTitle>
              </DialogHeader>
              <img
                src={selectedMenuItem.image}
                alt={selectedMenuItem.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <p className="text-muted-foreground">
                {selectedMenuItem.description}
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Event Modal */}
      <Dialog
        open={!!selectedEvent}
        onOpenChange={() => setSelectedEvent(null)}
      >
        <DialogContent className="sm:max-w-2xl">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl">
                  {selectedEvent.name}
                </DialogTitle>
              </DialogHeader>
              <img
                src={selectedEvent.image}
                alt={selectedEvent.name}
                className="w-full h-64 object-cover rounded-md"
              />
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <Calendar className="h-5 w-5 text-foreground" />
                  <span className="text-muted-foreground">
                    {selectedEvent.day}
                  </span>
                  <Clock className="h-5 w-5 text-foreground ml-2" />
                  <span className="text-muted-foreground">
                    {selectedEvent.time}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-foreground" />
                  <span className="text-muted-foreground">
                    {selectedEvent.location}
                  </span>
                </div>
              </div>
              <Separator />
              <div>
                <h4 className="font-bold mb-2">About</h4>
                <p className="text-muted-foreground">
                  {selectedEvent.shortDescription}
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2">Details</h4>
                <p className="text-muted-foreground">
                  {selectedEvent.fullDescription}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      {/* Edit Event */}
      {editingEvent && (
        <EditEventDialog
          event={editingEvent}
          onClose={() => setEditingEvent(null)}
          onSave={handleUpdateEvent}
        />
      )}

      {/* Footer */}
      <footer className="bg-foreground text-background mt-auto">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Image src={FIKAwhite} alt="" className="w-[50px] " />
              </div>
              <p className="text-sm opacity-80">
                Experience exceptional coffee in the heart of Jordan. Open 24/7
                for your perfect coffee moment.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <button
                    onClick={() => setCurrentPage("home")}
                    className="hover:opacity-100 transition-opacity"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentPage("menu")}
                    className="hover:opacity-100 transition-opacity"
                  >
                    Menu
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentPage("events")}
                    className="hover:opacity-100 transition-opacity"
                  >
                    Events
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentPage("contact")}
                    className="hover:opacity-100 transition-opacity"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Contact</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+962 6 123 4567</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>hello@fikacoffee.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Amman, Jordan</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">Hours</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li
                  className="pt-2 font-bold"
                  style={{ color: "oklch(0.828 0.189 84.429)" }}
                >
                  Open 24/7
                </li>
              </ul>
            </div>
          </div>
          <Separator className="mb-8 bg-white/20" />
          <div className="text-center text-sm opacity-80">
            <p>
              © {new Date().getFullYear()} FIKA Coffee House. All rights
              reserved.
            </p>
            <p className="mt-2">Developed by Artl Studio, LLC</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Add Menu Item Form Component with file upload
function AddMenuItemForm({
  onAdd,
  categories,
}: {
  onAdd: (item: Omit<MenuItem, "id">) => void;
  categories: MenuCategory[];
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "hot-drinks",
    subcategory: "classic",
    image: "",
  });
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        setFormData({ ...formData, image: base64 });
        setImagePreview(base64);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      name: "",
      description: "",
      category: "hot-drinks",
      subcategory: "classic",
      image: "",
    });
    setImagePreview("");
  };

  // const menuCategories = [
  //   {
  //     id: "hot-drinks",
  //     name: "Hot Drinks",
  //     subcategories: ["classic", "lattes", "tea"],
  //   },
  //   {
  //     id: "cold-drinks",
  //     name: "Cold Drinks",
  //     subcategories: [
  //       "over-ice",
  //       "smoothies",
  //       "mojitos",
  //       "iced-tea",
  //       "soft-drinks",
  //     ],
  //   },
  //   {
  //     id: "snacks-desserts",
  //     name: "Snacks & Desserts",
  //     subcategories: ["sandwiches", "salads", "desserts"],
  //   },
  // ];

  const selectedCategory = categories.find((c) => c.id === formData.category);
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="menu-name">Name *</Label>
        <Input
          id="menu-name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="menu-category">Category *</Label>
          <select
            id="menu-category"
            value={formData.category}
            onChange={(e) => {
              const catId = e.target.value;
              const cat = categories.find((c) => c.id === catId);

              setFormData({
                ...formData,
                category: catId,
                subcategory: cat?.subcategories[0] ?? "",
              });
            }}
            required
            className="w-full px-3 py-2 border border-input rounded-md bg-background"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="menu-subcategory">Subcategory *</Label>
          <select
            id="menu-subcategory"
            value={formData.subcategory}
            onChange={(e) =>
              setFormData({ ...formData, subcategory: e.target.value })
            }
            required
            className="w-full px-3 py-2 border border-input rounded-md bg-background"
          >
            {selectedCategory?.subcategories.map((sub) => (
              <option key={sub} value={sub}>
                {sub.replace("-", " ")}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <Label htmlFor="menu-image">Image *</Label>
        <div className="mt-2">
          <div className="flex items-center gap-2">
            <Input
              id="menu-image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              required
              className="cursor-pointer"
            />
            <Upload className="h-5 w-5 text-muted-foreground" />
          </div>
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-md"
              />
            </div>
          )}
        </div>
      </div>
      <div>
        <Label htmlFor="menu-description">Description *</Label>
        <Textarea
          id="menu-description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
          rows={3}
        />
      </div>
      <Button type="submit">Add Menu Item</Button>
    </form>
  );
}

// Editing an Event
function EditEventDialog({
  event,
  onClose,
  onSave,
}: {
  event: Event;
  onClose: () => void;
  onSave: (event: Event) => void;
}) {
  const [formData, setFormData] = useState<Event>(event);
  const [imagePreview, setImagePreview] = useState(event.image);

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const base64 = await fileToBase64(file);
    setFormData({ ...formData, image: base64 });
    setImagePreview(base64);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(formData);
          }}
          className="space-y-4"
        >
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <Input
            value={formData.day}
            onChange={(e) => setFormData({ ...formData, day: e.target.value })}
          />

          <Input
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          />

          <Input
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />

          <Input type="file" accept="image/*" onChange={handleImageUpload} />

          {imagePreview && (
            <img
              src={imagePreview}
              className="w-full h-48 object-cover rounded-md"
            />
          )}

          <Textarea
            value={formData.shortDescription}
            onChange={(e) =>
              setFormData({ ...formData, shortDescription: e.target.value })
            }
          />

          <Textarea
            value={formData.fullDescription}
            onChange={(e) =>
              setFormData({ ...formData, fullDescription: e.target.value })
            }
          />

          <div className="flex gap-2">
            <Button type="submit" className="w-full">
              Save Changes
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Add Category
function AddCategoryForm({
  categories,
  setCategories,
}: {
  categories: MenuCategory[];
  setCategories: React.Dispatch<React.SetStateAction<MenuCategory[]>>;
}) {
  const [categoryName, setCategoryName] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const addCategory = () => {
    if (!categoryName) return;

    setCategories([
      ...categories,
      {
        id: categoryName.toLowerCase().replace(/\s+/g, "-"),
        name: categoryName,
        subcategories: [],
      },
    ]);
    setCategoryName("");
  };

  const addSubcategory = () => {
    if (!subcategory || !selectedCategory) return;

    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === selectedCategory
          ? { ...cat, subcategories: [...cat.subcategories, subcategory] }
          : cat,
      ),
    );
    setSubcategory("");
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Add Category */}
      <div className="flex gap-2">
        <Input
          placeholder="New category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <Button onClick={addCategory}>Add Category</Button>
      </div>

      {/* Add Subcategory */}
      <div className="flex gap-2">
        <select
          className="w-full border rounded-md px-3"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <Input
          placeholder="Subcategory name"
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
        />
        <Button onClick={addSubcategory}>Add</Button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex items-center justify-between border p-3 rounded-md"
          >
            <div>
              <p className="font-bold">{cat.name}</p>
              <div className="flex gap-2 flex-wrap mt-1">
                {cat.subcategories.map((sub) => (
                  <Badge key={sub} variant="secondary">
                    {sub}
                  </Badge>
                ))}
              </div>
            </div>
            <Button
              size="icon"
              variant="destructive"
              onClick={() => deleteCategory(cat.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Add Event Form Component with file upload
function AddEventForm({
  onAdd,
}: {
  onAdd: (event: Omit<Event, "id">) => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    fullDescription: "",
    image: "",
    day: "",
    time: "",
    location: "",
  });
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        setFormData({ ...formData, image: base64 });
        setImagePreview(base64);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      name: "",
      shortDescription: "",
      fullDescription: "",
      image: "",
      day: "",
      time: "",
      location: "",
    });
    setImagePreview("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="event-name">Event Name *</Label>
        <Input
          id="event-name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="event-day">Day *</Label>
          <Input
            id="event-day"
            value={formData.day}
            onChange={(e) => setFormData({ ...formData, day: e.target.value })}
            required
            placeholder="e.g., Friday"
          />
        </div>
        <div>
          <Label htmlFor="event-time">Time *</Label>
          <Input
            id="event-time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            required
            placeholder="e.g., 7:00 PM - 10:00 PM"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="event-location">Location *</Label>
        <Input
          id="event-location"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          required
          placeholder="e.g., FIKA Main Hall"
        />
      </div>
      <div>
        <Label htmlFor="event-image">Image *</Label>
        <div className="mt-2">
          <div className="flex items-center gap-2">
            <Input
              id="event-image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              required
              className="cursor-pointer"
            />
            <Upload className="h-5 w-5 text-muted-foreground" />
          </div>
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-md"
              />
            </div>
          )}
        </div>
      </div>
      <div>
        <Label htmlFor="event-short-desc">Short Description *</Label>
        <Textarea
          id="event-short-desc"
          value={formData.shortDescription}
          onChange={(e) =>
            setFormData({ ...formData, shortDescription: e.target.value })
          }
          required
          rows={2}
          placeholder="Brief description for the event card"
        />
      </div>
      <div>
        <Label htmlFor="event-full-desc">Full Description *</Label>
        <Textarea
          id="event-full-desc"
          value={formData.fullDescription}
          onChange={(e) =>
            setFormData({ ...formData, fullDescription: e.target.value })
          }
          required
          rows={4}
          placeholder="Complete event details"
        />
      </div>
      <Button type="submit">Add Event</Button>
    </form>
  );
}
