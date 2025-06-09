const API_URL = 'http://localhost:3001/campaigns';

export async function getCampaigns() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch campaigns');
  return await res.json();
}

export async function addCampaign(newCampaign) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newCampaign),
  });
  if (!res.ok) throw new Error('Failed to add campaign');
  return await res.json();
}

export async function updateCampaign(updatedCampaign) {
  const res = await fetch(`${API_URL}/${updatedCampaign.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedCampaign),
  });
  if (!res.ok) throw new Error('Failed to update campaign');
  return await res.json();
}

export async function deleteCampaign(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete campaign');
  } catch (error) {
    console.error(error);
    throw error;
  }
}
