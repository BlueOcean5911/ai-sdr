import CubeIcon from "@/components/Icons/cube.icon";
import LaunchIcon from "@/components/Icons/launch.icon";
import ErrorIcon from "@/components/Icons/error.icon";
import AlertIcon from "@/components/Icons/alert.icon";
import MessageIcon from "@/components/Icons/message.icon";
import SuccessIcon from "@/components/Icons/success.icon";
import UserIcon from "@/components/Icons/user.icon";

export const notificationIcons: any = {
  leadAdded: <CubeIcon />,
  campaignAdded: <LaunchIcon />,
  userRegistered: <UserIcon />,
  messageReceived: <MessageIcon />,
  alert: <AlertIcon />,
  success: <SuccessIcon />,
  error: <ErrorIcon />,
};

export const headerNotificationList = [
  {
    id: "leadAdded",
    title: "New Lead Added",
    content: "Jackson Doe added a new lead: 'Acme Corp'.",
    href: "#",
    date: "August 5, 2024",
  },
  {
    id: "campaignAdded",
    title: "New Campaign Created",
    content: "The 'Summer Sale' campaign has been successfully launched.",
    href: "#",
    date: "August 6, 2024",
  },
  {
    id: "userRegistered",
    title: "New User Registered",
    content: "Emily Smith has registered as a new user. Welcome her!",
    href: "#",
    date: "August 7, 2024",
  },
  {
    id: "messageReceived",
    title: "New Message Received",
    content:
      "You have received a new message from John: 'Let's discuss the project.'",
    href: "#",
    date: "August 8, 2024",
  },
  {
    id: "alert",
    title: "System Alert",
    content:
      "Scheduled server maintenance on August 10, 2024, from 2 AM to 4 AM.",
    href: "#",
    date: "August 9, 2024",
  },
  {
    id: "success",
    title: "Task Completed",
    content: "The report for Q2 has been successfully generated and sent.",
    href: "#",
    date: "August 10, 2024",
  },
  {
    id: "error",
    title: "Error Notification",
    content: "Failed to upload the document: 'Report.pdf'. Please try again.",
    href: "#",
    date: "August 11, 2024",
  },
  {
    id: "leadAdded",
    title: "New Lead Added",
    content: "Sarah Connor added a new lead: 'Tech Innovations'.",
    href: "#",
    date: "August 12, 2024",
  },
  {
    id: "campaignAdded",
    title: "Campaign Update",
    content:
      "The 'Winter Discounts' campaign has been updated with new offers.",
    href: "#",
    date: "August 13, 2024",
  },
  {
    id: "userRegistered",
    title: "New User Registered",
    content: "Michael Johnson has joined the platform. Check out his profile!",
    href: "#",
    date: "August 14, 2024",
  },
  {
    id: "messageReceived",
    title: "New Team Message",
    content:
      "You have a new message from your team: 'Don't forget the meeting at 3 PM.'",
    href: "#",
    date: "August 15, 2024",
  },
  {
    id: "alert",
    title: "Security Alert",
    content:
      "Unusual login activity detected. Please verify your account security.",
    href: "#",
    date: "August 16, 2024",
  },
  {
    id: "success",
    title: "Update Successful",
    content: "Your profile has been successfully updated.",
    href: "#",
    date: "August 17, 2024",
  },
  {
    id: "error",
    title: "Payment Failed",
    content:
      "Your recent payment attempt has failed. Please check your payment details.",
    href: "#",
    date: "August 18, 2024",
  },
  {
    id: "leadAdded",
    title: "New Lead Added",
    content: "Chris Evans added a new lead: 'Global Enterprises'.",
    href: "#",
    date: "August 19, 2024",
  },
  {
    id: "campaignAdded",
    title: "New Campaign Alert",
    content: "The 'Back to School' campaign is now live! Check it out.",
    href: "#",
    date: "August 20, 2024",
  },
];
