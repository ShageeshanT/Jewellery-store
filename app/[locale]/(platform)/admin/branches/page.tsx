"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Branch {
  id: string;
  name: string;
  code: string;
  address: {
    city?: string;
    street?: string;
  };
  telephone?: string;
  email?: string;
  isActive: boolean;
  isFlagship: boolean;
}

export default function BranchesPage() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    street: "",
    city: "",
    telephone: "",
    email: "",
  });

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/branches");
      const data = await response.json();
      setBranches(data.branches || []);
    } catch (error) {
      console.error("Error fetching branches:", error);
      toast.error("Failed to load branches");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/admin/branches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          code: formData.code,
          address: {
            street: formData.street,
            city: formData.city,
          },
          telephone: formData.telephone,
          email: formData.email,
          isActive: true,
          isFlagship: false,
        }),
      });

      if (response.ok) {
        toast.success("Branch created successfully");
        setShowForm(false);
        setFormData({
          name: "",
          code: "",
          street: "",
          city: "",
          telephone: "",
          email: "",
        });
        fetchBranches();
      } else {
        toast.error("Failed to create branch");
      }
    } catch (error) {
      console.error("Error creating branch:", error);
      toast.error("Failed to create branch");
    }
  };

  const deleteBranch = async (id: string) => {
    if (!confirm("Are you sure you want to delete this branch?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/branches?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Branch deleted successfully");
        fetchBranches();
      } else {
        toast.error("Failed to delete branch");
      }
    } catch (error) {
      console.error("Error deleting branch:", error);
      toast.error("Failed to delete branch");
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch("/api/admin/branches", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isActive: !currentStatus }),
      });

      if (response.ok) {
        toast.success("Branch status updated");
        fetchBranches();
      } else {
        toast.error("Failed to update branch status");
      }
    } catch (error) {
      console.error("Error updating branch:", error);
      toast.error("Failed to update branch");
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Branches Management</h1>
          <p className="text-gray-600">Manage store locations and information</p>
        </div>

        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Branch
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add New Branch</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Branch Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Main Branch"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Branch Code <span className="text-red-500">*</span>
                  </label>
                  <Input
                    required
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({ ...formData, code: e.target.value })
                    }
                    placeholder="COL-01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Street Address</label>
                  <Input
                    value={formData.street}
                    onChange={(e) =>
                      setFormData({ ...formData, street: e.target.value })
                    }
                    placeholder="123 Main St"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <Input
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    placeholder="Colombo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Telephone</label>
                  <Input
                    type="tel"
                    value={formData.telephone}
                    onChange={(e) =>
                      setFormData({ ...formData, telephone: e.target.value })
                    }
                    placeholder="+94 11 234 5678"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="branch@example.com"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit">Create Branch</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{branches.length} Branches</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center py-8 text-gray-500">Loading...</p>
          ) : branches.length === 0 ? (
            <p className="text-center py-8 text-gray-500">No branches found</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {branches.map((branch) => (
                  <TableRow key={branch.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{branch.name}</p>
                        {branch.isFlagship && (
                          <Badge className="mt-1 bg-amber-100 text-amber-800">
                            Flagship
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{branch.code}</TableCell>
                    <TableCell>
                      {branch.address.street && <p>{branch.address.street}</p>}
                      {branch.address.city && (
                        <p className="text-sm text-gray-500">{branch.address.city}</p>
                      )}
                    </TableCell>
                    <TableCell>
                      {branch.telephone && <p>{branch.telephone}</p>}
                      {branch.email && (
                        <p className="text-sm text-gray-500">{branch.email}</p>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleActive(branch.id, branch.isActive)}
                      >
                        {branch.isActive ? (
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteBranch(branch.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
