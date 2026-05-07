import { Edit2 } from 'lucide-react';
import Image from 'next/image';

interface ProfileHeaderProps {
  fullName: string;
  governmentId: string;
  completionPercentage: number;
}

export default function ProfileHeader({
  fullName,
  governmentId,
  completionPercentage,
}: ProfileHeaderProps) {
  return (
    <div className="relative bg-[#0A1428] rounded-3xl overflow-hidden w-full mb-8">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-size-[20px_20px]"></div>

      <div className="relative px-6 lg:px-8 py-6 lg:py-8 flex flex-col lg:flex-row items-center gap-6">
        {/* Avatar Section */}
        <div className="relative shrink-0">
          <div className="w-28 h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
            <Image
              src="/dashboard-avatar.png" 
              alt={fullName}
              className="w-full h-full object-cover"
              width={128}
              height={128}
            />
          </div>

          {/* Green Edit/Verified Badge */}
          <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-2 rounded-full shadow-lg border-2 border-white">
            <Edit2 size={18} strokeWidth={2} />
          </div>
        </div>

        {/* Profile Info */}
        <div className="w-full lg:flex-1 text-center lg:text-left">
          <h1 className="text-xl lg:text-3xl font-bold text-white mb-1">
            {fullName}
          </h1>
          <p className="text-blue-300 text-lg">(3mtt)</p>
          <p className="text-gray-300 mt-1 font-mono text-sm tracking-wider">
            {governmentId}
          </p>
        </div>

        {/* Completion Status */}
        <div className="bg-white rounded-2xl px-5 py-4 text-center shadow-sm min-w-35">
          <div className="text-xl lg:text-3xl font-bold text-gray-900 leading-none">
            {completionPercentage}%
          </div>
          <p className="text-gray-600 font-medium mt-1 text-sm lg:text-base">Complete</p>
        </div>
      </div>
    </div>
  );
}