import AdminLayout from '@/components/AdminLayout';

interface Order {
  id: string;
  customer: string;
  email: string;
  products: number;
  total: number;
  status: 'PAID' | 'PENDING' | 'SHIPPED' | 'CANCELLED' | 'DELIVERED';
  date: string;
}

const mockOrders: Order[] = [
  { id: 'ORD-001', customer: 'สมชาย ใจดี', email: 'somchai@email.com', products: 3, total: 2500, status: 'PAID', date: '2025-11-19' },
  { id: 'ORD-002', customer: 'สมหญิง รักสวย', email: 'somying@email.com', products: 2, total: 1800, status: 'PENDING', date: '2025-11-19' },
  { id: 'ORD-003', customer: 'วิชัย มั่นคง', email: 'wichai@email.com', products: 5, total: 3200, status: 'SHIPPED', date: '2025-11-18' },
  { id: 'ORD-004', customer: 'นภา สุขใส', email: 'napa@email.com', products: 1, total: 950, status: 'DELIVERED', date: '2025-11-18' },
  { id: 'ORD-005', customer: 'ธนา เจริญ', email: 'tana@email.com', products: 2, total: 1500, status: 'CANCELLED', date: '2025-11-17' },
  { id: 'ORD-006', customer: 'สุดา วงศ์ดี', email: 'suda@email.com', products: 4, total: 4200, status: 'PAID', date: '2025-11-17' },
  { id: 'ORD-007', customer: 'ประยุทธ ทองดี', email: 'prayut@email.com', products: 2, total: 1690, status: 'SHIPPED', date: '2025-11-16' },
];

export default function OrdersPage() {
  const getStatusBadge = (status: Order['status']) => {
    const styles = {
      PAID: 'bg-green-100 text-green-800',
      PENDING: 'bg-yellow-100 text-yellow-800',
      SHIPPED: 'bg-blue-100 text-blue-800',
      DELIVERED: 'bg-purple-100 text-purple-800',
      CANCELLED: 'bg-red-100 text-red-800',
    };

    const labels = {
      PAID: 'ชำระแล้ว',
      PENDING: 'รอชำระ',
      SHIPPED: 'จัดส่งแล้ว',
      DELIVERED: 'ส่งสำเร็จ',
      CANCELLED: 'ยกเลิก',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Orders</h2>
            <p className="text-gray-600 mt-1">จัดการออเดอร์ทั้งหมด</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-600">ทั้งหมด</p>
            <p className="text-2xl font-bold text-gray-900">156</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-600">รอชำระ</p>
            <p className="text-2xl font-bold text-yellow-600">12</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-600">กำลังจัดส่ง</p>
            <p className="text-2xl font-bold text-blue-600">28</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-gray-600">สำเร็จ</p>
            <p className="text-2xl font-bold text-green-600">114</p>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="ค้นหาออเดอร์..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">ทุกสถานะ</option>
              <option value="PAID">ชำระแล้ว</option>
              <option value="PENDING">รอชำระ</option>
              <option value="SHIPPED">จัดส่งแล้ว</option>
              <option value="DELIVERED">ส่งสำเร็จ</option>
              <option value="CANCELLED">ยกเลิก</option>
            </select>
            <input
              type="date"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ลูกค้า
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    อีเมล
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    สินค้า
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ยอดรวม
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    สถานะ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    วันที่
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-blue-600">{order.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{order.customer}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{order.email}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{order.products} รายการ</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900">
                        ฿{order.total.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-500">{order.date}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        ดูรายละเอียด
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
