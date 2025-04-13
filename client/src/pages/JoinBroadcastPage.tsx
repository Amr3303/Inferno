// import { FC, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthLayout } from '../layouts/AuthLayout';
// import { useToast } from '../hooks/use-toast';

// export const JoinBroadcastPage: FC = () => {
//   const [invitationCode, setInvitationCode] = useState('');
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   const handleJoin = () => {
//     if (!invitationCode) {
//       toast({
//         title: "Error",
//         description: "Please enter an invitation code",
//         variant: "destructive"
//       });
//       return;
//     }

//     // In a real app, we would validate the invitation code
//     // For demo purposes, we'll just accept any code
//     toast({
//       title: "Success",
//       description: "Joined broadcast successfully!"
//     });

//     navigate('/broadcast/messages');
//   };

//   return (
//     <AuthLayout title="Join Broadcast">
//       <div className="w-full max-w-md">
//         <div className="mb-6">
//           <label htmlFor="invitation-code" className="block mb-2">Invitation code</label>
//           <input
//             id="invitation-code"
//             type="text"
//             value={invitationCode}
//             onChange={(e) => setInvitationCode(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//             placeholder="Enter invitation code"
//           />
//         </div>
        
//         <button 
//           onClick={handleJoin}
//           className="w-full py-3 px-6 bg-broadcast-blue text-white rounded-md mt-4"
//         >
//           Join
//         </button>
//       </div>
//     </AuthLayout>
//   );
// };
// import { FC, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthLayout } from '../layouts/AuthLayout';
// import { useToast } from '../hooks/use-toast';

// interface Broadcast {
//   _id: string;
//   name: string;
//   description: string;
//   status: "Active" | "Inactive";
// }

// export const JoinBroadcastPage: FC = () => {
//   const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);
//   const [selectedBroadcast, setSelectedBroadcast] = useState<string>('');
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log('useEffect is running');
    
//     const fetchBroadcasts = async () => {
//       console.log('fetchBroadcasts function is called');
      
//       try {
//         console.log('Attempting to fetch broadcasts');
        
//         const response = await fetch('/api/v1/broadcasts', {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//           },
//         });
        
//         console.log('Response received:', response);
//         console.log('access_token', localStorage.getItem('token'));

        
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
        
//         try {
//           const data = await response.json();
//           console.log('Data parsed successfully:', data);
          
//           if (data.success) {
//             console.log('Setting broadcasts state');
//             setBroadcasts(data.data);
//           } else {
//             console.error('API returned unsuccessful response:', data);
//             toast({
//               title: "Error",
//               description: "Failed to fetch broadcasts.",
//               variant: "destructive"
//             });
//           }
//         } catch (parseError) {
//           console.error('Error parsing JSON:', parseError);
//           toast({
//             title: "Error",
//             description: "Failed to parse the response from server.",
//             variant: "destructive"
//           });
//         }
//       } catch (fetchError) {
//         console.error('Error fetching broadcasts:', fetchError);
//         toast({
//           title: "Error",
//           description: `An error occurred: ${fetchError.message}`,
//           variant: "destructive"
//         });
//       }
//     };
    
//     fetchBroadcasts();
//   }, [toast]);
//   const handleJoinRequest = async () => {
//     if (!selectedBroadcast) {
//       toast({
//         title: "Error",
//         description: "Please select a broadcast to join.",
//         variant: "destructive"
//       });
//       return;
//     }
    
//     try {
//       const response = await fetch(`/api/v1/broadcasts/${selectedBroadcast}/join`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       console.log('Access Token:', localStorage.getItem('token'));
//       const data = await response.json();
//       console.log('API Response:', data);

//       if (data.success) {
//         toast({
//           title: "Success",
//           description: "Your join request has been submitted successfully!",
//         });
//         navigate('/broadcast/messages');
//       } else {
//         toast({
//           title: "Error",
//           description: "Failed to submit join request.",
//           variant: "destructive"
//         });
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "An error occurred while sending the join request.",
//         variant: "destructive"
//       });
//     }
//   };

//   return (
//     <AuthLayout title="Broadcasts">
//       <div className="w-full">
//         <div className="shadow bg-white rounded">
//           <div className="grid grid-cols-3 py-4 px-6 border-b">
//             <div className="font-medium">NAME</div>
//             <div className="font-medium">DESCRIPTION</div>
//             <div className="font-medium">STATUS</div>
//           </div>
          
//           <div className="divide-y">
//             {broadcasts.map((broadcast) => (
//               <div 
//                 key={broadcast._id} 
//                 className="grid grid-cols-3 py-4 px-6 items-center cursor-pointer hover:bg-gray-50"
//                 onClick={() => setSelectedBroadcast(broadcast._id)}
//               >
//                 <div className="flex items-center space-x-3">
//                   <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
//                     <span className="text-gray-500 text-lg">
//                       {broadcast.name.charAt(0)}
//                     </span>
//                   </div>
//                   <span className="font-medium">{broadcast.name}</span>
//                 </div>
                
//                 <div className="text-gray-600">{broadcast.description}</div>
                
//                 <div>
//                   <span className={`px-2 py-1 text-xs rounded-full ${
//                     broadcast.status === "Active" 
//                       ? "bg-green-100 text-green-800" 
//                       : "bg-red-100 text-red-800"
//                   }`}>
//                     {broadcast.status}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
        
//         <button 
//           onClick={handleJoinRequest}
//           disabled={!selectedBroadcast}
//           className={`py-3 px-6 rounded-md mt-6 font-medium ${
//             selectedBroadcast 
//               ? "bg-blue-600 text-white hover:bg-blue-700" 
//               : "bg-gray-300 text-gray-500 cursor-not-allowed"
//           }`}
//         >
//           Join Selected Broadcast
//         </button>
//       </div>
//     </AuthLayout>
//   );
// };
import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { useToast } from '../hooks/use-toast';

interface Broadcast {
  _id: string;
  name: string;
  description: string;
  status: "Active" | "Inactive";
}

export const JoinBroadcastPage: FC = () => {
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);
  const [selectedBroadcast, setSelectedBroadcast] = useState<string>('');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBroadcasts = async () => {
      try {
        const response = await fetch('/api/v1/broadcasts', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.success) {
          setBroadcasts(data.data);
        } else {
          toast({
            title: "Error",
            description: "Failed to fetch broadcasts.",
            variant: "destructive"
          });
        }
      } catch (fetchError) {
        toast({
          title: "Error",
          description: `An error occurred: ${fetchError.message}`,
          variant: "destructive"
        });
      }
    };

    fetchBroadcasts();
  }, [toast]);

  const handleJoinRequest = async () => {
    if (!selectedBroadcast) {
      toast({
        title: "Error",
        description: "Please select a broadcast to join.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const response = await fetch(`/api/v1/broadcasts/${selectedBroadcast}/join`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Success",
          description: "Your join request has been submitted successfully!",
        });
        navigate('/broadcast/messages');
      } else {
        toast({
          title: "Error",
          description: "Failed to submit join request.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while sending the join request.",
        variant: "destructive"
      });
    }
  };

  return (
    <AuthLayout title="Broadcasts">
      <div className="w-full">
        <div className="shadow bg-white rounded">
          <div className="grid grid-cols-3 py-4 px-6 border-b">
            <div className="font-medium">NAME</div>
            <div className="font-medium">DESCRIPTION</div>
            <div className="font-medium text-center">STATUS</div> {/* Improved alignment */}
          </div>

          <div className="divide-y">
            {broadcasts.map((broadcast) => (
              <div 
                key={broadcast._id} 
                className={`grid grid-cols-3 py-4 px-6 items-center cursor-pointer hover:bg-gray-50 ${selectedBroadcast === broadcast._id ? 'bg-blue-100' : ''}`}
                onClick={() => setSelectedBroadcast(broadcast._id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-500 text-lg">
                      {broadcast.name.charAt(0)}
                    </span>
                  </div>
                  <span className="font-medium">{broadcast.name}</span>
                </div>

                <div className="text-gray-600">{broadcast.description}</div>

                <div className="flex justify-center"> {/* Centering STATUS */}
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    broadcast.status === "Active" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {broadcast.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <button 
            onClick={handleJoinRequest}
            disabled={!selectedBroadcast}
            className={`py-3 px-6 rounded-md font-medium w-full ${selectedBroadcast ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
          >
            Join Selected Broadcast
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};
