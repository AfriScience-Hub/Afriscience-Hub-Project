'use client';

import React, { useState, useCallback } from 'react';
import { Download, Plus, Search, Edit, ChevronLeft, ChevronRight, Crown, Shield, ShieldCheck, Eye, DollarSign, Headphones, Bell, HelpCircle, FileText, Settings, Users, Layers, CheckCircle, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Role {
  id: string;
  name: string;
  type: 'System Role' | 'Custom Role';
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  userCount: number;
}

interface PermissionModule {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  permissions: string[];
}

const ROLES: Role[] = [
  { id: 'super-admin', name: 'Super Admin', type: 'System Role', description: 'Full system access', icon: Crown, iconBg: 'bg-purple-100 text-purple-600', userCount: 1 },
  { id: 'admin', name: 'Admin', type: 'System Role', description: 'Manage platform operations', icon: Shield, iconBg: 'bg-blue-100 text-blue-600', userCount: 6 },
  { id: 'content-admin', name: 'Content Admin', type: 'Custom Role', description: 'Manage content and listings', icon: FileText, iconBg: 'bg-green-100 text-green-600', userCount: 4 },
  { id: 'verification-officer', name: 'Verification Officer', type: 'Custom Role', description: 'Handle verification processes', icon: ShieldCheck, iconBg: 'bg-orange-100 text-orange-600', userCount: 3 },
  { id: 'finance-manager', name: 'Finance Manager', type: 'Custom Role', description: 'Manage invoices and payments', icon: DollarSign, iconBg: 'bg-yellow-100 text-yellow-600', userCount: 2 },
  { id: 'support-agent', name: 'Support Agent', type: 'Custom Role', description: 'Handle support and enquiries', icon: Headphones, iconBg: 'bg-pink-100 text-pink-600', userCount: 4 },
  { id: 'viewer', name: 'Viewer', type: 'Custom Role', description: 'View only access', icon: Eye, iconBg: 'bg-gray-100 text-gray-600', userCount: 2 },
];

const MODULES: PermissionModule[] = [
  { name: 'Dashboard', description: 'View dashboard and analytics', icon: BarChart3, iconBg: 'bg-blue-100 text-blue-600', permissions: ['View Dashboard', 'Export Reports'] },
  { name: 'User Management', description: 'Manage users and admins', icon: Users, iconBg: 'bg-purple-100 text-purple-600', permissions: ['View Users', 'Create Users', 'Edit Users', 'Delete Users', 'Manage Roles'] },
  { name: 'Categories', description: 'Manage all categories', icon: Layers, iconBg: 'bg-green-100 text-green-600', permissions: ['View Categories', 'Add Content', 'Edit Content', 'Delete Content', 'View Category Dashboard'] },
  { name: 'Approvals', description: 'Review and approve content', icon: CheckCircle, iconBg: 'bg-teal-100 text-teal-600', permissions: ['View Submissions', 'Approve Content', 'Reject Content', 'Request Changes'] },
  { name: 'Verification Centre', description: 'Handle verification processes', icon: ShieldCheck, iconBg: 'bg-orange-100 text-orange-600', permissions: ['View Verifications', 'Verify Users', 'Reject Verifications'] },
  { name: 'Invoices', description: 'Manage invoices and payments', icon: DollarSign, iconBg: 'bg-yellow-100 text-yellow-600', permissions: ['View Invoices', 'Create Invoices', 'Edit Invoices', 'Mark as Paid', 'Refund Payments'] },
  { name: 'Reports & Analytics', description: 'View system reports', icon: BarChart3, iconBg: 'bg-indigo-100 text-indigo-600', permissions: ['View Analytics', 'Export Reports'] },
  { name: 'System Settings', description: 'Manage system configuration', icon: Settings, iconBg: 'bg-gray-100 text-gray-600', permissions: ['General Settings', 'Email Templates', 'Payment Settings', 'Manage Integrations'] },
  { name: 'Notifications', description: 'Manage system notifications', icon: Bell, iconBg: 'bg-red-100 text-red-600', permissions: ['View Notifications', 'Send Notifications', 'Manage Templates'] },
  { name: 'Help & Support', description: 'Manage support and tickets', icon: HelpCircle, iconBg: 'bg-cyan-100 text-cyan-600', permissions: ['View Tickets', 'Respond to Tickets', 'Close Tickets'] },
  { name: 'Activity Logs', description: 'View system activity logs', icon: FileText, iconBg: 'bg-amber-100 text-amber-600', permissions: ['View Activity Logs'] },
  { name: 'Admin Management', description: 'Manage administrators', icon: Shield, iconBg: 'bg-violet-100 text-violet-600', permissions: ['View Admins', 'Add Admins', 'Edit Admins', 'Remove Admins'] },
];

export default function RolesPermissionsPage() {
  const [activeTab, setActiveTab] = useState<'Roles' | 'Permissions'>('Roles');
  const [selectedRole, setSelectedRole] = useState<Role>(ROLES[0]);
  const [roleSearch, setRoleSearch] = useState('');
  const [permissionsTab, setPermissionsTab] = useState<'Permissions' | 'Users'>('Permissions');

  const [modulePermissions, setModulePermissions] = useState<Record<string, Record<string, boolean>>>(() => {
    const initial: Record<string, Record<string, boolean>> = {};
    MODULES.forEach((m) => {
      initial[m.name] = {};
      m.permissions.forEach((p) => {
        initial[m.name][p] = true;
      });
    });
    return initial;
  });

  const toggleModule = useCallback((moduleName: string) => {
    setModulePermissions((prev) => {
      const modulePerms = prev[moduleName];
      const allChecked = Object.values(modulePerms).every(Boolean);
      const updated = { ...modulePerms };
      Object.keys(updated).forEach((k) => { updated[k] = !allChecked; });
      return { ...prev, [moduleName]: updated };
    });
  }, []);

  const togglePermission = useCallback((moduleName: string, permission: string) => {
    setModulePermissions((prev) => {
      const updated = { ...prev[moduleName], [permission]: !prev[moduleName][permission] };
      return { ...prev, [moduleName]: updated };
    });
  }, []);

  const toggleAllModules = useCallback(() => {
    setModulePermissions((prev) => {
      const allChecked = MODULES.every((m) => Object.values(prev[m.name]).every(Boolean));
      const updated: Record<string, Record<string, boolean>> = {};
      MODULES.forEach((m) => {
        updated[m.name] = {};
        m.permissions.forEach((p) => {
          updated[m.name][p] = !allChecked;
        });
      });
      return updated;
    });
  }, []);

  const allModulesChecked = MODULES.every((m) => Object.values(modulePermissions[m.name]).every(Boolean));
  const someModulesChecked = MODULES.some((m) => Object.values(modulePermissions[m.name]).some(Boolean));

  const filteredRoles = ROLES.filter((r) =>
    r.name.toLowerCase().includes(roleSearch.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-0.5">
            <span>Dashboard</span><span>/</span><span>User Management</span><span>/</span>
            <span className="text-neutral-black font-medium">Roles & Permissions</span>
          </div>
          <h1 className="text-xl font-bold text-neutral-black">Roles & Permissions</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-neutral-gray-light rounded-lg text-xs font-medium text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer">
            <Download className="h-3.5 w-3.5" /> Export Roles
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#453DD8] text-white rounded-lg text-xs font-medium hover:bg-[#3a33c0] cursor-pointer">
            <Plus className="h-3.5 w-3.5" /> Create New Role
          </button>
        </div>
      </div>

      <div className="border-b border-neutral-gray-light">
        <div className="flex gap-0">
          {(['Roles', 'Permissions'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-3 py-2 text-xs font-medium border-b-2 transition-colors cursor-pointer",
                activeTab === tab
                  ? "border-[#453DD8] text-[#453DD8]"
                  : "border-transparent text-neutral-gray-medium hover:text-neutral-black"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-60 flex-shrink-0">
          <div className="rounded-lg border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
            <div className="p-3 border-b border-neutral-gray-light">
              <h3 className="text-xs font-semibold text-neutral-black">Roles</h3>
              <p className="text-[9px] text-neutral-gray-medium mt-0.5">Manage user roles and their permissions</p>
              <div className="relative mt-2">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-neutral-gray-medium" />
                <input
                  type="text"
                  placeholder="Search roles..."
                  value={roleSearch}
                  onChange={(e) => setRoleSearch(e.target.value)}
                  className="w-full pl-7 pr-2 py-1.5 text-[10px] rounded-lg border border-neutral-gray-light focus:border-[#453DD8] focus:ring-1 focus:ring-[#453DD8] outline-none"
                />
              </div>
            </div>
            <div className="divide-y divide-neutral-gray-light max-h-[400px] overflow-y-auto">
              {filteredRoles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role)}
                  className={cn(
                    "w-full flex items-center gap-2 p-2.5 text-left transition-colors cursor-pointer",
                    selectedRole.id === role.id ? "bg-[#453DD8]/5 border-l-2 border-[#453DD8]" : "hover:bg-neutral-bg-light border-l-2 border-transparent"
                  )}
                >
                  <div className={cn("p-1.5 rounded-lg flex-shrink-0", role.iconBg)}>
                    <role.icon className="h-3 w-3" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-medium text-neutral-black truncate">{role.name}</span>
                      <span className={cn(
                        "px-1 py-0.5 rounded text-[8px] font-medium flex-shrink-0",
                        role.type === 'System Role' ? 'bg-purple-100 text-purple-600' : 'bg-green-100 text-green-600'
                      )}>{role.type}</span>
                    </div>
                    <p className="text-[9px] text-neutral-gray-medium truncate">{role.description}</p>
                  </div>
                  <div className="flex items-center gap-0.5 text-[9px] text-neutral-gray-medium flex-shrink-0">
                    <Users className="h-2.5 w-2.5" />
                    <span>{role.userCount}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between p-2 border-t border-neutral-gray-light">
              <span className="text-[9px] text-neutral-gray-medium">1-7 of 7 roles</span>
              <div className="flex items-center gap-0.5">
                <button className="p-0.5 rounded hover:bg-neutral-bg-light cursor-pointer"><ChevronLeft className="h-3 w-3 text-neutral-gray-medium" /></button>
                <button className="p-0.5 rounded hover:bg-neutral-bg-light cursor-pointer"><ChevronRight className="h-3 w-3 text-neutral-gray-medium" /></button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="rounded-lg border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
            <div className="p-4 border-b border-neutral-gray-light">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={cn("p-2 rounded-xl", selectedRole.iconBg)}>
                    <selectedRole.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h2 className="text-sm font-bold text-neutral-black">{selectedRole.name}</h2>
                      <span className={cn(
                        "px-1.5 py-0.5 rounded text-[9px] font-medium",
                        selectedRole.type === 'System Role' ? 'bg-purple-100 text-purple-600' : 'bg-green-100 text-green-600'
                      )}>{selectedRole.type}</span>
                    </div>
                    <p className="text-[10px] text-neutral-gray-dark mt-0.5">Has full access to all modules and features in the system.</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button className="flex items-center gap-1.5 px-2.5 py-1.5 border border-neutral-gray-light rounded-lg text-[10px] font-medium text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer">
                    <Edit className="h-3 w-3" /> Edit Role
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-neutral-bg-light cursor-pointer">
                    <svg className="h-4 w-4 text-neutral-gray-medium" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" /></svg>
                  </button>
                </div>
              </div>

              <div className="flex gap-0 mt-3 border-b border-neutral-gray-light -mb-px">
                {(['Permissions', 'Users'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setPermissionsTab(tab)}
                    className={cn(
                      "px-3 py-1.5 text-[10px] font-medium border-b-2 transition-colors cursor-pointer",
                      permissionsTab === tab
                        ? "border-[#453DD8] text-[#453DD8]"
                        : "border-transparent text-neutral-gray-medium hover:text-neutral-black"
                    )}
                  >
                    {tab === 'Users' ? `Users with this role (${selectedRole.userCount})` : tab}
                  </button>
                ))}
              </div>
            </div>

            {permissionsTab === 'Permissions' && (
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-xs font-semibold text-neutral-black">Module Permissions</h3>
                    <p className="text-[9px] text-neutral-gray-medium mt-0.5">Configure what this role can access and perform in each module</p>
                  </div>
                  <label className="flex items-center gap-1.5 text-[10px] text-neutral-gray-dark cursor-pointer">
                    <input
                      type="checkbox"
                      checked={allModulesChecked}
                      ref={(el) => { if (el) el.indeterminate = someModulesChecked && !allModulesChecked; }}
                      onChange={toggleAllModules}
                      className="rounded border-neutral-gray-light text-[#453DD8] focus:ring-[#453DD8] w-3 h-3"
                    />
                    Select All Modules
                  </label>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {MODULES.map((mod) => {
                    const moduleChecked = Object.values(modulePermissions[mod.name]).every(Boolean);
                    const modulePartial = Object.values(modulePermissions[mod.name]).some(Boolean) && !moduleChecked;

                    return (
                      <div key={mod.name} className="rounded-lg border border-neutral-gray-light p-3 hover:shadow-sm transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1.5">
                            <div className={cn("p-1 rounded", mod.iconBg)}>
                              <mod.icon className="h-3 w-3" />
                            </div>
                            <div>
                              <p className="text-[10px] font-medium text-neutral-black">{mod.name}</p>
                              <p className="text-[8px] text-neutral-gray-medium">{mod.description}</p>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={moduleChecked}
                            ref={(el) => { if (el) el.indeterminate = modulePartial; }}
                            onChange={() => toggleModule(mod.name)}
                            className="rounded border-neutral-gray-light text-[#453DD8] focus:ring-[#453DD8] cursor-pointer w-3 h-3"
                          />
                        </div>
                        <div className="space-y-1.5">
                          {mod.permissions.map((perm) => (
                            <label key={perm} className="flex items-center gap-1.5 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={modulePermissions[mod.name][perm] || false}
                                onChange={() => togglePermission(mod.name, perm)}
                                className="rounded border-neutral-gray-light text-[#453DD8] focus:ring-[#453DD8] cursor-pointer w-3 h-3"
                              />
                              <span className="text-[9px] text-neutral-gray-dark">{perm}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {permissionsTab === 'Users' && (
              <div className="p-4">
                <p className="text-[10px] text-neutral-gray-dark">Users assigned to this role will appear here.</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-3 px-1">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-[#453DD8] flex items-center justify-center">
                  <svg className="h-2 w-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="text-[9px] text-neutral-gray-dark">Full Access</span>
                <span className="text-[8px] text-neutral-gray-medium">Can view, create, edit and delete</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-blue-500 flex items-center justify-center">
                  <svg className="h-2 w-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="text-[9px] text-neutral-gray-dark">Partial Access</span>
                <span className="text-[8px] text-neutral-gray-medium">Can view and perform limited actions</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded border-2 border-neutral-gray-light bg-white" />
                <span className="text-[9px] text-neutral-gray-dark">No Access</span>
                <span className="text-[8px] text-neutral-gray-medium">No permissions</span>
              </div>
            </div>
            <button className="flex items-center gap-1.5 px-4 py-2 bg-[#453DD8] text-white rounded-lg text-[10px] font-medium hover:bg-[#3a33c0] cursor-pointer">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
