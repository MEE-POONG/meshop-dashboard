import AdminLayout from '@/components/AdminLayout';
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  isFlashSale: boolean;
  isRecommend: boolean;
  isNew: boolean;
  flashSalePrice?: number;
}

interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed' | 'free_shipping';
  value: number;
  minPurchase: number;
  maxDiscount?: number;
  usageLimit: number;
  usageCount: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'inactive' | 'expired';
  description: string;
}

const mockProducts: Product[] = [
  { id: '1', name: 'เสื้อยืดคอกลม สีขาว', price: 299, image: '👕', isFlashSale: true, isRecommend: false, isNew: false, flashSalePrice: 199 },
  { id: '2', name: 'กางเกงยีนส์ขายาว', price: 890, image: '👖', isFlashSale: false, isRecommend: true, isNew: false },
  { id: '3', name: 'รองเท้าผ้าใบ สีดำ', price: 1590, image: '👟', isFlashSale: true, isRecommend: true, isNew: false, flashSalePrice: 1290 },
  { id: '4', name: 'กระเป๋าสะพาย หนังแท้', price: 2490, image: '👜', isFlashSale: false, isRecommend: false, isNew: true },
  { id: '5', name: 'หมวกแก๊ป สีน้ำเงิน', price: 350, image: '🧢', isFlashSale: false, isRecommend: true, isNew: true },
  { id: '6', name: 'แว่นตากันแดด', price: 790, image: '🕶️', isFlashSale: false, isRecommend: false, isNew: true },
];

const mockCoupons: Coupon[] = [
  { id: '1', code: 'WELCOME10', type: 'percentage', value: 10, minPurchase: 500, usageLimit: 100, usageCount: 45, startDate: '2025-01-01', endDate: '2025-12-31', status: 'active', description: 'ส่วนลด 10% สำหรับลูกค้าใหม่' },
  { id: '2', code: 'FREESHIP', type: 'free_shipping', value: 0, minPurchase: 1000, usageLimit: 500, usageCount: 234, startDate: '2025-01-01', endDate: '2025-12-31', status: 'active', description: 'จัดส่งฟรีเมื่อซื้อครบ 1,000 บาท' },
  { id: '3', code: 'SAVE100', type: 'fixed', value: 100, minPurchase: 800, usageLimit: 200, usageCount: 87, startDate: '2025-11-01', endDate: '2025-11-30', status: 'active', description: 'ลด 100 บาท เมื่อซื้อครบ 800' },
  { id: '4', code: 'MEGA50', type: 'percentage', value: 50, minPurchase: 2000, maxDiscount: 500, usageLimit: 50, usageCount: 50, startDate: '2025-10-01', endDate: '2025-10-31', status: 'expired', description: 'ส่วนลด 50% สูงสุด 500 บาท' },
  { id: '5', code: 'VIP20', type: 'percentage', value: 20, minPurchase: 1500, maxDiscount: 300, usageLimit: 1000, usageCount: 12, startDate: '2025-11-15', endDate: '2025-12-15', status: 'active', description: 'ส่วนลด VIP 20% สูงสุด 300 บาท' },
];

export default function PromotionsPage() {
  const [flashSaleActive, setFlashSaleActive] = useState(true);
  const [flashSaleStart, setFlashSaleStart] = useState('2025-11-20T09:00');
  const [flashSaleEnd, setFlashSaleEnd] = useState('2025-11-20T21:00');

  const [sections, setSections] = useState({
    flashSale: true,
    recommend: true,
    newArrivals: true,
    bestSeller: false,
  });

  const [products, setProducts] = useState(mockProducts);
  const [coupons, setCoupons] = useState(mockCoupons);
  const [showAddCouponModal, setShowAddCouponModal] = useState(false);
  const [showEditCouponModal, setShowEditCouponModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const toggleSection = (section: keyof typeof sections) => {
    setSections({ ...sections, [section]: !sections[section] });
  };

  const toggleProductTag = (productId: string, tag: 'isFlashSale' | 'isRecommend' | 'isNew') => {
    setProducts(products.map(p =>
      p.id === productId ? { ...p, [tag]: !p[tag] } : p
    ));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl p-6 lg:p-8 text-white shadow-xl">
          <h2 className="text-2xl lg:text-4xl font-bold mb-2">Promotions</h2>
          <p className="text-orange-50 text-sm lg:text-base">จัดการโปรโมชันและการแสดงผลหน้าแรก</p>
        </div>

        {/* Flash Sale Settings */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                ⚡ Flash Sale Settings
              </h3>
              <p className="text-sm text-gray-500 mt-1">ตั้งค่ารอบ Flash Sale</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={flashSaleActive}
                onChange={(e) => setFlashSaleActive(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-orange-500"></div>
              <span className="ml-3 text-sm font-medium text-gray-900">
                {flashSaleActive ? 'เปิด' : 'ปิด'}
              </span>
            </label>
          </div>

          {flashSaleActive && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  เริ่มต้น
                </label>
                <input
                  type="datetime-local"
                  value={flashSaleStart}
                  onChange={(e) => setFlashSaleStart(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  สิ้นสุด
                </label>
                <input
                  type="datetime-local"
                  value={flashSaleEnd}
                  onChange={(e) => setFlashSaleEnd(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-xl">
            <p className="text-sm text-orange-800">
              <span className="font-bold">💡 หมายเหตุ:</span> Flash Sale จะแสดงเฉพาะสินค้าที่เลือกไว้ด้านล่าง
            </p>
          </div>
        </div>

        {/* Section Toggle */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 Section บนหน้าแรก</h3>
          <p className="text-sm text-gray-500 mb-6">เปิด/ปิดการแสดง Section ต่างๆ บนหน้าแรก</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Flash Sale Section */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-orange-300 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚡</span>
                <div>
                  <p className="font-bold text-gray-900">Flash Sale</p>
                  <p className="text-xs text-gray-500">สินค้าลดราคาพิเศษ</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={sections.flashSale}
                  onChange={() => toggleSection('flashSale')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>

            {/* Recommend Section */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⭐</span>
                <div>
                  <p className="font-bold text-gray-900">Recommend</p>
                  <p className="text-xs text-gray-500">สินค้าแนะนำ</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={sections.recommend}
                  onChange={() => toggleSection('recommend')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>

            {/* New Arrivals Section */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-green-300 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🆕</span>
                <div>
                  <p className="font-bold text-gray-900">New Arrivals</p>
                  <p className="text-xs text-gray-500">สินค้ามาใหม่</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={sections.newArrivals}
                  onChange={() => toggleSection('newArrivals')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>

            {/* Best Seller Section */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-purple-300 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔥</span>
                <div>
                  <p className="font-bold text-gray-900">Best Seller</p>
                  <p className="text-xs text-gray-500">ขายดี</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={sections.bestSeller}
                  onChange={() => toggleSection('bestSeller')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Product Selection */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900">🏷️ จัดการแท็กสินค้า</h3>
            <p className="text-sm text-gray-500 mt-1">เลือกสินค้าที่จะแสดงใน Section ต่างๆ</p>
          </div>

          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      สินค้า
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      ราคาปกติ
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                      ⚡ Flash Sale
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                      ⭐ Recommend
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                      🆕 New
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-2xl shadow-sm">
                            {product.image}
                          </div>
                          <span className="text-sm font-semibold text-gray-900">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-bold text-gray-900">
                          ฿{product.price.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={product.isFlashSale}
                            onChange={() => toggleProductTag(product.id, 'isFlashSale')}
                            className="w-5 h-5 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                          />
                        </label>
                        {product.isFlashSale && product.flashSalePrice && (
                          <div className="mt-1">
                            <span className="text-xs font-bold text-orange-600">
                              ฿{product.flashSalePrice}
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={product.isRecommend}
                            onChange={() => toggleProductTag(product.id, 'isRecommend')}
                            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                          />
                        </label>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={product.isNew}
                            onChange={() => toggleProductTag(product.id, 'isNew')}
                            className="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                          />
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                <span className="text-gray-700">
                  Flash Sale: <span className="font-bold">{products.filter(p => p.isFlashSale).length}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                <span className="text-gray-700">
                  Recommend: <span className="font-bold">{products.filter(p => p.isRecommend).length}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-gray-700">
                  New: <span className="font-bold">{products.filter(p => p.isNew).length}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Coupons Management Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-yellow-50 to-orange-50 flex items-center justify-between">
            <div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 flex items-center gap-2">
                🎫 จัดการโค้ดส่วนลด / คูปอง
              </h3>
              <p className="text-sm text-gray-500 mt-1">สร้างและจัดการโค้ดส่วนลด โค้ดจัดส่งฟรี</p>
            </div>
            <button
              onClick={() => setShowAddCouponModal(true)}
              className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all hover:shadow-xl hover:scale-105 shadow-lg"
            >
              <span className="text-xl">+</span>
              สร้างโค้ดใหม่
            </button>
          </div>

          {/* Coupons Stats */}
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{coupons.length}</p>
                <p className="text-xs text-gray-500 mt-1">ทั้งหมด</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{coupons.filter(c => c.status === 'active').length}</p>
                <p className="text-xs text-gray-500 mt-1">ใช้งานได้</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">{coupons.filter(c => c.status === 'expired').length}</p>
                <p className="text-xs text-gray-500 mt-1">หมดอายุ</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{coupons.reduce((sum, c) => sum + c.usageCount, 0)}</p>
                <p className="text-xs text-gray-500 mt-1">ใช้ไปแล้ว</p>
              </div>
            </div>
          </div>

          {/* Coupons Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    โค้ด
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    ประเภท
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    ส่วนลด
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    เงื่อนไข
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                    การใช้งาน
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                    ระยะเวลา
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
                {coupons.map((coupon) => {
                  const getTypeInfo = () => {
                    if (coupon.type === 'percentage') return { icon: '📊', text: '%', color: 'bg-blue-100 text-blue-700' };
                    if (coupon.type === 'fixed') return { icon: '💰', text: 'บาท', color: 'bg-green-100 text-green-700' };
                    return { icon: '🚚', text: 'ฟรี', color: 'bg-purple-100 text-purple-700' };
                  };
                  const typeInfo = getTypeInfo();

                  return (
                    <tr key={coupon.id} className="hover:bg-orange-50 transition-all duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{typeInfo.icon}</span>
                          <div>
                            <p className="text-sm font-bold text-gray-900 font-mono bg-yellow-100 px-2 py-1 rounded">
                              {coupon.code}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{coupon.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1.5 rounded-xl text-xs font-bold ${typeInfo.color}`}>
                          {coupon.type === 'percentage' ? 'ส่วนลด %' : coupon.type === 'fixed' ? 'ส่วนลดเงิน' : 'จัดส่งฟรี'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm font-bold text-orange-600">
                          {coupon.type === 'free_shipping'
                            ? 'ฟรีค่าส่ง'
                            : coupon.type === 'percentage'
                            ? `${coupon.value}%`
                            : `฿${coupon.value}`}
                        </p>
                        {coupon.maxDiscount && (
                          <p className="text-xs text-gray-500">สูงสุด ฿{coupon.maxDiscount}</p>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm text-gray-600">
                          ขั้นต่ำ <span className="font-semibold">฿{coupon.minPurchase.toLocaleString()}</span>
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex flex-col items-center gap-1">
                          <p className="text-sm font-bold text-gray-900">
                            {coupon.usageCount} / {coupon.usageLimit}
                          </p>
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-orange-500"
                              style={{ width: `${(coupon.usageCount / coupon.usageLimit) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <p className="text-xs text-gray-600">{coupon.startDate}</p>
                        <p className="text-xs text-gray-400">ถึง</p>
                        <p className="text-xs text-gray-600">{coupon.endDate}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                            coupon.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : coupon.status === 'expired'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {coupon.status === 'active' ? 'ใช้งานได้' : coupon.status === 'expired' ? 'หมดอายุ' : 'ปิดใช้งาน'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => {
                              setSelectedCoupon(coupon);
                              setShowEditCouponModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-800 text-sm font-bold hover:underline transition-all"
                          >
                            แก้ไข
                          </button>
                          <button
                            onClick={() => {
                              if (confirm('คุณต้องการลบโค้ดนี้หรือไม่?')) {
                                setCoupons(coupons.filter(c => c.id !== coupon.id));
                              }
                            }}
                            className="text-red-600 hover:text-red-800 text-sm font-bold hover:underline transition-all"
                          >
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
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
            💾 บันทึกการตั้งค่า
          </button>
        </div>
      </div>

      {/* Add Coupon Modal */}
      {showAddCouponModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 lg:p-8 max-w-2xl w-full shadow-2xl my-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">🎫 สร้างโค้ดส่วนลดใหม่</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">รหัสคูปอง *</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono uppercase"
                    placeholder="WELCOME10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">ประเภท *</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium">
                    <option value="percentage">ส่วนลด %</option>
                    <option value="fixed">ส่วนลดเงิน (บาท)</option>
                    <option value="free_shipping">จัดส่งฟรี</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">มูลค่าส่วนลด *</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="10"
                  />
                  <p className="text-xs text-gray-500 mt-1">ใส่ตัวเลข (% หรือ บาท)</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">ส่วนลดสูงสุด</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="500"
                  />
                  <p className="text-xs text-gray-500 mt-1">สำหรับส่วนลด % เท่านั้น</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">ยอดซื้อขั้นต่ำ *</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">จำนวนการใช้ *</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">วันเริ่มต้น *</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">วันสิ้นสุด *</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">คำอธิบาย</label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="ส่วนลด 10% สำหรับลูกค้าใหม่"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddCouponModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-all"
              >
                ยกเลิก
              </button>
              <button className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-xl font-bold hover:shadow-lg transition-all">
                สร้างโค้ด
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Coupon Modal */}
      {showEditCouponModal && selectedCoupon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 lg:p-8 max-w-2xl w-full shadow-2xl my-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">✏️ แก้ไขโค้ดส่วนลด</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">รหัสคูปอง</label>
                  <input
                    type="text"
                    defaultValue={selectedCoupon.code}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono uppercase"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">ประเภท</label>
                  <select
                    defaultValue={selectedCoupon.type}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
                  >
                    <option value="percentage">ส่วนลด %</option>
                    <option value="fixed">ส่วนลดเงิน (บาท)</option>
                    <option value="free_shipping">จัดส่งฟรี</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">มูลค่าส่วนลด</label>
                  <input
                    type="number"
                    defaultValue={selectedCoupon.value}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">ส่วนลดสูงสุด</label>
                  <input
                    type="number"
                    defaultValue={selectedCoupon.maxDiscount || ''}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">ยอดซื้อขั้นต่ำ</label>
                  <input
                    type="number"
                    defaultValue={selectedCoupon.minPurchase}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">จำนวนการใช้</label>
                  <input
                    type="number"
                    defaultValue={selectedCoupon.usageLimit}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">วันเริ่มต้น</label>
                  <input
                    type="date"
                    defaultValue={selectedCoupon.startDate}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">วันสิ้นสุด</label>
                  <input
                    type="date"
                    defaultValue={selectedCoupon.endDate}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">สถานะ</label>
                <select
                  defaultValue={selectedCoupon.status}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
                >
                  <option value="active">ใช้งานได้</option>
                  <option value="inactive">ปิดใช้งาน</option>
                  <option value="expired">หมดอายุ</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">คำอธิบาย</label>
                <textarea
                  defaultValue={selectedCoupon.description}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowEditCouponModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-all"
              >
                ยกเลิก
              </button>
              <button className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-xl font-bold hover:shadow-lg transition-all">
                บันทึกการแก้ไข
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
