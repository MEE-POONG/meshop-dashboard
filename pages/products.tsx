import AdminLayout from '@/components/AdminLayout';

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive';
  image: string;
}

const mockProducts: Product[] = [
  { id: '1', name: 'เสื้อยืดคอกลม สีขาว', sku: 'TSH-001', price: 299, stock: 150, status: 'active', image: '👕' },
  { id: '2', name: 'กางเกงยีนส์ขายาว', sku: 'PNT-001', price: 890, stock: 85, status: 'active', image: '👖' },
  { id: '3', name: 'รองเท้าผ้าใบ สีดำ', sku: 'SHO-001', price: 1590, stock: 42, status: 'active', image: '👟' },
  { id: '4', name: 'กระเป๋าสะพาย หนังแท้', sku: 'BAG-001', price: 2490, stock: 28, status: 'active', image: '👜' },
  { id: '5', name: 'หมวกแก๊ป สีน้ำเงิน', sku: 'HAT-001', price: 350, stock: 120, status: 'active', image: '🧢' },
  { id: '6', name: 'แว่นตากันแดด', sku: 'GLS-001', price: 790, stock: 0, status: 'inactive', image: '🕶️' },
  { id: '7', name: 'นาฬิกาข้อมือ', sku: 'WTC-001', price: 3500, stock: 35, status: 'active', image: '⌚' },
  { id: '8', name: 'เข็มขัดหนัง', sku: 'BLT-001', price: 590, stock: 67, status: 'active', image: '👔' },
];

export default function ProductsPage() {
  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: 'สินค้าหมด', color: 'text-red-600 bg-red-50' };
    if (stock < 20) return { text: 'ใกล้หมด', color: 'text-orange-600 bg-orange-50' };
    return { text: 'พร้อมขาย', color: 'text-green-600 bg-green-50' };
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-6 lg:p-8 text-white shadow-xl">
          <div>
            <h2 className="text-2xl lg:text-4xl font-bold mb-2">Products</h2>
            <p className="text-blue-50 text-sm lg:text-base">จัดการสินค้าทั้งหมดในร้าน</p>
          </div>
          <button className="bg-white hover:bg-gray-50 text-blue-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all hover:shadow-2xl hover:scale-105 shadow-lg">
            <span className="text-xl">+</span>
            เพิ่มสินค้าใหม่
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-4 lg:p-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="ค้นหาสินค้า..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <select className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium">
              <option value="">ทุกสถานะ</option>
              <option value="active">พร้อมขาย</option>
              <option value="inactive">ไม่พร้อมขาย</option>
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    สินค้า
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    SKU
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    ราคา
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    สถานะ
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {mockProducts.map((product) => {
                  const stockStatus = getStockStatus(product.stock);
                  return (
                    <tr key={product.id} className="hover:bg-blue-50 transition-all duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-2xl shadow-sm">
                            {product.image}
                          </div>
                          <span className="text-sm font-semibold text-gray-900">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">{product.sku}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-bold text-gray-900">
                          ฿{product.price.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-900">{product.stock}</span>
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${stockStatus.color}`}>
                            {stockStatus.text}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                            product.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {product.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-3">
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-bold hover:underline transition-all">
                            แก้ไข
                          </button>
                          <button className="text-red-600 hover:text-red-800 text-sm font-bold hover:underline transition-all">
                            ลบ
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <span className="text-sm text-gray-600">
              แสดง 1-8 จาก 8 รายการ
            </span>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled>
                ก่อนหน้า
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium">
                1
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled>
                ถัดไป
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
