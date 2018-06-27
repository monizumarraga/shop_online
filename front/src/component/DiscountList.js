import React from 'react';
import DiscountUpdate from '../component/DiscountUpdate';

const DiscountList = ({ onMenuChange, discountList, onDiscountList }) => {
	return(
		<div 
			style={{display: 'flex', justifyContent: 'center', flexWrap:'wrap', flexDirection: 'column'}}
			className='center'>
			{
				Object.keys(discountList).map((discount,i) => {
					return <li style={{listStyleType: 'none'}} key={i.toString()}>
							<div 
								className='center' 
								style={{justifyContent: 'flex-end', alignItems:'flex-end', border:'1px solid grey', borderRadius:'10px', padding: '5px', margin:'10px', backgroundColor:'rgba(203, 221, 240, 1)'}}
								>
								<DiscountUpdate 
									discount={discountList[i]}
									onMenuChange={onMenuChange}
									onDiscountList={onDiscountList}
								/>
							</div>
							</li>
		          })
			}
		</div>
		);
}

export default DiscountList;
