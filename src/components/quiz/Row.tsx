import React from 'react'

type RowProps<T extends object> = {
  data: T;
  spacing: number[];
};

export default function Row<T extends object>(props : RowProps<T>) {
  const sumSpacing = props.spacing.reduce((p, c)=>p+c);
  const spacingPerc = props.spacing.map((elem)=>100*elem/sumSpacing);

  return (
    <div>
      <div className={'w-full h-8 border-b flex text-black text-xs items-center overflow-hidden'}>
        {
          Object.values(props.data).map((value, index)=><span 
            style={{width: `${spacingPerc[index]}%`, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}
            className='m-1 font-bold'
            key={index}>
          {value}</span>)
        }
      </div>
    </div>
  )
}
