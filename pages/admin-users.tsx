import AdminLayout from '@/components/AdminLayout';
import { useState } from 'react';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Admin' | 'Moderator';
  status: 'active' | 'inactive';
  lastLogin: string;
  createdAt: string;
}

const mockAdminUsers: AdminUser[] = [
  { id: '1', name: 'ธนวัฒน์ ศรีสุข', email: 'thanawat@meshop.com', role: 'Super Admin', status: 'active', lastLogin: '2025-11-19 14:30', createdAt: '2024-01-15' },
  { id: '2', name: 'สมชาย ใจดี', email: 'somchai@meshop.com', role: 'Admin', status: 'active', lastLogin: '2025-11-19 10:15', createdAt: '2024-03-20' },
  { id: '3', name: 'นภา วงศ์ดี', email: 'napa@meshop.com', role: 'Admin', status: 'active', lastLogin: '2025-11-18 16:45', createdAt: '2024-05-10' },
  { id: '4', name: 'วิชัย มั่นคง', email: 'wichai@meshop.com', role: 'Moderator', status: 'active', lastLogin: '2025-11-17 09:20', createdAt: '2024-07-22' },
  { id: '5', name: 'สุดา ทองดี', email: 'suda@meshop.com', role: 'Moderator', status: 'inactive', lastLogin: '2025-11-10 13:00', createdAt: '2024-09-05' },
];

export default function AdminUsersPage() {
  const [showAddModal, setShowAddModal] = useState(false);

  const getRoleBadge = (role: AdminUser['role']) => {
    const styles = {
      'Super Admin': 'bg-purple-100 text-purple-700',
      'Admin': 'bg-blue-100 text-blue-700',
      'Moderator': 'bg-green-100 text-green-700',
    };

    return (
      <span className={`px-3 py-1.5 rounded-xl text-xs font-bold ${styles[role]}`}>
        {role}
      </span>
    );
  };

  const getStatusBadge = (status: AdminUser['status']) => {
    return (
      <span
        className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
          status === 'active'
            ? 'bg-green-100 text-green-700'
            : 'bg-gray-100 text-gray-700'
        }`}
      >
        {status === 'active' ? 'Active' : 'Inactive'}
      </span>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-gradient-to-r from-purple-600 to-purple-500 rounded-2xl p-6 lg:p-8 text-white shadow-xl">
          <div>
            <h2 className="text-2xl lg:text-4xl font-bold mb-2">Admin Users</h2>
            <p className="text-purple-50 text-sm lg:text-base">จัดการผู้ดูแลระบบทั้งหมด</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-white hover:bg-gray-50 text-purple-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all hover:shadow-2xl hover:scale-105 shadow-lg"
          >
            <span className="text-xl">+</span>
            เพิ่ม Admin ใหม่
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Total Admins</p>
            <p className="text-3xl font-bold text-gray-900">5</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Super Admins</p>
            <p className="text-3xl font-bold text-purple-600">1</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Admins</p>
            <p className="text-3xl font-bold text-blue-600">2</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Moderators</p>
            <p className="text-3xl font-bold text-green-600">2</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-4 lg:p-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="ค้นหา Admin..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
            <select className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all font-medium">
              <option value="">ทุกตำแหน่ง</option>
              <option value="super-admin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
            </select>
            <select className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all font-medium">
              <option value="">ทุกสถานะ</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Admin Users Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Admin
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    อีเมล
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    ตำแหน่ง
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    สถานะ
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Login ล่าสุด
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    วันที่สร้าง
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {mockAdminUsers.map((admin) => (
                  <tr key={admin.id} className="hover:bg-purple-50 transition-all duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                          {admin.name.charAt(0)}
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{admin.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{admin.email}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getRoleBadge(admin.role)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(admin.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-500">{admin.lastLogin}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-500">{admin.createdAt}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-3">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-bold hover:underline transition-all">
                          แก้ไข
                        </button>
                        {admin.role !== 'Super Admin' && (
                          <button className="text-red-600 hover:text-red-800 text-sm font-bold hover:underline transition-all">
                            ลบ
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Permissions Info */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">🔐 สิทธิ์การเข้าถึง</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                <h4 className="font-bold text-gray-900">Super Admin</h4>
              </div>
              <p className="text-sm text-gray-600">เข้าถึงได้ทุกส่วน สามารถจัดการ Admin อื่นๆ ได้</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                <h4 className="font-bold text-gray-900">Admin</h4>
              </div>
              <p className="text-sm text-gray-600">จัดการสินค้า, ออเดอร์, ลูกค้า และตั้งค่าระบบ</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <h4 className="font-bold text-gray-900">Moderator</h4>
              </div>
              <p className="text-sm text-gray-600">ดูและจัดการสินค้า, ออเดอร์เท่านั้น</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Admin Modal (Simple) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 lg:p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">เพิ่ม Admin ใหม่</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">ชื่อ-นามสกุล</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="กรอกชื่อ-นามสกุล"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">อีเมล</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="example@meshop.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">ตำแหน่ง</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium">
                  <option value="">เลือกตำแหน่ง</option>
                  <option value="admin">Admin</option>
                  <option value="moderator">Moderator</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">รหัสผ่านเริ่มต้น</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="ระบุรหัสผ่าน"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-all"
              >
                ยกเลิก
              </button>
              <button className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl font-bold hover:shadow-lg transition-all">
                เพิ่ม Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
