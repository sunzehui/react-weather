import React from "react";

export const When = ({ if: flag, children }) =>
  flag ? <> {children}</> : null;
