import { useRouter } from 'next/navigation';

interface LogoProps {
  isCollapsed: boolean;
}

export default function Logo({ isCollapsed }: LogoProps) {
  const router = useRouter();

  return (
    <div className="p-4 border-b border-gray-200">
      <button 
        type="button"
        onClick={() => router.push('/')}
        className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
      >
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-primary-foreground font-bold">S</span>
        </div>
        {!isCollapsed && <span className="font-semibold text-xl">Skillnetwork</span>}
      </button>
    </div>
  );
}