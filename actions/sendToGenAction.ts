'use server'

export const sendToGenAction = async ({
  imageUrls,
  prompt,
  userId,
}: {
  imageUrls: string[]
  prompt: string
  userId: string
}) => {
  const baseUrl = 'https://gen.snap2sticker.com'
  const url = `${baseUrl}/generate`

  //   {
  //     "prompt":"make me into cyberpunk style sticker",
  //     "inputImageUrls":["https://cdn.snap2sticker.com/IMG.jpeg"],
  //     "userId":"123"
  // }

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      prompt,
      inputImageUrls: imageUrls,
      userId,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = (await response.json()) as {
    imageId: string
  }
  return data
}
