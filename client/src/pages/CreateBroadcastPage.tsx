// import { FC, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthLayout } from '../layouts/AuthLayout';
// import { Plus } from 'lucide-react';
// import { useToast } from '../hooks/use-toast';

// export const CreateBroadcastPage: FC = () => {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [agents, setAgents] = useState('');
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   const handleCreate = () => {
//     if (!name) {
//       toast({
//         title: "Error",
//         description: "Please enter a broadcast name",
//         variant: "destructive"
//       });
//       return;
//     }

//     // Create broadcast logic would go here
//     // For demo, we'll just set something in localStorage
//     const broadcasts = JSON.parse(localStorage.getItem('broadcasts') || '[]');
//     const newBroadcast = {
//       id: Date.now().toString(),
//       name,
//       description,
//       agents: agents.split(',').map(a => a.trim()).filter(Boolean),
//       messages: []
//     };
    
//     broadcasts.push(newBroadcast);
//     localStorage.setItem('broadcasts', JSON.stringify(broadcasts));
//     localStorage.setItem('currentBroadcast', newBroadcast.id);

//     toast({
//       title: "Success",
//       description: "Broadcast created successfully!"
//     });

//     navigate('/broadcast/messages');
//   };

//   return (
//     <AuthLayout title="Create Broadcast">
//       <div className="w-full max-w-md">
//         <div className="mb-4">
//           <label htmlFor="name" className="block mb-2">Name</label>
//           <input
//             id="name"
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//             placeholder="Broadcast name"
//           />
//         </div>
        
//         <div className="mb-4">
//           <label htmlFor="description" className="block mb-2">Description</label>
//           <input
//             id="description"
//             type="text"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//             placeholder="Broadcast description"
//           />
//         </div>
        
//         <div className="mb-6">
//           <label htmlFor="agents" className="block mb-2">Add Agents</label>
//           <div className="flex items-center">
//             <input
//               id="agents"
//               type="text"
//               value={agents}
//               onChange={(e) => setAgents(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded"
//               placeholder="Enter emails, separated by commas"
//             />
//             <button className="ml-2 p-2 border border-gray-300 rounded">
//               <Plus size={16} />
//             </button>
//           </div>
//         </div>
        
//         <button 
//           onClick={handleCreate}
//           className="w-full py-3 px-6 bg-broadcast-blue text-white rounded-md mt-4"
//         >
//           Create
//         </button>
//       </div>
//     </AuthLayout>
//   );
// };

import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { Plus } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

export const CreateBroadcastPage: FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [agents, setAgents] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!name) {
      toast({
        title: "Error",
        description: "Please enter a broadcast name",
        variant: "destructive"
      });
      return;
    }
  
    const token = localStorage.getItem('token');
  
    try {
      const response = await fetch('/api/v1/broadcasts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          description
        })
      });
  
      const result = await response.json();
  
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Something went wrong');
      }
  
      localStorage.setItem('currentBroadcast', result.data.id);
  
      toast({
        title: "Success",
        description: "Broadcast created successfully!"
      });
  
      navigate('/broadcast/messages');
  
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create broadcast",
        variant: "destructive"
      });
    }
  };
  
  

  return (
    <AuthLayout title="Create Broadcast">
      <div className="w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Broadcast name"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block mb-2">Description</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Broadcast description"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="agents" className="block mb-2">Add Agents</label>
          <div className="flex items-center">
            <input
              id="agents"
              type="text"
              value={agents}
              onChange={(e) => setAgents(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter emails, separated by commas"
            />
            <button className="ml-2 p-2 border border-gray-300 rounded">
              <Plus size={16} />
            </button>
          </div>
        </div>
        
        <button 
          onClick={handleCreate}
          className="w-full py-3 px-6 bg-broadcast-blue text-white rounded-md mt-4"
        >
          Create
        </button>
      </div>
    </AuthLayout>
  );
};