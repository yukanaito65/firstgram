// import React from 'react';
// import InputEmail from './InputEmail';
// import shallow from 'enzyme';

// //shallowの戻り値.find(対象となる要素).simulate(イベント名);
// describe('inputのテスト', ()=>{
//   test('state', ()=>{
//     const subject = shallow(<InputEmail />);
//     let remainCount = subject.state().remainCount;
//     expect(remainCount).toBe(10);
//     subject.find('input').simulate('change', {target: {value: 'abc'}});
//     remainCount = subject.state().remainCount;
//     expect(remainCount).toBe(7);
//   });
// });


import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputEmail from "./InputEmail";

describe("入力", () => {
  it("入力テスト", () => {
    render(<InputEmail />);
    const inputValue = screen.getByRole("textbox");
    userEvent.type(inputValue, "test");
    expect(inputValue.value).toBe("test");
  });
});
