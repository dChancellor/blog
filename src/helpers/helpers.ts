import type { Options } from '$types/api';
import { protectedRoutes } from '../dictionary/config';

export const isProtectedRoute = (pathname: string): boolean => {
	let isProtected = false;
	protectedRoutes.forEach((route: string) => {
		if (pathname.startsWith(`/${route}`)) isProtected = true;
	});
	return isProtected;
};

export const generateFetchRoute = (url: string, options: Options): string => {
	let generatedUrl = url;
	if (!generatedUrl.endsWith('?')) generatedUrl += '?';

	for (const option in options) {
		generatedUrl = `${generatedUrl}&${option}=${options[option]}`;
	}
	return generatedUrl;
};
