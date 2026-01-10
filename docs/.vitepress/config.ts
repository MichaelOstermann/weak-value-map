import { defineConfig } from "vitepress"
import { groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons"

export default defineConfig({
    base: "/weak-value-map/",
    description: "A map with weakly-held values.",
    title: "weak-value-map",
    markdown: {
        theme: {
            dark: "catppuccin-macchiato",
            light: "github-light-default",
        },
        config(md) {
            md.use(groupIconMdPlugin)
        },
    },
    themeConfig: {
        aside: false,
        outline: "deep",
        docFooter: {
            next: false,
            prev: false,
        },
        search: {
            provider: "local",
        },
        sidebar: [
            { base: "/WeakValueMap/", text: "WeakValueMap", items: [
                { link: "constructor", text: "constructor" },
                { link: "size", text: "size" },
                { link: "set", text: "set" },
                { link: "get", text: "get" },
                { link: "has", text: "has" },
                { link: "delete", text: "delete" },
                { link: "clear", text: "clear" },
                { link: "forEach", text: "forEach" },
                { link: "keys", text: "keys" },
                { link: "values", text: "values" },
                { link: "entries", text: "entries" },
                { link: "Symbol.iterator", text: "Symbol.iterator" },
            ] },
        ],
        socialLinks: [
            { icon: "github", link: "https://github.com/MichaelOstermann/weak-value-map" },
        ],
    },
    vite: {
        plugins: [
            groupIconVitePlugin(),
        ],
    },
})
