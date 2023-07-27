import inventoryI18n from './inventory/i18n'
import recipeI18n from './recipe/i18n'

const dashboard = {
  en: {
    dashboard: {
      quick_menu: {
        title: 'Quick menu',
        inventories: 'Inventories',
        materials: 'Materials'
      }
    }
  }
}

export default {
  en:{
    ...dashboard.en,
    ...inventoryI18n.en,
    ...recipeI18n.en
  }
}
