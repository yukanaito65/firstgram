import React from 'react'
import TestButton from '../button/TestButton';
// import  selectButton   from "./InputPull"

function InputPulldown() {
  return (
<div>
{/* <button  */}
{/* // onClick={this.click.bind(this)} */}
{/* >…</button> */}
<select className='selectButton'>

<option selected disabled>…</option>
<option>{<TestButton />}</option>
<option>テスト２</option>
</select>

</div>
  )
}

export default InputPulldown;
