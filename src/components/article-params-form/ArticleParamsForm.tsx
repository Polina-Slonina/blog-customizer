import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';

type ArticleParamsProps = {
	setArticleState: (ArticleState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ setArticleState }: ArticleParamsProps) => {
	const [isOpen, setIsOpen] = useState(false); // Начальное значение false означает, что форма закрыта
	const sidebarRef = useRef<HTMLDivElement | null>(null); //  для закрытия сайдбара при клике вне его

	const [formState, setFormState] = useState(defaultArticleState);

	// Подписываемся на событие клика документа
	useEffect(() => {
		// Функция для закрытия сайдбара при клике вне его
		const handleSidebarIfClickedOutside = (e: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(e.target as Node)
			) {
				setIsOpen(false);
			}
		};

		if (isOpen && sidebarRef.current) {
			document.addEventListener('mousedown', handleSidebarIfClickedOutside);
		}

		// Отписываемся от события при размонтировании компонента
		return () => {
			if (sidebarRef.current) {
				document.removeEventListener(
					'mousedown',
					handleSidebarIfClickedOutside
				);
			}
		};
	}, [isOpen]);

	const handleChangeOption = (
		field: keyof ArticleStateType,
		option: OptionType
	) => {
		setFormState((prevState) => ({
			...prevState,
			[field]: option,
		}));
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	return (
		<div ref={sidebarRef}>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
						e.preventDefault()
					}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) =>
							handleChangeOption('fontFamilyOption', option)
						}
						title='Шрифт'
					/>
					<RadioGroup
						name='radio'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(option) => handleChangeOption('fontSizeOption', option)}
						title='Размер шрифта'
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						onChange={(option) => handleChangeOption('fontColor', option)}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(option) => handleChangeOption('backgroundColor', option)}
						title='Цвет фона'
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(option) => handleChangeOption('contentWidth', option)}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={() => setArticleState(formState)}
						/>
					</div>
				</form>
			</aside>
		</div>
	);
};
