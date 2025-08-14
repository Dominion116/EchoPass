import { EchoPassHeader } from "@/components/echopass-header"
import { ContractStatusBar } from "@/components/contract-status-bar"
import { CreateEventWizard } from "@/components/create-event-wizard"

export default function CreateEventPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <EchoPassHeader />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <ContractStatusBar />
        </div>

        <CreateEventWizard />
      </div>
    </div>
  )
}
