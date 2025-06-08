function CampaignItem({ campaign, onEdit, onDelete }) {
  return (
    <div>
      <h3>{campaign.name}</h3>
      <p>
        Bid: {campaign.bid} | Fund: {campaign.fund}
      </p>
      <p>
        Town: {campaign.town}, Radius: {campaign.radius}km
      </p>
      <p>Status: {campaign.status}</p>
      <p>Keywords: {campaign.keywords.join(', ')}</p>
      <button onClick={() => onEdit(campaign)}>Edit</button>
      <button onClick={() => onDelete(campaign.id)}>Delete</button>
    </div>
  );
}
export default CampaignItem;
