import { ThemeDefinition } from "vuetify";

// String that represents the name of the theme I am using
export const MAIN_THEME = "mainTheme";
// Light mode theme
export const mainTheme: ThemeDefinition = {
	dark: false,
	colors: {
		background: "#EDF2F4",
		surface: "#FFFFFF",
		primary: "#dfd2bf",
		'primary-lighten-1': '#f2c514',
		secondary: "#2B2D42",
		'secondary-lighten-1': '#8D99AE',
		error: "#ef4444",
		info: "#3b82f6",
		success: "#22c55e",
		warning: "#f2c514",
	},
};

// String that represents the name of the dark theme I am using
export const MAIN_DARK_THEME = "mainDarkTheme";
// Dark mode theme
export const mainDarkTheme: ThemeDefinition = {
	dark: true,
	colors: {
		background: "#0C111B",
		surface: "#1f2937",
		primary: "#6366f1",
		secondary: "#9333ea",
		error: "#ef4444",
		info: "#3b82f6",
		success: "#22c55e",
		warning: "#f59e0b",
	},
};
