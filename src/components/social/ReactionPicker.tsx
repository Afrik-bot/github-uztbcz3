import { useState } from 'react';

const REACTIONS = [
  { name: 'like', emoji: '👍' },
  { name: 'love', emoji: '❤️' },
  { name: 'haha', emoji: '😂' },
  { name: 'wow', emoji: '😮' },
  { name: 'sad', emoji: '😢' },
  { name: 'angry', emoji: '😠' },
];

interface ReactionPickerProps {
  onSelect: (reaction: string) => void;
}

export default function ReactionPicker({ onSelect }: ReactionPickerProps) {
  const [hoveredReaction, setHoveredReaction] = useState<string | null>(null);

  return (
    <div className="absolute bottom-full left-0 mb-2 p-2 bg-gray-800 rounded-full shadow-lg flex items-center gap-1 animate-fade-in">
      {REACTIONS.map((reaction) => (
        <button
          key={reaction.name}
          onClick={() => onSelect(reaction.name)}
          onMouseEnter={() => setHoveredReaction(reaction.name)}
          onMouseLeave={() => setHoveredReaction(null)}
          className="p-2 hover:bg-gray-700 rounded-full transition-transform hover:scale-125 relative"
        >
          <span className="text-xl">{reaction.emoji}</span>
          {hoveredReaction === reaction.name && (
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-white bg-gray-900 px-2 py-1 rounded capitalize">
              {reaction.name}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}