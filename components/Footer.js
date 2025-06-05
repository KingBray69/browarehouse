export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-12">
      <div className="max-w-6xl mx-auto py-6 px-6 text-center">
        <p>© {new Date().getFullYear()} Frat E-Com. All rights reserved.</p>
        <p className="text-sm mt-1">Built for frat boys, powered by Firebase.</p>
      </div>
    </footer>
  );
}