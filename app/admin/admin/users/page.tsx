"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  BarChart3,
  Package,
  Truck,
  Users,
  AlertTriangle,
  CheckCircle2,
  FileBarChart,
  Warehouse,
  Search,
  MoreHorizontal,
  Filter,
  UserPlus,
  Mail,
  Phone,
  Shield,
  UserCog,
  UserX,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { ExportCSV } from "@/components/export-csv"

// Admin navigation items
const adminNavItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: <BarChart3 className="h-4 w-4 mr-2" />,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: <Package className="h-4 w-4 mr-2" />,
  },
  {
    title: "Drivers",
    href: "/admin/drivers",
    icon: <Truck className="h-4 w-4 mr-2" />,
  },
  {
    title: "Issues",
    href: "/admin/issues",
    icon: <AlertTriangle className="h-4 w-4 mr-2" />,
  },

  {
    title: "Users",
    href: "/admin/users",
    icon: <Users className="h-4 w-4 mr-2" />,
  },
];

// Initial user data
const initialUsers = [
  {
    id: "USR-001",
    name: "John Admin",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2023-06-10 09:30 AM",
  },
  {
    id: "USR-002",
    name: "Sarah Driver",
    email: "sarah@example.com",
    role: "Driver",
    status: "Active",
    lastLogin: "2023-06-10 08:15 AM",
  },
  {
    id: "USR-003",
    name: "Michael Warehouse",
    email: "michael@example.com",
    role: "Warehouse",
    status: "Active",
    lastLogin: "2023-06-10 07:45 AM",
  },
  {
    id: "USR-004",
    name: "Emily Admin",
    email: "emily@example.com",
    role: "Admin",
    status: "Inactive",
    lastLogin: "2023-06-05 14:20 PM",
  },
  {
    id: "USR-005",
    name: "Robert Driver",
    email: "robert@example.com",
    role: "Driver",
    status: "Active",
    lastLogin: "2023-06-10 06:30 AM",
  },
  {
    id: "USR-006",
    name: "Jessica Warehouse",
    email: "jessica@example.com",
    role: "Warehouse",
    status: "Active",
    lastLogin: "2023-06-09 16:45 PM",
  },
  {
    id: "USR-007",
    name: "David Admin",
    email: "david@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2023-06-09 11:10 AM",
  },
  {
    id: "USR-008",
    name: "Lisa Driver",
    email: "lisa@example.com",
    role: "Driver",
    status: "Inactive",
    lastLogin: "2023-06-01 09:25 AM",
  },
]

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [users, setUsers] = useState(initialUsers)

  // New user form state
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "driver",
    status: true,
  })

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setNewUser((prev) => ({ ...prev, [id]: value }))
  }

  // Handle role selection
  const handleRoleChange = (value: string) => {
    setNewUser((prev) => ({ ...prev, role: value }))
  }

  // Handle status toggle
  const handleStatusChange = (checked: boolean) => {
    setNewUser((prev) => ({ ...prev, status: checked }))
  }

  // Create new user
  const handleCreateUser = () => {
    // Validate form
    if (!newUser.name || !newUser.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Generate new user ID
    const newId = `USR-${(users.length + 1).toString().padStart(3, "0")}`

    // Create new user object
    const userToAdd = {
      id: newId,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role.charAt(0).toUpperCase() + newUser.role.slice(1),
      status: newUser.status ? "Active" : "Inactive",
      lastLogin: "Never",
    }

    // Add to users array
    setUsers((prev) => [userToAdd, ...prev])

    // Show success message
    toast({
      title: "User Created",
      description: `${userToAdd.name} has been added as a ${userToAdd.role}.`,
    })

    // Reset form and close dialog
    setNewUser({
      name: "",
      email: "",
      role: "driver",
      status: true,
    })
    setIsDialogOpen(false)
  }

  // Filter users based on search query, role filter, and status filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRole = roleFilter === "all" || user.role.toLowerCase() === roleFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || user.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesRole && matchesStatus
  })

  return (
    <DashboardLayout navItems={adminNavItems} userType="admin">
      <div className="container py-6">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground">Manage user accounts and permissions</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>Create a new user account and set their role and permissions.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Full name"
                      className="col-span-3"
                      value={newUser.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email address"
                      className="col-span-3"
                      value={newUser.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">
                      Role
                    </Label>
                    <Select value={newUser.role} onValueChange={handleRoleChange}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="driver">Driver</SelectItem>
                        <SelectItem value="warehouse">Warehouse Staff</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <div className="flex items-center space-x-2 col-span-3">
                      <Switch id="status" checked={newUser.status} onCheckedChange={handleStatusChange} />
                      <Label htmlFor="status">Active</Label>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleCreateUser}>
                    Create User
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[150px]">
                <div className="flex items-center">
                  <UserCog className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by role" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="driver">Driver</SelectItem>
                <SelectItem value="warehouse">Warehouse</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <ExportCSV data={users} filename="users-export.csv" buttonText="Export Users" />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="hidden lg:table-cell">Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        user.role === "Admin"
                          ? "bg-purple-50 text-purple-700 border-purple-200"
                          : user.role === "Driver"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-green-50 text-green-700 border-green-200"
                      }
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge
                      variant="outline"
                      className={
                        user.status === "Active"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{user.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            toast({
                              title: "Edit User",
                              description: `Editing ${user.name}'s profile.`,
                            })
                          }}
                        >
                          <UserCog className="mr-2 h-4 w-4" />
                          Edit user
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            toast({
                              title: "Manage Permissions",
                              description: `Managing permissions for ${user.name}.`,
                            })
                          }}
                        >
                          <Shield className="mr-2 h-4 w-4" />
                          Manage permissions
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            toast({
                              title: "Email Sent",
                              description: `Email sent to ${user.name}.`,
                            })
                          }}
                        >
                          <Mail className="mr-2 h-4 w-4" />
                          Send email
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            toast({
                              title: "Call User",
                              description: `Calling ${user.name}.`,
                            })
                          }}
                        >
                          <Phone className="mr-2 h-4 w-4" />
                          Call user
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => {
                            setUsers((prev) =>
                              prev.map((u) =>
                                u.id === user.id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u,
                              ),
                            )
                            toast({
                              title: user.status === "Active" ? "Account Deactivated" : "Account Activated",
                              description: `${user.name}'s account has been ${user.status === "Active" ? "deactivated" : "activated"}.`,
                              variant: user.status === "Active" ? "destructive" : "default",
                            })
                          }}
                        >
                          <UserX className="mr-2 h-4 w-4" />
                          {user.status === "Active" ? "Deactivate account" : "Activate account"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  )
}
