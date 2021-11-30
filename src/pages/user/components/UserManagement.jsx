import React from "react";
import { UserManagementHeader } from ".";
import UserManagementList from "./UserManagementList";
import UserRoleDescription from "./UserRoleDescription";

export default function UserManagement() {
  return (
    <div className="wrapper" data-testid="user-management-page">
      <UserManagementHeader />
      <UserManagementList />
      <UserRoleDescription />
    </div>
  );
}
