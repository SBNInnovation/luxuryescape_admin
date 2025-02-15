"use client"
import EditAccommodation from "@/components/accommodation/EditAccommodation"
import { useParams } from "next/navigation"
import React from "react"

const page = () => {
  const router = useParams()
  const { id } = router
  const idString = Array.isArray(id) ? id[0] : id || ""
  return (
    <div className="w-full">
      <EditAccommodation id={idString} />
    </div>
  )
}

export default page
