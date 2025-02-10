import React, { useState, useEffect } from 'react';
import Modal from '@pages/CommunityPage/components/Modal';
import { fetchChannels } from '@/apis/channelApi';
import { updatePostApi } from '@/apis/postApi';
import deleteIcon from '/icons/delete.svg';

const PostEditModal = ({ isOpen, onClose, post, onUpdate }) => {
  const authorName = post && post.author ? post.author.fullName : '';

  const [formData, setFormData] = useState({
    title: '',
    channelId: '',
    file: null,
    imageToDeletePublicId: null,
  });
  const [channels, setChannels] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        channelId: post.channel?._id || '',
        file: null,
        imageToDeletePublicId: null,
      });
    }
  }, [post]);

  useEffect(() => {
    const loadChannels = async () => {
      try {
        const channelsData = await fetchChannels();
        const filteredChannels = channelsData.filter(
          channel => channel.name !== '베스트' && channel.name !== '전체',
        );
        setChannels(filteredChannels);
      } catch (error) {
        console.error('채널 로드 실패:', error);
      }
    };

    loadChannels();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = e => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({
        ...prev,
        file,
        imageToDeletePublicId: null,
      }));
    }
  };

  const handleDeleteImage = () => {
    setFormData(prev => ({
      ...prev,
      file: null,
      imageToDeletePublicId: post.imagePublicId,
    }));
  };

  const cancelDeleteImage = () => {
    setFormData(prev => ({
      ...prev,
      imageToDeletePublicId: null,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!formData.channelId) {
      alert('게시판을 선택해주세요.');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('postId', post._id);
    formDataToSend.append('title', formData.title || '제목 없음');
    formDataToSend.append('channelId', formData.channelId);

    if (formData.file) {
      formDataToSend.append('image', formData.file);
    }
    if (formData.imageToDeletePublicId) {
      formDataToSend.append('imageToDeletePublicId', formData.imageToDeletePublicId);
    }

    try {
      setIsSubmitting(true);
      const updatedPost = await updatePostApi(formDataToSend);
      if (!updatedPost) {
        alert('업데이트된 게시글 데이터를 가져오지 못했습니다.');
        return;
      }
      alert('게시글이 성공적으로 수정되었습니다!');
      onUpdate(updatedPost);
      onClose();
    } catch (error) {
      console.error('게시글 수정 실패:', error);
      alert('게시글 수정에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-6 space-y-6 relative">
        <h2 className="text-2xl font-bold mb-4">게시글 수정</h2>

        <div className="border-b border-gray-300 pb-2 mb-4">
          <p className="text-gray-500 text-lg">{authorName || '닉네임 로딩 중...'}</p>
        </div>

        <label className="block text-sm font-medium mb-2">게시판 선택</label>
        <select
          name="channelId"
          className="border border-gray-300 rounded-lg w-[235px] h-[48px] p-2 text-[16px]"
          onChange={handleChange}
          value={formData.channelId}
        >
          <option value="">게시판 선택</option>
          {channels.map(channel => (
            <option key={channel._id} value={channel._id}>
              {channel.name}
            </option>
          ))}
        </select>

        <label className="block text-sm font-medium mt-4">내용</label>
        <textarea
          name="title"
          className="border border-gray-300 rounded-lg w-full h-[223px] p-2 text-[16px] leading-6"
          placeholder="내용을 입력해주세요"
          onChange={handleChange}
          value={formData.title}
        />

        <div className="flex items-center justify-between w-[720px]">
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 transition-colors w-[72px] h-[36px] border border-gray-300 rounded-md justify-center text-sm bg-gray-100">
              업로드
              <input type="file" name="file" className="hidden" onChange={handleFileChange} />
            </label>
            {formData.file ? (
              <div className="flex items-center gap-2">
                <span className="text-gray-700">{formData.file.name}</span>
                <button
                  type="button"
                  className="hover:opacity-75"
                  onClick={() => setFormData(prev => ({ ...prev, file: null }))}
                >
                  <img src={deleteIcon} alt="삭제" className="w-[15px] h-[15px]" />
                </button>
              </div>
            ) : (
              post.imagePublicId && (
                <div className="flex items-center gap-2 ml-4">
                  {formData.imageToDeletePublicId === null ? (
                    <>
                      <span className="text-gray-700">기존 이미지가 있습니다.</span>
                      <button
                        type="button"
                        className="hover:opacity-75 ml-4"
                        onClick={handleDeleteImage}
                      >
                        <img src={deleteIcon} alt="삭제" className="w-[25px] h-[25px]" />
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="text-gray-700">삭제</span>
                      <button
                        type="button"
                        className="hover:opacity-75 ml-4 text-blue-500 text-sm"
                        onClick={cancelDeleteImage}
                      >
                        취소
                      </button>
                    </>
                  )}
                </div>
              )
            )}
          </div>
          <div className="flex items-center gap-4 mr-[-80px] mt-[10px]">
            <button
              type="button"
              className="rounded border border-orange-500 text-orange-500 hover:bg-orange-100 transition-colors w-[73px] h-[44px] text-sm"
              onClick={onClose}
            >
              취소
            </button>
            <button
              type="submit"
              className="rounded bg-orange-500 text-white hover:bg-orange-600 transition-colors ml-[10px] w-[73px] h-[44px] text-sm flex justify-center items-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? '수정 중...' : '확인'}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default PostEditModal;
