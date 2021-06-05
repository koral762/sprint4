export const cloudService = {
    uploadImg
}

async function uploadImg(file) {
    const CLOUD_NAME = "dahthio8n"
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const formData = new FormData();
    // const file = ev.target.files[0]
    console.log(file)
    formData.append('file', file)
    formData.append('upload_preset', 'ml_default');
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        console.log(data)
        return data.secure_url
    } catch (err) {
        console.log(err);
    }
}