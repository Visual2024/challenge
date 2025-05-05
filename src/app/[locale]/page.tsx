import { ClientComponent } from "@/components/ClientComponent"
import { Footer } from "@/components/layout/Footer/Footer"

export default function Home() {

  return (
    <main >
      <div className="container mx-auto py-8 px-4 "> 
        <ClientComponent />
      </div>
      <Footer />
    </main>
  )
}

