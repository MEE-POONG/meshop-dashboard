import AdminLayout from '@/components/AdminLayout';
import StatCard from '@/components/StatCard';

interface RecentOrder {
  id: string;
  customer: string;
  status: 'PAID' | 'PENDING' | 'SHIPPED' | 'CANCELLED';
  total: number;
  date: string;
}

const mockRecentOrders: RecentOrder[] = [
  { id: 'ORD-001', customer: 'สมชาย ใจดี', status: 'PAID', total: 2500, date: '2025-11-19' },
  { id: 'ORD-002', customer: 'สมหญิง รักสวย', status: 'PENDING', total: 1800, date: '2025-11-19' },
  { id: 'ORD-003', customer: 'วิชัย มั่นคง', status: 'SHIPPED', total: 3200, date: '2025-11-18' },
  { id: 'ORD-004', customer: 'นภา สุขใส', status: 'PAID', total: 950, date: '2025-11-18' },
  { id: 'ORD-005', customer: 'ธนา เจริญ', status: 'CANCELLED', total: 1500, date: '2025-11-17' },
];

export default function AdminDashboard() {
  const getStatusBadge = (status: RecentOrder['status']) => {
    const styles = {
      PAID: 'bg-green-100 text-green-800',
      PENDING: 'bg-yellow-100 text-yellow-800',
      SHIPPED: 'bg-blue-100 text-blue-800',
      CANCELLED: 'bg-red-100 text-red-800',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-6 lg:p-8 text-white shadow-xl">
          <h2 className="text-2xl lg:text-4xl font-bold mb-2">Overview</h2>
          <p className="text-blue-50 text-sm lg:text-base">ภาพรวมของร้านค้าและประสิทธิภาพการขาย</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="ยอดขายรวม"
            value="฿245,850"
            description="เดือนนี้"
            icon="💰"
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatCard
            title="จำนวนออเดอร์"
            value="156"
            description="ออเดอร์ทั้งหมด"
            icon="🛒"
            trend={{ value: 8.2, isPositive: true }}
          />
          <StatCard
            title="จำนวนสินค้า"
            value="342"
            description="สินค้าในระบบ"
            icon="📦"
          />
          <StatCard
            title="จำนวนสมาชิก"
            value="1,248"
            description="สมาชิกทั้งหมด"
            icon="👥"
            trend={{ value: 3.1, isPositive: false }}
          />
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900">ออเดอร์ล่าสุด</h3>
            <p className="text-sm text-gray-500 mt-1">รายการออเดอร์ล่าสุดในระบบ</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {mockRecentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-blue-50 transition-all duration-200 cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-blue-600 hover:text-blue-700">{order.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{order.customer}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-gray-900">
                        ฿{order.total.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-500">{order.date}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
              ดูออเดอร์ทั้งหมด →
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
