import { useState } from 'react';

export const useModalState = () => {
  const [showAddAgentModal, setShowAddAgentModal] = useState(false);
  const [showViewAgentsModal, setShowViewAgentsModal] = useState(false);
  const [showAddQueryModal, setShowAddQueryModal] = useState(false);
  const [showSendProcessModal, setShowSendProcessModal] = useState(false);
  const [showSendLocationModal, setShowSendLocationModal] = useState(false);
  
  return {
    showAddAgentModal,
    setShowAddAgentModal,
    showViewAgentsModal,
    setShowViewAgentsModal,
    showAddQueryModal,
    setShowAddQueryModal,
    showSendProcessModal,
    setShowSendProcessModal,
    showSendLocationModal,
    setShowSendLocationModal,
  };
};