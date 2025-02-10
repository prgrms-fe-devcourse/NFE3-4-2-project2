import { AccordionItem as Item } from "@szhsin/react-accordion";

//custom 아코디언 스타일
export const AccordionItem = ({ header, ...rest }) => (
    <Item
      {...rest}
      header={({ state: { isEnter } }) => (
        <>
          <div className="font-bold text-neutral-900 text-lg">{header}</div>
          <div
            className={`ml-auto py-2 transition-transform duration-200  ease-out  ${
              isEnter && "rotate-180"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </>
      )}
      className=""
      buttonProps={{
        className: ({ isEnter }) => `flex w-full  text-left  ${isEnter}`,
      }}
      contentProps={{
        className: "transition-height duration-200 ease-out",
      }}
      panelProps={{ className: "p-4" }}
    />
  );
  