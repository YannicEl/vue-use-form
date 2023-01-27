export type ValidatorFn = (value: unknown) => boolean;
export type ValidatorFnGenerator = (...params: any[]) => ValidatorFn;

export const required: ValidatorFn = (value) => !!value;

export const maxLength: ValidatorFnGenerator = (maxLength: number) => (value) => {
	return typeof value === 'string' && value?.length <= maxLength;
};

export const minLength: ValidatorFnGenerator = (minLength: number) => (value) => {
	return typeof value === 'string' && value?.length >= minLength;
};

export const regex: ValidatorFnGenerator = (regex: RegExp) => (value) => {
	return typeof value === 'string' && regex.test(value);
};

// https://github.com/colinhacks/zod
const emailRegex =
	/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@((?!-)([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{1,})[^-<>()[\].,;:\s@"]$/i;

export const email: ValidatorFn = (value) => {
	const fn = regex(emailRegex);
	return fn(value);
};
