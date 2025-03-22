import { useEffect, RefObject } from 'react';

type UseHandleClickOutside = {
	isOpen: boolean;
	rootRef: RefObject<HTMLElement>;
	onClose: () => void;
};

export const useHandleClickOutside = ({
	isOpen,
	rootRef,
	onClose,
}: UseHandleClickOutside) => {
	useEffect(() => {
		if (!isOpen) return; // сразу выходим из useEffect, если сайдбар закрыт

		const handleClickOutside = (event: MouseEvent) => {
			if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
				onClose();
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		window.addEventListener('keydown', handleKeyDown); // Добавление обработчика для клавиши Escape

		// Отписываемся от события при размонтировании компонента
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			window.removeEventListener('keydown', handleKeyDown); // Удаление обработчика для клавиши
		};
	}, [onClose, rootRef, isOpen]);
};
