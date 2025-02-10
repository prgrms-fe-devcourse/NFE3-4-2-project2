import ButtonList from '@pages/AddPlanPage/components/ButtonList.jsx';
import Button from '@components/common/Button/index.jsx';

const ChangeTimeModal = ({ setTime, setIsOpenModal, onClick }) => {
  return (
    <div className="fixed w-auto h-auto inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-630 h-571 py-25 px-15 rounded-lg grid items-center shadow-lg relative">
        <button
          onClick={() => setIsOpenModal(false)}
          className="absolute top-3 right-3 text-18 m-15 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <ButtonList setTime={setTime} />
        <div className="flex items-center justify-center">
          <div className="w-104 mt-25">
            <Button type={'submit'} label={'변경하기'} onClick={onClick} className={"h-40"}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangeTimeModal;