import React, { useEffect, useState } from 'react'

type CapsuleSelectItemProps = {
  id: string;
  item: string;
  selected: boolean;
  onClick: (id: string)=>void;
}

function CapsuleSelectItem(props : CapsuleSelectItemProps){
  return (
    <div className={
        'min-w-[100px] border-2 border-solid rounded-full flex justify-center items-center px-2 transition-colors cursor-pointer ' + 
        (props.selected ? 'bg-violet-300 border-violet-400 text-white' : 'bg-white border-violet-400 text-black')
      }
      onClick={()=>props.onClick(props.id)}
    >
      <span className={'text-xs font-bold'}>{props.item}</span>
    </div>
  )
}

type CapsuleSelectMenuProps = {
  className: string;
  items: [code:string, desc:string][];
  onSelectedChanged?: (selectedItems : [code:string, selected:boolean][])=>void
}

export default function CapsuleSelectMenu(props : CapsuleSelectMenuProps) {  
  const [selectedItems, setSelectedItems] = useState(props.items.map(([code])=>{ return {[code]: false} }).reduce((p, c)=>Object.assign(p, c)));
  
  function OnClickSelectItem(id: string){
    const newState = {[id]: !selectedItems[id]};
    setSelectedItems({...selectedItems, ...newState});
  }
  useEffect(()=>{
    if(props.onSelectedChanged){
      props.onSelectedChanged(Object.entries(selectedItems));
    }
  }, [selectedItems, props.onSelectedChanged]);

  return (
    <div className={props.className}>
      {props.items.map(([code, desc])=><CapsuleSelectItem key={code} id={code} item={desc} selected={selectedItems[code]} onClick={()=>OnClickSelectItem(code)} />)}
    </div>
  )
}