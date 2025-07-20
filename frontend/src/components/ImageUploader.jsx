import { useState, useEffect } from 'react'
export default function ImageUploader({ image, onChange , edit}) {
  const [preview, setPreview] = useState(image)

  useEffect(() => {
    setPreview(image)
  }, [image])

  return (
    <div className="flex items-center justify-center w-full h-64 object-cover">
      <label
        htmlFor="dropzone-file"
        className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-black/15 hover:bg-black/25  ${image ? 'relative overflow-hidden group' : ''
          }`}
      >
        {image && !edit ? (
          <div className="w-full h-full ">
            <img
              src={image}
              alt="Preview"
              className="object-cover w-full h-full transition-opacity duration-300 group-hover:opacity-50 "
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 text-white text-sm font-medium">
              Modifier l’image
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-200"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5A5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-200">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-200">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
        )}
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={onChange}
          accept="image/*"
        />
      </label>
    </div>
  )
}
