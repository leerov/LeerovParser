import React from 'react';

interface ButtonProps {
    text: string;
    onClick?: () => void;
}

export default function TextButton({ text, onClick }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className="grid grid-cols-[auto_1fr] gap-2 border-2 p-2 pr-5 pl-5 rounded-full border-foreground text-foreground bg-background hover:bg-foreground hover:text-background transition-colors duration-300"
        >
            <p>{text}</p>
        </button>
    );
}
