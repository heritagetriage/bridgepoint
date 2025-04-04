import { useState, useEffect } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, parseISO } from "date-fns";

interface Event {
  _id: string;
  title: string;
  date: string;
  status: string;
  location: string;
}

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        // In a real app, you would fetch events from your API
        // For now, we'll use mock data
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - events for the current month and next month
        const mockEvents = [
          { 
            _id: '1', 
            title: 'Annual Gala Dinner', 
            date: '2025-05-15T18:00:00.000Z', 
            status: 'upcoming',
            location: 'Grand Ballroom, Washington DC'
          },
          { 
            _id: '2', 
            title: 'Leadership Workshop', 
            date: '2025-05-08T09:00:00.000Z', 
            status: 'upcoming',
            location: 'Conference Center, Arlington VA'
          },
          { 
            _id: '3', 
            title: 'Community Outreach Day', 
            date: '2025-05-22T10:00:00.000Z', 
            status: 'upcoming',
            location: 'Various Locations'
          },
          { 
            _id: '4', 
            title: 'Board Meeting', 
            date: '2025-04-10T14:00:00.000Z', 
            status: 'upcoming',
            location: 'Main Office'
          },
          { 
            _id: '5', 
            title: 'Fundraising Event', 
            date: '2025-04-25T19:00:00.000Z', 
            status: 'upcoming',
            location: 'City Hall'
          },
          { 
            _id: '6', 
            title: 'Strategic Planning Session', 
            date: '2025-06-05T09:00:00.000Z', 
            status: 'upcoming',
            location: 'Retreat Center'
          }
        ];
        
        setEvents(mockEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load events. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [toast]);

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  // Get events for the selected day
  const getEventsForDay = (day: Date) => {
    return events.filter(event => isSameDay(parseISO(event.date), day));
  };

  // Get all days in the month with their events
  const days = daysInMonth.map(day => {
    const dayEvents = getEventsForDay(day);
    return {
      date: day,
      isCurrentMonth: isSameMonth(day, currentMonth),
      isToday: isToday(day),
      events: dayEvents
    };
  });

  // Calculate the starting day of the week (0 = Sunday, 1 = Monday, etc.)
  const startDay = startOfMonth(currentMonth).getDay();
  
  // Create empty slots for days from the previous month
  const emptyDaysAtStart = Array.from({ length: startDay }, (_, i) => i);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Event Calendar</h1>
          <p className="text-muted-foreground">
            View and manage all your scheduled events
          </p>
        </div>
        <Button onClick={() => navigate("/admin/events/new")}>
          <Plus className="mr-2 h-4 w-4" /> Add Event
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>{format(currentMonth, 'MMMM yyyy')}</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-muted-foreground mb-2">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for previous month */}
            {emptyDaysAtStart.map(i => (
              <div key={`empty-${i}`} className="h-24 p-1 border border-gray-200 dark:border-gray-800 rounded-md opacity-50"></div>
            ))}
            
            {/* Days of the current month */}
            {days.map((day, i) => (
              <div 
                key={i} 
                className={`h-24 p-1 border border-gray-200 dark:border-gray-800 rounded-md overflow-hidden ${
                  day.isToday ? 'bg-primary/5 border-primary/50' : ''
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className={`text-sm font-medium ${day.isToday ? 'text-primary' : ''}`}>
                    {format(day.date, 'd')}
                  </span>
                  {day.events.length > 0 && (
                    <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                      {day.events.length}
                    </Badge>
                  )}
                </div>
                <div className="mt-1 space-y-1 overflow-y-auto max-h-[calc(100%-20px)]">
                  {day.events.slice(0, 2).map(event => (
                    <div 
                      key={event._id}
                      className="text-xs p-1 rounded bg-primary/10 text-primary truncate cursor-pointer hover:bg-primary/20"
                      onClick={() => navigate(`/admin/events/edit/${event._id}`)}
                    >
                      {event.title}
                    </div>
                  ))}
                  {day.events.length > 2 && (
                    <div className="text-xs text-muted-foreground text-center">
                      +{day.events.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4 flex justify-between">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {events.length} events scheduled
            </span>
          </div>
          <Button variant="outline" size="sm" onClick={() => setCurrentMonth(new Date())}>
            Today
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
