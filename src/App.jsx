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
  const [emeraldBalance, setEmeraldBalance] = useState(() => {
    const stored = localStorage.getItem('emeraldBalance');
    return stored ? Number(stored) : 1000;
  });
  const [isEditingBalance, setIsEditingBalance] = useState(false);
  const [tempBalance, setTempBalance] = useState(emeraldBalance);

  useEffect(() => {
    localStorage.setItem('emeraldBalance', emeraldBalance);
  }, [emeraldBalance]);

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
    if (Number(newCampaign.fund) > emeraldBalance) {
      toast.error('Not enough funds in Emerald account!');
      return;
    }
    try {
      const created = await addCampaign(newCampaign);
      setCampaigns([...campaigns, created]);
      setEmeraldBalance((prev) => prev - newCampaign.fund);
      toast.success('Campaign added');
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
      toast.success('Campaign edited');
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
      toast.error(error);
    }
  };

  const handleBalanceChange = (e) => {
    setTempBalance(e.target.value);
  };

  const saveBalance = () => {
    const parsed = Number(tempBalance);
    if (!isNaN(parsed) && parsed >= 0) {
      setEmeraldBalance(parsed);
      localStorage.setItem('emeraldBalance', parsed);
    } else {
      toast.error('Enter a valid number');
    }
    setIsEditingBalance(false);
  };

  const handleBalanceKeyDown = (e) => {
    if (e.key === 'Enter') {
      saveBalance();
    } else if (e.key === 'Escape') {
      setIsEditingBalance(false);
      setTempBalance(emeraldBalance);
    }
  };

  return (
    <div className={css.container}>
      <Toaster />
      <div className={css.header}>
        <div
          className={css.balance}
          onDoubleClick={() => setIsEditingBalance(true)}
        >
          {isEditingBalance ? (
            <input
              type="number"
              value={tempBalance}
              onChange={handleBalanceChange}
              onBlur={saveBalance}
              onKeyDown={handleBalanceKeyDown}
              autoFocus
              className={css.balanceInput}
            />
          ) : (
            <h2>Emerald balance: ${emeraldBalance}</h2>
          )}
        </div>

        <div className={css.panelHeader}>
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
