import { CircleX } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    className?: string;
    children: React.ReactNode;
    showCloseButton?: boolean; // New prop to control close button visibility
    isFullscreen?: boolean; // Default to false for backwards compatibility
    title?: string;
    subtitle?: string;
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children,
    className,
    showCloseButton = true, // Default to true for backwards compatibility
    isFullscreen = false,
    title = '',
    subtitle = '',
}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const contentClasses = isFullscreen ? 'w-full h-full  bg-white  dark:bg-gray-900' : 'relative w-full rounded-3xl bg-white  dark:bg-gray-900';

    return (
        <div className="modal fixed inset-0 z-99999 flex items-center justify-center overflow-y-auto">
            {!isFullscreen && <div className="fixed inset-0 h-full w-full bg-gray-400/50 backdrop-blur-[32px]" onClick={onClose}></div>}
            <div ref={modalRef} className={`${contentClasses} ${className}`} onClick={(e) => e.stopPropagation()}>
                {showCloseButton && (
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 z-999 flex h-9.5 w-9.5 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 sm:top-6 sm:right-6 sm:h-11 sm:w-11 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <CircleX width="24" height="24" />
                    </button>
                )}
                <div>
                    <div className="no-scrollbar relative w-full overflow-y-auto rounded-3xl bg-white p-4 lg:p-11 dark:bg-gray-900">
                        <div className="px-2 pr-14">
                            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">{`${title}`}</h4>
                            <p className="mb-6 text-sm text-gray-500 lg:mb-7 dark:text-gray-400">{`${subtitle}`}</p>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};
