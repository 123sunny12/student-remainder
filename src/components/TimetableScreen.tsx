
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Upload, Plus, X, FlaskConical, BookOpen, Trash2 } from 'lucide-react';
import { useStudent } from '@/contexts/StudentContext';

interface TimetableEntry {
  id: string;
  day: string;
  time: string;
  subject: string;
  room: string;
  type: 'lecture' | 'lab' | 'practical';
}

const TimetableScreen = () => {
  const { timetable, updateTimetable } = useStudent();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEntry, setNewEntry] = useState<Omit<TimetableEntry, 'id'>>({
    day: 'Monday',
    time: '',
    subject: '',
    room: '',
    type: 'lecture'
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const handleAddEntry = () => {
    if (newEntry.time && newEntry.subject && newEntry.room) {
      const entry: TimetableEntry = {
        ...newEntry,
        id: Date.now().toString()
      };
      
      updateTimetable([...timetable, entry]);
      setNewEntry({
        day: 'Monday',
        time: '',
        subject: '',
        room: '',
        type: 'lecture'
      });
      setShowAddForm(false);
    }
  };

  const handleRemoveEntry = (id: string) => {
    updateTimetable(timetable.filter(entry => entry.id !== id));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate file processing - in a real app, you'd parse the file
      const sampleTimetable: TimetableEntry[] = [
        { id: '1', day: 'Monday', time: '09:00-10:00', subject: 'Data Structures', room: 'CS-201', type: 'lecture' },
        { id: '2', day: 'Monday', time: '14:00-17:00', subject: 'Data Structures Lab', room: 'CS-Lab-1', type: 'lab' },
        { id: '3', day: 'Tuesday', time: '10:00-11:00', subject: 'Database Systems', room: 'CS-203', type: 'lecture' },
        { id: '4', day: 'Wednesday', time: '11:00-14:00', subject: 'DBMS Lab', room: 'CS-Lab-2', type: 'lab' },
        { id: '5', day: 'Thursday', time: '09:00-10:00', subject: 'Operating Systems', room: 'CS-202', type: 'lecture' },
        { id: '6', day: 'Friday', time: '14:00-17:00', subject: 'OS Lab', room: 'CS-Lab-1', type: 'practical' }
      ];
      
      updateTimetable(sampleTimetable);
    }
  };

  const getTypeColor = (type: TimetableEntry['type']) => {
    switch (type) {
      case 'lecture':
        return 'bg-blue-500';
      case 'lab':
        return 'bg-green-500';
      case 'practical':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: TimetableEntry['type']) => {
    switch (type) {
      case 'lab':
      case 'practical':
        return <FlaskConical className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const groupedTimetable = days.map(day => ({
    day,
    entries: timetable.filter(entry => entry.day === day).sort((a, b) => a.time.localeCompare(b.time))
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-100 p-4 pb-20">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-violet-800 academic-font">My Timetable</h1>
        <p className="text-violet-600">Upload or manage your class schedule</p>
      </div>

      {/* Upload Section */}
      <Card className="mb-6 shadow-lg border-violet-200">
        <CardHeader>
          <CardTitle className="text-violet-700 flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload Timetable
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-violet-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-violet-500 mx-auto mb-2" />
              <p className="text-gray-600 mb-4">Upload your timetable (CSV, PDF, or Image)</p>
              <input
                type="file"
                accept=".csv,.pdf,.png,.jpg,.jpeg"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button className="violet-gradient text-white cursor-pointer">
                  Choose File
                </Button>
              </label>
            </div>
            
            <div className="text-center">
              <span className="text-gray-500">or</span>
            </div>
            
            <Button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="w-full violet-gradient text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Entry Manually
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add Entry Form */}
      {showAddForm && (
        <Card className="mb-6 shadow-sm border-green-200">
          <CardHeader>
            <CardTitle className="text-green-700 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add New Entry
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Day</label>
                  <select
                    value={newEntry.day}
                    onChange={(e) => setNewEntry({...newEntry, day: e.target.value})}
                    className="w-full p-2 border rounded-lg focus:ring-violet-500 focus:border-violet-500"
                  >
                    {days.map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Time</label>
                  <Input
                    value={newEntry.time}
                    onChange={(e) => setNewEntry({...newEntry, time: e.target.value})}
                    placeholder="09:00-10:00"
                    className="focus:ring-violet-500 focus:border-violet-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Subject</label>
                <Input
                  value={newEntry.subject}
                  onChange={(e) => setNewEntry({...newEntry, subject: e.target.value})}
                  placeholder="Data Structures"
                  className="focus:ring-violet-500 focus:border-violet-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Room</label>
                  <Input
                    value={newEntry.room}
                    onChange={(e) => setNewEntry({...newEntry, room: e.target.value})}
                    placeholder="CS-201"
                    className="focus:ring-violet-500 focus:border-violet-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select
                    value={newEntry.type}
                    onChange={(e) => setNewEntry({...newEntry, type: e.target.value as 'lecture' | 'lab' | 'practical'})}
                    className="w-full p-2 border rounded-lg focus:ring-violet-500 focus:border-violet-500"
                  >
                    <option value="lecture">Lecture</option>
                    <option value="lab">Lab</option>
                    <option value="practical">Practical</option>
                  </select>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button onClick={handleAddEntry} className="flex-1 bg-green-600 text-white hover:bg-green-700">
                  Add Entry
                </Button>
                <Button onClick={() => setShowAddForm(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Timetable Display */}
      {timetable.length > 0 ? (
        <div className="space-y-4">
          {groupedTimetable.map(({ day, entries }) => (
            <Card key={day} className="shadow-sm border-violet-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-violet-700 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {day}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {entries.length > 0 ? (
                  <div className="space-y-3">
                    {entries.map((entry) => (
                      <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 ${getTypeColor(entry.type)} rounded-lg flex items-center justify-center text-white`}>
                            {getTypeIcon(entry.type)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{entry.subject}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {entry.time}
                              </span>
                              <span>{entry.room}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            className={`${getTypeColor(entry.type)} text-white`}
                          >
                            {entry.type}
                          </Badge>
                          <Button
                            onClick={() => handleRemoveEntry(entry.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No classes scheduled for {day}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="shadow-sm border-gray-200">
          <CardContent className="p-8 text-center">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No Timetable Found</h3>
            <p className="text-gray-500 mb-4">Upload your timetable or add entries manually to get started</p>
            <p className="text-sm text-orange-600">
              📅 Once uploaded, the app will automatically remind you about lab sessions!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TimetableScreen;
