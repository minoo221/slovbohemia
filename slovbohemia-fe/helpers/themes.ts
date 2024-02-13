import { ThemeDefinition } from "vuetify";

// String that represents the name of the theme I am using
export const MAIN_THEME = "mainTheme";
// Light mode theme
export const mainTheme: ThemeDefinition = {
	dark: false,
	colors: {
		background: "#FFFFFF",
		surface: "#FFFFFF",
		primary: "#3B82F6",
		secondary: "#FB923C",
		'secondary-1': '#FDBA74',
		'grey-1': '#FCFCFC',
		'grey-2': '#E5E5E5',
		'grey-3': '#EFF6FF',
		'grey-4': '#F1F5F9',
		'grey-5': '#1E293BAD',
		'grey-6': '#707070',
		'grey-7': '#475569',
		'grey-8': '#3E3E3E',
		'grey-9': '#0F172A',
		'grey-10': '#1E293B',
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
		surface: "#f2c514",
		primary: "#6366f1",
		secondary: "#9333ea",
		error: "#ef4444",
		info: "#3b82f6",
		success: "#22c55e",
		warning: "#f2c514",
	},
};
