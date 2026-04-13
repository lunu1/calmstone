export default function UploadBtn({ onUploaded, label = 'Upload Image' }) {
const cloud = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET


const handle = async (e) => {
const file = e.target.files?.[0]
if (!file) return
const form = new FormData()
form.append('file', file)
form.append('upload_preset', preset)
const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, { method: 'POST', body: form })
const data = await res.json()
onUploaded?.(data.secure_url)
}


return (
<label className="btn cursor-pointer">
{label}
<input type="file" accept="image/*" className="hidden" onChange={handle} />
</label>
)
}