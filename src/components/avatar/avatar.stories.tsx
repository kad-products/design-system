import type { Meta, StoryObj } from '@storybook/react-vite';
import KADAvatar from './avatar';

const meta: Meta<typeof KADAvatar> = {
	component: KADAvatar,
	parameters: {
		layout: 'centered',
	},
	args: {
		classNameRoot: '',
	},
};

export default meta;

type Story = StoryObj<typeof KADAvatar>;

export const WithUser: Story = {
	args: {
		user: { username: 'adam' },
	},
};

export const NoUser: Story = {
	args: {
		user: undefined,
	},
};
