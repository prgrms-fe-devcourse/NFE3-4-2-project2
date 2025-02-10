import React from 'react';

const ChannelTabs = ({ channels, activeTab, setActiveTab }) => {
  const orderedTabs = ['베스트', '전체', '관광', '숙박', '음식', '축제', '행사', '테마'];

  const sortedChannels = orderedTabs
    .map((tab) => channels.find((channel) => channel.name === tab))
    .filter(Boolean); 

  return (
    <div className="flex space-x-30 border-b border-gray-300 pb-4 mb-6">
      {sortedChannels.map((channel) => (
        <button
          key={channel._id}
          onClick={() => setActiveTab(channel.name)}
          className={`pb-2 text-lg font-medium ${
            activeTab === channel.name
              ? 'border-b-2 border-orange-500 text-orange-500'
              : 'text-gray-600 hover:text-orange-500'
          }`}
        >
          {channel.name}
        </button>
      ))}
    </div>
  );
};

export default ChannelTabs;