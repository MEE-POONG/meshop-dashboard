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

const mockProducts: Product[] = [
  { id: '1', name: 'เสื้อยืดคอกลม สีขาว', price: 299, image: '👕', isFlashSale: true, isRecommend: false, isNew: false, flashSalePrice: 199 },
  { id: '2', name: 'กางเกงยีนส์ขายาว', price: 890, image: '👖', isFlashSale: false, isRecommend: true, isNew: false },
  { id: '3', name: 'รองเท้าผ้าใบ สีดำ', price: 1590, image: '👟', isFlashSale: true, isRecommend: true, isNew: false, flashSalePrice: 1290 },
  { id: '4', name: 'กระเป๋าสะพาย หนังแท้', price: 2490, image: '👜', isFlashSale: false, isRecommend: false, isNew: true },
  { id: '5', name: 'หมวกแก๊ป สีน้ำเงิน', price: 350, image: '🧢', isFlashSale: false, isRecommend: true, isNew: true },
  { id: '6', name: 'แว่นตากันแดด', price: 790, image: '🕶️', isFlashSale: false, isRecommend: false, isNew: true },
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

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
            💾 บันทึกการตั้งค่า
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
