'use client'
import { getImageStatus } from '@/actions/getImageStatus'
import { sendToGenAction } from '@/actions/sendToGenAction'
import { UploadDropzoneProgress } from '@/components/ui/upload-dropzone-progress'
import { useState } from 'react'

const appPage: React.FC = () => {
  const [uploadedImagesUrls, setUploadedImagesUrls] = useState<string[]>([])
  const [imageId, setImageId] = useState<string | null>(null)
  const [imageStatus, setImageStatus] = useState<string | null>(null)

  const [resultImageUrl, setResultImageUrl] = useState<string | null>(null)
  const polling = async (imageId: string) => {
    console.log('polling')
    const { status, url } = await getImageStatus(imageId)
    if (status === 'completed' || status === 'failed') {
      setImageStatus(status)
      setResultImageUrl(url)
    } else {
      setTimeout(() => {
        polling(imageId)
      }, 5000)
    }
  }
  return (
    <div>
      <UploadDropzoneProgress
        route='images'
        accept='image/*'
        onBeforeUpload={({ files }) => {
          console.log(files)
          // rename all files
          // return files.map(
          //   (file) =>
          //     new File([file], 'renamed-' + file.name, { type: file.type })
          // )
        }}
        onUploadBegin={({ files, metadata }) => {
          console.log('Upload begin')
        }}
        onUploadProgress={({ file, progress }) => {
          console.log(`Progress of ${file.name}: ${progress * 100}%`)
        }}
        onUploadComplete={({ files, metadata }) => {
          console.log(`Uploaded ${files.length} files`)
          console.log(files)
          const urls = files.map((file) => {
            return `https://cdn.snap2sticker.com/${file.objectKey}`
          })
          console.log(urls)
          setUploadedImagesUrls([...uploadedImagesUrls, ...urls])
          const filesUrls = files.map(
            (file) => `https://cdn.snap2sticker.com/${file.objectKey}`
          )
          setUploadedImagesUrls([...uploadedImagesUrls, ...filesUrls])
        }}
        onUploadError={(error) => {
          console.log(error.message)
        }}
        onUploadSettled={() => {
          console.log('Upload settled')
        }}
      />
      <div>
        <button
          onClick={async () => {
            const { imageId } = await sendToGenAction({
              imageUrls: uploadedImagesUrls,
              prompt:
                'make me a cartoon style sticker image with the photo I gave you. Be creative and make it look like a sticker.',
              userId: '123',
            })
            setImageId(imageId)
            setImageStatus('pending')
            // sleep for 1 min 40 seconds

            console.log('sleeping for 1 min 40 seconds')
            await new Promise((resolve) =>
              setTimeout(resolve, 1000 * 60 * 1 + 40)
            )
            console.log('starting polling')
            await polling(imageId)
          }}
        >
          Send to gen
        </button>
        <div>statusID: {imageId}</div>

        {imageStatus}
        {resultImageUrl && <img src={resultImageUrl} alt='result image' />}
        {uploadedImagesUrls.map((url) => (
          <img key={url} src={url} alt='uploaded image' />
        ))}
      </div>
    </div>
  )
}

export default appPage
