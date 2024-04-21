import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";
import robotsTxt from "astro-robots-txt";

import playformCompress from "@playform/compress";

// https://astro.build/config
export default defineConfig({
	site: "https://www.carmor.me",
	prefetch: true,
	integrations: [
		tailwind({
			config: {
				applyBaseStyles: false,
			},
		}),
		react(),

		sitemap(),
		partytown({
			config: {
				forward: ["dataLayer.push"],
			},
		}),
		robotsTxt({
			sitemap: [
				"https://www.carmor.me/sitemap-0.xml",
				"http://www.carmor.mesite/sitemap-index.xml",
			],
		}),
		playformCompress(),
	],
});
