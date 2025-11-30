'use client';

import { useState } from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

export function TimePicker({ value, onChange, placeholder = 'Chọn giờ' }) {
    const [isOpen, setIsOpen] = useState(false);
    const [hour, setHour] = useState('12');
    const [minute, setMinute] = useState('00');

    // Parse existing value if provided
    useState(() => {
        if (value) {
            const [h, m] = value.split(':');
            setHour(h || '12');
            setMinute(m || '00');
        }
    }, [value]);

    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

    const handleConfirm = () => {
        const timeValue = `${hour}:${minute}`;
        onChange(timeValue);
        setIsOpen(false);
    };

    const handleClear = () => {
        setHour('12');
        setMinute('00');
        onChange('');
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
                    "hover:bg-accent hover:text-accent-foreground",
                    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                    "disabled:cursor-not-allowed disabled:opacity-50"
                )}
            >
                <span className={value ? "text-foreground" : "text-muted-foreground"}>
                    {value || placeholder}
                </span>
                <Clock className="h-4 w-4 opacity-50" />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute top-full left-0 z-50 mt-2 w-64 rounded-lg border bg-popover p-4 shadow-lg">
                        <div className="text-sm font-medium mb-3 text-center">Chọn Giờ</div>

                        <div className="flex gap-2 mb-4">
                            {/* Hours */}
                            <div className="flex-1">
                                <div className="text-xs text-muted-foreground text-center mb-2">Giờ</div>
                                <div className="h-48 overflow-y-auto border rounded-md">
                                    {hours.map((h) => (
                                        <button
                                            key={h}
                                            type="button"
                                            onClick={() => setHour(h)}
                                            className={cn(
                                                "w-full px-3 py-2 text-sm hover:bg-accent transition-colors",
                                                hour === h && "bg-primary text-primary-foreground hover:bg-primary/90"
                                            )}
                                        >
                                            {h}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Minutes */}
                            <div className="flex-1">
                                <div className="text-xs text-muted-foreground text-center mb-2">Phút</div>
                                <div className="h-48 overflow-y-auto border rounded-md">
                                    {minutes.map((m) => (
                                        <button
                                            key={m}
                                            type="button"
                                            onClick={() => setMinute(m)}
                                            className={cn(
                                                "w-full px-3 py-2 text-sm hover:bg-accent transition-colors",
                                                minute === m && "bg-primary text-primary-foreground hover:bg-primary/90"
                                            )}
                                        >
                                            {m}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Preview */}
                        <div className="text-center mb-4 p-2 bg-accent rounded-md">
                            <div className="text-2xl font-bold">{hour}:{minute}</div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between gap-2">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={handleClear}
                                className="flex-1"
                            >
                                Xóa
                            </Button>
                            <Button
                                type="button"
                                size="sm"
                                onClick={handleConfirm}
                                className="flex-1"
                            >
                                Xác nhận
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
