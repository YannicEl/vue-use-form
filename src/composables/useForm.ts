import { computed, ComputedRef, reactive, ref, UnwrapNestedRefs } from 'vue';
import { ValidatorFn } from '../utils/validators';

export type FormOptions<Key extends PropertyKey> = Record<
	Key,
	[initialValue: string, validators?: ValidatorFn[]]
>;

export type Return<T extends PropertyKey> = Record<
	T,
	{ value: string; error: ComputedRef<boolean> }
>;

export function useForm<T>(fields: FormOptions<keyof T>) {
	const ret: any = {};

	for (const key in fields) {
		const [initialValue, validators = []] = fields[key];

		const value = ref(initialValue);

		const error = computed(() => {
			const isError =
				validators.map((fn) => fn(value.value)).filter((e) => !Boolean(e)).length > 0;
			return isError;
		});

		ret[key] = { value, error };
	}

	return reactive(ret) as UnwrapNestedRefs<Return<keyof T>>;
}
