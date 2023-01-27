<template>
	<label>
		<span>{{ label }}</span>
		<input :type="type" v-model="field.value" :class="{ error: field.error }" />
	</label>
</template>

<script lang="ts" setup>
const { label, type, field } = defineProps<{
	label: string;
	type: 'text' | 'password' | 'email';
	field: { value: string; error: boolean };
}>();
</script>

<style scoped>
input {
	border: 2px solid black;
}

input.error {
	border-color: red;
}
</style>
