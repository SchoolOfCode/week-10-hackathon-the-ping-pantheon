import Link from "next/link"

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4 text-primary">Age of Mythology Guide</h1>
      <p className="text-xl mb-8 text-white">Explore the heroes and units of Age of Mythology</p>
      <div className="flex justify-center space-x-4">
        <Link
          href="/heroes"
          className="bg-primary text-secondary px-4 py-2 rounded hover:bg-opacity-80 transition-colors"
        >
          View Heroes
        </Link>
        <Link
          href="/units"
          className="bg-primary text-secondary px-4 py-2 rounded hover:bg-opacity-80 transition-colors"
        >
          View Units
        </Link>
      </div>
    </div>
  )
}

