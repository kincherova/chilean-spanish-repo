import { Link } from 'react-router-dom';
import { BookOpen, User, ChevronLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavBarProps {
  back?: string;
  title?: string;
}

export default function NavBar({ back, title }: NavBarProps) {
  const { user } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {back ? (
            <Link to={back} className="text-white/70 hover:text-white transition-colors p-1 -ml-1">
              <ChevronLeft size={22} />
            </Link>
          ) : null}
          {title ? (
            <span className="text-white font-semibold text-sm truncate max-w-[200px]">{title}</span>
          ) : (
            <Link to="/modules" className="flex items-center gap-2">
              <span className="text-white font-display font-bold text-sm">Survival Chilean Spanish</span>
            </Link>
          )}
        </div>

        <div className="flex items-center gap-1">
          {user && (
            <Link
              to="/vocabulary"
              className="p-2 text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/10"
              title="My Vocabulary"
            >
              <BookOpen size={18} />
            </Link>
          )}
          {user && (
            <Link
              to="/profile"
              className="p-2 text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/10"
            >
              <User size={18} />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
