import CheckIcon from '@/components/quiz/svg/CheckedIcon';
import CrossedIcon from '@/components/quiz/svg/CrossedIcon';
import React, { useRef, createRef, useState } from 'react'

type ProblemCardProps = {
  id: number;
  ref: React.RefObject<HTMLDivElement | null>; //Intersection Observer
  url: string; //이미지 로딩 용
  selectAnswer: string[];
  selectAnswerCallback: (id: string, selected : number)=>void;
  problem: string;
}

export default function ProblemCard(props : ProblemCardProps) {  
  const selectionButtons = useRef(props.selectAnswer.map(()=>createRef<HTMLDivElement>()));
  const selectionColors = ["bg-red-700", "bg-green-700", "bg-blue-700", "bg-yellow-700"];
  const [selected, setSelected] = useState(-1);
  const [solved, setSolved] = useState(false);

  const refToCompIcon = createRef<HTMLDivElement>();

  function OnClickSelectBtn(selectedNum : number){
    if(selected === -1){
      refToCompIcon.current?.classList.add('animate-rotate');
      refToCompIcon.current?.addEventListener('animationend', ()=>{
        setSolved(true);
      }, { once: true });
    }
    props.selectAnswerCallback(props.id.toString(), selectedNum);
    setSelected(selectedNum);
  }

  if(props.problem === ''){
    return <DefaultProblemCard ref={props.ref}/>
  }
  
  return (
    <div className='
      w-full max-w-[900px] min-w-[600px] aspect-[2.5/1] m-2
      transition-opacity duration-300 ease-in-out
      rounded-lg drop-shadow-2xl overflow-hidden
      flex
    ' ref={props.ref}>
      <div 
        className={`w-[10%] h-full flex justify-center items-center bg-[#000000A0] rounded-l-lg`}
        style={{backgroundImage: `url(${props.url})`, backgroundSize:'cover', backgroundPosition: 'center', backgroundBlendMode: 'multiply'}}
      >
        <div ref={refToCompIcon}>
          { solved ? <CheckIcon width={40} height={40} color='#33FF33'/> : <CrossedIcon width={40} height={40} color='#FF3333' /> }
        </div>
      </div>
      <div className='w-[90%] h-full flex flex-col bg-slate-50'>
        <div className='w-full h-[10%] min-h-[50px] flex items-end ml-5'>
          <span className='text-xl md:text-2xl text-black ml-2'>Q{props.id + 1}.</span>
          <span className='text-sm md:text-lg text-black ml-2'>{props.problem}</span>
        </div>
        <div className='w-full h-[90%] flex place-content-evenly items-center'>
          <div 
            className='w-[30%] aspect-square rounded-lg'
            style={{backgroundImage: `url(${props.url})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}
          >
          </div>
          <div className='w-[55%] aspect-[16/9] rounded-lg overflow-hidden grid grid-cols-2 gap-1'>
            {props.selectAnswer.map((elem, index)=><div ref={selectionButtons.current[index]} key={index} onClick={()=>OnClickSelectBtn(index)} className={`${selected !== index ? 'bg-black' : selectionColors[index]} opacity-75 flex justify-center items-center transition-opacity ease-in-out hover:opacity-80 cursor-pointer`}><span className='p-1 text-sm text-white font-bold text-center'>{elem}</span></div>)}
          </div>
        </div>
      </div>
    </div>
  )
}

function DefaultProblemCard(props : {ref: React.RefObject<HTMLDivElement | null>}) : React.JSX.Element {
  return (
    <div className='
      w-full max-w-[900px] min-w-[600px] aspect-[2.5/1] m-2
      transition-opacity duration-300 ease-in-out
      rounded-lg drop-shadow-2xl overflow-hidden
      flex bg-white'
      ref={props.ref}
    >
      <div 
        className={`w-[10%] h-full flex justify-center items-center bg-slate-200 rounded-l-lg `}
      >
      </div>
      <div className='w-[90%] h-full flex flex-col items-center pt-2'>
        <div className='w-[90%] h-[10%] min-h-[50px] flex items-end p-1'>
          <div className='w-full h-full bg-slate-200 rounded-lg '></div>
        </div>
        <div className='w-full h-[90%] flex place-content-evenly items-center'>
          <div className='w-[30%] aspect-square rounded-lg bg-slate-200 '></div>
          <div className='w-[55%] aspect-[16/9] rounded-lg overflow-hidden grid grid-cols-2 gap-1'>
            <div className={`bg-slate-200 flex justify-center items-center transition-opacity ease-in-out `}></div>
            <div className={`bg-slate-200 flex justify-center items-center transition-opacity ease-in-out `}></div>
            <div className={`bg-slate-200 flex justify-center items-center transition-opacity ease-in-out `}></div>
            <div className={`bg-slate-200 flex justify-center items-center transition-opacity ease-in-out `}></div>
          </div>
        </div>
      </div>
    </div>
  )
}