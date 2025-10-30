import React, { useState } from 'react';

const LockIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
);

interface PasscodeScreenProps {
    onSuccess: () => void;
}

// Mã truy cập được mã hóa cứng để sử dụng trong gia đình.
// Bạn có thể thay đổi giá trị '2024' này thành bất kỳ mã nào khác.
const CORRECT_PASSCODE = '2024'; 

export const PasscodeScreen: React.FC<PasscodeScreenProps> = ({ onSuccess }) => {
    const [passcode, setPasscode] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (passcode === CORRECT_PASSCODE) {
            setError('');
            onSuccess();
        } else {
            setError('Mã truy cập không đúng. Vui lòng thử lại.');
            setPasscode('');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="w-full max-w-sm p-8 space-y-6 bg-card rounded-2xl shadow-xl">
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-4 bg-primary text-white rounded-full">
                            <LockIcon className="w-8 h-8"/>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-text-primary">Truy cập nội bộ</h1>
                    <p className="mt-2 text-text-secondary">Vui lòng nhập mã truy cập của gia đình.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <input
                            id="passcode"
                            name="passcode"
                            type="password"
                            value={passcode}
                            onChange={(e) => setPasscode(e.target.value)}
                            required
                            className="w-full px-4 py-3 text-center text-lg tracking-[0.5em] bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="••••"
                            autoFocus
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-center text-danger font-medium">{error}</p>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-3 font-bold text-white bg-primary rounded-lg hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
                        >
                            Xác nhận
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
