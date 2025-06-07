import { useEffect, useRef, useState } from "react"
import { FiUpload } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"

import { updateDisplayPicture } from "../../../../services/settingsApi"
import IconButton from "../../../common/IconButton"

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.userProfile)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)

  const fileInputRef = useRef(null)

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    // console.log(file)
    if (file) {
      setImageFile(file)
      previewFile(file)
    }
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const handleFileUpload = () => {
    try {
      console.log("uploading...")
      setLoading(true)
      const formData = new FormData()
      formData.append("displayPicture", imageFile)
      // console.log("formdata", formData)
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false)
      })
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile)
    }
  }, [imageFile])

  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-600/50 bg-gradient-to-tl from-gray-900 via-gray-700 to-gray-800 p-8 shadow-xl backdrop-blur-sm">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6 text-center">
          <h3 className="text-xl font-semibold text-white mb-2">Profile Picture</h3>
          <p className="text-gray-400 text-sm">Upload a new photo to personalize your account</p>
        </div>

        {/* Profile Image Section */}
        <div className="flex flex-col items-center space-y-6">
          {/* Image Container with Hover Effect */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
            <div className="relative">
              <img
                src={previewSource || user?.image}
                alt={`profile-${user?.firstName}`}
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-600 shadow-lg transition-transform duration-300 group-hover:scale-105"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-medium">Change Photo</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/gif, image/jpeg"
            />

            <button
              onClick={handleClick}
              disabled={loading}
              className="flex-1 group relative overflow-hidden rounded-lg border-2 border-white bg-transparent hover:bg-gray-600 transition-all duration-300 py-3 px-6 font-medium text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span className="relative z-10">Choose File</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <div className="flex-1">
              <IconButton
                text={loading ? "Uploading..." : "Upload"}
                onclick={handleFileUpload}
                size="lg"
                variant="primary"
              >
                {!loading && (
                  <FiUpload className="text-lg text-gray-900" />
                )}
              </IconButton>
            </div>
          </div>

          {/* File Info */}
          {imageFile && (
            <div className="text-center">
              <p className="text-sm text-gray-300">
                Selected: <span className="font-medium text-white">{imageFile.name}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Size: {(imageFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          )}

          {/* Loading Indicator */}
          {loading && (
            <div className="flex items-center space-x-2 text-blue-400">
              <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm">Processing your image...</span>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Supported formats: PNG, JPEG, GIF • Max size: 5MB
          </p>
        </div>
      </div>
    </div>
  )
}