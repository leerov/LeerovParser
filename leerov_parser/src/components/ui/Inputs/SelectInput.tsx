"use client";

import React from "react";

interface Option {
    value: string;
    label: string;
}

interface SelectInputProps {
    label: string;
    id: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Option[];
}

const SelectInput: React.FC<SelectInputProps> = ({ label, id, name, value, onChange, options }) => {
    return (
        <div>
            <label className="block text-sm font-medium mb-1 " htmlFor={id}>
                {label}
            </label>
            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full p-2 border rounded border-foreground text-foreground bg-background hover:bg-foreground hover:text-background transition-colors duration-300"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectInput;
