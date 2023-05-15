import * as util from '$lib/server/util';

export const getMenu = async (platform: Readonly<App.Platform> | undefined) => {
	const menu = await platform?.env?.YUMMY?.get('menu', { type: 'json' });
	if (!menu || menu.items.length === 0) {
		return null;
	}

	const updateDate = util.dateToLocalDateString(new Date(menu.updateDate));
	const today = util.dateToLocalDateString();
	if (today !== updateDate) {
		return null;
	}
	return menu;
};

export const setMenu = async (menu: Menu, platform: Readonly<App.Platform> | undefined) => {
	await platform?.env?.YUMMY.put('menu', JSON.stringify(menu));
};