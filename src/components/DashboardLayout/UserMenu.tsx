"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuLabel,
} from "@/components/ui/menu";
import { User, Settings, HelpCircle, LogOut } from "lucide-react";

interface UserMenuProps {
  user: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
  onSignOut: () => void;
}

const userNavigation = [
  { name: "Your Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help", href: "/help", icon: HelpCircle },
];

export function UserMenu({ user, onSignOut }: UserMenuProps) {
  return (
    <Menu>
      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
        <Avatar>
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </Button>
      <MenuContent className="w-56" align="end" forceMount>
        <MenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </MenuLabel>
        <MenuSeparator />
        {userNavigation.map((item) => (
          <MenuItem key={item.name}>
            <a
              href={item.href}
              className="flex w-full items-center px-2 py-2 text-sm"
            >
              <item.icon
                className="mr-2 h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
              {item.name}
            </a>
          </MenuItem>
        ))}
        <MenuSeparator />
        <MenuItem>
          <button
            onClick={onSignOut}
            className="flex w-full items-center px-2 py-2 text-sm"
          >
            <LogOut
              className="mr-2 h-4 w-4 text-muted-foreground"
              aria-hidden="true"
            />
            Sign out
          </button>
        </MenuItem>
      </MenuContent>
    </Menu>
  );
}
