import { useState } from 'react'
import UploadBtn from '../../components/UploadBtn'


export default function SlideForm({ initial = {}, onSubmit }) {
const [image, setImage] = useState(initial.image || '')
const [heading, setHeading] = useState(initial.heading || '')
const [subheading, setSubheading] = useState(initial.subheading || '')
const [order, setOrder] = useState(initial.order ?? 0)
const [isActive, setIsActive] = useState(initial.isActive ?? true)


const submit = (e) => {
e.preventDefault()
onSubmit?.({ image, heading, subheading, order: Number(order), isActive })
}


return (
<form onSubmit={submit} className="space-y-3">
<div className="flex items-center gap-3">
{image && <img src={image} className="h-16 w-28 rounded border object-cover" />}
<UploadBtn onUploaded={setImage} />
</div>
<input className="input" placeholder="Heading" value={heading} onChange={(e) => setHeading(e.target.value)} />
<textarea className="input" placeholder="Subheading" value={subheading} onChange={(e) => setSubheading(e.target.value)} />
<input className="input" type="number" placeholder="Order" value={order} onChange={(e) => setOrder(e.target.value)} />
<label className="flex items-center gap-2">
<input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} /> Active
</label>
<button className="btn">Save</button>
</form>
)
}