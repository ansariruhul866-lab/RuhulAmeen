/**
 * Helper to convert Google Drive share links and folder IDs into:
 * (a) embeddable video URL: https://drive.google.com/file/d/{ID}/preview
 * (b) high-res image URL: https://drive.google.com/thumbnail?id={ID}&sz=w1200
 */

export function extractDriveId(urlOrId: string): string | null {
  if (!urlOrId) return null;
  
  // If it's already a clean ID
  if (/^[a-zA-Z0-9_-]{25,}$/.test(urlOrId)) {
    return urlOrId;
  }

  // Matches /d/{id}/ or id={id} or /folders/{id}
  const fileMatch = urlOrId.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) return fileMatch[1];

  const idParamMatch = urlOrId.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idParamMatch) return idParamMatch[1];

  const folderMatch = urlOrId.match(/\/folders\/([a-zA-Z0-9_-]+)/);
  if (folderMatch) return folderMatch[1];

  return null;
}

export function getDriveEmbedUrl(urlOrId: string): string {
  const id = extractDriveId(urlOrId);
  if (!id) return urlOrId;
  return `https://drive.google.com/file/d/${id}/preview`;
}

export function getDriveImageUrl(urlOrId: string, size = 'w1200'): string {
  const id = extractDriveId(urlOrId);
  if (!id) return urlOrId; // If not a drive link, return original URL (e.g. Unsplash or web screenshot)
  return `https://drive.google.com/thumbnail?id=${id}&sz=${size}`;
}
