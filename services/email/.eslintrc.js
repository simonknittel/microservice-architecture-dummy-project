// eslint-disable-next-line no-undef
module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: [
		'@typescript-eslint'
	],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended'
	],
	rules: {
		indent: ['error', 'tab'],
		semi: ['error', 'never'],
		quotes: ['error', 'single']
	}
}
