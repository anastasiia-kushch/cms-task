import CampaignItem from '../CampaignItem/CampaignItem';
import css from './CampaignList.module.scss'
function CampaignList({ campaigns, onEdit, onDelete }) {
  return (
    <div>
      {campaigns.length === 0 ? (
        <p>No campaigns yet</p>
      ) : (
        <ul className={css.list}>
          {campaigns.map((campaign) => (
            <li key={campaign.id}>
              <CampaignItem
                campaign={campaign}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CampaignList;
