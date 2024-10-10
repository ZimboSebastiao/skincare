// metro.config.js
const { getDefaultConfig } = require("metro-config");

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig.getDefaultValues("metro");

  return {
    transformer: {
      assetPlugins: ["expo-asset/tools/hashAssetFiles"],
    },
    resolver: {
      assetExts: assetExts.filter((ext) => ext !== "db"), // Excluir a extensão .db se estiver usando banco de dados SQLite
      sourceExts: [...sourceExts, "cjs"], // Adiciona suporte para .cjs se necessário
    },
  };
})();
