import { useEffect, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FiUploadCloud, FiX, FiImage, FiVideo } from "react-icons/fi"
import { useSelector } from "react-redux"
import ReactPlayer from "react-player"

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const { course } = useSelector((state) => state.course)
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  )
  const inputRef = useRef(null)

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      previewFile(file)
      setSelectedFile(file)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
  })

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  useEffect(() => {
    register(name, { required: true })
  }, [register])

  useEffect(() => {
    setValue(name, selectedFile)
  }, [selectedFile, setValue])

  return (
    <div className="flex flex-col space-y-3">
      <label className="text-sm font-medium text-gray-100 flex items-center gap-2" htmlFor={name}>
        {!video ? <FiImage className="text-blue-400" /> : <FiVideo className="text-purple-400" />}
        {label}
        {!viewData && <sup className="text-pink-400 text-xs">*</sup>}
      </label>

      <div
        className={`
          relative overflow-hidden rounded-xl border-2 border-dashed transition-all duration-300 ease-in-out
          ${isDragActive
            ? "border-blue-400 bg-blue-950/30 shadow-lg shadow-blue-500/20"
            : "border-gray-600 bg-gray-800/50 hover:border-gray-500 hover:bg-gray-800/70"}
          ${previewSource ? "border-solid border-gray-700" : ""}
          min-h-[280px] backdrop-blur-sm
        `}
      >
        {previewSource ? (
          <div className="relative group">
            <div className="p-4">
              {!video ? (
                <div className="relative rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={previewSource}
                    alt="Preview"
                    className="w-full h-auto max-h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ) : (
                <div className="rounded-lg overflow-hidden shadow-lg aspect-video">
                  <ReactPlayer
                    url={previewSource}
                    controls
                    width="100%"
                    height="100%"
                  />
                </div>
              )}
            </div>

            {!viewData && (
              <button
                type="button"
                onClick={() => {
                  setPreviewSource("")
                  setSelectedFile(null)
                  setValue(name, null)
                }}
                className="
                  absolute top-6 right-6 
                  bg-red-500 hover:bg-red-600 
                  text-white rounded-full p-2 
                  shadow-lg hover:shadow-xl 
                  transform hover:scale-110 
                  transition-all duration-200 
                  opacity-0 group-hover:opacity-100
                  focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-400
                "
                aria-label="Remove file"
              >
                <FiX className="w-4 h-4" />
              </button>
            )}

            {selectedFile && (
              <div className="px-4 pb-4">
                <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-3 border border-gray-700">
                  <p className="text-sm text-gray-300 font-medium truncate">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div
            className="flex w-full flex-col items-center justify-center p-8 cursor-pointer"
            {...getRootProps()}
          >
            <input {...getInputProps()} ref={inputRef} />

            <div className={`
              grid aspect-square w-16 place-items-center rounded-full 
              ${isDragActive
                ? "bg-blue-500 shadow-lg shadow-blue-500/30"
                : "bg-gray-700 hover:bg-gray-600"}
              transition-all duration-300 transform hover:scale-110
            `}>
              <FiUploadCloud className={`
                text-3xl transition-colors duration-300
                ${isDragActive ? "text-white" : "text-yellow-400"}
              `} />
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-300 font-medium">
                {isDragActive ? (
                  <span className="text-blue-400">Drop your {!video ? "image" : "video"} here</span>
                ) : (
                  <>
                    Drag and drop {!video ? "an image" : "a video"}, or{" "}
                    <span className="font-semibold text-yellow-400 hover:text-yellow-300 transition-colors">
                      click to browse
                    </span>
                  </>
                )}
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-gray-400">
                <div className="flex items-center gap-1 bg-gray-800/50 px-3 py-1.5 rounded-full border border-gray-700">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Aspect ratio 16:9</span>
                </div>
                <div className="flex items-center gap-1 bg-gray-800/50 px-3 py-1.5 rounded-full border border-gray-700">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Recommended 1024×576</span>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-xs text-gray-500">
                  Supports {!video ? ".JPEG, .JPG, .PNG" : ".MP4"} files
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {errors[name] && (
        <div className="flex items-center gap-2 mt-2">
          <div className="w-4 h-4 rounded-full bg-pink-500/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-pink-400"></div>
          </div>
          <span className="text-sm text-pink-400 font-medium">
            {label} is required
          </span>
        </div>
      )}
    </div>
  )
}
