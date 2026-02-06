import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [cursorState, setCursorState] = useState('default');
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX - 24); // Center the 48px cursor
            cursorY.set(e.clientY - 24);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('clickable')
            ) {
                setCursorState('hover');
            } else {
                setCursorState('default');
            }
        };

        const handleMouseDown = () => setCursorState('click');
        const handleMouseUp = () => setCursorState('hover'); // Assuming usually over element when up

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [cursorX, cursorY]);

    const getImageForState = () => {
        switch (cursorState) {
            case 'hover':
                return '/images/face3.svg'; // Excited face?
            case 'click':
                return '/images/face2.svg'; // Surprised/Action face?
            default:
                return '/images/face1.svg'; // Neutral face
        }
    };

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
            }}
        >
            <motion.img
                src={getImageForState()}
                alt="Cursor"
                className="w-12 h-12 md:w-16 md:h-16 drop-shadow-lg"
                animate={{
                    scale: cursorState === 'click' ? 0.8 : cursorState === 'hover' ? 1.2 : 1,
                    rotate: cursorState === 'hover' ? 10 : 0
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
            />
        </motion.div>
    );
};

export default CustomCursor;
