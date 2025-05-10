'use server'

export const getImageStatus = async (imageId: string) => {
  const userId = '123'
  const baseUrl = 'https://gen.snap2sticker.com'
  const url = `${baseUrl}/image-status/${userId}/${imageId}`
  console.log(url)

  const response = await fetch(url, {
    method: 'GET',
  })
  //   {
  //     "image": {
  //         "id": "105b92b1-0387-4074-a19c-cb5d3037c3f3",
  //         "url": "https://cdn.snap2sticker.com/gen-c043dd68-5bb9-4cf7-8fb5-e386f3fab1d9.png",
  //         "ownerId": "123",
  //         "prompt": "make me into cyberpunk style sticker",
  //         "uploadedImageIds": [],
  //         "createdAt": "2025-05-10 05:41:31.601751",
  //         "finishedAt": null,
  //         "updatedAt": "2025-05-10 05:41:31.601751",
  //         "status": "completed"
  //     }
  // }
  const data = (await response.json()) as {
    id: string
    url: string
    ownerId: string
    prompt: string
    uploadedImageIds: string[]
    createdAt: string
    finishedAt: string | null
    updatedAt: string
    status: string
  }
  return data
}
