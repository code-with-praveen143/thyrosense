"use client";

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useGetUsers } from "@/app/hooks/users/useGetUsers";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useSignUp } from "@/app/hooks/auth/useAuth";
import { User as UserIcon } from "lucide-react";
import { MdAdminPanelSettings } from "react-icons/md";
import { User } from "@/app/@types/user";

function generateRandomPassword() {
  const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";

  const allChars = upperCase + lowerCase + numbers + specialChars;
  let password = "";

  password += upperCase[Math.floor(Math.random() * upperCase.length)];
  password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += specialChars[Math.floor(Math.random() * specialChars.length)];

  for (let i = 4; i < 12; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  return password;
}


export default function UserManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedAlphaName, setSelectedAlphaName] = useState("");
  const [generatedUsername, setGeneratedUsername] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("tester");
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const { data: users } = useGetUsers();
  const signUpMutation = useSignUp();

  const handleNext = () => {
    if (step === 1 && selectedAlphaName) {
      const randomId = Math.floor(Math.random() * 10000000000);
      setGeneratedUsername(`${selectedAlphaName}_${randomId}`);
      setGeneratedPassword(generateRandomPassword());
      setStep(2);
    }
  };

  const handleAddUser = async () => {
    const userData = {
      alphaName: selectedAlphaName,
      username: generatedUsername,
      password: generatedPassword,
      email,
      role,
    };

    try {
      await signUpMutation.mutateAsync(userData);
      console.log("User added successfully:", userData);
      setIsDialogOpen(false);
      setStep(1);
      setSelectedAlphaName("");
      setEmail("");
      setRole("tester");
    } catch (error) {
      console.error("Error during user signup:", error);
    }
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <div className="w-full px-4 md:px-8 lg:px-16">
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-4">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary">User Management</h1>
        <Button
          className="bg-primary text-white mt-2 sm:mt-0"
          onClick={() => setIsDialogOpen(true)}
        >
          Add User
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SI/No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Last Active</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user, index) => (
            <TableRow key={user._id}>
              <TableCell>{(currentPage - 1) * 10 + index + 1}</TableCell>
              <TableCell>{user.alpha}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.isLogin ? `Active` : `InActive`}</TableCell>
              <TableCell className="flex items-center space-x-2">
                {user.role === "admin" ? (
                  <MdAdminPanelSettings
                    className="w-4 h-4 text-gray-500 cursor-pointer"
                    onClick={() => handleUserClick(user)}
                  />
                ) : (
                  <UserIcon
                    className="w-4 h-4 text-gray-500 cursor-pointer"
                    onClick={() => handleUserClick(user)}
                  />
                )}
                <span>{user.role}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Details Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(undefined)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUser?.isLogin ? (
            <div>
              <p><strong>Blood Type:</strong> {selectedUser.blood_type || "N/A"}</p>
              <p><strong>Date of Birth:</strong> {selectedUser.dob || "N/A"}</p>
              <p><strong>Height:</strong> {selectedUser.height || "N/A"}</p>
              <p><strong>Weight:</strong> {selectedUser.weight || "N/A"}</p>
              <p><strong>Marital Status:</strong> {selectedUser.marital_status || "N/A"}</p>
              <p><strong>Lifestyle:</strong></p>
              <ul>
                <li><strong>Smoking Habit:</strong> {selectedUser.lifestyle?.smoking_habit || "N/A"}</li>
                <li><strong>Alcohol Consumption:</strong> {selectedUser.lifestyle?.alcohol_consumption || "N/A"}</li>
                <li><strong>Exercise Routine:</strong> {selectedUser.lifestyle?.exercise_routine || "N/A"}</li>
                <li><strong>Dietary Habits:</strong> {selectedUser.lifestyle?.dietary_habits || "N/A"}</li>
                <li><strong>Sleep Pattern:</strong> {selectedUser.lifestyle?.sleep_pattern || "N/A"}</li>
                <li><strong>Work Environment:</strong> {selectedUser.lifestyle?.work_environment || "N/A"}</li>
              </ul>
            </div>
          ) : (
            <p>You need to register</p>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{step === 1 ? "Select Alpha Name" : "Add User Details"}</DialogTitle>
          </DialogHeader>
          {step === 1 ? (
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Alpha Name</label>
              <select
                value={selectedAlphaName}
                onChange={(e) => setSelectedAlphaName(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select an Alpha Name</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>

               </select>
              <Button
                className="mt-4 bg-primary text-white"
                onClick={handleNext}
                disabled={!selectedAlphaName}
              >
                Next
              </Button>
            </div>
          ) : (
            <div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  value={generatedUsername}
                  readOnly
                  className="block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                <input
                  type="text"
                  value={generatedPassword}
                  readOnly
                  className="block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="block w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  className="bg-primary text-white"
                  onClick={handleAddUser}
                >
                  Add User
                </Button>
                <Button
                  className="bg-gray-200 text-gray-700"
                  onClick={() => {
                    setStep(1);
                    setSelectedAlphaName("");
                    setIsDialogOpen(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
