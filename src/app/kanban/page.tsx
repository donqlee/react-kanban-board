export default function KanbanPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          돈큐 칸반 보드
        </h1>

        {/* 칸반 보드 기본 레이아웃 */}
        <div className="grid grid-cols-3 gap-6">
          {/* To-Do Column */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b bg-gray-50 rounded-t-lg flex justify-between items-center">
              <h2 className="font-semibold text-gray-700">to-do</h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
                항목 추가
              </button>
            </div>
            <div className="p-4 min-h-96">
              <p className="text-gray-500 text-center mt-8">
                To-do 항목들이 여기에 표시됩니다
              </p>
            </div>
          </div>

          {/* In Progress Column */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b bg-gray-50 rounded-t-lg flex justify-between items-center">
              <h2 className="font-semibold text-gray-700">in progress</h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
                항목 추가
              </button>
            </div>
            <div className="p-4 min-h-96">
              <p className="text-gray-500 text-center mt-8">
                진행 중인 항목들이 여기에 표시됩니다
              </p>
            </div>
          </div>

          {/* Done Column */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b bg-gray-50 rounded-t-lg flex justify-between items-center">
              <h2 className="font-semibold text-gray-700">done</h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
                항목 추가
              </button>
            </div>
            <div className="p-4 min-h-96">
              <p className="text-gray-500 text-center mt-8">
                완료된 항목들이 여기에 표시됩니다
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
