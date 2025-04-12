import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Search, ChevronDown } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = (showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users
  ).filter(user => 
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-96 border-r border-neutral-200 dark:border-neutral-800 flex flex-col bg-white dark:bg-neutral-950">
      {/* Header */}
      <div className="px-4 py-4 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center gap-3">
            <Users className="size-5 text-primary-600 dark:text-primary-400" />
            <span className="text-lg font-semibold hidden lg:block text-neutral-900 dark:text-white">
              Contacts
            </span>
          </div>
          
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-sm rounded-lg bg-neutral-100 dark:bg-neutral-800 border-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Online filter */}
        <div className="mt-4 hidden lg:flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-neutral-200 peer-focus:outline-none rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-neutral-600 peer-checked:bg-primary-600"></div>
            </div>
            <span className="text-neutral-600 dark:text-neutral-300">Online only</span>
          </label>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {onlineUsers.length - 1} online
          </span>
        </div>
      </div>

      {/* User list */}
      <div className="overflow-y-auto w-full px-2 py-2 space-y-1 flex-1">
        {filteredUsers.map((user) => {
          const isSelected = selectedUser?._id === user._id;
          const isOnline = onlineUsers.includes(user._id);

          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                isSelected
                  ? "bg-primary-100/70 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800"
                  : "hover:bg-neutral-100 dark:hover:bg-neutral-800/50"
              }`}
            >
              <div className="relative">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.name}
                  className="size-10 rounded-full object-cover border-2 border-white dark:border-neutral-800 shadow-sm"
                />
                {isOnline && (
                  <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-white dark:border-neutral-800" />
                )}
              </div>

              <div className="hidden lg:block text-left truncate flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-900 dark:text-white truncate">
                    {user.fullName}
                  </span>
                  <ChevronDown className="size-4 text-neutral-400 transform -rotate-90" />
                </div>
                <div className={`text-xs mt-0.5 ${
                  isOnline 
                    ? "text-green-600 dark:text-green-400" 
                    : "text-neutral-500 dark:text-neutral-400"
                }`}>
                  {isOnline ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          );
        })}

        {filteredUsers.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center p-6">
            <Search className="size-6 text-neutral-400 mb-2" />
            <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
              No users found
            </div>
            <div className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
              {searchQuery ? "Try a different search" : showOnlineOnly ? "No online users" : "No contacts available"}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;