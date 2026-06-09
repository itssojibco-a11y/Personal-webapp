import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://fpfbxofihnrjmnyannem.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwZmJ4b2ZpaG5yam1ueWFubmVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MzI0NTQsImV4cCI6MjA5NjUwODQ1NH0.PwTU81rWSoPrnk1eiiK0iw4M4fpUbjirKKbpMvbnkwo';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  console.log('Testing...');
  try {
    const res = await supabase.auth.signInWithPassword({ email: 'test@example.com', password: 'password' });
    console.log('Result:', res);
  } catch(e) {
    console.log('Error:', e);
  }
}
test();
