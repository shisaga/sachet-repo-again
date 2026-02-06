import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [cursorVariant, setCursorVariant] = useState('default');
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                setCursorVariant('hover');
            } else {
                setCursorVariant('default');
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY]);

    const variants = {
        default: {
            width: 32,
            height: 32,
            backgroundColor: 'rgba(147, 51, 234, 0.5)',
            mixBlendMode: 'difference',
        },
        hover: {
            width: 64,
            height: 64,
            backgroundColor: 'rgba(16, 185, 129, 0.8)',
            mixBlendMode: 'difference',
        }
    };

    return (
        <motion.div
            className="fixed top-0 left-0 bg-primary rounded-full pointer-events-none z-[9999] flex items-center justify-center backdrop-blur-sm"
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
            }}
            variants={variants}
            animate={cursorVariant}
            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        >
            {cursorVariant === 'hover' && (
                <span className="text-xl">👀</span>
            )}
        </motion.div>
    );
};

export default CustomCursor;
