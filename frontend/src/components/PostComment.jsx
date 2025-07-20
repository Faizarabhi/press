import { PaperClipIcon, MapPinIcon, PhotoIcon } from '@heroicons/react/24/outline'

export default function TextArea({content = '', onChange}) {
  return (
    <form>
      <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 ">
        <div className="px-4 py-2 bg-white rounded-t-lg  ">
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          <textarea
            id="comment"
            rows="4"
            defaultValue={content}
             onChange={onChange}  
            className="w-full px-0 text-sm text-gray-900 bg-white border-0 focus:ring-0 "
            placeholder="Write a comment..."
            required
          >
          </textarea>
        </div>
        <div className="flex items-center justify-between px-3 py-2 border-t border-gray-200 ">
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-white bg-orange-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-200 "
          >
            Post comment
          </button>
          <div className="flex space-x-1 rtl:space-x-reverse">
            <button
              type="button"
              className="p-2 text-gray-500 rounded-sm hover:text-gray-900 hover:bg-gray-100 "
              title="Attach file"
            >
              <PaperClipIcon className="w-4 h-4" />
              <span className="sr-only">Attach file</span>
            </button>
            <button
              type="button"
              className="p-2 text-gray-500 rounded-sm hover:text-gray-900 hover:bg-gray-100 "
              title="Set location"
            >
              <MapPinIcon className="w-4 h-4" />
              <span className="sr-only">Set location</span>
            </button>
            <button
              type="button"
              className="p-2 text-gray-500 rounded-sm hover:text-gray-900 hover:bg-gray-100 "
              title="Upload image"
            >
              <PhotoIcon className="w-4 h-4" />
              <span className="sr-only">Upload image</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
