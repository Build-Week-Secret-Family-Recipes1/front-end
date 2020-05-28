import { isDev } from "./isDev";
export { axiosWithAuth } from "./axiosWithAuth";
export { isDev };

export const filterRecipeListByUserId = (list) => {
  if (isDev()) {
    return list;
  } else {
    const userId = sessionStorage.getItem("userId");
    if (userId!==null && userId !== undefined) {
      return list.filter(r=>r.user_id===userId);
    } else {
      return [];
    }
  }
}

export const modifyRecipe = (r) => {
    if (r.id>0) {
      return({id: r.id, user_id: r.user_id, title: r.title, source: r.source,
        ingredients: r.ingredients.split(';'),
        steps: r.instructions.split(';'),
        tags: r.category.split(';')
      });
    } else {
      return({id: r.id, user_id: r.user_id, title: r.title, source: r.source,
        ingredients: r.ingredients.split(', '),
        steps: r.instructions.split(', '),
        tags: [r.category]
      });
    }
}
