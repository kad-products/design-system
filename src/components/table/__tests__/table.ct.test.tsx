import { expect, test } from '@playwright/test';

test('Default', async ({ mount }) => {
	const component = await mount('components/table/table/Default');
	await expect(component).toHaveScreenshot();
});

test('Empty', async ({ mount }) => {
	const component = await mount('components/table/table/Empty');
	await expect(component).toHaveScreenshot();
});

test('WithEditAction', async ({ mount }) => {
	const component = await mount('components/table/table/WithEditAction');
	await expect(component).toHaveScreenshot();
});

test('WithButtonAction', async ({ mount }) => {
	const component = await mount('components/table/table/WithButtonAction');
	await expect(component).toHaveScreenshot();
});

test('ActionsHidden', async ({ mount }) => {
	const component = await mount('components/table/table/ActionsHidden');
	await expect(component).toHaveScreenshot();
});

test('WithCustomRender', async ({ mount }) => {
	const component = await mount('components/table/table/WithCustomRender');
	await expect(component).toHaveScreenshot();
});
