import type { ReactNode } from 'react';

export type Permission = string;

export type KADTableAction =
	| {
			type: 'link';
			label: string;
			hrefProp?: string;
			requiredPermission?: Permission;
	  }
	| {
			type: 'button';
			label: string;
			requiredPermission?: Permission;
			handler?: (id: string, row: Record<string, unknown>) => void;
	  };

export type KADTableColumn = {
	key: string;
	label: string;
	render?: (val: string, row: Record<string, unknown>) => ReactNode;
	actions?: KADTableAction[];
};
