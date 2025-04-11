import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col bg-base-100">
      <div className="border-b border-base-300 px-4 py-5">
        <div className="flex items-center gap-2">
          <Users className="size-5 text-primary" />
          <span className="text-lg font-semibold hidden lg:block text-base-content">Contacts</span>
        </div>

        <div className="mt-4 hidden lg:flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm checkbox-primary"
            />
            <span className="text-base-content/70">Online only</span>
          </label>
          <span className="text-xs text-base-content/50">
            {onlineUsers.length - 1} online
          </span>
        </div>
      </div>

      <div className="overflow-y-auto w-full px-1 py-3 space-y-1 flex-1">
        {filteredUsers.map((user) => {
          const isSelected = selectedUser?._id === user._id;
          const isOnline = onlineUsers.includes(user._id);

          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`group w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isSelected
                  ? "bg-primary/10 ring-2 ring-primary/30 text-primary"
                  : "hover:bg-base-300/50 text-base-content"
              }`}
            >
              <div className="relative">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.name}
                  className="size-10 rounded-full object-cover border border-base-300"
                />
                {isOnline && (
                  <span className="absolute bottom-0 right-0 size-2.5 bg-green-500 rounded-full ring-2 ring-base-100" />
                )}
              </div>

              <div className="hidden lg:block text-left truncate flex-1">
                <div className="text-sm font-medium truncate">{user.fullName}</div>
                <div className="text-xs text-base-content/50">
                  {isOnline ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          );
        })}

        {filteredUsers.length === 0 && (
          <div className="text-center text-sm text-base-content/50 mt-5">
            No users found
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
