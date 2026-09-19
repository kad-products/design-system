import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import KADSortableList from './sortable-list';

const meta: Meta<typeof KADSortableList> = {
	component: KADSortableList,
	parameters: {
		layout: 'centered',
	},
};

export default meta;

type Story = StoryObj<typeof KADSortableList>;

const DEFAULT_ITEMS = [
	{ id: '1', label: 'First item' },
	{ id: '2', label: 'Second item' },
	{ id: '3', label: 'Third item' },
	{ id: '4', label: 'Fourth item' },
];

export const Default: Story = {
	render: () => {
		const [items, setItems] = useState(DEFAULT_ITEMS);
		return (
			<div style={{ width: 320 }}>
				<KADSortableList items={items} renderItem={item => <span>{item.label}</span>} onChange={setItems} />
			</div>
		);
	},
};

const LONG_ITEMS = [
	{ id: '1', label: 'Daily standup — review blockers and update the team on progress' },
	{ id: '2', label: 'Sprint planning — estimate and assign tickets for the upcoming sprint' },
	{ id: '3', label: 'Retrospective — reflect on what went well and what needs improvement' },
];

export const LongContent: Story = {
	render: () => {
		const [items, setItems] = useState(LONG_ITEMS);
		return (
			<div style={{ width: 360 }}>
				<KADSortableList items={items} renderItem={item => <span>{item.label}</span>} onChange={setItems} />
			</div>
		);
	},
};

export const SingleItem: Story = {
	render: () => {
		const [items, setItems] = useState([{ id: '1', label: 'Only item' }]);
		return (
			<div style={{ width: 320 }}>
				<KADSortableList items={items} renderItem={item => <span>{item.label}</span>} onChange={setItems} />
			</div>
		);
	},
};
