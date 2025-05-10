/*

UI for the website Tools explanation
Author: ODIN Thomas

*/
const ToolCard = ({ title, description, icon }) => {
  return (
    <div className="max-w-xs w-full bg-white border border-gray-200 rounded-lg shadow-lg p-6 flex flex-col items-center text-center transition-all hover:shadow-xl hover:scale-105">
      <div className="w-16 h-16 mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-textDark">{description}</p>
    </div>
  );
};

export default ToolCard;
