import { FaCreditCard, FaGlobe, FaHeadset, FaMobileAlt } from 'react-icons/fa';
import { ADVANTAGES } from '@/lib/constants';

const ICONS = [FaCreditCard, FaGlobe, FaHeadset, FaMobileAlt];

export default function AdvantagesSection() {
  return (
    <div className="bg-primary-tint1 py-12 lg:py-16 mb-12">
      <div className="container mx-auto px-4 max-w-[1224px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {ADVANTAGES.map((item, index) => {
            const Icon = ICONS[index] ?? FaGlobe;
            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 lg:w-24 lg:h-24 bg-white border border-primary-tint5 rounded-3xl flex items-center justify-center mb-4 lg:mb-6 shadow-sm">
                  <Icon className="text-3xl lg:text-4xl text-primary-blue" />
                </div>
                <h3 className="text-sm lg:text-lg font-bold text-primary-shade4 leading-relaxed">
                  {item.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
