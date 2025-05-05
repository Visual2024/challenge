import { ClientComponent } from "@/components/ClientComponent"
import { Footer } from "@/components/layout/Footer/Footer"
import { Header } from "@/components/layout/Header/Header"

export default function Home() {

  return (
    <main >
      <Header />
      <div className="container mx-auto py-8 px-4 "> 
        <ClientComponent />
      </div>
      <Footer />
    </main>
  )
}

