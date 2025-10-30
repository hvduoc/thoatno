import React, { useState, useMemo, useEffect } from 'react';
import { HomeIcon, HeartPulseIcon, ShieldCheckIcon, TargetIcon, TrendingUpIcon, GraduationCapIcon, MenuIcon, XIcon, ClipboardListIcon, FlameIcon } from './components/Icons';
import { FinancialPlanApp } from './components/FinancialPlanApp';
import { PasscodeScreen } from './components/PasscodeScreen';

type View = 'dashboard' | 'transactions' | 'diagnosis' | 'defense' | 'attack' | 'accelerate' | 'future';

const StreakTracker: React.FC = () => {
    const [streak, setStreak] = useState(0);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const lastLogin = localStorage.getItem('lastLoginDate');
        const currentStreak = parseInt(localStorage.getItem('streakCount') || '0', 10);

        if (lastLogin === today) {
            setStreak(currentStreak);
        } else {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];

            let newStreak = 1;
            if (lastLogin === yesterdayStr) {
                newStreak = currentStreak + 1;
            }
            
            localStorage.setItem('lastLoginDate', today);
            localStorage.setItem('streakCount', newStreak.toString());
            setStreak(newStreak);
        }
    }, []);

    if (streak === 0) return null;

    return (
        <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="bg-secondary/80 text-white rounded-lg p-3 flex items-center justify-center gap-2 text-center">
                <FlameIcon className="w-6 h-6 text-amber-300" />
                <div className="font-bold">
                    <p className="text-lg">{streak} ngày</p>
                    <p className="text-xs opacity-80">Chuỗi đăng nhập</p>
                </div>
            </div>
        </div>
    );
};


const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activeView, setActiveView] = useState<View>('dashboard');
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const navigationItems = useMemo(() => [
        { id: 'dashboard', label: 'Bảng điều khiển', icon: HomeIcon },
        { id: 'transactions', label: 'Sổ Giao Dịch', icon: ClipboardListIcon },
        { id: 'diagnosis', label: 'Chẩn đoán Sức khỏe Tài chính', icon: HeartPulseIcon },
        { id: 'defense', label: 'Xây dựng Phòng thủ Tài chính', icon: ShieldCheckIcon },
        { id: 'attack', label: 'Kế hoạch Tổng lực Thoát nợ', icon: TargetIcon },
        { id: 'accelerate', label: 'Tăng tốc Thu nhập', icon: TrendingUpIcon },
        { id: 'future', label: 'Tương lai Bền vững', icon: GraduationCapIcon },
    ], []);

    const renderView = () => {
        return <FinancialPlanApp activeView={activeView} />;
    };

    const NavLink: React.FC<{ view: View; label: string; icon: React.ElementType }> = ({ view, label, icon: Icon }) => (
        <li
            onClick={() => {
                setActiveView(view);
                setSidebarOpen(false);
            }}
            className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-colors duration-200 ${
                activeView === view
                    ? 'bg-accent text-white shadow-md'
                    : 'text-white hover:bg-secondary'
            }`}
        >
            <Icon className="w-6 h-6 mr-3" />
            <span className="font-medium">{label}</span>
        </li>
    );
    
    const sidebarContent = (
      <div className="relative h-full flex flex-col">
        <div className="p-4 border-b border-green-600">
            <h1 className="text-2xl font-bold text-white text-center">Tự do Tài chính</h1>
        </div>
        <nav className="flex-grow p-4">
            <ul>
                {navigationItems.map(item => (
                    <NavLink key={item.id} view={item.id as View} label={item.label} icon={item.icon} />
                ))}
            </ul>
        </nav>
        <StreakTracker />
      </div>
    );

    if (!isAuthenticated) {
        return <PasscodeScreen onSuccess={() => setIsAuthenticated(true)} />;
    }

    return (
        <div className="flex h-screen font-sans bg-background text-text-primary">
            {/* Mobile Sidebar Toggle */}
            <button
                className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-primary text-white rounded-md"
                onClick={() => setSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? <XIcon className="w-6 h-6"/> : <MenuIcon className="w-6 h-6"/>}
            </button>

            {/* Sidebar */}
            <aside className={`fixed lg:relative lg:translate-x-0 inset-y-0 left-0 z-30 w-72 bg-primary shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
                {sidebarContent}
            </aside>
            

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    {renderView()}
                </div>
            </main>
        </div>
    );
};

export default App;