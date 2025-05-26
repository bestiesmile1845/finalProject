
import React from 'react';
import Header from '../../components/home/header';
import { Link } from 'react-router-dom';
import maternity from '../../assets/maternity.png'
import checklist from '../../assets/checklist.png'
import ultrasound from '../../assets/ultrasound.png'
const Home: React.FC = () => {
  return (
    <div className="w-screen bg-white">
      <Header />
      <main className="flex flex-col items-center justify-center bg-[#FBE2E0] min-h-screen  space-y-5">

        {/* ข้อความแนะนำ */}
        <div className="text-center bg-white w-full text-gray-800 space-y-2">
          <h1 className="text-7xl font-bold p-10 font-mali">"หากกังวลใจสิ่งใด บอกเราได้เลยนะ"</h1>
          <p className="text-base p-10 text-gray-600">โปรดเลือกสิ่งที่คุณต้องการ...</p>
        </div>

        {/* Horizontal Card Scroll */}
        <div className="overflow-x-auto p-4">
          <div className="flex space-x-4 w-max h-max px-4">

            {/* Card 1 */}
            <Link to="/create-post">
              <div className="cursor-pointer min-w-[300px] max-w-[300px] bg-white rounded-2xl shadow-md p-4 
                  transition transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                <h2 className="text-xl font-semibold mb-2">ตั้งกระทู้</h2>
                <p className="text-sm mb-2">มีเรื่องกังวลใจอะไร บอกเราหน่อยสิ !</p>
                <img
                  src={maternity}
                  alt="ตั้งกระทู้"
                  className="w-full h-40 object-contain"
                />
              </div>
            </Link>

            {/* Card 2 */}
            <Link to="/daily-board">
              <div className="cursor-pointer min-w-[300px] max-w-[300px] bg-white rounded-2xl shadow-md p-4 
                  transition transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                <h2 className="text-xl font-semibold mb-2">บอร์ดประจำวัน</h2>
                <p className="text-sm mb-2">สาระความรู้จากหมอชั้นนำ</p>
                <img
                  src={checklist}
                  alt="บอร์ดประจำวัน"
                  className="w-full h-40 object-contain"
                />
              </div>
            </Link>

            {/* Card 3 */}
            <Link to="/consult-doctor">
              <div className="cursor-pointer min-w-[300px] max-w-[300px] bg-white rounded-2xl shadow-md p-4 
                  transition transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                <h2 className="text-xl font-semibold mb-2">ปรึกษาหมอส่วนตัว</h2>
                <p className="text-sm mb-2">สามารถปรึกษาหมอได้โดยตรง</p>
                <img
                  src={ultrasound}
                  alt="ปรึกษาหมอ"
                  className="w-full h-40 object-contain"
                />
              </div>
            </Link>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
