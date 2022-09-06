import styled from "styled-components";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { isEmpty } from "lodash-es";
import { Fade } from "./fade";
import { When } from "./When";
import { useFocus } from "@/hooks/useFocus";
import { useSearch } from "@/hooks/useWeather";
export function SearchCity(props) {
  const { selectedCity, handleInput, handleItemClick, inputContent, list } =
    useSearch();
  const { handleBlur, handleFocus, listShow } = useFocus();
  useEffect(() => {
    if (selectedCity) props.onSelect(selectedCity);
  }, [selectedCity]);

  return (
    <header className="px-8 py-8 flex items-end ">
      <City className="relative">
        <input
          onChange={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={inputContent}
          type="text"
          placeholder="Type here"
          className="input input-bordered input-info w-full max-w-xs"
        />
        <Fade in={listShow}>
          <div className="absolute left-0 top-14 py-1 z-50 bg-white right-0 border-gray-100 rounded-lg shadow-2xl">
            <When if={isEmpty(list)}>
              <div className="p-2">请输入...</div>
            </When>
            <When if={!isEmpty(list)}>
              <ul className="flex flex-col gap-1 ">
                {list.map((item) => (
                  <li
                    key={item.lat}
                    onClick={() => handleItemClick(item)}
                    className="hover:bg-base-200 p-2"
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </When>
          </div>
        </Fade>
      </City>
    </header>
  );
}

const City = styled.div``;
