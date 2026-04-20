import React, { useState, useEffect } from 'react';
import { Trash2, AlertCircle, X } from 'lucide-react';

interface DiaryEntry {
  id: string;
  date: string;
  time: string;
  emoji: string;
  note: string;
  timestamp: number;
}

const EMOJIS = ['😄', '😊', '🥰', '😌', '😐', '😔', '😢', '😫', '😡'];

export default function App() {
  // 1. Storage & State for Entries
  const [entries, setEntries] = useState<DiaryEntry[]>(() => {
    const saved = localStorage.getItem('moodDiaryEntries');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // 2. Form State
  const [selectedEmoji, setSelectedEmoji] = useState<string>(EMOJIS[0]);
  const [note, setNote] = useState<string>('');
  const [error, setError] = useState<string>('');

  // 3. Delete Confirmation State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState<string | null>(null);

  // Sync to LocalStorage whenever entries change
  useEffect(() => {
    localStorage.setItem('moodDiaryEntries', JSON.stringify(entries));
  }, [entries]);

  // Handle Note Submission
  const handleSave = () => {
    // Xử lí trường hợp nhập trống
    if (note.trim() === '') {
      setError('오늘의 메모를 아직 입력하지 않으셨어요! 🌻');
      return;
    }

    const now = new Date();
    const newEntry: DiaryEntry = {
      id: crypto.randomUUID(),
      date: now.toLocaleDateString('ko-KR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      time: now.toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      emoji: selectedEmoji,
      note: note.trim(),
      timestamp: now.getTime(),
    };

    setEntries([newEntry, ...entries]);
    setNote('');
    setError('');
  };

  // Open the confirmation dialog
  const confirmDelete = (id: string) => {
    setEntryToDelete(id);
    setIsModalOpen(true);
  };

  // Perform deletion
  const handleDelete = () => {
    if (entryToDelete) {
      setEntries(entries.filter((entry) => entry.id !== entryToDelete));
    }
    setIsModalOpen(false);
    setEntryToDelete(null);
  };

  // Cancel deletion
  const cancelDelete = () => {
    setIsModalOpen(false);
    setEntryToDelete(null);
  };

  // Ngày hôm nay
  const todayLabel = new Date().toLocaleDateString('ko-KR', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-[#FDF2F8] text-[#4B5563] font-sans flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[960px] h-[90vh] md:h-[680px] bg-white/80 backdrop-blur-md rounded-[32px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.05)] grid grid-cols-1 md:grid-cols-[380px_1fr] overflow-hidden border border-white/50">
        
        {/* Sidebar */}
        <aside className="bg-white p-8 md:p-10 border-r border-gray-100 flex flex-col gap-6 overflow-y-auto">
          {/* Header */}
          <div className="mb-2">
            <h1 className="text-2xl font-bold text-pink-600">
              기분 일기
            </h1>
            <p className="text-sm text-gray-400 font-medium mt-1">오늘은 {todayLabel}입니다</p>
          </div>

          {/* Emoji Selection */}
          <div className="space-y-4">
            <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider block">당신의 기분</label>
            <div className="flex flex-wrap gap-3">
              {EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setSelectedEmoji(emoji)}
                  className={`w-[52px] h-[52px] rounded-2xl flex items-center justify-center text-2xl cursor-pointer transition-all duration-200 border-2 ${
                    selectedEmoji === emoji
                      ? 'bg-[#FCE7F3] border-[#F472B6] scale-110'
                      : 'bg-gray-50 border-transparent hover:bg-pink-50'
                  }`}
                  title="기분 선택"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Note input */}
          <div className="space-y-4 flex-1 flex flex-col min-h-[150px]">
            <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider block">짧은 메모</label>
            <textarea
              className="flex-1 p-4 w-full rounded-2xl border-2 border-pink-50 bg-pink-50/30 focus:border-pink-200 outline-none resize-none placeholder-gray-400 text-[#4B5563]"
              placeholder="무슨 일이 있었나요? 몇 줄 적어보세요..."
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
                if (e.target.value.trim() !== '') setError('');
              }}
            />
            
            {/* Error Message */}
            {error && (
              <div className="flex items-center text-rose-500 text-sm gap-1 animate-pulse">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <button
            onClick={handleSave}
            className="w-full py-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-2xl shadow-lg shadow-pink-200/50 transition-all active:scale-95 disabled:opacity-50 mt-2"
          >
            저장하기
          </button>
        </aside>

        {/* Content Area / List of Notes */}
        <main className="p-8 md:p-10 flex flex-col gap-5 bg-white/40 overflow-hidden relative">
          <div className="flex justify-between items-center shrink-0">
            <h2 className="text-xl font-bold text-gray-800">당신의 추억</h2>
            <span className="px-3 py-1 bg-white text-pink-500 rounded-full text-xs font-bold border border-pink-100">
              {entries.length}개의 기록
            </span>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-3 space-y-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-pink-300 [&::-webkit-scrollbar-thumb]:rounded-full">
            {entries.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center opacity-40 text-center pb-10">
                <div className="text-6xl mb-4">📖</div>
                <p className="font-medium text-gray-800">아직 기록이 없습니다.<br/>오늘의 첫 번째 추억을 만들어보세요! ✨</p>
              </div>
            ) : (
              entries.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-white p-4 rounded-[18px] border border-gray-100 flex items-start gap-4 relative group transition-all duration-300 hover:border-pink-300 hover:shadow-[0_4px_12px_rgba(244,114,182,0.1)] animate-in fade-in zoom-in-95"
                >
                  <div className="text-3xl shrink-0 pt-0.5">
                    {entry.emoji}
                  </div>
                  <div className="flex-1 min-w-0 pr-6">
                    <p className="text-xs font-bold text-pink-400 mb-1 uppercase tracking-wider">
                      {entry.date} <span className="font-normal lowercase ml-1 opacity-80">{entry.time}</span>
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap break-words">
                      {entry.note}
                    </p>
                  </div>
                  <button
                    onClick={() => confirmDelete(entry.id)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                    title="삭제"
                  >
                    <Trash2 className="w-[18px] h-[18px]" />
                  </button>
                </div>
              ))
            )}
          </div>
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[24px] p-6 w-full max-w-sm shadow-xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-red-100 text-red-500 p-2 text-2xl rounded-2xl flex items-center justify-center w-12 h-12">
                <Trash2 className="w-6 h-6" />
              </div>
              <button 
                onClick={cancelDelete}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                title="닫기"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">메모를 삭제하시겠습니까?</h3>
            <p className="text-gray-500 mb-6 text-sm">
              정말로 이 메모를 삭제하시겠습니까? 이 추억은 다시 복구할 수 없습니다.
            </p>
            <div className="flex gap-3">
              <button
                onClick={cancelDelete}
                className="flex-1 px-4 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold shadow-lg shadow-red-200/50 transition-all active:scale-95"
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
