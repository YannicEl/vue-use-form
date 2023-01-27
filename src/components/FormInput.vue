<template>
	<label>
		<span>{{ label }}</span>
		<input :type="type" v-model="field.value" :class="{ error: field.error, dirty }" />
	</label>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const { label, type, field } = defineProps<{
	label: string;
	type: 'text' | 'password' | 'email';
	field: { value: string; error: boolean };
}>();

const dirty = ref(false);

const unwatch = watch(
	() => field.value,
	() => {
		dirty.value = true;
		unwatch();
	}
);
</script>

<style scoped>
input {
	border: 2px solid black;
}

input.dirty.error {
	border-color: red;
}
</style>
