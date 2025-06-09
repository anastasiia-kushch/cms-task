import { useEffect, useState } from 'react';
import CampaignForm from './components/CampaignForm/CampaignForm';
import CampaignList from './components/CampaignList/CampaignList';
import {
  getCampaigns,
  addCampaign,
  updateCampaign,
  deleteCampaign,
} from './api/api';

function App() {
  const [campaigns, setCampaigns] = useState([]);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const data = await getCampaigns();
        setCampaigns(data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };
    fetchCampaigns();
  }, []);

  const handleEditClick = (campaign) => {
    setEditingCampaign(campaign);
    setShowForm(true);
  };

  const handleAddCampaign = async (newCampaign) => {
    try {
      const created = await addCampaign(newCampaign);
      setCampaigns([...campaigns, created]);
    } catch (error) {
      console.error('Error adding campaign:', error);
    }
  };

  const handleUpdateCampaign = async (updatedCampaign) => {
    try {
      const result = await updateCampaign(updatedCampaign);
      setCampaigns((prev) =>
        prev.map((c) => (c.id === result.id ? result : c))
      );
    } catch (error) {
      console.error('Error updating campaign:', error);
    }
  };

  const handleDeleteCampaign = async (id) => {
    try {
      await deleteCampaign(id);
      setCampaigns((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error('Error deleting campaign:', error);
    }
  };

  return (
    <>
      <button
        onClick={() => {
          setEditingCampaign(null);
          setShowForm(true);
        }}
      >
        Add campaign
      </button>

      {showForm && (
        <CampaignForm
          initialData={editingCampaign}
          onSubmit={(data) => {
            if (editingCampaign) {
              handleUpdateCampaign(data);
            } else {
              handleAddCampaign(data);
            }
            setShowForm(false);
            setEditingCampaign(null);
          }}
          onCancel={() => {
            setShowForm(false);
            setEditingCampaign(null);
          }}
        />
      )}

      <CampaignList
        campaigns={campaigns}
        onEdit={handleEditClick}
        onDelete={handleDeleteCampaign}
      />
    </>
  );
}

export default App;
