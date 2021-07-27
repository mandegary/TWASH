const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');
const withImages = require('next-images')
const withVideos = require('next-videos')
const withSass = require('@zeit/next-sass')

//git push -u origin master
module.exports = withVideos(withImages(withFonts(withSass(withCSS({
    experimental: { scss: true },
    env:{
        url:"https://api.tsapp.ir/api",
        //url:"http://185.231.59.154/api",
        delayFetch:100000,
        loadingDotsColor:"rgba(240,70,65,1)",//#00878B
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
})))))
