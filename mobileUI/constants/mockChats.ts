// mockChats.ts

export const mockChats = [
  {
    id: "1",
    name: "John Motors Ltd",
    avatar: "https://i.pravatar.cc/150?img=12",
    messages: [
      { text: "Hello! Is the Honda Fit still available?", sentByMe: false, time: "9:01 AM" },
      { text: "Yes, it is!", sentByMe: true, time: "9:03 AM" },
      { text: "Can I come see it today?", sentByMe: false, time: "9:05 AM" },
      { text: "Sure, what time works best?", sentByMe: true, time: "9:07 AM" },
    ],
  },
  {
    id: "2",
    name: "Alice N.",
    avatar: "https://i.pravatar.cc/150?img=45",
    messages: [
      { text: "I can view the car tomorrow.", sentByMe: false, time: "3:20 PM" },
      { text: "Great, what time?", sentByMe: true, time: "3:21 PM" },
    ],
  },
  {
    id: "3",
    name: "TopCars KE",
    avatar: "https://i.pravatar.cc/150?img=23",
    messages: [
      { text: "Sent you the logbook scan.", sentByMe: false, time: "Yesterday" },
      { text: "Got it, thanks!", sentByMe: true, time: "Yesterday" },
    ],
  },
];