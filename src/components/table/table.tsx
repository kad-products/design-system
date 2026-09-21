'use client';
import type { KADTableColumn, Permission } from '@/types';

import styleClasses from './table.module.css';

export default function KADTable<T extends Record<string, unknown>>({
	columns,
	data,
	rowIndex = 'id',
	userPermissions,
}: {
	columns: KADTableColumn[];
	data: T[];
	rowIndex?: keyof T;
	userPermissions: Permission[];
}): React.ReactNode {
	return (
		<table className={styleClasses.kadTable}>
			<thead>
				<tr>
					{columns.map(c => (
						<th key={c.key}>{c.label}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map(d => (
					<tr key={d[rowIndex] as string}>
						{columns.map(c => {
							if (c.actions) {
								return (
									<td key={c.key} className={styleClasses.kadTableActions}>
										{c.actions.map(a => {
											if (a.requiredPermission && !userPermissions.includes(a.requiredPermission)) {
												return null;
											}
											if (a.type === 'link') {
												const href = String(d[a.hrefProp ?? 'link']);
												return (
													<a key={href} href={href}>
														{a.label}
													</a>
												);
											}
											return (
												<button
													key={a.label}
													type="button"
													onClick={(): void => {
														a.handler?.(String(d[c.key]), d);
													}}
												>
													{a.label}
												</button>
											);
										})}
									</td>
								);
							}
							return <td key={c.key}>{c.render ? c.render(String(d[c.key]), d) : String(d[c.key])}</td>;
						})}
					</tr>
				))}
			</tbody>
		</table>
	);
}
