

type ReviewNotesProps = {
  note: number
  width?: number
}

export function ReviewNotes({ note, width }: ReviewNotesProps) {
  return (
    <>
      <h1>{note}</h1>
      <h1>{width}</h1>
    </>
  )
}