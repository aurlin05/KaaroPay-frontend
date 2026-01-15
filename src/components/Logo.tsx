import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-11 w-11'
}

export function Logo({ className, size = 'md' }: LogoProps) {
  return (
    <div className={cn(sizeMap[size], className)}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#14b8a6', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#0d9488', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        
        <circle cx="100" cy="100" r="95" fill="url(#grad1)" opacity="0.1"/>
        
        <g transform="translate(100, 100)">
          <rect x="-45" y="-50" width="14" height="100" fill="url(#grad1)" rx="7"/>
          <path d="M -25 -5 L 25 -50 L 35 -42 L -12 5 Z" fill="url(#grad2)"/>
          <path d="M -12 5 L 35 50 L 25 58 L -25 15 Z" fill="url(#grad1)"/>
          <circle cx="35" cy="-46" r="8" fill="#10b981">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="35" cy="54" r="8" fill="#14b8a6">
            <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="-45" cy="0" r="5" fill="#059669" opacity="0.7"/>
          <circle cx="40" cy="0" r="5" fill="#0d9488" opacity="0.7"/>
        </g>
        
        <circle cx="100" cy="100" r="85" fill="none" stroke="url(#grad1)" strokeWidth="2" opacity="0.3"/>
      </svg>
    </div>
  )
}
