import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddFollowButton from "./AddFollowButton";

//followBtnがfalseになっているか
describe('AddFollowButtonコンポーネントテスト', () => {
  it('初期状態でfalseになっているか', () => {
    render(<AddFollowButton />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
