// 커뮤니티 - 모집글 카드 컴포넌트

import Image from "next/image";

interface CommunityCardProps {
    imageUrl: string;
    title: string;
    location: string;
    buttonText: string;
}

const CommunityCard = ({
    imageUrl,
    title,
    location,
    buttonText,
}: CommunityCardProps) => {
    return (
        <div className="w-[418px] h-[333px] flex justify-center bg-white rounded-2xl overflow-hidden border border-neutral-300 p-5">
            <div className="relative flex flex-col h-full">
                {/* 카드 이미지 */}
                <div className="w-[370px] h-[210px] relative mx-auto">
                    <Image
                        src={imageUrl}
                        alt={title}
                        layout="fill"
                        objectFit="cover"
                        className="w-full h-full rounded-2xl"
                    />
                </div>

                <div className="flex flex-col flex-grow p-2 mt-1">
                    {/* 타이틀 */}
                    <div className="text-xl font-semibold text-neutral-800">
                        {title}
                    </div>

                    {/* 위치 */}
                    <div className="text-base font-normal text-neutral-500 flex items-center">
                        <Image
                            src="/icons/main_bluePin.svg"
                            alt="bluePin 아이콘"
                            width={16}
                            height={16}
                            className="mr-1"
                        />
                        {location}

                        {/* 참가여부 버튼 */}
                        <button
                            className={`ml-auto mt-4 w-[82px] h-[33px] flex justify-center items-center text-lg font-semibold py-2 px-4 rounded-lg ${
                                buttonText === "참가"
                                    ? "bg-sky-50 text-sky-500 hover:bg-amber-50 outline outline-1 outline-sky-500"
                                    : "bg-neutral-300 text-neutral-500 outline outline-1 outline-neutral-500 cursor-not-allowed"
                            }`}
                            disabled={buttonText !== "참가"}
                            onClick={() => alert("참가 버튼 클릭됨")}
                        >
                            {buttonText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunityCard;
