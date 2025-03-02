import React from 'react';

interface IconButtonProps {
    icon: React.ReactNode;
    onClick?: () => void;
}

export default function IconButton({ icon, onClick }: IconButtonProps) {
    return (
        <button
            onClick={onClick}
            className="w-full aspect-square rounded-full border-2 border-foreground text-foreground bg-background hover:bg-foreground hover:text-background transition-colors duration-300 flex items-center justify-center"
        >
            {icon}
        </button>
    );
}
