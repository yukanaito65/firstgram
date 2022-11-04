import React from "react";

interface Props {
  onClick: () => void;
}

const SearchButton = ({ onClick }: Props) => {
  return (
    <button type="button" className="search-form__button" onClick={onClick}>
      検索
    </button>
  );
};

export default SearchButton;
