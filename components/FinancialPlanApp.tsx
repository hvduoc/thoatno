import React, { useState, useMemo } from 'react';
import { GoogleGenAI, GenerateContentResponse, Type } from '@google/genai';
import { ActionTask, IncomeSource, CostCuttingTip, BudgetItem, Debt, Transaction, Category } from '../types';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { 
    SnowflakeIcon, MountainSnowIcon, PlusCircleIcon, Edit3Icon, Trash2Icon, InfoIcon, BriefcaseIcon, 
    GlobeIcon, MessageSquareIcon, KeyboardIcon, PiggyBankIcon, UsersIcon, ClipboardCheckIcon, SparklesIcon,
    ArrowUpCircleIcon, ArrowDownCircleIcon, CoinsIcon, UtensilsCrossedIcon, CarIcon, GraduationCapIcon,
    GiftIcon, HeartHandshakeIcon, FileTextIcon, ShoppingBagIcon, TvIcon, PlaneIcon
} from './Icons';


const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

// Placeholder components for views
const DashboardView = () => {
    // Sample data for the last 6 months' net cash flow
    const last6MonthsData = [
      { name: 'Tháng 1', 'Dòng tiền ròng': 1500000 },
      { name: 'Tháng 2', 'Dòng tiền ròng': -500000 },
      { name: 'Tháng 3', 'Dòng tiền ròng': 2200000 },
      { name: 'Tháng 4', 'Dòng tiền ròng': -800000 },
      { name: 'Tháng 5', 'Dòng tiền ròng': 3100000 },
      { name: 'Tháng 6', 'Dòng tiền ròng': 1200000 },
    ];

    return (
    <div>
        <h2 className="text-3xl font-bold mb-6 text-text-primary">Bảng điều khiển</h2>
        <p className="text-text-secondary">Chào mừng bạn đến với công cụ hoạch định Tự do Tài chính. Chọn một mục từ thanh bên để bắt đầu.</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-bold text-lg text-text-secondary">Tổng Thu Nhập</h3>
                <p className="text-3xl font-bold text-accent mt-2">21.000.000 VNĐ</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-bold text-lg text-text-secondary">Tổng Nợ (Ước tính)</h3>
                <p className="text-3xl font-bold text-danger mt-2">~500.000.000 VNĐ</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-bold text-lg text-text-secondary">Mục tiêu tiếp theo</h3>
                <p className="text-xl font-semibold text-text-primary mt-2">Cân bằng thu chi tháng</p>
            </div>
        </div>
         <div className="mt-8 bg-card p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-bold text-xl text-text-primary mb-4">Dòng tiền ròng 6 tháng qua</h3>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <BarChart
                        data={last6MonthsData}
                        margin={{
                            top: 5,
                            right: 20,
                            left: 30,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis tickFormatter={(value) => `${Number(value) / 1000000}tr`} tick={{ fontSize: 12 }} width={80} />
                        <Tooltip
                            formatter={(value: number) => formatCurrency(value)}
                            cursor={{ fill: 'rgba(240, 253, 244, 0.5)' }}
                        />
                        <Bar dataKey="Dòng tiền ròng">
                            {last6MonthsData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry['Dòng tiền ròng'] >= 0 ? '#22c55e' : '#ef4444'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
)};

const InputRow: React.FC<{ label: string; name: string; value: number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder?: string }> = ({ label, name, value, onChange, placeholder }) => (
    <div className="flex items-center justify-between mb-2">
        <label htmlFor={name} className="text-text-secondary text-sm">{label}</label>
        <input
            type="text"
            id={name}
            name={name}
            value={value === 0 && placeholder ? '' : value.toLocaleString('vi-VN')}
            onChange={onChange}
            placeholder={placeholder}
            className="w-36 text-right px-2 py-1 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
    </div>
);


const DiagnosisView: React.FC = () => {
    const [incomes, setIncomes] = useState<{ [key: string]: number }>({ husband: 13000000, wife: 8000000 });
    const [fixedExpenses, setFixedExpenses] = useState<{ [key: string]: number }>({
        rent: 5200000,
        childcare: 2200000,
        kidsFood: 1800000,
        gas: 700000,
        interest: 4000000,
    });
    const [variableExpenses, setVariableExpenses] = useState<{ [key: string]: number }>({
        food: 4500000,
        utilities: 1500000,
        extraClasses: 1500000,
        medical: 500000,
        social: 1000000,
    });

    const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setIncomes(prev => ({ ...prev, [name]: Number(value.replace(/[\.,]/g, '')) || 0 }));
    };

    const handleFixedExpenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFixedExpenses(prev => ({ ...prev, [name]: Number(value.replace(/[\.,]/g, '')) || 0 }));
    };

    const handleVariableExpenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setVariableExpenses(prev => ({ ...prev, [name]: Number(value.replace(/[\.,]/g, '')) || 0 }));
    };

    const { totalIncome, totalFixedExpenses, totalVariableExpenses, totalExpenses, netCashFlow } = useMemo(() => {
        // FIX: Explicitly type the accumulator and value in the reduce function to prevent incorrect type inference which can lead to arithmetic errors.
        const totalIncome = Object.values(incomes).reduce((sum: number, val: number) => sum + val, 0);
        const totalFixedExpenses = Object.values(fixedExpenses).reduce((sum: number, val: number) => sum + val, 0);
        const totalVariableExpenses = Object.values(variableExpenses).reduce((sum: number, val: number) => sum + val, 0);
        const totalExpenses = totalFixedExpenses + totalVariableExpenses;
        const netCashFlow = totalIncome - totalExpenses;
        return { totalIncome, totalFixedExpenses, totalVariableExpenses, totalExpenses, netCashFlow };
    }, [incomes, fixedExpenses, variableExpenses]);
    
    const chartData = [
        { name: 'Chi phí Cố định', value: totalFixedExpenses, color: '#f59e0b' }, // amber-500
        { name: 'Chi phí Biến đổi', value: totalVariableExpenses, color: '#ef4444' }, // red-500
        { name: 'Dòng tiền ròng', value: Math.max(0, netCashFlow), color: '#22c55e' } // green-500
    ];
    
    const SummaryCard: React.FC<{ title: string; value: number; color?: string; isLarge?: boolean }> = ({ title, value, color = 'text-text-primary', isLarge = false }) => (
        <div className={`bg-background p-4 rounded-lg text-center ${isLarge ? 'col-span-2' : ''}`}>
            <h4 className={`font-medium text-text-secondary ${isLarge ? 'text-lg' : 'text-base'}`}>{title}</h4>
            <p className={`font-bold ${color} ${isLarge ? 'text-3xl' : 'text-2xl'}`}>{formatCurrency(value)}</p>
        </div>
    );

    return (
        <div>
            <h2 className="text-3xl font-bold mb-2 text-text-primary">Chẩn đoán Sức khỏe Tài chính</h2>
            <p className="text-text-secondary mb-6">Một cái nhìn trung thực vào sự thật. Hãy điều chỉnh các con số để phản ánh đúng thực tế của gia đình bạn.</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* Income */}
                    <div className="bg-card p-4 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="font-bold text-lg text-accent mb-3 border-b pb-2">
                            <i className="fas fa-money-bill-wave mr-2"></i>Thu Nhập
                        </h3>
                        <InputRow label="Thu nhập chồng" name="husband" value={incomes.husband} onChange={handleIncomeChange} />
                        <InputRow label="Thu nhập vợ" name="wife" value={incomes.wife} onChange={handleIncomeChange} />
                    </div>

                    {/* Expenses */}
                     <div className="bg-card p-4 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="font-bold text-lg text-danger mb-3 border-b pb-2">
                           <i className="fas fa-file-invoice-dollar mr-2"></i>Chi Tiêu
                        </h3>
                        <h4 className="font-semibold text-text-primary mt-4 mb-2">Chi phí Cố định</h4>
                        <InputRow label="Tiền nhà" name="rent" value={fixedExpenses.rent} onChange={handleFixedExpenseChange} />
                        <InputRow label="Học phí con út" name="childcare" value={fixedExpenses.childcare} onChange={handleFixedExpenseChange} />
                        <InputRow label="Tiền ăn 2 con lớn" name="kidsFood" value={fixedExpenses.kidsFood} onChange={handleFixedExpenseChange} />
                        <InputRow label="Xăng xe" name="gas" value={fixedExpenses.gas} onChange={handleFixedExpenseChange} />
                        <InputRow label="Trả lãi vay" name="interest" value={fixedExpenses.interest} onChange={handleFixedExpenseChange} />

                        <h4 className="font-semibold text-text-primary mt-4 mb-2">Chi phí Biến đổi (Ước tính)</h4>
                        <InputRow label="Tiền ăn (còn lại)" name="food" value={variableExpenses.food} onChange={handleVariableExpenseChange} />
                        <InputRow label="Điện, nước, internet..." name="utilities" value={variableExpenses.utilities} onChange={handleVariableExpenseChange} />
                        <InputRow label="Học thêm, phát sinh" name="extraClasses" value={variableExpenses.extraClasses} onChange={handleVariableExpenseChange} />
                        <InputRow label="Y tế, sức khỏe" name="medical" value={variableExpenses.medical} onChange={handleVariableExpenseChange} />
                        <InputRow label="Giao tế, hiếu hỉ" name="social" value={variableExpenses.social} onChange={handleVariableExpenseChange} />
                    </div>
                </div>

                <div className="lg:col-span-3">
                    <div className="sticky top-8 space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <SummaryCard title="Tổng Thu Nhập" value={totalIncome} color="text-accent"/>
                            <SummaryCard title="Tổng Chi Tiêu" value={totalExpenses} color="text-danger"/>
                            <SummaryCard 
                                title="Dòng tiền ròng (Tháng)" 
                                value={netCashFlow} 
                                color={netCashFlow >= 0 ? 'text-accent' : 'text-danger'}
                                isLarge={true}
                            />
                        </div>
                         <div className="bg-card p-4 rounded-lg shadow-sm border border-gray-200">
                            <h3 className="font-bold text-lg text-text-primary mb-2 text-center">Phân bổ Chi tiêu & Thu nhập</h3>
                             <div style={{ width: '100%', height: 300 }}>
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie
                                            data={chartData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={100}
                                            fill="#8884d8"
                                            paddingAngle={5}
                                            dataKey="value"
                                            label={({ name, percent }) => `${name} ${((Number(percent) || 0) * 100).toFixed(0)}%`}
                                        >
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="bg-card p-4 rounded-lg shadow-sm border border-gray-200">
                             <h3 className="font-bold text-lg text-text-primary mb-2">
                                <i className="fas fa-stethoscope mr-2"></i>Chẩn đoán nhanh
                            </h3>
                            {netCashFlow < 0 ? (
                                <p className="text-text-secondary">
                                    <span className="font-bold text-danger">Báo động đỏ:</span> Gia đình đang bị <span className="font-bold">{`thâm hụt ${formatCurrency(Math.abs(netCashFlow))}`}</span> mỗi tháng. Ưu tiên hàng đầu lúc này là phải <span className="font-bold">cân bằng thu chi</span> trước khi nghĩ đến việc trả nợ gốc. Nếu không, nợ mới sẽ liên tục phát sinh chỉ để bù đắp chi tiêu.
                                </p>
                            ) : (
                                <p className="text-text-secondary">
                                    <span className="font-bold text-accent">Tín hiệu tốt:</span> Gia đình đang có dòng tiền dương <span className="font-bold">{formatCurrency(netCashFlow)}</span> mỗi tháng. Đây là nguồn lực quan trọng để bắt đầu xây dựng quỹ khẩn cấp và tăng tốc trả nợ. Hãy xem xét các mẹo cắt giảm chi tiêu để gia tăng khoản dư này.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const initialTips: CostCuttingTip[] = [
    { id: 'food1', category: 'Thực phẩm & Ăn uống', tip: 'Ưu tiên tuyệt đối việc tự nấu ăn tại nhà, hạn chế tối đa ăn ngoài.', completed: false },
    { id: 'food2', category: 'Thực phẩm & Ăn uống', tip: 'Lên thực đơn chi tiết cho cả tuần để tránh mua sắm ngẫu hứng.', completed: false },
    { id: 'food3', category: 'Thực phẩm & Ăn uống', tip: 'Luôn lập danh sách mua sắm và tuân thủ nghiêm ngặt.', completed: false },
    { id: 'food4', category: 'Thực phẩm & Ăn uống', tip: 'So sánh giá cả giữa các cửa hàng, siêu thị và chợ.', completed: false },
    { id: 'food5', category: 'Thực phẩm & Ăn uống', tip: 'Mua thực phẩm tại chợ vào cuối buổi để có giá tốt hơn.', completed: false },
    { id: 'utils1', category: 'Hóa đơn Tiện ích', tip: 'Tắt và rút phích cắm các thiết bị điện khi không sử dụng.', completed: false },
    { id: 'utils2', category: 'Hóa đơn Tiện ích', tip: 'Tận dụng tối đa ánh sáng tự nhiên.', completed: false },
    { id: 'utils3', category: 'Hóa đơn Tiện ích', tip: 'Kiểm tra và sửa chữa ngay các vòi nước bị rò rỉ.', completed: false },
    { id: 'utils4', category: 'Hóa đơn Tiện ích', tip: 'Rà soát lại các gói cước internet, truyền hình, điện thoại.', completed: false },
    { id: 'kids1', category: 'Chi phí cho Con cái', tip: 'Tận dụng lại sách giáo khoa, đồng phục, đồ dùng học tập cũ.', completed: false },
    { id: 'kids2', category: 'Chi phí cho Con cái', tip: 'Rà soát và tạm dừng các lớp học thêm, năng khiếu không cấp bách.', completed: false },
    { id: 'kids3', category: 'Chi phí cho Con cái', tip: 'Dạy con về giá trị của tiền bạc và thói quen tiết kiệm.', completed: false },
    { id: 'kids4', category: 'Chi phí cho Con cái', tip: 'Khuyến khích con lớn đi học bằng xe đạp hoặc phương tiện công cộng.', completed: false },
    { id: 'move1', category: 'Di chuyển & Mua sắm', tip: 'Kết hợp nhiều công việc trong một chuyến đi để tiết kiệm xăng.', completed: false },
    { id: 'move2', category: 'Di chuyển & Mua sắm', tip: 'Áp dụng "quy tắc 72 giờ" trước khi mua món đồ không thiết yếu.', completed: false },
    { id: 'move3', category: 'Di chuyển & Mua sắm', tip: 'Hủy tất cả các đăng ký dịch vụ không sử dụng (gym, app, phim...).', completed: false },
    { id: 'move4', category: 'Di chuyển & Mua sắm', tip: 'Tận dụng các hình thức giải trí miễn phí (công viên, thư viện...).', completed: false },
];


const DefenseView = () => {
    const [totalIncome, setTotalIncome] = useState(21000000);
    const [tips, setTips] = useState<CostCuttingTip[]>(initialTips);
    const [emergencyFund, setEmergencyFund] = useState(0);
    const emergencyFundGoal = 5000000;

    const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTotalIncome(Number(e.target.value.replace(/[\.,]/g, '')) || 0);
    };

    const handleEmergencyFundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmergencyFund(Number(e.target.value.replace(/[\.,]/g, '')) || 0);
    };

    const budgetJars = useMemo<BudgetItem[]>(() => [
        { name: 'Nhu cầu Thiết yếu', percentage: 70, amount: totalIncome * 0.70, color: 'bg-blue-500', description: 'Chi tiêu tối đa cho sinh hoạt cơ bản: nhà, ăn uống, học phí, điện nước...' },
        { name: 'Trả nợ', percentage: 20, amount: totalIncome * 0.20, color: 'bg-red-500', description: 'Ưu tiên hàng đầu. Toàn bộ tiền tiết kiệm và thu nhập tăng thêm sẽ dồn vào đây.' },
        { name: 'Quỹ Khẩn cấp', percentage: 5, amount: totalIncome * 0.05, color: 'bg-amber-500', description: 'Xây dựng "tấm khiên" tài chính cho các sự cố bất ngờ.' },
        { name: 'Giáo dục & Tương lai', percentage: 5, amount: totalIncome * 0.05, color: 'bg-green-500', description: 'Duy trì một khoản nhỏ cho tương lai học vấn của các con.' },
    ], [totalIncome]);

    const handleToggleTip = (id: string) => {
        setTips(prevTips => prevTips.map(tip => tip.id === id ? { ...tip, completed: !tip.completed } : tip));
    };

    const handleCompleteAll = () => {
        setTips(prevTips => prevTips.map(tip => ({ ...tip, completed: true })));
    };

    const tipsByCategory = useMemo(() => {
        return tips.reduce((acc, tip) => {
            (acc[tip.category] = acc[tip.category] || []).push(tip);
            return acc;
        }, {} as Record<string, CostCuttingTip[]>);
    }, [tips]);
    
    const tipsProgress = useMemo(() => {
        const completedCount = tips.filter(tip => tip.completed).length;
        return (completedCount / tips.length) * 100;
    }, [tips]);
    
    const emergencyFundProgress = Math.min((emergencyFund / emergencyFundGoal) * 100, 100);

    return (
        <div>
            <h2 className="text-3xl font-bold mb-2 text-text-primary">Xây dựng Nền tảng Phòng thủ Tài chính</h2>
            <p className="text-text-secondary mb-6">Ngăn chặn phát sinh nợ mới và tối đa hóa nguồn lực sẵn có để trả nợ.</p>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-3">
                    <div className="bg-card p-4 rounded-lg shadow-sm border border-gray-200 h-full">
                        <h3 className="font-bold text-lg text-primary mb-3 border-b pb-2">
                            <i className="fas fa-search-dollar mr-2"></i>Chiến lược "Săn lùng & Tiêu diệt" Lãng phí
                        </h3>
                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium text-text-secondary">Tiến độ áp dụng</span>
                                <span className="text-sm font-bold text-accent">{tipsProgress.toFixed(0)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-accent h-2.5 rounded-full" style={{ width: `${tipsProgress}%` }}></div>
                            </div>
                        </div>
                        <button 
                            onClick={handleCompleteAll}
                            className="w-full text-sm bg-secondary text-white py-2 rounded-md hover:bg-primary transition-colors mb-4"
                        >
                            <i className="fas fa-check-double mr-2"></i>Hoàn thành tất cả mẹo
                        </button>
                        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                            {Object.entries(tipsByCategory).map(([category, tips]) => (
                                <div key={category}>
                                    <h4 className="font-semibold text-text-primary mb-2">{category}</h4>
                                    <div className="space-y-2">
                                        {tips.map(tip => (
                                            <label key={tip.id} htmlFor={tip.id} className="flex items-center p-2 bg-background rounded-md cursor-pointer hover:bg-green-100">
                                                <input
                                                    type="checkbox"
                                                    id={tip.id}
                                                    checked={tip.completed}
                                                    onChange={() => handleToggleTip(tip.id)}
                                                    className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
                                                />
                                                <span className={`ml-3 text-sm text-text-secondary ${tip.completed ? 'line-through' : ''}`}>{tip.tip}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-2">
                    <div className="sticky top-8 space-y-6">
                        <div className="bg-card p-4 rounded-lg shadow-sm border border-gray-200">
                            <h3 className="font-bold text-lg text-primary mb-3 border-b pb-2">
                                <i className="fas fa-balance-scale-right mr-2"></i>Ngân sách "6 Chiếc Lọ"
                            </h3>
                            <InputRow label="Tổng thu nhập" name="totalIncome" value={totalIncome} onChange={handleIncomeChange} />
                            <div className="mt-4 space-y-2">
                                {budgetJars.map(jar => (
                                    <div key={jar.name}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-semibold text-text-primary">{jar.name} ({jar.percentage}%)</span>
                                            <span className="font-bold">{formatCurrency(jar.amount)}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-4">
                                            <div className={`${jar.color} h-4 rounded-full text-white text-xs flex items-center justify-center`} style={{ width: `${jar.percentage}%` }}>
                                               {jar.percentage}%
                                            </div>
                                        </div>
                                         <p className="text-xs text-text-secondary mt-1 italic">{jar.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-card p-4 rounded-lg shadow-sm border border-gray-200">
                            <h3 className="font-bold text-lg text-primary mb-3 border-b pb-2">
                                <i className="fas fa-shield-alt mr-2"></i>Quỹ Dự phòng Khẩn cấp
                            </h3>
                             <InputRow label="Số tiền hiện có" name="emergencyFund" value={emergencyFund} onChange={handleEmergencyFundChange} placeholder="Nhập số tiền" />
                            <div className="mt-4">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-medium text-text-secondary">Mục tiêu: {formatCurrency(emergencyFundGoal)}</span>
                                    <span className="text-sm font-bold text-amber-600">{emergencyFundProgress.toFixed(0)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-4">
                                    <div className="bg-warning h-4 rounded-full" style={{ width: `${emergencyFundProgress}%` }}></div>
                                </div>
                                 <p className="text-center text-sm mt-2 text-text-secondary">
                                    Đã có: <span className="font-bold">{formatCurrency(emergencyFund)}</span> / {formatCurrency(emergencyFundGoal)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const initialDebts: Debt[] = [
    { id: 1, creditor: 'Ngân hàng A', type: 'Vay tín chấp', principal: 150000000, interestRate: 25, minPayment: 3500000, dueDate: 15, notes: 'Lãi suất rất cao' },
    { id: 2, creditor: 'Anh B', type: 'Vay người thân', principal: 50000000, interestRate: 0, minPayment: 0, dueDate: 30, notes: 'Không lãi, trả linh hoạt' },
    { id: 3, creditor: 'Cty Tài chính C', type: 'Trả góp xe', principal: 80000000, interestRate: 18, minPayment: 2000000, dueDate: 20, notes: '' },
    { id: 4, creditor: 'Thẻ tín dụng D', type: 'Thẻ tín dụng', principal: 20000000, interestRate: 30, minPayment: 1000000, dueDate: 25, notes: 'Khoản nợ nhỏ nhất' },
];

const DebtModal: React.FC<{ isOpen: boolean; onClose: () => void; onSave: (debt: Debt) => void; debt: Debt | null }> = ({ isOpen, onClose, onSave, debt }) => {
    const [formData, setFormData] = useState<Debt>(debt || { id: 0, creditor: '', type: '', principal: 0, interestRate: 0, minPayment: 0, dueDate: 1, notes: '' });

    React.useEffect(() => {
        setFormData(debt || { id: 0, creditor: '', type: '', principal: 0, interestRate: 0, minPayment: 0, dueDate: 1, notes: '' });
    }, [debt]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // Allow formatting for display but store as a number
        const numericValue = name === 'interestRate' ? parseFloat(value) : parseInt(value.replace(/[\.,]/g, ''), 10);
        setFormData(prev => ({...prev, [name]: isNaN(numericValue) ? 0 : numericValue}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-card rounded-lg shadow-xl w-full max-w-md">
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-text-primary mb-4">{debt ? 'Chỉnh sửa Khoản nợ' : 'Thêm Khoản nợ Mới'}</h3>
                        <div className="space-y-3">
                            <input type="text" name="creditor" value={formData.creditor} onChange={handleChange} placeholder="Tên chủ nợ (vd: Ngân hàng A)" required className="w-full px-3 py-2 bg-gray-100 border rounded-md" />
                            <input type="text" name="type" value={formData.type} onChange={handleChange} placeholder="Loại nợ (vd: Vay tín chấp)" className="w-full px-3 py-2 bg-gray-100 border rounded-md" />
                            <input type="text" name="principal" value={formData.principal.toLocaleString('vi-VN')} onChange={handleNumericChange} placeholder="Dư nợ gốc" required className="w-full px-3 py-2 bg-gray-100 border rounded-md" />
                            <input type="number" step="0.1" name="interestRate" value={formData.interestRate} onChange={handleNumericChange} placeholder="Lãi suất (%/năm)" required className="w-full px-3 py-2 bg-gray-100 border rounded-md" />
                            <input type="text" name="minPayment" value={formData.minPayment.toLocaleString('vi-VN')} onChange={handleNumericChange} placeholder="Trả tối thiểu/tháng" required className="w-full px-3 py-2 bg-gray-100 border rounded-md" />
                            <input type="number" name="dueDate" value={formData.dueDate} onChange={handleNumericChange} placeholder="Ngày đến hạn (hàng tháng)" min="1" max="31" className="w-full px-3 py-2 bg-gray-100 border rounded-md" />
                            <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Ghi chú" className="w-full px-3 py-2 bg-gray-100 border rounded-md" rows={2}></textarea>
                        </div>
                    </div>
                    <div className="bg-background px-6 py-3 flex justify-end gap-3 rounded-b-lg">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-text-secondary rounded-md hover:bg-gray-300">Hủy</button>
                        <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary">Lưu</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const AttackView = () => {
    const [debts, setDebts] = useState<Debt[]>(initialDebts);
    const [strategy, setStrategy] = useState<'snowball' | 'avalanche'>('snowball');
    const [extraPayment, setExtraPayment] = useState(4200000); // from "Lọ trả nợ"
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDebt, setEditingDebt] = useState<Debt | null>(null);

    const sortedDebts = useMemo(() => {
        const debtsCopy = [...debts].filter(d => d.principal > 0);
        if (strategy === 'snowball') {
            return debtsCopy.sort((a, b) => a.principal - b.principal);
        } else { // avalanche
            return debtsCopy.sort((a, b) => b.interestRate - a.interestRate);
        }
    }, [debts, strategy]);

    const { totalPrincipal, totalMinPayment } = useMemo(() => {
        const totalPrincipal = debts.reduce((sum, debt) => sum + debt.principal, 0);
        const totalMinPayment = debts.reduce((sum, debt) => sum + debt.minPayment, 0);
        return { totalPrincipal, totalMinPayment };
    }, [debts]);

    const handleAddDebt = () => {
        setEditingDebt(null);
        setIsModalOpen(true);
    };

    const handleEditDebt = (debt: Debt) => {
        setEditingDebt(debt);
        setIsModalOpen(true);
    };

    const handleDeleteDebt = (id: number) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa khoản nợ này?')) {
            setDebts(debts.filter(d => d.id !== id));
        }
    };

    const handleSaveDebt = (debtData: Omit<Debt, 'id'> & { id?: number }) => {
        if (debtData.id && debtData.id !== 0) {
            setDebts(debts.map(d => d.id === debtData.id ? { ...d, ...debtData } : d));
        } else {
            setDebts([...debts, { ...debtData, id: Date.now() }]);
        }
        setIsModalOpen(false);
    };

    const refinancingCandidates = useMemo(() => {
        return debts.filter(d => d.interestRate > 18);
    }, [debts]);

    return (
        <div>
            <h2 className="text-3xl font-bold mb-2 text-text-primary">Kế hoạch Tổng lực Thoát nợ</h2>
            <p className="text-text-secondary mb-6">Xây dựng chiến lược, xác định mục tiêu và tăng tốc trả nợ.</p>
            
            <DebtModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={(debt) => handleSaveDebt(debt)} debt={editingDebt} />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-3">
                    <div className="bg-card p-4 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="font-bold text-lg text-primary mb-3 border-b pb-2">
                            <i className="fas fa-crosshairs mr-2"></i>Chọn "Vũ khí" Trả nợ
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <button onClick={() => setStrategy('snowball')} className={`p-4 rounded-lg border-2 text-left transition-all ${strategy === 'snowball' ? 'border-primary bg-green-50' : 'border-gray-200 hover:border-green-300'}`}>
                                <h4 className="font-bold flex items-center"><SnowflakeIcon className="w-5 h-5 mr-2" /> Quả cầu tuyết (Snowball)</h4>
                                <p className="text-xs mt-1 text-text-secondary">Ưu tiên trả hết nợ nhỏ nhất trước để tạo động lực và "chiến thắng" tâm lý.</p>
                            </button>
                            <button onClick={() => setStrategy('avalanche')} className={`p-4 rounded-lg border-2 text-left transition-all ${strategy === 'avalanche' ? 'border-primary bg-green-50' : 'border-gray-200 hover:border-green-300'}`}>
                                <h4 className="font-bold flex items-center"><MountainSnowIcon className="w-5 h-5 mr-2" /> Tuyết lở (Avalanche)</h4>
                                <p className="text-xs mt-1 text-text-secondary">Ưu tiên trả nợ có lãi suất cao nhất để tiết kiệm tối đa tiền lãi về lâu dài.</p>
                            </button>
                        </div>
                        
                        <div className="flex justify-between items-center mt-6 mb-3">
                             <h3 className="font-bold text-lg text-primary">
                                <i className="fas fa-map-marked-alt mr-2"></i>Bản đồ Nợ
                            </h3>
                            <button onClick={handleAddDebt} className="flex items-center px-3 py-2 text-sm bg-primary text-white rounded-md hover:bg-secondary">
                                <PlusCircleIcon className="w-5 h-5 mr-1"/> Thêm khoản nợ
                            </button>
                        </div>
                        <div className="space-y-3">
                            {sortedDebts.map((debt, index) => (
                                <div key={debt.id} className={`p-3 rounded-lg border ${index === 0 ? 'bg-green-50 border-accent shadow-md' : 'bg-background border-gray-200'}`}>
                                    {index === 0 && <div className="px-2 py-0.5 mb-2 text-xs font-bold text-white bg-accent rounded-full inline-block">MỤC TIÊU</div>}
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-bold text-text-primary">{debt.creditor} <span className="text-sm font-normal text-text-secondary">- {debt.type}</span></h4>
                                            <div className="text-xs text-text-secondary mt-1">
                                                <span>{debt.notes}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => handleEditDebt(debt)} className="text-text-secondary hover:text-primary"><Edit3Icon className="w-4 h-4" /></button>
                                            <button onClick={() => handleDeleteDebt(debt.id)} className="text-text-secondary hover:text-danger"><Trash2Icon className="w-4 h-4" /></button>
                                        </div>
                                    </div>
                                    <div className="mt-2 pt-2 border-t grid grid-cols-3 gap-2 text-center text-sm">
                                        <div>
                                            <div className="text-xs text-text-secondary">Dư nợ</div>
                                            <div className="font-semibold text-text-primary">{formatCurrency(debt.principal)}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-text-secondary">Lãi suất</div>
                                            <div className={`font-semibold ${debt.interestRate > 18 ? 'text-danger' : 'text-text-primary'}`}>{debt.interestRate}%/năm</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-text-secondary">Trả tối thiểu</div>
                                            <div className="font-semibold text-text-primary">{formatCurrency(debt.minPayment)}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Right Column */}
                <div className="lg:col-span-2">
                    <div className="sticky top-8 space-y-6">
                         <div className="bg-card p-4 rounded-lg shadow-sm border border-gray-200">
                             <h3 className="font-bold text-lg text-primary mb-3 border-b pb-2">
                                <i className="fas fa-calculator mr-2"></i>Tổng quan
                            </h3>
                             <div className="space-y-2 text-sm">
                                 <div className="flex justify-between">
                                     <span className="text-text-secondary">Tổng dư nợ:</span>
                                     <span className="font-bold text-danger">{formatCurrency(totalPrincipal)}</span>
                                 </div>
                                 <div className="flex justify-between">
                                     <span className="text-text-secondary">Tổng trả tối thiểu/tháng:</span>
                                     <span className="font-bold text-text-primary">{formatCurrency(totalMinPayment)}</span>
                                 </div>
                                 <hr className="my-2"/>
                                 <div className="flex items-center justify-between">
                                    <label htmlFor="extra-payment" className="text-text-secondary">Tiền từ "Lọ Trả nợ":</label>
                                    <input
                                        id="extra-payment"
                                        type="text"
                                        value={extraPayment.toLocaleString('vi-VN')}
                                        onChange={(e) => setExtraPayment(Number(e.target.value.replace(/[\.,]/g, '')) || 0)}
                                        className="w-28 text-right px-2 py-1 bg-gray-100 border rounded-md"
                                    />
                                </div>
                                <hr className="my-2"/>
                                 <div className="text-center bg-background p-3 rounded-md">
                                     <p className="text-text-secondary">Tổng tiền tấn công nợ/tháng</p>
                                     <p className="text-2xl font-bold text-accent">{formatCurrency(totalMinPayment + extraPayment)}</p>
                                 </div>
                             </div>
                         </div>

                         <div className="bg-card p-4 rounded-lg shadow-sm border border-gray-200">
                             <h3 className="font-bold text-lg text-primary mb-3 border-b pb-2 flex items-center">
                                <InfoIcon className="w-5 h-5 mr-2" />"Đảo nợ" Thông minh
                            </h3>
                             <p className="text-sm text-text-secondary mb-3">
                                Cân nhắc gộp các khoản vay lãi suất cao (thường trên 18%/năm) thành một khoản vay duy nhất tại ngân hàng lớn với lãi suất tốt hơn. Điều này giúp giảm áp lực trả lãi và đơn giản hóa việc quản lý.
                            </p>
                             {refinancingCandidates.length > 0 ? (
                                <div>
                                    <h4 className="text-sm font-semibold text-text-primary mb-2">Gợi ý các khoản nợ nên gộp:</h4>
                                    <ul className="list-disc list-inside text-sm space-y-1">
                                        {refinancingCandidates.map(debt => (
                                            <li key={debt.id}>
                                                <span className="font-semibold">{debt.creditor}</span> với lãi suất <span className="font-bold text-danger">{debt.interestRate}%</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                             ) : (
                                <p className="text-sm text-accent font-semibold text-center bg-green-50 p-2 rounded-md">Tuyệt vời! Bạn không có khoản nợ lãi suất cao nào cần ưu tiên tái cấu trúc.</p>
                             )}
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const initialHusbandTasks: ActionTask[] = [
  { id: 'h1', text: 'Tập hợp các báo cáo, phân tích đã làm để xây dựng Portfolio.', completed: false },
  { id: 'h2', text: 'Tạo hồ sơ chuyên nghiệp trên vLance và FreelancerViet.', completed: false },
  { id: 'h3', text: 'Tạo hồ sơ trên Upwork để tiếp cận dự án quốc tế.', completed: false },
  { id: 'h4', text: 'Viết 5 bài blog chuyên sâu phân tích thị trường BĐS cho xemgiadat.com.', completed: false },
  { id: 'h5', text: 'Tối ưu SEO on-page cho các bài viết trên website.', completed: false },
  { id: 'h6', text: 'Chia sẻ bài viết lên 3 nhóm Facebook về BĐS để thu hút traffic.', completed: false },
];

const initialWifeTasks: ActionTask[] = [
  { id: 'w1', text: 'Tìm và ứng tuyển 5 công việc Nhập liệu (Data Entry) trên vLance.', completed: false },
  { id: 'w2', text: 'Tìm và ứng tuyển 5 công việc Trực Fanpage trên các nhóm Facebook.', completed: false },
];

const ActionPlanCard: React.FC<{
    title: string;
    icon: React.ElementType;
    tasks: ActionTask[];
    onToggleTask: (id: string) => void;
    progress: number;
    potentialIncome: string;
}> = ({ title, icon: Icon, tasks, onToggleTask, progress, potentialIncome }) => (
    <div className="bg-card p-4 rounded-lg shadow-sm border border-gray-200">
        <h3 className="font-bold text-lg text-primary mb-3 border-b pb-2 flex items-center">
            <Icon className="w-6 h-6 mr-2" /> {title}
        </h3>
        <div className="flex justify-between items-center mb-1 text-sm">
            <span className="font-medium text-text-secondary">Tiến độ:</span>
            <span className="font-bold text-accent">{potentialIncome} / tháng</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div className="bg-accent h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="space-y-2">
            {tasks.map(task => (
                <label key={task.id} htmlFor={task.id} className="flex items-center p-2 bg-background rounded-md cursor-pointer hover:bg-green-100">
                    <input
                        type="checkbox"
                        id={task.id}
                        checked={task.completed}
                        onChange={() => onToggleTask(task.id)}
                        className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
                    />
                    <span className={`ml-3 text-sm text-text-secondary ${task.completed ? 'line-through' : ''}`}>{task.text}</span>
                </label>
            ))}
        </div>
    </div>
);


const AccelerateView = () => {
    const [husbandTasks, setHusbandTasks] = useState<ActionTask[]>(initialHusbandTasks);
    const [wifeTasks, setWifeTasks] = useState<ActionTask[]>(initialWifeTasks);

    const [skills, setSkills] = useState('');
    const [incomeIdeas, setIncomeIdeas] = useState<IncomeSource[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const toggleTask = (setter: React.Dispatch<React.SetStateAction<ActionTask[]>>, id: string) => {
        setter(prevTasks => prevTasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
    };
    
    const calculateProgress = (tasks: ActionTask[]) => {
        if (tasks.length === 0) return 0;
        const completedCount = tasks.filter(t => t.completed).length;
        return (completedCount / tasks.length) * 100;
    };

    const husbandProgress = useMemo(() => calculateProgress(husbandTasks), [husbandTasks]);
    const wifeProgress = useMemo(() => calculateProgress(wifeTasks), [wifeTasks]);

    const getIncomeIdeas = async () => {
        if (!skills) {
            setError('Vui lòng nhập kỹ năng của bạn.');
            return;
        }
        setLoading(true);
        setError('');
        setIncomeIdeas([]);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `Dựa trên các kỹ năng sau: "${skills}", hãy đề xuất 3 ý tưởng để tạo thêm thu nhập. Với mỗi ý tưởng, cung cấp các thông tin sau:
- Tên nguồn thu nhập (source)
- Mô tả ngắn gọn (description)
- Các kỹ năng liên quan (skills)
- Nền tảng/cách bắt đầu (platform)
- Tiềm năng thu nhập (potential) - dùng các giá trị: thấp, trung bình, cao

Hãy trả lời dưới dạng một JSON array, mỗi object trong array là một ý tưởng và có các key như trong ngoặc đơn ở trên.`;
            
            const response: GenerateContentResponse = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: 'application/json',
                    responseSchema: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                source: { type: Type.STRING },
                                description: { type: Type.STRING },
                                skills: { type: Type.STRING },
                                platform: { type: Type.STRING },
                                potential: { type: Type.STRING },
                            },
                            required: ['source', 'description', 'skills', 'platform', 'potential']
                        },
                    },
                },
            });
            const text = response.text;
            if (text) {
                const parsedIdeas = JSON.parse(text);
                // FIX: Add a type guard to ensure parsedIdeas is an array before calling .map, as JSON.parse can return any value type.
                if (Array.isArray(parsedIdeas)) {
                    setIncomeIdeas(parsedIdeas.map((idea: Omit<IncomeSource, 'id'>, index: number) => ({ ...idea, id: Date.now() + index })));
                }
            }
        } catch (e) {
            console.error(e);
            setError('Đã xảy ra lỗi khi lấy ý tưởng. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-2 text-text-primary">Tăng tốc Thu nhập</h2>
            <p className="text-text-secondary mb-6">Biến kỹ năng thành tiền bạc và tạo "gọng kìm" thứ hai để tấn công nợ.</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Left Column: Action Plans */}
                <div className="lg:col-span-3 space-y-6">
                    <ActionPlanCard 
                        title="Kế hoạch cho Chồng"
                        icon={BriefcaseIcon}
                        tasks={husbandTasks}
                        onToggleTask={(id) => toggleTask(setHusbandTasks, id)}
                        progress={husbandProgress}
                        potentialIncome="5 - 12 triệu"
                    />
                     <ActionPlanCard 
                        title="Kế hoạch cho Vợ"
                        icon={KeyboardIcon}
                        tasks={wifeTasks}
                        onToggleTask={(id) => toggleTask(setWifeTasks, id)}
                        progress={wifeProgress}
                        potentialIncome="4 - 7 triệu"
                    />
                </div>

                {/* Right Column: Tools & Exploration */}
                <div className="lg:col-span-2">
                     <div className="sticky top-8 space-y-6">
                        <div className="bg-card p-4 rounded-lg shadow-sm border border-gray-200 text-center">
                            <h3 className="font-bold text-lg text-text-primary mb-2">
                                Tổng thu nhập tăng thêm tiềm năng
                            </h3>
                            <p className="text-4xl font-bold text-accent">9 - 19 triệu</p>
                            <p className="text-text-secondary text-sm">mỗi tháng</p>
                        </div>
                        <div className="bg-card p-4 rounded-lg shadow-sm border border-gray-200">
                             <h3 className="font-bold text-lg text-primary mb-3 border-b pb-2">
                                <i className="fas fa-lightbulb mr-2"></i>Tìm thêm ý tưởng với AI
                            </h3>
                            <p className="text-sm text-text-secondary mb-3">Nhập các kỹ năng của bạn để AI đề xuất thêm các nguồn thu nhập khác.</p>
                             <div className="flex flex-col gap-2">
                                <input
                                    type="text"
                                    value={skills}
                                    onChange={(e) => setSkills(e.target.value)}
                                    placeholder="Vd: quản lý, phân tích số liệu..."
                                    className="w-full px-3 py-2 bg-gray-100 border rounded-md"
                                    disabled={loading}
                                />
                                <button
                                    onClick={getIncomeIdeas}
                                    disabled={loading}
                                    className="px-4 py-2 font-bold text-white bg-primary rounded-md hover:bg-secondary disabled:bg-gray-400"
                                >
                                    {loading ? 'Đang tìm...' : 'Gửi yêu cầu'}
                                </button>
                            </div>
                            {error && <p className="text-danger text-center text-sm mt-2">{error}</p>}
                            {loading && <p className="text-center text-sm mt-2">AI đang suy nghĩ...</p>}
                            {incomeIdeas.length > 0 && (
                                <div className="mt-4 space-y-3">
                                    {incomeIdeas.map((idea) => (
                                        <div key={idea.id} className="bg-background p-3 rounded-lg">
                                            <h4 className="font-bold text-md text-accent">{idea.source}</h4>
                                            <p className="text-xs mt-1">{idea.description}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                     </div>
                </div>
            </div>
        </div>
    );
};


const FutureView: React.FC = () => (
    <div>
        <h2 className="text-3xl font-bold mb-2 text-text-primary">Hướng tới Tương lai Tài chính Bền vững</h2>
        <p className="text-text-secondary mb-8">Thoát nợ không phải là đích đến cuối cùng, mà là sự khởi đầu cho một nền tảng tài chính vững chắc cho cả gia đình.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Educating Children */}
            <div className="space-y-6">
                 <div className="bg-card p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="font-bold text-xl text-primary mb-4 border-b pb-3 flex items-center">
                        <PiggyBankIcon className="w-7 h-7 mr-3 text-accent" /> Dạy con về Tiền: Di sản Vô giá
                    </h3>
                    <p className="text-sm text-text-secondary mb-4 italic">
                        Biến giai đoạn khó khăn thành "khóa học thực tế" về quản lý tài chính, một di sản còn quý giá hơn cả tiền bạc cho thế hệ tương lai.
                    </p>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-text-primary">Con trai út (Mẫu giáo)</h4>
                            <ul className="list-disc list-inside text-sm text-text-secondary mt-2 space-y-1">
                                <li><span className="font-semibold">Khái niệm "Chờ đợi":</span> Dùng một chiếc lọ trong suốt để con thấy tiền tiết kiệm tăng lên mỗi ngày, dạy về sự kiên nhẫn.</li>
                                <li><span className="font-semibold">Ba chiếc lọ:</span> Hướng dẫn con chia tiền vào 3 lọ: Tiết kiệm - Chi tiêu - Chia sẻ.</li>
                            </ul>
                        </div>
                         <div>
                            <h4 className="font-semibold text-text-primary">Con trai thứ (Lớp 5) & lớn (Lớp 8)</h4>
                            <ul className="list-disc list-inside text-sm text-text-secondary mt-2 space-y-1">
                                <li><span className="font-semibold">Ngân sách cá nhân:</span> Cung cấp tiền tiêu vặt cố định và để con tự quản lý chi tiêu của mình.</li>
                                <li><span className="font-semibold">Tham gia vào tài chính gia đình:</span> Cùng con so sánh giá, tìm cách giảm hóa đơn điện để con thấy có trách nhiệm.</li>
                                <li><span className="font-semibold">Thảo luận về chi phí lớn:</span> Nói chuyện về các chi phí thực tế như học phí, du lịch để con hiểu giá trị của đồng tiền.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Maintaining Discipline */}
            <div className="space-y-6">
                <div className="bg-card p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="font-bold text-xl text-primary mb-4 border-b pb-3">
                        Duy trì Kỷ luật & Tái đánh giá
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-start">
                             <div className="flex-shrink-0">
                                <UsersIcon className="w-8 h-8 text-accent"/>
                             </div>
                             <div className="ml-4">
                                <h4 className="font-semibold text-text-primary">Họp tài chính gia đình hàng tháng</h4>
                                <p className="text-sm text-text-secondary mt-1">Dành 30-60 phút mỗi tháng để rà soát chi tiêu, cập nhật "Bản đồ Nợ" và ăn mừng những thành quả đã đạt được, dù là nhỏ nhất.</p>
                             </div>
                        </div>
                        <div className="flex items-start">
                             <div className="flex-shrink-0">
                                <ClipboardCheckIcon className="w-8 h-8 text-accent"/>
                             </div>
                             <div className="ml-4">
                                <h4 className="font-semibold text-text-primary">Đánh giá lại kế hoạch hàng quý</h4>
                                <p className="text-sm text-text-secondary mt-1">Mỗi 3 tháng, hãy xem xét lại toàn bộ kế hoạch. Liệu việc phân bổ ngân sách có còn phù hợp? Có cần điều chỉnh chiến lược trả nợ không?</p>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Conclusion Section */}
        <div className="mt-10 bg-gradient-to-r from-primary to-secondary text-white p-8 rounded-lg shadow-lg text-center">
            <SparklesIcon className="w-12 h-12 mx-auto mb-4"/>
            <h3 className="text-2xl font-bold mb-4">Lời kết: Từ Gánh nặng đến Tự do</h3>
            <p className="max-w-3xl mx-auto mb-6">
                Hành trình này là một con đường đầy thử thách nhưng hoàn toàn khả thi với một kế hoạch chi tiết và sự đồng lòng. Lộ trình của bạn bao gồm 4 giai đoạn chiến lược:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm max-w-4xl mx-auto mb-6">
                <div className="bg-white/20 p-3 rounded-md"><b>1. Chẩn đoán & Đồng lòng:</b> Nhìn thẳng vào sự thật và cam kết chung sức.</div>
                <div className="bg-white/20 p-3 rounded-md"><b>2. Phòng thủ & Tích lũy:</b> Thiết lập ngân sách, cắt giảm lãng phí, xây dựng quỹ khẩn cấp.</div>
                <div className="bg-white/20 p-3 rounded-md"><b>3. Tấn công & Tiêu diệt nợ:</b> Áp dụng chiến lược trả nợ và tái cấu trúc nợ thông minh.</div>
                <div className="bg-white/20 p-3 rounded-md"><b>4. Tăng tốc & Xây dựng:</b> Kích hoạt nguồn thu nhập mới và giáo dục tài chính cho thế hệ sau.</div>
            </div>
            <p className="max-w-3xl mx-auto font-semibold">
                Hãy hình dung về một ngày không xa, khi khoản nợ cuối cùng được thanh toán và gia đình đã cùng nhau vượt qua giông bão, trở nên mạnh mẽ và gắn kết hơn bao giờ hết. Hành trình đến tự do tài chính bắt đầu từ những bước đi hôm nay.
            </p>
        </div>
    </div>
);

// START: NEW TRANSACTION VIEW
const transactionCategories: Category[] = [
    { value: 'salary', label: 'Lương', type: 'income', icon: BriefcaseIcon },
    { value: 'freelance', label: 'Làm thêm', type: 'income', icon: KeyboardIcon },
    { value: 'other_income', label: 'Thu nhập khác', type: 'income', icon: CoinsIcon },
    { value: 'food', label: 'Ăn uống', type: 'expense', icon: UtensilsCrossedIcon },
    { value: 'transport', label: 'Di chuyển', type: 'expense', icon: CarIcon },
    { value: 'housing', label: 'Nhà cửa', type: 'expense', icon: PiggyBankIcon },
    { value: 'education', label: 'Giáo dục', type: 'expense', icon: GraduationCapIcon },
    { value: 'shopping', label: 'Mua sắm', type: 'expense', icon: ShoppingBagIcon },
    { value: 'entertainment', label: 'Giải trí', type: 'expense', icon: TvIcon },
    { value: 'bills', label: 'Hóa đơn', type: 'expense', icon: FileTextIcon },
    { value: 'charity', label: 'Hiếu hỉ/Từ thiện', type: 'expense', icon: HeartHandshakeIcon },
    { value: 'travel', label: 'Du lịch', type: 'expense', icon: PlaneIcon },
    { value: 'other_expense', label: 'Chi phí khác', type: 'expense', icon: GiftIcon },
];

const TransactionModal: React.FC<{ isOpen: boolean; onClose: () => void; onSave: (transaction: Transaction) => void; transaction: Transaction | null }> = ({ isOpen, onClose, onSave, transaction }) => {
    const [formData, setFormData] = useState<Omit<Transaction, 'id'>>({
        date: new Date().toISOString().split('T')[0],
        description: '',
        amount: 0,
        type: 'expense',
        category: 'food',
    });

    React.useEffect(() => {
        if (transaction) {
            setFormData({
                date: transaction.date,
                description: transaction.description,
                amount: transaction.amount,
                type: transaction.type,
                category: transaction.category,
            });
        } else {
            setFormData({
                date: new Date().toISOString().split('T')[0],
                description: '',
                amount: 0,
                type: 'expense',
                category: 'food',
            });
        }
    }, [transaction, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: Number(value.replace(/[\.,]/g, '')) || 0 }));
    };

    const handleTypeChange = (type: 'income' | 'expense') => {
        const firstCategory = transactionCategories.find(c => c.type === type);
        setFormData(prev => ({
            ...prev,
            type,
            category: firstCategory ? firstCategory.value : '',
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.amount <= 0 || !formData.description) {
            alert("Vui lòng nhập mô tả và số tiền hợp lệ.");
            return;
        }
        onSave({ ...formData, id: transaction ? transaction.id : Date.now().toString() });
    };

    const availableCategories = transactionCategories.filter(c => c.type === formData.type);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-card rounded-lg shadow-xl w-full max-w-md">
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-text-primary mb-4">{transaction ? 'Chỉnh sửa Giao dịch' : 'Thêm Giao dịch Mới'}</h3>
                        <div className="space-y-4">
                            <div className="flex justify-center gap-4 mb-4">
                                <button type="button" onClick={() => handleTypeChange('expense')} className={`px-6 py-2 rounded-full font-semibold transition ${formData.type === 'expense' ? 'bg-danger text-white' : 'bg-gray-200'}`}>Chi phí</button>
                                <button type="button" onClick={() => handleTypeChange('income')} className={`px-6 py-2 rounded-full font-semibold transition ${formData.type === 'income' ? 'bg-accent text-white' : 'bg-gray-200'}`}>Thu nhập</button>
                            </div>
                            <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full px-3 py-2 bg-gray-100 border rounded-md" />
                            <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Mô tả (vd: Ăn trưa, Lương tháng 5)" required className="w-full px-3 py-2 bg-gray-100 border rounded-md" />
                            <input type="text" name="amount" value={formData.amount.toLocaleString('vi-VN')} onChange={handleAmountChange} placeholder="Số tiền" required className="w-full px-3 py-2 bg-gray-100 border rounded-md" />
                            <select name="category" value={formData.category} onChange={handleChange} required className="w-full px-3 py-2 bg-gray-100 border rounded-md">
                                {availableCategories.map(cat => (
                                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="bg-background px-6 py-3 flex justify-end gap-3 rounded-b-lg">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-text-secondary rounded-md hover:bg-gray-300">Hủy</button>
                        <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary">Lưu</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const TransactionView = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
    const [filterPeriod, setFilterPeriod] = useState('thisMonth');
    const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');

    const handleOpenModal = (transaction: Transaction | null = null) => {
        setEditingTransaction(transaction);
        setIsModalOpen(true);
    };

    const handleSaveTransaction = (transaction: Transaction) => {
        setTransactions(prev => {
            const existing = prev.find(t => t.id === transaction.id);
            if (existing) {
                return prev.map(t => t.id === transaction.id ? transaction : t);
            }
            return [...prev, transaction];
        });
        setIsModalOpen(false);
    };

    const handleDeleteTransaction = (id: string) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa giao dịch này?')) {
            setTransactions(prev => prev.filter(t => t.id !== id));
        }
    };
    
    const filteredTransactions = useMemo(() => {
        const now = new Date();
        const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

        return transactions
            .filter(t => {
                if (filterType !== 'all' && t.type !== filterType) return false;

                const tDate = new Date(t.date);
                if (filterPeriod === 'thisMonth') return tDate >= firstDayThisMonth;
                if (filterPeriod === 'lastMonth') return tDate >= firstDayLastMonth && tDate <= lastDayLastMonth;
                
                return true; // allTime
            })
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [transactions, filterPeriod, filterType]);

    const summary = useMemo(() => {
        return filteredTransactions.reduce((acc, t) => {
            if (t.type === 'income') acc.income += t.amount;
            else acc.expense += t.amount;
            return acc;
        }, { income: 0, expense: 0 });
    }, [filteredTransactions]);

    return (
        <div>
            <h2 className="text-3xl font-bold mb-2 text-text-primary">Sổ Giao Dịch Chi Tiết</h2>
            <p className="text-text-secondary mb-6">Ghi lại và theo dõi tất cả các khoản thu chi để kiểm soát dòng tiền.</p>
            
            <TransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveTransaction} transaction={editingTransaction} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-100 p-4 rounded-lg text-center">
                    <h4 className="font-semibold text-accent">Tổng Thu</h4>
                    <p className="text-2xl font-bold text-accent">{formatCurrency(summary.income)}</p>
                </div>
                <div className="bg-red-100 p-4 rounded-lg text-center">
                    <h4 className="font-semibold text-danger">Tổng Chi</h4>
                    <p className="text-2xl font-bold text-danger">{formatCurrency(summary.expense)}</p>
                </div>
                <div className="bg-blue-100 p-4 rounded-lg text-center">
                    <h4 className="font-semibold text-blue-700">Số Dư</h4>
                    <p className="text-2xl font-bold text-blue-700">{formatCurrency(summary.income - summary.expense)}</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-between items-center mb-4 bg-card p-4 rounded-lg shadow-sm border">
                <div className="flex gap-4">
                    <select value={filterPeriod} onChange={e => setFilterPeriod(e.target.value)} className="bg-gray-100 border rounded-md px-3 py-2">
                        <option value="thisMonth">Tháng này</option>
                        <option value="lastMonth">Tháng trước</option>
                        <option value="allTime">Toàn bộ</option>
                    </select>
                     <select value={filterType} onChange={e => setFilterType(e.target.value as any)} className="bg-gray-100 border rounded-md px-3 py-2">
                        <option value="all">Tất cả</option>
                        <option value="income">Thu nhập</option>
                        <option value="expense">Chi phí</option>
                    </select>
                </div>
                <button onClick={() => handleOpenModal(null)} className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary">
                    <PlusCircleIcon className="w-5 h-5 mr-2" /> Thêm Giao dịch
                </button>
            </div>

            <div className="bg-card p-4 rounded-lg shadow-sm border">
                {filteredTransactions.length > 0 ? (
                    <div className="space-y-3">
                        {filteredTransactions.map(t => {
                            const category = transactionCategories.find(c => c.value === t.category);
                            const Icon = category?.icon || CoinsIcon;
                            return (
                                <div key={t.id} className="flex items-center gap-4 p-3 bg-background rounded-md">
                                    <div className={`p-2 rounded-full ${t.type === 'income' ? 'bg-green-100 text-accent' : 'bg-red-100 text-danger'}`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-semibold text-text-primary">{t.description}</p>
                                        <p className="text-xs text-text-secondary">{new Date(t.date).toLocaleDateString('vi-VN')} - {category?.label}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-bold ${t.type === 'income' ? 'text-accent' : 'text-danger'}`}>{formatCurrency(t.amount)}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleOpenModal(t)} className="text-gray-400 hover:text-primary"><Edit3Icon className="w-5 h-5"/></button>
                                        <button onClick={() => handleDeleteTransaction(t.id)} className="text-gray-400 hover:text-danger"><Trash2Icon className="w-5 h-5"/></button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <p className="text-center text-text-secondary py-8">Chưa có giao dịch nào. Hãy bắt đầu bằng cách thêm một giao dịch mới!</p>
                )}
            </div>
        </div>
    );
};
// END: NEW TRANSACTION VIEW

interface FinancialPlanAppProps {
    activeView: 'dashboard' | 'transactions' | 'diagnosis' | 'defense' | 'attack' | 'accelerate' | 'future';
}

export const FinancialPlanApp: React.FC<FinancialPlanAppProps> = ({ activeView }) => {
    const renderContent = () => {
        switch (activeView) {
            case 'dashboard':
                return <DashboardView />;
            case 'transactions':
                return <TransactionView />;
            case 'diagnosis':
                return <DiagnosisView />;
            case 'defense':
                return <DefenseView />;
            case 'attack':
                return <AttackView />;
            case 'accelerate':
                return <AccelerateView />;
            case 'future':
                return <FutureView />;
            default:
                return <DashboardView />;
        }
    };

    return (
        <div className="bg-card p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg min-h-full">
            {renderContent()}
        </div>
    );
};