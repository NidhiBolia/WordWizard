
export default function Learn() {
  const Boxes = [
    { id: 0, text: 'Translation' },
    { id: 1, text: 'Listening comprehension' },
    { id: 2, text: 'Speaking challenges' },
    { id: 3, text: ' Acquire vocabulary, grammar, and pronunciation skills' },
    { id: 4, text: 'Master everyday conversations, essential phrases, and cultural insights' },
    { id: 5, text: ' Expand your language skills in contexts relevant to your personal aspirations'}
  ];
  return (
    <div className="mx-w-8xl mx-auto py-20 px-8">
      <h2 className="text-4xl font-bold mb-8">What will you learn</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Boxes.map((box) => (
          <div key={box.id} className="fex flex-col text-gray-600 bg-gray-50 rounded-lg">
            <div className="py-3 px-3 flex items-center justify-between border-2 border-gray-500 rounded-t-lg text-gray-700 font-bold">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div className="flex-grow flex items-center justify-center py-6 px-8 rounded-b-lg border-2 border-gray-500 border-t-0 text-center">{box.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
