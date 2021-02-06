const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');
const withImages = require('next-images')
const withVideos = require('next-videos')

module.exports = withVideos(withImages(withFonts(withCSS({
    env:{
        url:"https://panel.rsga.ir/",
        delayFetch:45000,
        i18n: {
            welcome: {
                en: "Welcome",
                fa: "خوش آمدید"
            }
            // rest of your translation object
        },
    },

    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Note: we provide webpack above so you should not `require` it
        // Perform customizations to webpack config
        config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//))

        // Important: return the modified config
        return config
    }
}))))
