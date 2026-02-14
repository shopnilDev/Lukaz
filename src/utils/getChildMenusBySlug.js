


export const getChildMenusBySlug = (menus, slug) => {
  for (const menu of menus) {
    if (menu.slug === slug) {
      return menu.childs || [];
    }

    if (menu.childs && menu.childs.length > 0) {
      const result = getChildMenusBySlug(menu.childs, slug);
      if (result.length > 0) {
        return result;
      }
    }
  }

  return [];
};
