<template>
	<h1>Login</h1>

	<form @submit.prevent="login" class="flex flex-col gap-4">
		<FormInput label="Email" type="email" :field="form.fields.email" />
		<FormInput label="Password" type="password" :field="form.fields.password" />

		<button>Login</button>
	</form>

	<pre>
    {{ form }}
  </pre>
</template>

<script setup lang="ts">
import FormInput from './components/FormInput.vue';
import { useForm } from './composables/useForm';
import { email, minLength, required } from './utils/validators';

const form = useForm({
	email: ['', [required, email]],
	password: ['', [required, minLength(6)]],
});

const login = () => {
	if (!form.isValid) {
		alert('Form is not valid');
		return;
	}

	const { email, password } = form.values;
	console.log(email, password);
};
</script>

<style scoped>
input {
	border: 2px solid black;
}

.error {
	border-color: red;
}
</style>
