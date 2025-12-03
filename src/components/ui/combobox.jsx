'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from './input';

export function Combobox({ 
    options = [], 
    value, 
    onChange, 
    placeholder = 'Tìm kiếm...',
    displayKey = 'name',
    valueKey = 'code',
    disabled = false,
    className
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const containerRef = useRef(null);
    const inputRef = useRef(null);

    const selectedOption = options.find(opt => opt[valueKey] === value);

    useEffect(() => {
        if (searchTerm) {
            const filtered = options.filter(opt =>
                opt[displayKey].toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredOptions(filtered);
        } else {
            setFilteredOptions(options);
        }
    }, [searchTerm, options, displayKey]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
                setSearchTerm('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (option) => {
        onChange(option[valueKey]);
        setIsOpen(false);
        setSearchTerm('');
    };

    const handleClear = (e) => {
        e.stopPropagation();
        onChange('');
        setSearchTerm('');
    };

    return (
        <div ref={containerRef} className={cn('relative w-full', className)}>
            <div
                className={cn(
                    'flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm',
                    'ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
                    disabled && 'cursor-not-allowed opacity-50'
                )}
                onClick={() => !disabled && setIsOpen(true)}
            >
                {selectedOption ? (
                    <span className="flex-1 text-left">{selectedOption[displayKey]}</span>
                ) : (
                    <span className="flex-1 text-left text-muted-foreground">{placeholder}</span>
                )}
                <div className="flex items-center gap-1">
                    {selectedOption && !disabled && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                    <ChevronDown className={cn('h-4 w-4 text-muted-foreground transition-transform', isOpen && 'rotate-180')} />
                </div>
            </div>

            {isOpen && (
                <div className="absolute z-50 mt-2 w-full rounded-md border bg-popover shadow-lg">
                    <div className="p-2 border-b">
                        <div className="relative">
                            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                ref={inputRef}
                                type="text"
                                placeholder="Tìm kiếm..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-8"
                                autoFocus
                            />
                        </div>
                    </div>
                    <div className="max-h-60 overflow-auto p-1">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <button
                                    key={option[valueKey]}
                                    type="button"
                                    onClick={() => handleSelect(option)}
                                    className={cn(
                                        'w-full text-left px-3 py-2 rounded-md text-sm',
                                        'hover:bg-accent hover:text-accent-foreground',
                                        'focus:bg-accent focus:text-accent-foreground',
                                        'focus:outline-none',
                                        value === option[valueKey] && 'bg-accent text-accent-foreground'
                                    )}
                                >
                                    {option[displayKey]}
                                </button>
                            ))
                        ) : (
                            <div className="px-3 py-2 text-sm text-muted-foreground text-center">
                                Không tìm thấy
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

