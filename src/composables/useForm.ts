import { computed, ComputedRef, reactive, ref, Ref, UnwrapNestedRefs } from 'vue';
import { ValidatorFn } from '../utils/validators';

export type FormOptions<Key extends PropertyKey> = Record<
	Key,
	[initialValue: string, validators?: ValidatorFn[]]
>;

export type Return<T extends PropertyKey> = {
	isValid: ComputedRef<boolean>;
	values: Record<T, Ref<string>>;
	fields: Record<T, { value: Ref<string>; error: ComputedRef<boolean> }>;
};

export function useForm<T>(
	options: FormOptions<keyof T>
): UnwrapNestedRefs<Return<keyof T>> {
	const fields: Record<keyof T, { value: Ref<string>; error: ComputedRef<boolean> }> =
		{} as any;
	const values: Record<keyof T, Ref<string>> = {} as any;

	for (const key in options) {
		const [initialValue, validators = []] = options[key];

		const value = ref(initialValue);

		const error = computed(() => {
			let hasError = false;
			validators.forEach((fn) => {
				if (!hasError) {
					hasError = !fn(value.value);
				}
			});
			return hasError;
		});

		values[key] = value;
		fields[key] = { value, error };
	}

	// Checks if all fields in the form are valid
	const isValid = computed(() => {
		let isValid = true;
		for (const key in fields) {
			const { error } = fields[key];
			if (isValid) {
				isValid = !error.value;
			}
		}
		return isValid;
	});

	const ret = {
		isValid,
		values,
		fields,
	};

	return reactive(ret);
}
