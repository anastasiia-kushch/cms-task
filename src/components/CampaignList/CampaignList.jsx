import CampaignItem from '../CampaignItem/CampaignItem';

function CampaignList({ campaigns, onEdit, onDelete }) {
  return (
    <div>
      {campaigns.length === 0 ? (
        <p>No campaigns yet</p>
      ) : (
        campaigns.map((campaign) => (
          <div key={campaign.id} className="campaign-card">
            <CampaignItem
              campaign={campaign}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        ))
      )}
    </div>
  );
}

export default CampaignList;
