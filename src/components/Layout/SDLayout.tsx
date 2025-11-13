import React from 'react';

import { useFlightEventNotifications } from '@/hooks/useFlightEventNotifications';
import { Head } from '../Head';
type SDLayoutProps = {
  children: React.ReactNode;
  title: string;
};
export const SDLayout = ({ children, title }: SDLayoutProps) => {
  useFlightEventNotifications();
  return (
    <>
      <Head title={title} />
      <div className="w-screen h-screen">
        {children}
        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">{children}</div> */}
      </div>
    </>
  );
};
