import AdminLayout from '@/components/AdminLayout';
import { useState } from 'react';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
  status: 'active' | 'inactive';
  icon: string;
  order: number;
  createdAt: string;
}

const mockCategories: Category[] = [
  { id: '1', name: 'เสื้อผ้า', slug: 'clothing', description: 'เสื้อผ้าแฟชั่นทุกประเภท', productCount: 45, status: 'active', icon: '👕', order: 1, createdAt: '2024-01-15' },
  { id: '2', name: 'รองเท้า', slug: 'shoes', description: 'รองเท้าผ้าใบ หนัง และแฟชั่น', productCount: 32, status: 'active', icon: '👟', order: 2, createdAt: '2024-01-20' },
  { id: '3', name: 'กระเป๋า', slug: 'bags', description: 'กระเป๋าแฟชั่น กระเป๋าสะพาย', productCount: 28, status: 'active', icon: '👜', order: 3, createdAt: '2024-02-10' },
  { id: '4', name: 'เครื่องประดับ', slug: 'accessories', description: 'สร้อย แหวน ต่างหู นาฬิกา', productCount: 56, status: 'active', icon: '💍', order: 4, createdAt: '2024-03-05' },
  { id: '5', name: 'แว่นตา', slug: 'eyewear', description: 'แว่นตา แว่นกันแดด', productCount: 15, status: 'active', icon: '🕶️', order: 5, createdAt: '2024-04-12' },
  { id: '6', name: 'หมวก', slug: 'hats', description: 'หมวกแฟชั่นทุกสไตล์', productCount: 8, status: 'inactive', icon: '🧢', order: 6, createdAt: '2024-05-20' },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(mockCategories);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setShowEditModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('คุณต้องการลบหมวดหมู่นี้หรือไม่?')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  const toggleStatus = (id: string) => {
    setCategories(categories.map(c =>
      c.id === id ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c
    ));
  };

  const moveCategory = (id: string, direction: 'up' | 'down') => {
    const index = categories.findIndex(c => c.id === id);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === categories.length - 1)
    ) {
      return;
    }

    const newCategories = [...categories];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newCategories[index], newCategories[targetIndex]] = [newCategories[targetIndex], newCategories[index]];

    // Update order numbers
    newCategories.forEach((cat, idx) => {
      cat.order = idx + 1;
    });

    setCategories(newCategories);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-2xl p-6 lg:p-8 text-white shadow-xl">
          <div>
            <h2 className="text-2xl lg:text-4xl font-bold mb-2">Categories</h2>
            <p className="text-indigo-50 text-sm lg:text-base">จัดการประเภทสินค้าทั้งหมด</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-white hover:bg-gray-50 text-indigo-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all hover:shadow-2xl hover:scale-105 shadow-lg"
          >
            <span className="text-xl">+</span>
            เพิ่มหมวดหมู่ใหม่
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">ทั้งหมด</p>
            <p className="text-3xl font-bold text-gray-900">{categories.length}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Active</p>
            <p className="text-3xl font-bold text-green-600">{categories.filter(c => c.status === 'active').length}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Inactive</p>
            <p className="text-3xl font-bold text-gray-600">{categories.filter(c => c.status === 'inactive').length}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">สินค้าทั้งหมด</p>
            <p className="text-3xl font-bold text-indigo-600">{categories.reduce((sum, c) => sum + c.productCount, 0)}</p>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl shadow-lg p-4 lg:p-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="ค้นหาหมวดหมู่..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
            <select className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-medium">
              <option value="">ทุกสถานะ</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Categories Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    ลำดับ
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    หมวดหมู่
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    คำอธิบาย
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                    สินค้า
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                    สถานะ
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {categories.map((category, index) => (
                  <tr key={category.id} className="hover:bg-indigo-50 transition-all duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-500">#{category.order}</span>
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() => moveCategory(category.id, 'up')}
                            disabled={index === 0}
                            className="text-gray-400 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </button>
                          <button
                            onClick={() => moveCategory(category.id, 'down')}
                            disabled={index === categories.length - 1}
                            className="text-gray-400 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center text-2xl shadow-sm">
                          {category.icon}
                        </div>
                        <span className="text-sm font-bold text-gray-900">{category.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        /{category.slug}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{category.description}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg bg-indigo-100 text-indigo-700 text-sm font-bold">
                        {category.productCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={category.status === 'active'}
                          onChange={() => toggleStatus(category.id)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                      </label>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => handleEdit(category)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-bold hover:underline transition-all"
                        >
                          แก้ไข
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-bold hover:underline transition-all"
                        >
                          ลบ
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
          <h3 className="text-lg font-bold text-gray-900 mb-2">💡 เกี่ยวกับหมวดหมู่</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 mt-1">•</span>
              <span><strong>Slug</strong> จะใช้ใน URL เช่น /category/clothing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 mt-1">•</span>
              <span>ใช้ลูกศรขึ้น-ลงเพื่อ<strong>จัดเรียงลำดับ</strong>การแสดงผล</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 mt-1">•</span>
              <span>หมวดหมู่ที่เป็น <strong>Inactive</strong> จะไม่แสดงบนหน้าเว็บ</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 mt-1">•</span>
              <span>ไม่สามารถลบหมวดหมู่ที่มีสินค้าอยู่ได้ ต้องย้ายสินค้าออกก่อน</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 lg:p-8 max-w-lg w-full shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">เพิ่มหมวดหมู่ใหม่</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">ชื่อหมวดหมู่</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="เช่น เสื้อผ้า"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Slug (URL)</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  placeholder="clothing"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Icon (Emoji)</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-2xl text-center"
                  placeholder="👕"
                  maxLength={2}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">คำอธิบาย</label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="คำอธิบายสั้นๆ เกี่ยวกับหมวดหมู่นี้"
                  rows={3}
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
              <button className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl font-bold hover:shadow-lg transition-all">
                เพิ่มหมวดหมู่
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {showEditModal && selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 lg:p-8 max-w-lg w-full shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">แก้ไขหมวดหมู่</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">ชื่อหมวดหมู่</label>
                <input
                  type="text"
                  defaultValue={selectedCategory.name}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Slug (URL)</label>
                <input
                  type="text"
                  defaultValue={selectedCategory.slug}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Icon (Emoji)</label>
                <input
                  type="text"
                  defaultValue={selectedCategory.icon}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-2xl text-center"
                  maxLength={2}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">คำอธิบาย</label>
                <textarea
                  defaultValue={selectedCategory.description}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-all"
              >
                ยกเลิก
              </button>
              <button className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl font-bold hover:shadow-lg transition-all">
                บันทึกการแก้ไข
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
