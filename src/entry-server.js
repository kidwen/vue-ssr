import { basename } from 'path';
import { renderToString } from 'vue/server-renderer';
import { createApp } from './main.js';

export async function render(url, manifest) {
    const { app, router } = createApp();

    router.push(url);
    await router.isReady();

    const ctx = {};
    const html = await renderToString(app, ctx);

    const preloadLinks = renderPreloadLinks(ctx.modules, manifest);

    return [html, preloadLinks];
}

function renderPreloadLink(file) {
    if (file.endsWith('.js')) {
        return `<link rel="modulepreload" crossorigin href="${file}">`;
    } if (file.endsWith('.css')) {
        return `<link rel="stylesheet" href="${file}">`;
    } if (file.endsWith('.woff')) {
        return `<link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`;
    } if (file.endsWith('.woff2')) {
        return `<link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`;
    } if (file.endsWith('.gif')) {
        return `<link rel="preload" href="${file}" as="image" type="image/gif">`;
    } if (file.endsWith('.jpg')) {
        return `<link rel="preload" href="${file}" as="image" type="image/jpg">`;
    } if (file.endsWith('.png')) {
        return `<link rel="preload" href="${file}" as="image" type="image/png">`;
    }
    return '';
}

function renderPreloadLinks(modules, manifest) {
    let links = '';
    const seen = new Set();
    modules.forEach((id) => {
        const files = manifest[id];
        if (files) {
            files.forEach((file) => {
                if (!seen.has(file)) {
                    seen.add(file);
                    const filename = basename(file);
                    if (manifest[filename]) {
                        for (const depFile in manifest[filename]) {
                            if (Object.prototype.hasOwnProperty.call(depFile, manifest)) {
                                links = renderPreloadLink(depFile);
                                seen.add(depFile);
                            }
                        }
                    }
                    links += renderPreloadLink(file);
                }
            });
        }
    });
    return links;
}
