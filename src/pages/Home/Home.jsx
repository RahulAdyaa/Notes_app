import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiPlus, FiSearch, FiTrash2, FiStar, FiLogOut, FiX } from 'react-icons/fi';

const Home = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Load notes from localStorage or use default notes
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      return JSON.parse(savedNotes);
    }
    return [
      { id: 1, title: 'Welcome to NotesApp', content: 'Start writing your thoughts here...', starred: true, date: 'Today' },
      { id: 2, title: 'Shopping List', content: 'Milk, Eggs, Bread, Cheese', starred: false, date: 'Yesterday' },
      { id: 3, title: 'Project Ideas', content: 'Build a mobile app, Learn TypeScript', starred: false, date: 'Mar 25' },
    ];
  });
  
  // Load active note from localStorage or use the first note
  const [activeNote, setActiveNote] = useState(() => {
    const savedActiveNoteId = localStorage.getItem('activeNoteId');
    if (savedActiveNoteId) {
      const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
      const foundNote = savedNotes.find(note => note.id === parseInt(savedActiveNoteId));
      if (foundNote) return foundNote;
    }
    // If no saved active note or not found, default to the first note
    const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    return savedNotes.length > 0 ? savedNotes[0] : null;
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    starred: false,
    date: 'Today'
  });

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // Save active note ID to localStorage whenever it changes
  useEffect(() => {
    if (activeNote) {
      localStorage.setItem('activeNoteId', activeNote.id);
    }
  }, [activeNote]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleStarred = (id) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, starred: !note.starred } : note
    ));
    if (activeNote && activeNote.id === id) {
      setActiveNote({...activeNote, starred: !activeNote.starred});
    }
  };

  const handleNoteClick = (note) => {
    setActiveNote(note);
  };

  const handleContentChange = (e) => {
    const updatedContent = e.target.value;
    setActiveNote({...activeNote, content: updatedContent});
    setNotes(notes.map(note => 
      note.id === activeNote.id ? { ...note, content: updatedContent } : note
    ));
  };

  const handleTitleChange = (e) => {
    const updatedTitle = e.target.value;
    setActiveNote({...activeNote, title: updatedTitle});
    setNotes(notes.map(note => 
      note.id === activeNote.id ? { ...note, title: updatedTitle } : note
    ));
  };

  const openNewNoteModal = () => {
    setNewNote({
      title: '',
      content: '',
      starred: false,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    });
    setShowModal(true);
  };

  const handleNewNoteChange = (e) => {
    setNewNote({
      ...newNote,
      [e.target.name]: e.target.value
    });
  };

  const toggleNewNoteStarred = () => {
    setNewNote({
      ...newNote,
      starred: !newNote.starred
    });
  };

  const addNote = () => {
    if (newNote.title.trim() === '') {
      alert('Please enter a title for your note');
      return;
    }

    const createdNote = {
      id: Date.now(),
      title: newNote.title,
      content: newNote.content,
      starred: newNote.starred,
      date: newNote.date
    };
    
    const updatedNotes = [...notes, createdNote];
    setNotes(updatedNotes);
    setActiveNote(createdNote);
    setShowModal(false);
  };
  
  const deleteNote = (id) => {
    if (confirm('Are you sure you want to delete this note?')) {
      const updatedNotes = notes.filter(note => note.id !== id);
      setNotes(updatedNotes);
      
      if (activeNote && activeNote.id === id) {
        setActiveNote(updatedNotes[0] || null);
      }
    }
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    // Optionally clear user-specific data from localStorage
    // localStorage.removeItem('notes');
    // localStorage.removeItem('activeNoteId');
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>
        <div className="p-4 flex items-center justify-between border-b border-gray-200">
          {sidebarOpen && <h2 className="text-xl font-semibold text-gray-800">Notes</h2>}
          <button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-gray-100">
            <FiMenu className="text-gray-600" />
          </button>
        </div>
        
        <div className={`${sidebarOpen ? 'px-4' : 'px-2'} py-4`}>
          <button className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg w-full py-2 mb-4 transition-colors" onClick={openNewNoteModal}>
            <FiPlus className="mr-2" />
            {sidebarOpen && <span>New Note</span>}
          </button>
          
          <div className={`flex items-center bg-gray-100 rounded-lg ${sidebarOpen ? 'px-3' : 'px-2'} py-2 mb-4`}>
            <FiSearch className="text-gray-500 mr-2" />
            {sidebarOpen && 
              <input 
                type="text" 
                placeholder="Search notes" 
                className="bg-transparent focus:outline-none w-full text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            }
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {filteredNotes.length === 0 ? (
            <div className="text-center text-gray-500 p-4">
              No notes found
            </div>
          ) : (
            filteredNotes.map(note => (
              <div 
                key={note.id} 
                className={`${activeNote?.id === note.id ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50'} ${sidebarOpen ? 'px-4' : 'px-2'} py-3 cursor-pointer transition-colors`}
                onClick={() => handleNoteClick(note)}
              >
                {sidebarOpen ? (
                  <>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-800 truncate">{note.title}</h3>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStarred(note.id);
                        }}
                        className={`p-1 rounded-full ${note.starred ? 'text-yellow-500' : 'text-gray-400 hover:text-gray-600'}`}
                      >
                        <FiStar className={note.starred ? 'fill-current' : ''} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 truncate mb-1">{note.content}</p>
                    <span className="text-xs text-gray-400">{note.date}</span>
                  </>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className={`w-2 h-2 rounded-full ${activeNote?.id === note.id ? 'bg-blue-500' : 'bg-gray-300'} mb-1`}></div>
                    <span className="text-xs text-gray-500 truncate writing-vertical">{note.title.substring(0, 1)}</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        
        <div className="border-t border-gray-200 p-4">
          <button 
          onClick={handleLogout}
           className="flex items-center text-gray-600 hover:text-gray-800">
            <FiLogOut className="mr-2" />
            {sidebarOpen && <span>Logout</span>}
            
            
          </button>
         
        </div>
      </div>
      
      {/* Main Content */}
      {activeNote ? (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <div className="w-full">
              <input
                type="text"
                className="text-2xl font-bold text-gray-800 w-full bg-transparent focus:outline-none focus:border-b-2 focus:border-blue-500 transition-all"
                value={activeNote.title}
                onChange={handleTitleChange}
                placeholder="Note title"
              />
              <p className="text-sm text-gray-500">Last edited {activeNote.date}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => toggleStarred(activeNote.id)} 
                className={`p-2 rounded-full hover:bg-gray-100 ${activeNote.starred ? 'text-yellow-500' : 'text-gray-400'}`}
              >
                <FiStar className={activeNote.starred ? 'fill-current' : ''} />
              </button>
              <button 
                onClick={() => deleteNote(activeNote.id)} 
                className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-red-500"
              >
                <FiTrash2 />
              </button>
            </div>
          </header>
          
          {/* Editor */}
          <div className="flex-1 overflow-auto p-6 bg-white">
            <textarea 
              className="w-full h-full resize-none focus:outline-none text-gray-700"
              value={activeNote.content}
              onChange={handleContentChange}
              placeholder="Start typing..."
            ></textarea>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-white">
          <div className="text-center text-gray-500">
            <p className="mb-4">No note selected or all notes have been deleted</p>
            <button 
              onClick={openNewNoteModal}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Create a new note
            </button>
          </div>
        </div>
      )}

      {/* Create Note Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-300  flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">Create New Note</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX />
              </button>
            </div>

            <div className="p-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={newNote.title}
                  onChange={handleNewNoteChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Note title"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Content
                </label>
                <textarea
                  name="content"
                  value={newNote.content}
                  onChange={handleNewNoteChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                  placeholder="Start writing..."
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Date
                </label>
                <input
                  type="text"
                  name="date"
                  value={newNote.date}
                  onChange={handleNewNoteChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="mb-4 flex items-center">
                <button 
                  onClick={toggleNewNoteStarred}
                  className={`p-2 rounded-full ${newNote.starred ? 'text-yellow-500' : 'text-gray-400'} mr-2`}
                >
                  <FiStar className={newNote.starred ? 'fill-current' : ''} />
                </button>
                <span className="text-gray-700 text-sm">
                  {newNote.starred ? 'Starred' : 'Not starred'} (click icon to toggle)
                </span>
              </div>
            </div>

            <div className="flex justify-end p-4 border-t border-gray-200">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={addNote}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
              >
                Create Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;