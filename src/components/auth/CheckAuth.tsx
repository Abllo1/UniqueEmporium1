import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import LoadingPage from '@/components/common/LoadingPage';

export default function CheckAuth({ children }: { children: React.ReactNode }) {
  const { session, setAuthState, isLoading } = useAuth();

  useEffect(() => {
    const loadProfile = async () => {
      if (!session) {
        setAuthState(null, null);
        return;
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('first_name, last_name, role')
        .eq('id', session.user.id)
        .single();

      if (error) {
        console.error('Profile fetch error:', error);
        setAuthState(session, session.user);
        return;
      }

      setAuthState(session, {
        ...session.user,
        first_name: profile.first_name,
        last_name: profile.last_name,
        role: profile.role
      });
    };

    loadProfile();
  }, [session, setAuthState]);

  if (isLoading) return <LoadingPage />;

  return <>{children}</>;
}