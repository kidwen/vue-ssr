const fs = require('fs');
const path = require('path');

const toAbsolute = (p) => path.resolve(__dirname, p);

const manifest = require('./dist/static/ssr-manifest.json');

const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8');
const { render } = require('./dist/server/entry-server.js');

const routesToPrerender = fs.readdirSync(toAbsolute('src/views')).map((file) => {
    const name = file.replace(/\.vue$/, '').toLowerCase();
    return name === 'home' ? '/' : `/${name}`;
});
(async () => {
    for (const url of routesToPrerender) {
        // eslint-disable-next-line no-await-in-loop
        const [appHtml, preloadLinks] = await render(url, manifest);
        const html = template.replace('<!--preload-links-->', preloadLinks).replace('<!--app-html-->', appHtml);
        const filePath = `dist/static${url === '/' ? '/index' : url}.html`;
        fs.writeFileSync(toAbsolute(filePath), html);
    }
    fs.unlinkSync(toAbsolute('dist/static/ssr-manifest.json'));
})();
