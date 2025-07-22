
export default function TextArea({ content, onChange }) {
  return (
 <div className="w-full">
      <label
        htmlFor="message"
        className="block mb-2 text-sm  font-medium text-gray-900"
      >
      </label>
      <textarea
        id="message"
        name="message"
        rows={4}
        placeholder="Write your thoughts here..."
        value={content}
        onChange={onChange}
        className="block p-2.5 w-full text-sm text-gray-900   min-h-60  bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  )
}
