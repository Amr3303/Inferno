
// import { FC } from 'react';
// import { Link } from 'react-router-dom';

// interface BroadcastLogoProps {
//   size?: 'sm' | 'md' | 'lg';
// }

// export const BroadcastLogo: FC<BroadcastLogoProps> = ({ size = 'md' }) => {
//   const sizeClasses = {
//     sm: 'w-10 h-10',
//     md: 'w-16 h-16',
//     lg: 'w-32 h-32'
//   };

//   return (
//     <Link to="/">
//       <div className={`${sizeClasses[size]} rounded-full p-1 broadcast-logo flex items-center justify-center`}>
//         <div className="relative w-full h-full flex items-center justify-center">
//           {/* Outer circle */}
//           <div className="absolute w-full h-full rounded-full border-4 border-white opacity-60"></div>
          
//           {/* Middle circle */}
//           <div className="absolute w-3/4 h-3/4 rounded-full border-4 border-white opacity-80"></div>
          
//           {/* Inner circle */}
//           <div className="absolute w-1/2 h-1/2 rounded-full border-4 border-white"></div>
          
//           {/* Center antenna */}
//           <div className="absolute h-4/5 w-1.5 bg-white bottom-0 rounded-t-full" style={{ marginBottom: '10%' }}></div>
          
//           {/* Antenna top */}
//           <div className="absolute w-3 h-3 bg-white rounded-full" style={{ bottom: '65%' }}></div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// import { FC } from 'react';
// import { Link } from 'react-router-dom';
// import logo from './logo.jpg';


// interface BroadcastLogoProps {
//   size?: 'sm' | 'md' | 'lg';
//   src: {logo}; 
// }

// export const BroadcastLogo: FC<BroadcastLogoProps> = ({ size = 'md', src }) => {
//   const sizeClasses = {
//     sm: 'w-10 h-10',
//     md: 'w-16 h-16',
//     lg: 'w-32 h-32'
//   };

//   return (
//     <Link to="/" aria-label="Home">
//       <div className={`${sizeClasses[size]} rounded-full overflow-hidden`}>
//         <img
//           src={src}
//           alt="Broadcast Logo"
//           className="w-full h-full object-cover"
//         />
//       </div>
//     </Link>
//   );
// };
import { FC } from 'react';
import { Link } from 'react-router-dom';
import defaultLogo from './logo.jpg'; // الصورة الافتراضية

interface BroadcastLogoProps {
  size?: 'sm' | 'md' | 'lg';
  src?: string; // خليها optional
}

export const BroadcastLogo: FC<BroadcastLogoProps> = ({ size = 'md', src }) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-32 h-32'
  };

  return (
    <Link to="/" aria-label="Home">
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden shadow-md`}>
        <img
          src={src || defaultLogo} // استخدم الصورة اللي تجي من props أو الصورة الافتراضية
          alt="Broadcast Logo"
          className="w-full h-full object-cover"
        />
      </div>
    </Link>
  );
};
