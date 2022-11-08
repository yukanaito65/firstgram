import React from 'react'
import SearchButton from '../atoms/button/SearchButton'
import InputSearch from '../atoms/Input/InputSearch'

function SearchInput_SearchButton() {
  return (
    <>
    <div>
        <InputSearch />
        <SearchButton
        onClick={() => console.log("検索")} />
    </div>
    </>
  )
}

export default SearchInput_SearchButton
