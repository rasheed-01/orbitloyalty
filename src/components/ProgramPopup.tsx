import React from 'react';
import { ArrowLeft, ImageIcon } from 'lucide-react';

interface ProgramPopupProps {
  program: any;
  onClose: () => void;
  onJoin: () => void;
}

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const today = new Date().getDay(); // 0 = Sun, 6 = Sat

const ProgramPopup: React.FC<ProgramPopupProps> = ({ program, onClose, onJoin }) => {
  const hours = program.hours || ['6:00 am', '12:00 am'];
  const image = program.image;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[800px] rounded-lg p-6 shadow-xl relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={onClose} className="flex items-center text-gray-600 text-sm">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </button>
          <h2 className="text-lg font-medium">Program</h2>
          <button
            onClick={onJoin}
            className="px-4 py-1 border-2 rounded-md border-[#FFB000] text-[#FFB000] hover:bg-[#FFB000] hover:text-white transition"
          >
            Join
          </button>
        </div>

        {/* Content */}
        <div className="flex gap-4">
          {/* Left - Text */}
          <div className="flex-1 bg-gray-50 p-4 rounded">
            <h3 className="text-sm font-medium text-gray-700 mb-2">{program.name}</h3>
            <p className="text-sm text-gray-600 whitespace-pre-line">{program.description}</p>
            <p className="text-sm mt-3 text-yellow-600">{program.points}</p>
            <p className="text-xs text-gray-600">{program.reward}</p>
          </div>

          {/* Right - Image */}
          <div className="flex-1 bg-yellow-200 rounded flex items-center justify-center overflow-hidden">
            {image ? (
              <img src={image} alt="Program" className="object-cover w-full h-full rounded" />
            ) : (
              <ImageIcon className="h-12 w-12 text-[#FFB000]" />
            )}
          </div>
        </div>

        {/* Opening Hours */}
        <div className="mt-6">
          <h4 className="text-center text-sm font-medium mb-4">Opening hours</h4>
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => (
              <div
                key={day}
                className={`rounded border px-2 py-1 text-center text-sm ${
                  index === today
                    ? 'border-[#FFB000] text-[#FFB000] font-medium'
                    : 'border-gray-200 text-gray-600'
                }`}
              >
                <div>{day}</div>
                <div>{hours[0]}</div>
                <div>{hours[1]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramPopup;