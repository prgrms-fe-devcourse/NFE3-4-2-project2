import React, { PropsWithChildren } from 'react'

type IndexMenuProps = {
  className: string;
}

export default function IndexMenu(props : PropsWithChildren<IndexMenuProps>) {
  return (
    <div className={props.className}>
      { props.children && props.children }
    </div>
  )
}
