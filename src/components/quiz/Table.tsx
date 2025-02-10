import React from 'react'
import Row from './Row';

interface TableProps<T extends object>{
  data: T[];
  spacing: number[];
  desc?: string[];
  maxHeight?: string;
};

export default function Table<T extends object>(props : TableProps<T>) {
  return (
    <div 
      className={'w-full overflow-auto border-t'}
      style={{height: `${props.maxHeight}`}}
    >
      { props.desc && <Row data={props.desc} spacing={props.spacing}/> }
      { props.data.map((elem, index)=><Row<T> data={elem} spacing={props.spacing} key={index}/>) }
    </div>
  )
}
