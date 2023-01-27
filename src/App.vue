<template>
	<h1>Login</h1>
	<form @submit.prevent="login">
		<label for="email">
			Email:
			<input
				id="email"
				type="email"
				v-model="form.email.value"
				:class="{ error: form.email.error }"
			/>
		</label>

		<label for="password">
			Password:
			<input
				id="password"
				type="password"
				v-model="form.password.value"
				:class="{ error: form.password.error }"
			/>
		</label>
		<button>Login</button>
	</form>
</template>

<script setup lang="ts">
import { useForm } from './composables/useForm';
import { email, minLength, required } from './utils/validators';

const form = useForm({
	email: ['', [required, email]],
	password: ['', [required, minLength(6)]],
});

const login = () => {
	const { email, password } = form;
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
