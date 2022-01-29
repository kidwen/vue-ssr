// @ts-check
const fs = require('fs');
const path = require('path');
const express = require('express');

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD;

async function createServer(root = process.cwd(), isProd = process.env.NODE_ENV === 'production') {
    const resolve = (p) => path.resolve(__dirname, p);

    const indexProd = isProd ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8') : '';
    const manifest = isProd ? require('./dist/client/ssr-manifest.json') : {};

    const app = express();

    let vite;
    if (!isProd) {
        vite = await require('vite').createServer({
            root,
            logLevel: isTest ? 'error' : 'info',
            server: {
                middlewareMode: 'ssr',
                watch: {
                    usePolling: true, interval: 100,
                },
            },
        });
        app.use(vite.middlewares);
    } else {
        app.use(require('compression')());
        app.use(require('serve-static')(resolve('dist/client'), { index: false }));
    }

    app.use('*', async (req, res) => {
        try {
            const url = req.originalUrl;
            let template;
            let render;
            if (!isProd) {
                template = fs.readFileSync(resolve('index.html'), 'utf-8');
                template = await vite.transformIndexHtml(url, template);
                render = (await vite.ssrLoadModule('/src/entry-server.js')).render;
            } else {
                template = indexProd;
                // @ts-ignore
                render = require('./dist/server/entry-server.js').render;
            }

            const [appHtml, preloadLinks] = await render(url, manifest);

            const html = template.replace('<!--preload-links-->', preloadLinks).replace('<!--app-html-->', appHtml);
            res.status(200).set({ 'Content-type': 'text/html' }).end(html);
        } catch (e) {
            vite.ssrFixStacktrace(e);
            res.status(500).end(e.stack);
        }
    });

    return { app, vite };
}

if (!isTest) {
    createServer().then(({ app }) => {
        app.listen(3000, () => {
            // eslint-disable-next-line no-console
            console.info('http://localhost:3000');
        });
    });
}

exports.createServer = createServer;
