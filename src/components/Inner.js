import React from "react";
import RecipeMap from "./RecipeMap";
import InnerHead from "./InnerHeadWrap";

export default function Inner(props) {
    const {recipes} = props;

  return (
    <div>
      <InnerHead />
      <RecipeMap recipes={recipes}/>
    </div>
  );
}
