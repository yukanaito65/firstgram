import React from "react";
import { useState } from "react";

function SearchForm(onClickProps: any, inputValueProps: string) {
     // inputタグ内の状態管理
  const [searchValue, setSearchValue] = useState<string>("");
  return (
    <div>
      <form className="searchpage_form">
        <div className="searchpage_form_wrapper">
          <input
            className="searchpage_form_input"
            type="search"
            value={inputValueProps}
            onChange={(e) => inputValueProps = e.target.value}
            placeholder="検索ワードを入力"
          />
          <button
            type="button"
            className="searchpage_form_btn"
            onClick={() => onClickProps()}
          >
            検索
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
