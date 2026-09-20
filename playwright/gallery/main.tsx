import { composeStories } from '@storybook/react';
import { StrictMode } from 'react';
import { flushSync } from 'react-dom';
import { createRoot, type Root } from 'react-dom/client';
import '../../src/styles/global.css';

const storiesFiles = import.meta.glob('../../src/**/*.stories.{tsx,jsx}');
const id = (f: string) => f.replace(/^(\.\.\/)+src\//, '').replace(/\.stories\.\w+$/, '');

async function resolve(storyId: string) {
	const sep = storyId.lastIndexOf('/');
	const [path, name] = [storyId.slice(0, sep), storyId.slice(sep + 1)];
	const file = Object.keys(storiesFiles).find(f => id(f) === path || id(f).endsWith('/' + path));
	if (!file) return undefined;
	const mod = (await storiesFiles[file]()) as Parameters<typeof composeStories>[0];
	const composed = composeStories(mod) as Record<string, React.ComponentType>;
	return composed[name];
}

const rootEl = document.getElementById('root')!;
let root: Root | undefined;

type GalleryWindow = {
	mount: (p: { story: string; props?: Record<string, unknown> }) => Promise<void>;
	unmount: () => Promise<void>;
};

const win = window as unknown as GalleryWindow;

win.mount = async ({ story, props }) => {
	const Story = await resolve(story);
	if (!Story) throw new Error(`Unknown story: ${story}`);
	root ??= createRoot(rootEl);
	flushSync(() =>
		root!.render(
			<StrictMode>
				<Story {...props} />
			</StrictMode>,
		),
	);
};

win.unmount = async () => {
	root?.unmount();
	root = undefined;
};
