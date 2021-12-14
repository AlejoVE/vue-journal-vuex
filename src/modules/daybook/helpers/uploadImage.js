import axios from "axios"

const uploadImage = async (file) => {
    if(!file) return null
    try {
        const url = `https://api.cloudinary.com/v1_1/${process.env.VUE_APP_CLOUDINARY_CLOUD_NAME}/image/upload`
        const formData = new FormData()
        formData.append('upload_preset', process.env.VUE_APP_CLOUDINARY_UPLOAD_PRESET)
        formData.append('file', file)
        const { data } = await axios.post(url, formData)
        return data.secure_url
    } catch (error) {
        console.log('ERROR: uploadImage', error)
        return null
    }
}

export default uploadImage