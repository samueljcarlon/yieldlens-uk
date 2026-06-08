export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50 mt-16 
print:hidden">
      <div className="max-w-5xl mx-auto px-4 py-10 text-sm text-stone-500 
space-y-3">
        <p className="font-medium text-stone-700">YieldLens UK</p>
        <p>
          YieldLens UK provides indicative property return checks and 
decision-support
          analysis only. It is not a formal valuation, financial advice, 
mortgage advice,
          legal advice, tax advice, or a substitute for professional due 
diligence.
        </p>
        <p>YieldLens UK is an independent UK property analysis 
tool.</p>
        <p className="text-stone-400 text-xs pt-2">
          © {new Date().getFullYear()} YieldLens UK. All rights 
reserved.
        </p>
      </div>
    </footer>
  );
}
