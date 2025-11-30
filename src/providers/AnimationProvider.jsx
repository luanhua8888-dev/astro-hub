'use client';

import { AnimatePresence } from 'framer-motion';

export const AnimationProvider = ({ children }) => {
    return (
        <AnimatePresence mode="wait">
            {children}
        </AnimatePresence>
    );
};
