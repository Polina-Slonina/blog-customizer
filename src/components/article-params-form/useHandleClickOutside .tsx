import { useEffect, RefObject } from 'react';

export const useHandleClickOutside = (
	isOpen: boolean,
	ref: RefObject<HTMLElement>,
	callback: () => void
) => {
	useEffect(() => {
		if (!isOpen) return; // сразу выходим из useEffect, если сайдбар закрыт

		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback();
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				callback();
			}
		};

		if (isOpen && ref.current) {
			document.addEventListener('mousedown', handleClickOutside);
			window.addEventListener('keydown', handleKeyDown); // Добавление обработчика для клавиши Escape
		}

		// Отписываемся от события при размонтировании компонента
		return () => {
			if (ref.current) {
				document.removeEventListener('mousedown', handleClickOutside);
				window.removeEventListener('keydown', handleKeyDown); // Удаление обработчика для клавиши
			}
		};
	}, [callback, ref]);
};
