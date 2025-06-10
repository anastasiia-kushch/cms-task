import css from './CampaignItem.module.scss';

function CampaignItem({ campaign, onEdit, onDelete }) {
  return (
    <div className={css.container}>
      <h3>{campaign.name}</h3>
      <div className={css.info}>
        <div className={css.group}>
          <p>
            <strong>Bid:</strong> {campaign.bid}
          </p>
          <p>
            <strong>Fund:</strong> {campaign.fund}
          </p>
        </div>
        <div className={css.group}>
          <p>
            <strong>Town:</strong> {campaign.town}
          </p>
          <p>
            <strong>Radius:</strong> {campaign.radius}km
          </p>
        </div>
        <p>
          <strong>Status:</strong> {campaign.status}
        </p>
        <p>
          <strong>Keywords:</strong> {campaign.keywords.join(', ')}
        </p>
      </div>
      <div className={css.buttons}>
        <button className={css.button} onClick={() => onEdit(campaign)}>
          Edit
        </button>
        <button className={css.button} onClick={() => onDelete(campaign.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
export default CampaignItem;
