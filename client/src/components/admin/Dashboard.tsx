import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  BarChart,
  Calendar,
  MessageSquare,
  Users,
  FileText,
  TrendingUp,
  Clock,
  Activity,
} from "lucide-react";
import { format } from "date-fns";
import eventService, { type Event } from "@/services/eventService";
import messageService, { type Message } from "@/services/messageService";
import userService from "@/services/userService";

interface DashboardMessage extends Omit<Message, "isRead"> {
  read?: boolean;
}

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

function StatCard({ title, value, description, icon, trend }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        {trend && (
          <div
            className={`flex items-center mt-2 text-xs ${
              trend.isPositive ? "text-green-500" : "text-red-500"
            }`}
          >
            <TrendingUp
              className={`h-3 w-3 mr-1 ${
                !trend.isPositive && "transform rotate-180"
              }`}
            />
            <span>
              {trend.isPositive ? "+" : "-"}
              {Math.abs(trend.value)}% from last month
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState({
    events: { total: 0, upcoming: 0 },
    messages: { total: 0, unread: 0 },
    users: { total: 0 },
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [recentEvents, setRecentEvents] = useState<Event[]>([]);
  const [recentMessages, setRecentMessages] = useState<DashboardMessage[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Fetch events
        const eventsResponse = await eventService.getEvents(1, 10);
        let upcomingEvents: Event[] = [];
        let totalEvents = 0;

        if (eventsResponse?.data) {
          totalEvents = eventsResponse.total || eventsResponse.data.length;
          upcomingEvents = eventsResponse.data
            .filter((event) => new Date(event.date) >= today)
            .sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            );
          setRecentEvents(upcomingEvents.slice(0, 3));
        }

        // Fetch messages
        const messagesResponse = await messageService.getMessages(1, 10);
        let messagesTotal = 0;
        let messagesUnread = 0;
        let recentMessagesData: DashboardMessage[] = [];

        if (messagesResponse?.messages) {
          messagesTotal =
            messagesResponse.total || messagesResponse.messages.length;
          const mappedMessages = messagesResponse.messages.map((msg) => ({
            ...msg,
            read:
              msg.status === "read" ||
              msg.status === "replied" ||
              msg.status === "archived",
          }));
          messagesUnread = mappedMessages.filter((m) => !m.read).length;
          recentMessagesData = mappedMessages.slice(0, 3);
        }

        // Fetch users
        let usersTotal = 0;
        try {
          const usersResponse = await userService.getUsers(1, 10);
          if (usersResponse?.users) {
            usersTotal = usersResponse.total || usersResponse.users.length;
          }
        } catch (err) {
          console.log("Could not fetch users");
        }

        setStats({
          events: { total: totalEvents, upcoming: upcomingEvents.length },
          messages: { total: messagesTotal, unread: messagesUnread },
          users: { total: usersTotal },
        });
        setRecentMessages(recentMessagesData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        if (error.message.includes("Unauthorized")) {
          toast({
            variant: "destructive",
            title: "Session Expired",
            description: "Please log in again to continue.",
          });
          // Redirect to login after toast is shown
          setTimeout(() => (window.location.href = "/admin/login"), 2000);
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to load dashboard data. Please try again.",
          });
        }
        setStats({
          events: { total: 0, upcoming: 0 },
          messages: { total: 0, unread: 0 },
          users: { total: 0 },
        });
        setRecentEvents([]);
        setRecentMessages([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            Last updated: {format(new Date(), "MMMM d, yyyy h:mm a")}
          </span>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Events"
              value={stats.events.total}
              description="All events in the system"
              icon={<Calendar className="h-4 w-4" />}
              trend={{ value: 12, isPositive: true }}
            />

            <StatCard
              title="Upcoming Events"
              value={stats.events.upcoming}
              description="Events scheduled in the future"
              icon={<Clock className="h-4 w-4" />}
            />

            <StatCard
              title="Total Messages"
              value={stats.messages.total}
              description="Messages received through contact form"
              icon={<MessageSquare className="h-4 w-4" />}
            />

            <StatCard
              title="Unread Messages"
              value={stats.messages.unread}
              description="Messages that need your attention"
              icon={<Activity className="h-4 w-4" />}
              trend={{ value: 8, isPositive: false }}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>
                  Your next {recentEvents.length} scheduled events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentEvents.length > 0 ? (
                    recentEvents.map((event) => (
                      <div key={event._id} className="flex items-center">
                        <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                          <Calendar className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {event.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(event.date), "MMMM d, yyyy")} •{" "}
                            {event.location}
                          </p>
                        </div>
                        <div className="ml-auto">
                          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                            {event.type || "Event"}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-32 text-muted-foreground">
                      No upcoming events scheduled
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>
                  Latest messages from your contact form
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMessages.length > 0 ? (
                    recentMessages.map((message) => (
                      <div key={message._id} className="flex items-center">
                        <div
                          className={`mr-4 flex h-2 w-2 rounded-full ${
                            message.read ? "bg-muted" : "bg-primary"
                          }`}
                        />
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {message.subject}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {message.name} •{" "}
                            {format(
                              new Date(message.createdAt || Date.now()),
                              "MMM d"
                            )}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-32 text-muted-foreground">
                      No messages found
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent
          value="analytics"
          className="h-[400px] flex items-center justify-center text-muted-foreground"
        >
          Analytics dashboard coming soon
        </TabsContent>

        <TabsContent
          value="reports"
          className="h-[400px] flex items-center justify-center text-muted-foreground"
        >
          Reports dashboard coming soon
        </TabsContent>
      </Tabs>
    </div>
  );
}
