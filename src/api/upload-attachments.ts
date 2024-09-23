import { api } from '@/lib/axios'

export interface UploadAttachmentsBody {
  files: FormData
}
export interface UploadAttachmentsResponse {
  attachments: {
    id: string
    url: string
  }[]
}

export async function uploadAttachments(files: FormData) {
  const uploadResponse = await api.post(
    '/attachments',
    { files },
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  )
  return uploadResponse.data.attachments[0]
}
