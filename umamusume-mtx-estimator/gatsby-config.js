module.exports = {
  siteMetadata: {
    title: "umamusume-mtx-estimator",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `ウマ娘ガチャ回数推定機`,
        short_name: `ウマ娘ガチャ計算`,
        start_url: `/`,
        background_color: `#17C729`,
        theme_color: `#17C729`,
        display: `standalone`,
        icon: `src/images/icon.png`,
      },
    },
    `gatsby-plugin-offline`,
  ],
};
