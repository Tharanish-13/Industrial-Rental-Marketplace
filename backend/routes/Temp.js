const salesData = () => {
  const data = [
    { name: 'Jan', Sales: 4000, Revenue: 2400, Customers: 2400 },
    { name: 'Feb', Sales: 3000, Revenue: 1398, Customers: 2210 },
    { name: 'Mar', Sales: 2000, Revenue: 9800, Customers: 2290 },
    { name: 'Apr', Sales: 2780, Revenue: 3908, Customers: 2000 },
    { name: 'May', Sales: 1890, Revenue: 4800, Customers: 2181 },
    { name: 'Jun', Sales: 2390, Revenue: 3800, Customers: 2500 },
    { name: 'Jul', Sales: 3490, Revenue: 4300, Customers: 2100 },
    { name: 'Aug', Sales: 4000, Revenue: 2400, Customers: 2400 },
    { name: 'Sep', Sales: 3000, Revenue: 1398, Customers: 2210 },
    { name: 'Oct', Sales: 2000, Revenue: 9800, Customers: 2290 },
  ];

  return (
    <div className="bg-white p-6 w-[825px] h-[400px] rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-500 text-sm">Sales Overview</h3>
        <div className="relative group">
          <button className="p-1 hover:bg-gray-100 rounded">
            <ChevronDown size={20} />
          </button>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="Sales" stroke="#8884d8" />
            <Line type="monotone" dataKey="Revenue" stroke="#82ca9d" />
            <Line type="monotone" dataKey="Customers" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};