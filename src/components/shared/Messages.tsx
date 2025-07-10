import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { Send, MessageCircle, User, HdmiPort as Admin } from 'lucide-react';

const Messages: React.FC = () => {
  const { user } = useAuth();
  const { messages, addMessage, markMessageAsRead } = useData();
  const [newMessage, setNewMessage] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  if (!user) return null;

  // Filter messages for current user
  const userMessages = messages.filter(msg => 
    msg.senderId === user.id || msg.receiverId === user.id
  );

  // Group messages by conversation
  const conversations = userMessages.reduce((acc, msg) => {
    const otherUserId = msg.senderId === user.id ? msg.receiverId : msg.senderId;
    if (!acc[otherUserId]) {
      acc[otherUserId] = [];
    }
    acc[otherUserId].push(msg);
    return acc;
  }, {} as Record<string, typeof userMessages>);

  // Sort conversations by latest message
  const sortedConversations = Object.entries(conversations).sort(([, a], [, b]) => {
    const latestA = Math.max(...a.map(msg => msg.timestamp.getTime()));
    const latestB = Math.max(...b.map(msg => msg.timestamp.getTime()));
    return latestB - latestA;
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    addMessage({
      senderId: user.id,
      senderName: user.name,
      receiverId: selectedConversation,
      content: newMessage.trim()
    });

    setNewMessage('');
  };

  const handleStartConversation = () => {
    // For demo purposes, we'll assume there's an admin with ID 'admin'
    const adminId = user.role === 'admin' ? '2' : '1'; // Switch between users
    setSelectedConversation(adminId);
  };

  const selectedMessages = selectedConversation ? 
    (conversations[selectedConversation] || []).sort((a, b) => 
      a.timestamp.getTime() - b.timestamp.getTime()
    ) : [];

  // Mark messages as read when viewing them
  React.useEffect(() => {
    if (selectedConversation) {
      selectedMessages
        .filter(msg => msg.receiverId === user.id && !msg.read)
        .forEach(msg => markMessageAsRead(msg.id));
    }
  }, [selectedConversation, selectedMessages, user.id, markMessageAsRead]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600">Communicate with IT support team</p>
        </div>
        {sortedConversations.length === 0 && (
          <button
            onClick={handleStartConversation}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Start Conversation
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Conversations List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Conversations</h3>
          </div>
          <div className="overflow-y-auto h-full">
            {sortedConversations.length === 0 ? (
              <div className="p-6 text-center">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No conversations yet</p>
                <button
                  onClick={handleStartConversation}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Start Conversation
                </button>
              </div>
            ) : (
              <div className="space-y-1 p-2">
                {sortedConversations.map(([userId, msgs]) => {
                  const latestMsg = msgs[msgs.length - 1];
                  const unreadCount = msgs.filter(msg => 
                    msg.receiverId === user.id && !msg.read
                  ).length;
                  
                  return (
                    <button
                      key={userId}
                      onClick={() => setSelectedConversation(userId)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedConversation === userId 
                          ? 'bg-blue-50 border-blue-200' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gray-100 rounded-full">
                            {userId === '1' ? (
                              <Admin className="h-4 w-4 text-gray-600" />
                            ) : (
                              <User className="h-4 w-4 text-gray-600" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate">
                              {userId === '1' ? 'Admin User' : 'John Teacher'}
                            </p>
                            <p className="text-sm text-gray-600 truncate">
                              {latestMsg.content}
                            </p>
                          </div>
                        </div>
                        {unreadCount > 0 && (
                          <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                            {unreadCount}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {latestMsg.timestamp.toLocaleString()}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-full">
                    {selectedConversation === '1' ? (
                      <Admin className="h-5 w-5 text-gray-600" />
                    ) : (
                      <User className="h-5 w-5 text-gray-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {selectedConversation === '1' ? 'Admin User' : 'John Teacher'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {selectedConversation === '1' ? 'IT Department' : 'Mathematics Department'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === user.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.senderId === user.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.senderId === user.id ? 'text-blue-100' : 'text-gray-500'
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-500">Choose a conversation from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;