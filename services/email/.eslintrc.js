// eslint-disable-next-line no-undef
module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: [
		'@typescript-eslint',
		'security-node'
	],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:security-node/recommended'
	],
	rules: {
		indent: ['error', 'tab', { SwitchCase: 1 }],
		semi: ['error', 'never'],
		quotes: ['error', 'single'],
		// 'import/extensions': ['error', 'always'] // I would like to have this, but TypeScript is not compatible (see https://github.com/Microsoft/TypeScript/issues/27481)
	}
}
