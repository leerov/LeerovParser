"use client";

import React from "react";

interface TextInputProps {
    label: string;
    id: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, id, name, value, onChange, placeholder }) => {
    return (
        <div>
            <label className="block text-sm font-medium mb-1 " htmlFor={id}>
                {label}
            </label>
            <input
                type="text"
                id={id}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className="w-full p-2 border rounded border-foreground text-foreground bg-background hover:bg-foreground hover:text-background transition-colors duration-300"
            />
        </div>
    );
};

export default TextInput;
