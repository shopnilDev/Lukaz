import { Icon } from "@iconify/react";

import { FaLock } from "react-icons/fa";

const ShipingTimeLine = () => {
  const features = [
    {
      icon: <Icon icon="ph:truck-light" width="45" height="45" />,
      title: "Shipping Worldwide",
    },
    {
      icon: <Icon icon="icon-park-outline:return" width="40" height="40" />,
      title: "Easy Returns",
    },
    {
      icon:<Icon icon="hugeicons:shopping-basket-secure-01" width="45" height="45" />,
      title: "Secure Checkout",
    },
  ];

  return (
    <div className="w-full py-6 bg-white">
      <div className="max-w-5xl mx-auto flex justify-center gap-12">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center space-y-2 text-sm sm:text-base "
          >
            {feature.icon}
            <p className="font-medium text-gray-700">{feature.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShipingTimeLine;
