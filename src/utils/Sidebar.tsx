"use client"
import {
  Home,
  MountainSnow,
  TicketsPlane,
  Bus,
  User2,
  ChevronUp,
  BookOpen,
  Binoculars,
  Sailboat,
  Users2Icon,
  Mails,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname, useRouter } from "next/navigation"

export function AppSidebar() {
  const pathname = usePathname()
  const resource = pathname.split("/")[1]

  const isActive = (url: string) => {
    return pathname === url || pathname.startsWith(url + "/")
  }

  // Menu items
  const items = [
    { title: "Home", url: "/", icon: Home },
    { title: "Trekkings", url: "/trekkings", icon: MountainSnow },
    { title: "Tours", url: "/tours", icon: Binoculars },
    { title: "Wellness", url: "/wellness", icon: TicketsPlane },
    { title: "Blogs", url: "/blogs", icon: BookOpen },
    { title: "Plan Trip", url: "/plan-trip", icon: Bus },
    { title: "Requests & Mails", url: "/requests-mails", icon: Mails },
    { title: "Clients Info", url: "/users-info", icon: Users2Icon },
  ]

  return (
    <>
      <Sidebar>
        <SidebarHeader>
          {/* <Image src="/going.png" alt="Logo" width={140} height={140} /> */}
          {/* <Image src="/logo_gmn.jpg" alt="Logo" width={140} height={140} /> */}
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-2xl mt-4 text-primary font-semibold">
              Application
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        className={`mt-2 hover:bg-secondary ${
                          isActive(item.url) ? "bg-primary text-white" : ""
                        }`}
                        href={item.url}
                      >
                        <item.icon />
                        <span className="text-xl ml-2">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="text-lg font-semibold h-16 mb-6">
                    <User2 /> Admin
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <Link href="/my-account">
                    <DropdownMenuItem className="text-lg">
                      My Account
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem>
                    <span className="text-lg text-red-800">Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  )
}
