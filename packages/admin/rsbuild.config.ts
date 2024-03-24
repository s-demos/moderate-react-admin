import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import path from "path";

export default defineConfig({
	source: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	plugins: [pluginReact()],
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:8681",
				pathRewrite: { "^/api": "" },
			},
			"/admin-api": {
				target: "http://127.0.0.1:48080",
			},
		},
	},
});
