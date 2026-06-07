import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/AuthContext';
import { User as UserIcon, Code2, Phone, Pencil, Save, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';

export function Profile() {
  const { user, signOut } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user?.user_metadata) {
      setFullName(user.user_metadata.full_name || '');
      setAvatarUrl(user.user_metadata.avatar_url || '');
    }
  }, [user]);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          avatar_url: avatarUrl,
        }
      });
      if (error) throw error;
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile", err);
      // You could add error toast here
    } finally {
      setIsSaving(false);
    }
  };

  const displayAvatar = avatarUrl || user?.user_metadata?.avatar_url;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-300">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Profile & Settings</h1>
        <p className="text-zinc-400">Manage your account and authentication preferences.</p>
      </div>

      <div className="bg-[#121214] border border-zinc-800 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-5">
            {displayAvatar ? (
               <img src={displayAvatar} alt="Avatar" className="w-20 h-20 rounded-full border-2 border-zinc-700 object-cover" />
            ) : (
              <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 border-2 border-zinc-800">
                <UserIcon size={36} />
              </div>
            )}
            
            <div>
              <h2 className="text-2xl font-semibold">
                {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Authenticated User'}
              </h2>
              <p className="text-zinc-500 text-sm mt-1">
                {user?.email}
              </p>
            </div>
          </div>
          {!isEditing && (
            <Button variant="outline" onClick={() => setIsEditing(true)} className="border-zinc-700 text-zinc-300 hover:text-white">
              <Pencil className="w-4 h-4 mr-2" /> Edit Profile
            </Button>
          )}
        </div>

        {isEditing && (
          <div className="bg-[#09090b] p-6 rounded-xl border border-zinc-800/50 mb-8 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-zinc-400">Full Name</Label>
              <Input 
                id="fullName" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your name"
                className="bg-zinc-900 border-zinc-800"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="avatarUrl" className="text-zinc-400">Avatar Image URL</Label>
              <Input 
                id="avatarUrl"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                className="bg-zinc-900 border-zinc-800 text-xs font-mono"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="ghost" onClick={() => setIsEditing(false)} disabled={isSaving} className="text-zinc-400">
                <X className="w-4 h-4 mr-2" /> Cancel
              </Button>
              <Button onClick={handleSaveProfile} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Save className="w-4 h-4 mr-2" /> {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-zinc-800">
          <button
            onClick={signOut}
            className="bg-red-500/10 hover:bg-red-500/20 text-red-500 px-6 py-2.5 rounded-xl font-medium transition-colors text-sm"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="bg-[#121214] border border-zinc-800 rounded-2xl p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400">
            <Code2 size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold">About the Developer</h2>
            <p className="text-zinc-500 text-sm">System architect and creator.</p>
          </div>
        </div>
        
        <div className="bg-[#09090b] rounded-xl p-4 border border-zinc-800/50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-zinc-400 text-sm">Name</span>
            <span className="text-zinc-100 font-medium">Shafiul Alam Sojib</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-400 text-sm">Contact</span>
            <div className="flex items-center gap-2 text-zinc-100 font-mono">
              <Phone size={14} className="text-zinc-500" />
              01979709261
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-400 text-sm">Website</span>
            <a href="https://mdshafiulalamsojib.blogspot.com" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 font-medium transition-colors text-sm">
              mdshafiulalamsojib.blogspot.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
