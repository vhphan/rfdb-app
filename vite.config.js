// FILE: vite.config.js

import {defineConfig, loadEnv} from 'vite';
import vue from '@vitejs/plugin-vue';
import {quasar, transformAssetUrls} from '@quasar/vite-plugin';
// import.meta.env.BASE_URL
// https://vitejs.dev/config/


export default ({mode}) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};

    // import.meta.env.VITE_NAME available here with: process.env.VITE_NAME
    // import.meta.env.VITE_PORT available here with: process.env.VITE_PORT

    return defineConfig({
        base: '/app/rfdb/',
        plugins: [
            vue({
                template: {transformAssetUrls}
            }),

            quasar({
                sassVariables: 'src/quasar-variables.sass'
            })
        ],
    });
}

// export default defineConfig({
//     base: '/app/rfdb/',
//     plugins: [
//         vue({
//             template: {transformAssetUrls}
//         }),
//
//         quasar({
//             sassVariables: 'src/quasar-variables.sass'
//         })
//     ],
// })
