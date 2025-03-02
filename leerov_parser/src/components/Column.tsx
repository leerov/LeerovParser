import React from 'react';

interface FlexProps {
    children: React.ReactNode;
    className?: string;
}

export function Column({ children, className = '' }: FlexProps) {
    return (
        <div className={`flex flex-col items-center justify-between ${className}`}>
            {children}
        </div>
    );
}