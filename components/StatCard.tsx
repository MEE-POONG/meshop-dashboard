interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function StatCard({ title, value, description, icon, trend }: StatCardProps) {
  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 hover:-translate-y-1 cursor-pointer">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">{title}</p>
          <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {value}
          </h3>
          {description && (
            <p className="text-sm text-gray-500 font-medium">{description}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1 mt-3">
              <span className={`text-sm font-bold px-2 py-1 rounded-lg ${
                trend.isPositive
                  ? 'text-green-700 bg-green-50'
                  : 'text-red-700 bg-red-50'
              }`}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-gray-500 ml-1">จากเดือนที่แล้ว</span>
            </div>
          )}
        </div>
        <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-2xl lg:text-3xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-sm">
          {icon}
        </div>
      </div>
    </div>
  );
}
