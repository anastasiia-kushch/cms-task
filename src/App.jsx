import { useEffect, useState } from 'react';
import CampaignForm from './components/CampaignForm/CampaignForm';
import CampaignList from './components/CampaignList/CampaignList';
import Modal from './components/Modal/Modal';
import {
  getCampaigns,
  addCampaign,
  updateCampaign,
  deleteCampaign,
} from './api/api';
import css from './App.module.scss';
import toast, { Toaster } from 'react-hot-toast';

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
        toast.error(error);
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
      toast.error(error);
    }
  };

  const handleUpdateCampaign = async (updatedCampaign) => {
    try {
      const result = await updateCampaign(updatedCampaign);
      setCampaigns((prev) =>
        prev.map((c) => (c.id === result.id ? result : c))
      );
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDeleteCampaign = async (id) => {
    try {
      await deleteCampaign(id);
      setCampaigns((prev) => prev.filter((c) => c.id !== id));
      toast.success('Campaign deleted', {
        duration: 3000,
        icon: '🗑️',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={css.container}>
      <Toaster />
      <div className={css.header}>
        <h1>Your campaigns</h1>
        <button
          className={css.addBtn}
          onClick={() => {
            setEditingCampaign(null);
            setShowForm(true);
          }}
        >
          Add
        </button>
      </div>

      {showForm && (
        <Modal
          onClose={() => {
            setShowForm(false);
            setEditingCampaign(null);
          }}
        >
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
        </Modal>
      )}

      <CampaignList
        campaigns={campaigns}
        onEdit={handleEditClick}
        onDelete={handleDeleteCampaign}
      />
    </div>
  );
}

export default App;
