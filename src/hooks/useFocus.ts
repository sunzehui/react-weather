import { useState } from "react";

export function useFocus() {
  const [listShow, setListShow] = useState(false);
  return {
    handleFocus: () => setListShow(true),
    handleBlur: () => setListShow(false),
    listShow,
  };
}
