'use client'
import { useState, useCallback } from "react";

export default function useModal(initialState = false) {
    const [isOpen, setIsOpen] = useState(initialState);

    const openModal = useCallback(() => setIsOpen(true), []);
    const closeModal = useCallback(() => setIsOpen(false), []);

    return {
        
        isOpen,
        openModal,
        closeModal,
    };
}
