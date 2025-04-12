// components/Layout.tsx
import React from 'react';
import Header from '../../components/home/header';
import Manu from '../../components/home/manu';
import RightPanel from '../../components/home/rigthpanel';

const home: React.FC = () => {
  return (
    <div className='p-5 w-screen bg-gray-50 '>
    <Header />
    <div className="flex w-screen h-screen bg-gray-50 ">
      <Manu />
    <main className="flex flex-1 p-8">
          <div className="flex-1 text-4xl font-bold text-blue1">
            News
          </div>
          <div className="flex-shrink-0 w-1/2">
            <RightPanel />
          </div>
    </main>
        </div>
    </div>
  );
};

export default home;
