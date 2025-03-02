import React from 'react';

interface FlexProps {
    children: React.ReactNode;
    className?: string;
}

export function Row({ children, className = '' }: FlexProps) {
    return (
        <div className={`flex flex-row items-center justify-between ${className}`}>
            {children}
        </div>
    );
}


