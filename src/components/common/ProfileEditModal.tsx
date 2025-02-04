import { useState } from "react";

const ProfileEditModal = ({ isOpen, onClose, profile, onSave }) => {
   const [updatedProfile, setUpdatedProfile] = useState(profile);
   const [selectedImage, setSelectedImage] = useState(profile.image || "/images/default-profile.png");

   // 입력 값 변경 핸들러
   const handleChange = (e) => {
      const { name, value } = e.target;
      setUpdatedProfile((prev) => ({ ...prev, [name]: value }));
   };

   // 프로필 이미지 업로드 핸들러
   const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
         const reader = new FileReader();
         reader.onloadend = () => {
            setSelectedImage(reader.result);
            setUpdatedProfile((prev) => ({ ...prev, image: reader.result }));
         };
         reader.readAsDataURL(file);
      }
   };

   // 저장 버튼 클릭 시 실행
   const handleSave = () => {
      onSave(updatedProfile); // 부모 컴포넌트로 데이터 전달
      onClose(); // 모달 닫기
   };

   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
         <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg">
            <h2 className="text-xl font-bold mb-4">프로필 수정</h2>

            {/* 프로필 사진 업로드 */}
            <div className="flex flex-col items-center">
               <label className="cursor-pointer">
                  <img src={selectedImage} alt="프로필 이미지" className="w-24 h-24 rounded-full object-cover" />
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
               </label>
               <p className="text-sm text-gray-500 mt-2">사진을 클릭하여 변경</p>
            </div>

            {/* 입력 필드 */}
            <div className="mt-4">
               <label className="block text-sm font-medium text-gray-700">이름</label>
               <input
                  type="text"
                  name="name"
                  value={updatedProfile.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mt-1"
               />
            </div>

            <div className="mt-4">
               <label className="block text-sm font-medium text-gray-700">이메일</label>
               <input
                  type="email"
                  name="email"
                  value={updatedProfile.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mt-1"
                  disabled
               />
            </div>

            <div className="mt-4">
               <label className="block text-sm font-medium text-gray-700">선호하는 여행 스타일</label>
               <input
                  type="text"
                  name="travelStyle"
                  value={updatedProfile.travelStyle}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mt-1"
               />
            </div>

            <div className="mt-4">
               <label className="block text-sm font-medium text-gray-700">자기소개</label>
               <textarea
                  name="bio"
                  value={updatedProfile.bio}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mt-1"
               />
            </div>

            {/* 버튼 */}
            <div className="mt-6 flex justify-end gap-4">
               <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={onClose}>
                  취소
               </button>
               <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleSave}>
                  저장하기
               </button>
            </div>
         </div>
      </div>
   );
};

export default ProfileEditModal;
