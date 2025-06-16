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
  Hotel,
  Users2Icon,
  Mails,
  Train,
  HandshakeIcon,
} from "lucide-react"

import { signOut, useSession } from "next-auth/react"

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
import { useAuth } from "./AuthValidation"
import { useEffect } from "react"
import { useSidebarData } from "@/Contexts/SidebarContext"

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const resource = pathname.split("/")[1]

  const isActive = (url: string) => {
    return pathname === url || pathname.startsWith(url + "/")
  }

  const { data: session } = useSession()

  const { sidebarData } = useSidebarData()

  // Menu items
  const items = [
    { title: "Home", url: "/", icon: Home },
    { title: "Luxury Treks", url: "/trekkings", icon: Train },
    { title: "Luxury Tours", url: "/tours", icon: Binoculars },
    { title: "Explore Nepal", url: "/destinations", icon: MountainSnow },
    { title: "Accommodations", url: "/accommodations", icon: Hotel },
    {
      title: "Tailor Made",
      url: "/tailor-made",
      icon: Bus,
      value: sidebarData.tailorMade,
    },
    { title: "Quotes", url: "/quotes", icon: Mails, value: sidebarData.quotes },
    {
      title: "Bookings",
      url: "/bookings",
      icon: TicketsPlane,
      value: sidebarData.bookings,
    },
    { title: "Clients Info", url: "/clients", icon: Users2Icon },
    { title: "Affiliated Patners", url: "/affiliated", icon: HandshakeIcon },
  ]

  const logoutHandler = () => {
    const logoutConfirmation = confirm("Are you sure you want to logout?")
    if (!logoutConfirmation) return
    signOut()
    // router.push("/login")
  }

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
                        {item.value ? (
                          <span className="ml-auto inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                            {item.value}
                          </span>
                        ) : null}
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
                    <User2 />{" "}
                    {session?.user?.name ? session.user.name : "Admin"}
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
                  <DropdownMenuItem onClick={logoutHandler}>
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
