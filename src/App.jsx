import { useEffect, useState } from 'react';
import CampaignForm from './components/CampaignForm/CampaignForm';
import CampaignList from './components/CampaignList/CampaignList';

function App() {
  const [campaigns, setCampaigns] = useState([]);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/campaigns')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch campaigns');
        return res.json();
      })
      .then((data) => setCampaigns(data))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleEditClick = (campaign) => {
    setEditingCampaign(campaign);
    setShowForm(true);
  };

  const handleAddCampaign = (newCampaign) => {
    setCampaigns([...campaigns, { id: Date.now(), ...newCampaign }]);
  };

  const handleUpdateCampaign = (updatedCampaign) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === updatedCampaign.id ? updatedCampaign : c))
    );
  };

  const handleDeleteCampaign = (id) => {
    setCampaigns(campaigns.filter((c) => c.id !== id));
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
