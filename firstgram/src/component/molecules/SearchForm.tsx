import React from "react";
import Btn from "../atoms/button/Btn";

interface Props {
  inputValue: string,
  propsOnChange: any,
  onClickSearch: (event: React.FormEvent<HTMLFormElement>) => void,

}

function SearchForm(props: Props) {
  return (
    <div>
      <form className="searchForm" onSubmit={props.onClickSearch}>
        <div className="searchFormWapper">
          <input
            className="searchForm__input"
            type="search"
            value={props.inputValue}
            onChange={(e) => props.propsOnChange(e.target.value)}
            placeholder="検索ワードを入力"
          />
          <Btn onClick={props.onClickSearch} text="検索" className="searchBtn" />
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
