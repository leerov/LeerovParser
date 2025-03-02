import React from 'react';

interface IconTextButtonProps {
    icon: React.ReactNode;
    text: string;
    onClick?: () => void;
}

export default function IconTextButton({ icon, text, onClick }: IconTextButtonProps) {
    return (
        <button
            onClick={onClick}
            className="grid grid-cols-[auto_1fr] gap-2 border-2 p-2 pr-5 pl-5 rounded-full border-foreground text-foreground bg-background hover:bg-foreground hover:text-background transition-colors duration-300"
        >
            {icon}
            <p>{text}</p>
        </button>
    );
}
