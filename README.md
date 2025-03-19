# Cobbler - Professional Network Visualization

Cobbler is a modern web application designed to help users visualize and manage their professional network. Built with Next.js and React Flow, it provides an intuitive interface for tracking relationships and interactions with professional contacts.

## Features

- 🎯 Interactive network visualization
- 🔍 Search and filter contacts
- 🏷️ Tag-based organization
- 💪 Strong/weak tie relationship tracking
- 📝 Contact notes and interaction history
- 🎨 Clean, modern UI design

## Tech Stack

- **Frontend**: Next.js 14 with React
- **UI Library**: React Flow for network visualization
- **Styling**: Tailwind CSS
- **Backend**: Supabase (coming soon)
- **Hosting**: Vercel (coming soon)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cobbler.git
   cd cobbler
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Project Structure

```
src/
├── app/                    # Next.js app directory
├── components/            # React components
│   └── NetworkGraph/     # Network visualization components
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

### Key Components

- `NetworkGraph`: Main visualization component using React Flow
- `ContactNode`: Custom node component for displaying contact information
- `NetworkEdge`: Custom edge component for relationship connections
- `ContactModal`: Modal for viewing and editing contact details
- `SearchPanel`: Search and filter interface

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- React Flow for the amazing graph visualization library
- Next.js team for the incredible framework
- Tailwind CSS for the utility-first CSS framework 