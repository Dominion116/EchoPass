# EchoPass - Tokenized Event Ticketing Platform

EchoPass is a decentralized event ticketing platform built on blockchain technology, providing secure, transparent, and fraud-resistant event ticketing solutions.

## 🚀 Features

- **Blockchain-Based Ticketing**: Secure, tamper-proof tickets as NFTs
- **Multi-Tier Pricing**: Flexible pricing with different access levels
- **QR Code Check-in**: Secure check-in system with rotating salts
- **Organizer Dashboard**: Comprehensive analytics and reporting
- **Kiosk Mode**: Dedicated check-in interface for events
- **Wallet Integration**: Support for MetaMask and WalletConnect
- **Resale Controls**: Configurable resale policies
- **Real-time Analytics**: Live sales and attendance tracking

## 🛠 Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Blockchain**: Wagmi, Viem, Base/Ethereum
- **UI Components**: Radix UI, shadcn/ui
- **Charts**: Recharts
- **Testing**: Vitest, React Testing Library
- **State Management**: TanStack Query (React Query)
- **Styling**: Tailwind CSS v4

## 📋 Prerequisites

- Node.js 18+ 
- pnpm 8+
- Git

## 🚀 Quick Start

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/your-username/echopass-frontend.git
cd echopass-frontend
\`\`\`

### 2. Install Dependencies

\`\`\`bash
pnpm install
\`\`\`

### 3. Environment Setup

Copy the environment template and configure your variables:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Required environment variables:

\`\`\`env
# RPC Configuration
NEXT_PUBLIC_RPC_URL=http://localhost:8545
NEXT_PUBLIC_CHAIN_ID=8453

# Contract Addresses (replace with deployed addresses)
NEXT_PUBLIC_EVENT_FACTORY_ADDRESS=0x__REPLACE__
NEXT_PUBLIC_CHECKIN_MODULE_ADDRESS=0x__REPLACE__
NEXT_PUBLIC_EAS_ADDRESS=0x__REPLACE__

# WalletConnect Project ID
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here

# Kiosk Configuration
NEXT_PUBLIC_KIOSK_PASSPHRASE=change-me

# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
\`\`\`

### 4. Start Development Server

\`\`\`bash
pnpm dev
\`\`\`

The application will be available at `http://localhost:3000`.

## 🧪 Testing

### Run All Tests

\`\`\`bash
pnpm test
\`\`\`

### Run Tests with Coverage

\`\`\`bash
pnpm test --coverage
\`\`\`

### Run Tests in Watch Mode

\`\`\`bash
pnpm test --watch
\`\`\`

### Run Specific Test File

\`\`\`bash
pnpm test ConnectWalletButton.test.tsx
\`\`\`

## 🏗 Building for Production

\`\`\`bash
pnpm build
pnpm start
\`\`\`

## 📱 Application Structure

\`\`\`
echopass-frontend/
├── app/                          # Next.js app directory
│   ├── events/[eventId]/        # Event detail pages
│   ├── organizer/               # Organizer features
│   │   ├── create/             # Event creation wizard
│   │   └── dashboard/          # Analytics dashboard
│   ├── tickets/                # User ticket management
│   ├── kiosk/                  # Check-in kiosk
│   └── api/                    # API routes
├── components/                  # React components
│   ├── ui/                     # Base UI components
│   ├── wizard-steps/           # Event creation steps
│   └── ...                     # Feature components
├── lib/                        # Utilities and configurations
│   ├── abis/                   # Contract ABIs
│   ├── contracts.ts            # Contract clients
│   ├── wagmi.ts               # Wallet configuration
│   └── types.ts               # TypeScript types
├── hooks/                      # Custom React hooks
├── __tests__/                  # Test files
└── public/                     # Static assets
\`\`\`

## 🎯 Key Features Guide

### For Event Attendees

1. **Browse Events**: Discover upcoming events with filtering and search
2. **Purchase Tickets**: Connect wallet and mint tickets securely
3. **Manage Tickets**: View owned tickets and generate QR codes
4. **Check-in**: Present QR codes at event entrances

### For Event Organizers

1. **Create Events**: Multi-step wizard for event setup
2. **Configure Tiers**: Set up different ticket types and pricing
3. **Set Policies**: Configure resale rules and check-in windows
4. **Deploy Events**: Deploy smart contracts to blockchain
5. **Track Analytics**: Monitor sales, attendance, and revenue
6. **Export Data**: Download CSV reports for analysis

### For Event Staff

1. **Kiosk Mode**: Fullscreen check-in interface
2. **QR Scanning**: Camera-based ticket validation
3. **Live Feed**: Real-time check-in monitoring
4. **Security Features**: Salt rotation and fraud prevention

## 🔧 Configuration

### Wallet Setup

1. Get a WalletConnect Project ID from [WalletConnect Cloud](https://cloud.walletconnect.com)
2. Add the project ID to your environment variables
3. Configure supported chains in `lib/wagmi.ts`

### Contract Deployment

1. Deploy the EchoPass smart contracts to your chosen network
2. Update contract addresses in environment variables
3. Ensure ABIs in `lib/abis/` match your deployed contracts

### Kiosk Configuration

1. Set a secure passphrase in `NEXT_PUBLIC_KIOSK_PASSPHRASE`
2. Configure check-in validation logic in API routes
3. Customize kiosk UI for your event branding

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

\`\`\`bash
pnpm build
# Deploy .next/ folder to your hosting provider
\`\`\`

## 🧪 Testing Strategy

### Unit Tests
- Component rendering and behavior
- Hook functionality
- Utility functions
- Form validation

### Integration Tests
- Complete user flows
- Wallet connection
- Contract interactions
- API endpoints

### E2E Tests (Future)
- Full application workflows
- Cross-browser compatibility
- Mobile responsiveness

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Use conventional commit messages
- Ensure accessibility compliance
- Maintain responsive design

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Join community discussions
- **Email**: contact@echopass.app

## 🗺 Roadmap

- [ ] Mobile app development
- [ ] Multi-chain support
- [ ] Advanced analytics
- [ ] Social features
- [ ] API marketplace
- [ ] White-label solutions

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Wagmi](https://wagmi.sh/) - React hooks for Ethereum
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Radix UI](https://www.radix-ui.com/) - Accessible components
- [Vercel](https://vercel.com/) - Deployment platform

---

Built with ❤️ by the EchoPass team
