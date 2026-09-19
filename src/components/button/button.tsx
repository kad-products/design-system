'use client';

import type { JSX } from 'react';
import styleClasses from './button.module.css';

export type KADButtonType = {
	isSubmitting?: boolean;
	label?: JSX.Element | string;
} & React.ComponentPropsWithoutRef<'button'>;

export default function KADButton({ isSubmitting, label, children, ...other }: KADButtonType): React.ReactNode {
	return (
		<button type="submit" disabled={isSubmitting} {...other} className={styleClasses.kadButton}>
			{label ?? children}
		</button>
	);
}
