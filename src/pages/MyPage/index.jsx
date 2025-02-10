import { Outlet } from 'react-router';
import Aside from './components/aside/Aside';

const MyPage = () => {
  return (
    <>
      <section className="w-962 mx-auto mt-120 flex justify-between pb-120">
        <Aside></Aside>
        <article className="w-[70%] right-0">
          <Outlet></Outlet>
        </article>
      </section>
    </>
  );
};

export default MyPage;
