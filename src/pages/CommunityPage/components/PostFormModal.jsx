import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { fetchChannels } from '@/apis/channelApi';
import { createPostApi } from '@/apis/postApi';
import { useSelector } from 'react-redux';

const PostFormModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    channelId: '',
    file: null,
  });
  const [channels, setChannels] = useState([]);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fullName = useSelector(state => state.user?.userFullName);

  useEffect(() => {
    const loadChannels = async () => {
      try {
        const channelsData = await fetchChannels();
        const filteredChannels = channelsData.filter(
          channel => channel.name !== '베스트' && channel.name !== '전체',
        );
        setChannels(filteredChannels);
      } catch (err) {
        setError(err.message);
      }
    };
    loadChannels();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = e => {
    setFormData(prev => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!formData.channelId) {
      alert('게시판을 선택해주세요.');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title || '제목 없음');
    formDataToSend.append('channelId', formData.channelId);
    if (formData.file) {
      formDataToSend.append('image', formData.file);
    }

    try {
      setIsSubmitting(true);
      await createPostApi(formDataToSend);
      alert('게시글이 성공적으로 업로드되었습니다!');
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('게시글 업로드 실패:', error);
      alert('게시글 업로드에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-6 space-y-6 relative">
        <h2 className="text-2xl font-bold">게시글 쓰기</h2>

        <div className="border-b border-gray-300 pb-2 mb-4">
          <p className="text-gray-500 text-lg">{fullName || '닉네임 로딩 중...'}</p>
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
          className="border border-gray-300 rounded-lg w-full h-[223px] p-8 text-[16px] leading-6 "
          placeholder="내용을 입력해주세요"
          onChange={handleChange}
          value={formData.title}
        />

        <div className="border border-gray-300 rounded-lg flex items-center w-[720px] h-[72px] p-2">
          <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 transition-colors w-[72px] h-[36px] border border-gray-300 rounded-md justify-center text-sm bg-gray-100">
            업로드
            <input type="file" name="file" className="hidden" onChange={handleFileChange} />
          </label>
          {formData.file && (
            <div className="flex items-center gap-2 ml-4 relative">
              <span className="text-gray-700">{formData.file.name}</span>
              <button
                type="button"
                className="text-gray-500 hover:text-red-500 flex items-center"
                onClick={() => setFormData(prev => ({ ...prev, file: null }))}
              >
                ✖
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4 absolute bottom-2 right-5">
          <button
            type="button"
            className="rounded border border-orange-500 text-orange-500 hover:bg-orange-100 transition-colors w-[73px] h-[44px] text-sm mb-15"
            onClick={onClose}
          >
            취소
          </button>
          <button
            type="submit"
            className="rounded bg-orange-500 text-white hover:bg-orange-600 transition-colors w-[73px] h-[44px] text-sm flex justify-center items-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? '등록 중...' : '확인'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default PostFormModal;
